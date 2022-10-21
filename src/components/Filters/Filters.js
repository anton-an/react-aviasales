import { useSelector, useDispatch } from 'react-redux'

import { toggleFilters } from '../../reducers/filtersSlice'

import styles from './Filters.module.scss'

export default function Filters() {
  const filterTypes = useSelector((state) => state.filters.filterTypes)
  const filterIds = Object.keys(filterTypes)
  const dispatch = useDispatch()
  const filters = filterIds.map((id) => (
    <label className={styles.label} htmlFor={id} key={id}>
      <input
        type="checkbox"
        id={id}
        className={styles.checkbox}
        onChange={(e) => {
          dispatch(toggleFilters(e.target.id))
        }}
        checked={filterTypes[id].isActive}
      />
      {filterTypes[id].label}
      <span className={styles.checkmark}> </span>
    </label>
  ))
  return (
    <section className={styles.filters}>
      <h3 className={styles.header}>Количество пересадок</h3>
      <form className={styles.form}>{filters}</form>
    </section>
  )
}
