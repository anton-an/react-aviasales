import { nanoid } from '@reduxjs/toolkit'

import getFlightTime from '../../helpers'

import styles from './Ticket.module.scss'

export default function Ticket({ ticket }) {
  const { segments } = ticket
  const transfersText = (stops) => {
    let text = 'Без пересадок'
    if (stops > 1) {
      text = `${stops} пересадки`
    }
    if (stops === 1) {
      text = `${stops} пересадкa`
    }
    return text
  }

  const ticketContent = segments.map((segment) => {
    const { date, duration, origin, destination, stops } = segment
    const { flightPeriod, flightTime } = getFlightTime(date, duration)
    return (
      <table className={styles.info} key={nanoid()}>
        <thead className={styles.tableHeader}>
          <tr className={styles.tableRow}>
            <th className={styles.destination}>
              {origin} - {destination}
            </th>
            <th className={styles.totalTitle}>В пути</th>
            <th className={styles.transferTitle}>{transfersText(stops.length)}</th>
          </tr>
        </thead>
        <tbody className={styles.TableBody}>
          <tr className={styles.tableRow}>
            <td className={styles.dates}>{flightPeriod}</td>
            <td className={styles.total}>{flightTime}</td>
            <td className={styles.transfers}>{stops.join(', ')}</td>
          </tr>
        </tbody>
      </table>
    )
  })
  return (
    <div>
      <header className={styles.header}>
        <h3 className={styles.price}>{`${ticket.price} Р`}</h3>
        <img className={styles.companyLogo} src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt="company-logo" />
      </header>
      {ticketContent}
    </div>
  )
}
