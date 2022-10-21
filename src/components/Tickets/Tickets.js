import { useSelector } from 'react-redux'

import Spinner from '../Spinner'
import TicketsList from '../TicketsList'
import Error from '../Error'
import SortList from '../SortList'

import styles from './Tickets.module.scss'

export default function Tickets() {
  const { error, isLoading } = useSelector((state) => state.tickets)
  return (
    <section className={styles.tickets}>
      <SortList />
      {isLoading ? <Spinner /> : null}
      {error ? <Error error={error} /> : null}
      <TicketsList />
    </section>
  )
}
