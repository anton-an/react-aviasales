import React from 'react'

import styles from './Error.module.scss'

export default function Error({ error }) {
  return (
    <div className={styles.error}>
      <h3 className={styles.title}>Error</h3>
      <p className={styles.text}>{error.message}</p>
    </div>
  )
}
