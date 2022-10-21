import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchSearchId, fetchTicketsData, setOfflineStatus } from '../../reducers/ticketsSlice'
import Filters from '../Filters'
import Tickets from '../Tickets'

import '../../normalize.css'
import styles from './App.module.scss'
import Logo from './logo.svg'

function App() {
  const dispatch = useDispatch()
  const { idRecieved } = useSelector((state) => state.tickets)
  const { ticketsData, done, isServerError, offline } = useSelector((state) => state.tickets)

  useEffect(() => {
    if (!idRecieved && !offline) {
      dispatch(fetchSearchId())
    }
  }, [dispatch, idRecieved, offline])

  useEffect(() => {
    if ((!done && idRecieved && !offline) || (!done && isServerError)) {
      dispatch(fetchTicketsData())
    }
  }, [dispatch, done, idRecieved, ticketsData, isServerError, offline])

  useEffect(() => {
    window.addEventListener('offline', () => dispatch(setOfflineStatus(true)))
    window.addEventListener('online', () => {
      dispatch(setOfflineStatus(false))
    })
  }, [dispatch])

  return (
    <main className={styles.app}>
      <img className={styles.logo} src={Logo} alt="logo" />
      <div className={styles.content}>
        <Filters />
        <Tickets />
      </div>
    </main>
  )
}

export default App
