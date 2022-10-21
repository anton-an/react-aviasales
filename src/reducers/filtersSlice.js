import { createSlice } from '@reduxjs/toolkit'

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    filterTypes: {
      all: { label: 'Все', isActive: true },
      noTransfers: { label: 'Без пересадок', isActive: true },
      one: { label: '1 пересадка', isActive: true },
      two: { label: '2 пересадки', isActive: true },
      three: { label: '3 пересадки', isActive: true },
    },
  },
  reducers: {
    toggleFilters: (state, action) => {
      const { filterTypes } = state
      const allFiltersIds = Object.keys(filterTypes)
      const elementId = action.payload
      if (elementId === 'all') {
        filterTypes[elementId].isActive = !filterTypes[elementId].isActive
        allFiltersIds.forEach((id) => {
          filterTypes[id].isActive = filterTypes.all.isActive
        })
      } else {
        filterTypes[elementId].isActive = !filterTypes[elementId].isActive
        filterTypes.all.isActive = false
      }
    },
  },
})

export const { toggleFilters } = filtersSlice.actions

export const selectFilters = (state) => state.filters.filterTypes

export default filtersSlice.reducer
