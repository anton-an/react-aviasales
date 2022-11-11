import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

import AviasalesApiService from '../services/AviasalesApi'
import sortTickets from '../helpers/sort'
import filterTickets from '../helpers/filter'

import { selectFilters } from './filtersSlice'
import { selectActiveSortId } from './sortSlice'

const aviasalesApi = new AviasalesApiService()

const fetchTicketsData = createAsyncThunk('tickets/getTicketsData', async (searchId, { rejectWithValue }) => {
  const response = await aviasalesApi.getTickets(searchId)
  try {
    return await response
  } catch (error) {
    return rejectWithValue(error)
  }
})

const initialState = {
  ticketsData: [],
  status: 'idle',
  stop: null,
  errorsCounter: 0,
  error: null,
  idRecieved: false,
  isOffline: false,
}

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload
    },
    resetTickets: (state) => {
      state.ticketsData = []
    },
  },
  extraReducers: {
    [fetchTicketsData.pending]: (state) => {
      state.status = 'pending'
    },
    [fetchTicketsData.fulfilled]: (state, action) => {
      if (state.status !== 'offline') {
        state.status = 'idle'
      }
      state.ticketsData.push(...action.payload.tickets)
      if (action.payload.stop) {
        state.status = 'done'
      }
      state.errorsCounter = 0
    },
    [fetchTicketsData.rejected]: (state, action) => {
      if (action.error.message === '500') {
        state.status = 'idle'
      } else {
        state.status = 'failed'
      }
    },
  },
})

export const selectAllTickets = (state) => state.tickets.ticketsData
export const selectFilteredTickets = createSelector(
  [selectAllTickets, selectFilters, selectActiveSortId],
  (tickets, filterIds, sortId) => {
    const filteredTickets = filterTickets(filterIds, tickets)
    const sortedTickets = sortTickets(sortId, filteredTickets)
    return sortedTickets
  }
)

export { fetchTicketsData }
export const { setStatus, resetTickets } = ticketsSlice.actions

export default ticketsSlice.reducer
