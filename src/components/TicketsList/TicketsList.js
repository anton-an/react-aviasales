import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

import { selectFilteredTickets } from '../../reducers/ticketsSlice'
import Ticket from '../Ticket/Ticket'

import styles from './TicketsList.module.scss'

export default function TicketsList() {
  const [ticketsLimit, setTickestLimit] = useState(5)
  const tickets = useSelector(selectFilteredTickets)

  let limitedTickets = null
  if (tickets) {
    limitedTickets = tickets.slice(0, ticketsLimit).map((ticket) => <Ticket ticket={ticket} key={nanoid()} />)
  }

  const moreButton = (
    <button type="button" className={styles.moreButton} onClick={() => setTickestLimit(ticketsLimit + 5)}>
      Показать еще 5 билетов!{' '}
    </button>
  )

  const noTickets = <div className={styles.noTickets}>Рейсов, подходящих под заданные фильтры, не найдено</div>

  return (
    <ul className={styles.list}>
      {limitedTickets}
      {limitedTickets.length > 0 ? moreButton : noTickets}
    </ul>
  )
}
