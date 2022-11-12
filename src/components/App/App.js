import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchTicketsData, setStatus, resetTickets } from '../../reducers/ticketsSlice'
import { fetchSearchId } from '../../reducers/searchIdSlice'
import Filters from '../Filters'
import Tickets from '../Tickets'

import '../../normalize.css'
import styles from './App.module.scss'
import Logo from './logo.svg'

function App() {
  const dispatch = useDispatch()
  const searchId = useSelector((state) => state.searchId.id)
  const searchIdStatus = useSelector((state) => state.searchId.status)
  const { ticketsData, stop, status } = useSelector((state) => state.tickets)

  useEffect(() => {
    if (!searchId && searchIdStatus !== 'pending' && status !== 'offline') {
      dispatch(fetchSearchId())
    }
  }, [dispatch, searchId, searchIdStatus, status])

  useEffect(() => {
    if (searchId && !stop && status === 'idle') {
      dispatch(fetchTicketsData(searchId))
    }
  }, [dispatch, searchId, ticketsData, status, stop])

  useEffect(() => {
    window.addEventListener('offline', () => dispatch(setStatus('offline')))
    window.addEventListener('online', () => {
      dispatch(resetTickets())
      dispatch(setStatus('idle'))
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
