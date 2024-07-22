import React from 'react'
import classes from './InfoBanner.module.css'
export const InfoBanner = ({ text, isWarning, clickFunc }) => {
  return (
    <div
      className={`${classes.note} ${
        isWarning ? classes.errorOrange : classes.errorRed
      }`}
    >
      <p className={classes.noteText}>{text}</p>{' '}
      <i
        className={`${classes.noteIcon} fa-regular fa-xmark`}
        onClick={clickFunc}
      ></i>
    </div>
  )
}
