import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'

import AviasalesApiService from '../services/AviasalesApi'

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
  isServerError: false,
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
      state.isServerError = false
      state.isLoading = true
    },
    [fetchTicketsData.fulfilled]: (state, action) => {
      state.ticketsData.push(...action.payload.tickets)
      state.isServerError = false
      state.error = null
      state.firstTicketsLoaded = true
      state.done = action.payload.stop
      state.isLoading = !action.payload.stop
    },
    [fetchTicketsData.rejected]: (state, action) => {
      if (action.error.message === '500') {
        state.isServerError = true
      } else {
        state.isLoading = false
        state.error = action.error
      }
    },
  },
})

const filterTickets = (filters, tickets) => {
  const allTickets = JSON.parse(JSON.stringify(tickets))
  const filtered = []
  if (filters.all.isActive) {
    return allTickets
  }
  if (filters.noTransfers.isActive) {
    filtered.push(
      ...allTickets.filter((ticket) => ticket.segments.reduce((acc, segment) => acc + segment.stops.length, 0) === 0)
    )
  }
  if (filters.one.isActive) {
    filtered.push(
      ...allTickets.filter((ticket) => ticket.segments.reduce((acc, segment) => acc + segment.stops.length, 0) === 1)
    )
  }
  if (filters.two.isActive) {
    filtered.push(
      ...allTickets.filter((ticket) => ticket.segments.reduce((acc, segment) => acc + segment.stops.length, 0) === 2)
    )
  }
  if (filters.three.isActive) {
    filtered.push(
      ...allTickets.filter((ticket) => ticket.segments.reduce((acc, segment) => acc + segment.stops.length, 0) === 3)
    )
  }
  return filtered
}

const sortTickets = (sortIds, tickets) => {
  const allTickets = JSON.parse(JSON.stringify(tickets))
  sortIds.forEach((id) => {
    if (id === 'cheapest') {
      allTickets.sort((ticket1, ticket2) => ticket1.price - ticket2.price)
    }
    if (id === 'fastest')
      allTickets.sort(
        (ticket1, ticket2) =>
          ticket1.segments.reduce((acc, segment) => acc + segment.duration, 0) -
          ticket2.segments.reduce((acc, segment) => acc + segment.duration, 0)
      )
    if (id === 'optimal')
      allTickets.sort(
        (ticket1, ticket2) =>
          ticket1.segments.reduce((acc, segment) => acc + segment.duration, 0) +
          ticket1.price -
          (ticket2.segments.reduce((acc, segment) => acc + segment.duration, 0) + ticket2.price)
      )
  })
  return allTickets
}

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
