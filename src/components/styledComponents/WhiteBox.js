import React from 'react'
import classes from './WhiteBox.module.css'

export const WhiteBox = (props) => {
  return <div className={classes.whiteBox}>{props.children}</div>
}
