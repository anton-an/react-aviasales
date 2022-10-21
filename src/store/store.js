import { configureStore } from '@reduxjs/toolkit'

import { filtersReducer, sortReducer, ticketsReducer } from '../reducers'

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    sort: sortReducer,
    tickets: ticketsReducer,
  },
})

export default store
