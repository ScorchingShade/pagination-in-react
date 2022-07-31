import React from 'react'
import styles from "./ListItem.module.css"

function ListItem({item}) {

  return (
    <div className={styles.item}>
        <div className={styles.name}>{item.userName}</div>
        <div className={styles.dept}>{item.dept}</div>
    </div>
  )
}

export default ListItem