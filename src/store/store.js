import { configureStore } from '@reduxjs/toolkit'

import { filtersReducer, sortReducer, ticketsReducer, searchIdReducer } from '../reducers'

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    sort: sortReducer,
    searchId: searchIdReducer,
    tickets: ticketsReducer,
  },
})

export default store
