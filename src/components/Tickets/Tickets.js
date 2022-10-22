import { useSelector } from 'react-redux'

import Spinner from '../Spinner'
import TicketsList from '../TicketsList'
import Error from '../Error'
import SortList from '../SortList'

import styles from './Tickets.module.scss'

export default function Tickets() {
  const { error, isLoading, isOffline } = useSelector((state) => state.tickets)
  return (
    <section className={styles.tickets}>
      <SortList />
      {isLoading ? <Spinner /> : null}
      {error ? (
        <Error>
          <p className={styles.errorText}>{`${error.message}. ${isOffline ? 'Нет интернета' : ''}`}</p>
        </Error>
      ) : null}
      <TicketsList />
    </section>
  )
}
