import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setActiveSort } from '../../reducers/sortSlice'

import styles from './SortList.module.scss'

export default function SortList() {
  const sortTypes = useSelector((state) => state.sort.sortTypes)
  const sortIds = Object.keys(sortTypes)
  const dispatch = useDispatch()
  const sorts = sortIds.map((id) => {
    const classNames = sortTypes[id].isActive ? `${styles.tab} ${styles.active}` : `${styles.tab}`
    return (
      <li className={classNames} key={id}>
        <button className={styles.button} type="button" id={id} onClick={(e) => dispatch(setActiveSort(e.target.id))}>
          {sortTypes[id].label}
        </button>
      </li>
    )
  })
  return <ul className={styles.sort}>{sorts}</ul>
}
