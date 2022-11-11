import { useSelector } from 'react-redux'

import { selectSearchId } from '../../reducers/searchIdSlice'
import TicketsList from '../TicketsList'
import Error from '../Error'
import SortList from '../SortList'

import styles from './Tickets.module.scss'

export default function Tickets() {
  const { status } = useSelector((state) => state.tickets)
  const searchId = useSelector(selectSearchId)
  return (
    <section className={styles.tickets}>
      <SortList />
      {status !== 'done' && status !== 'offline' && status !== 'failed' ? <div className={styles.spinner} /> : null}
      {status === 'offline' ? (
        <Error>
          <p className={styles.errorText}>Нет интернета!</p>
        </Error>
      ) : null}
      {status === 'failed' || searchId.status === 'failed' ? (
        <Error>
          <p className={styles.errorText}>Что-то пошло не так. Обновите страницу или попробуйте позже</p>
        </Error>
      ) : null}
      <TicketsList />
    </section>
  )
}
