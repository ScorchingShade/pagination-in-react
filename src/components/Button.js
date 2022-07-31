import React from 'react'
import styles from './Button.module.css'

function Button({button, onClick, active}) {

  return (
    <button className={active===button?styles.buttonActive:styles.button} onClick={onClick}>{button}</button>
  )
}

export default Button