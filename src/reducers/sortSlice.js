import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sortTypes: {
    cheapest: {
      label: 'Самый дешёвый',
      isActive: true,
    },
    fastest: {
      label: 'Самый быстрый',
      isActive: false,
    },
    optimal: {
      label: 'Оптимальный',
      isActive: false,
    },
  },
}

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setActiveSort: (state, action) => {
      const { sortTypes } = state
      const allSortsId = Object.keys(sortTypes)
      const elementId = action.payload
      allSortsId.forEach((id) => {
        if (id === elementId) {
          sortTypes[id].isActive = true
        } else {
          sortTypes[id].isActive = false
        }
      })
    },
  },
})

export const allSorts = (state) => state.sort.sortTypes
export const selectActiveSort = (state) => state.sortTypes.filter((sort) => sort.active === true)
export const selectActiveSortId = (state) => {
  const { sortTypes } = state.sort
  const sortIds = Object.keys(sortTypes)
  const activeSortId = sortIds.filter((id) => sortTypes[id].isActive === true)
  return activeSortId
}
export const { setActiveSort } = sortSlice.actions

export default sortSlice.reducer
