import React from 'react'
import BackgroundColor from './BackgroundColor'
import User from './User'
import classes from './Header.module.css'
import { isLoggedIn } from '../utils/auth'

const Header = ({ name }) => {
  const userCapabilities = () => {
    return (
      <>
        {name && <div className={classes.greetingsTitle}>Hi, {name}!</div>}
        <BackgroundColor />
        <User />
      </>
    )
  }

  return (
    <header className={classes.headerWrapper}>
      <div className='container'>
        <div className={classes.header}>
          <h1 className={classes.headerTitle}>my.task.manager</h1>
          <p className={classes.headerText}>All you need.</p>
          {isLoggedIn() && userCapabilities()}
        </div>
      </div>
    </header>
  )
}

export default Header
