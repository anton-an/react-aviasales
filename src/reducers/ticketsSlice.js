import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

import AviasalesApiService from '../services/AviasalesApi'
import sortTickets from '../helpers/sort'
import filterTickets from '../helpers/filter'

import { selectFilters } from './filtersSlice'
import { selectActiveSortId } from './sortSlice'

const aviasalesApi = new AviasalesApiService()
let searchId = null

const fetchSearchId = createAsyncThunk('tickets/getSearchId', async (_, { rejectWithValue }) => {
  const response = await aviasalesApi.getSearchId()
  try {
    return response.searchId
  } catch (error) {
    return rejectWithValue(error)
  }
})

const fetchTicketsData = createAsyncThunk('tickets/getTicketsData', async (_, { rejectWithValue }) => {
  const response = await aviasalesApi.getTickets(searchId)
  try {
    return await response
  } catch (error) {
    return rejectWithValue(error)
  }
})

const initialState = {
  ticketsData: [],
  firstTicketsLoaded: false,
  isLoading: false,
  isDone: false,
  serverError: 0,
  error: null,
  idRecieved: false,
  isOffline: false,
}

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setOfflineStatus: (state, action) => {
      state.isOffline = action.payload
      state.isLoading = false
      state.error = null
    },
  },
  extraReducers: {
    [fetchSearchId.pending]: (state) => {
      state.error = null
    },
    [fetchSearchId.fulfilled]: (state, action) => {
      searchId = action.payload
      state.idRecieved = true
    },
    [fetchSearchId.rejected]: (state, action) => {
      state.error = action.error
    },
    [fetchTicketsData.pending]: (state) => {
      state.error = null
      state.isLoading = true
    },
    [fetchTicketsData.fulfilled]: (state, action) => {
      state.ticketsData.push(...action.payload.tickets)
      state.done = action.payload.stop
      state.isLoading = !action.payload.stop
      state.error = null
      state.firstTicketsLoaded = true
    },
    [fetchTicketsData.rejected]: (state, action) => {
      if (action.error.message === '500') {
        state.serverError += 1
      } else {
        state.isLoading = false
        state.error = action.error
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

export { fetchTicketsData, fetchSearchId }
export const { setOfflineStatus } = ticketsSlice.actions

export default ticketsSlice.reducer
