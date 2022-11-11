import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import AviasalesApiService from '../services/AviasalesApi'

const aviasalesApi = new AviasalesApiService()

export const fetchSearchId = createAsyncThunk('search/getSearchId', async () => {
  const response = await aviasalesApi.getSearchId()
  return response.searchId
})

const initialState = {
  id: null,
  status: null,
}

export const searchIdSlice = createSlice({
  name: 'searchId',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSearchId.pending]: (state) => {
      state.status = 'pending'
    },
    [fetchSearchId.fulfilled]: (state, action) => {
      state.status = 'fullfilled'
      state.id = action.payload
    },
    [fetchSearchId.rejected]: (state) => {
      state.status = 'failed'
    },
  },
})

export const selectSearchId = (state) => state.searchId
export default searchIdSlice.reducer
