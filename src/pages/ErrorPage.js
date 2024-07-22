import React from 'react'
import { Link } from 'react-router-dom'
import classes from './ErrorPage.module.css'
import { WhiteBox } from '../components/styledComponents/WhiteBox'

const ErrorPage = () => {
  return (
    <WhiteBox>
      <h1 className={classes.title}>404</h1>
      <h3 className={classes.subtitle}>Ooops! Page not Found</h3>
      <p className={classes.text}>
        This page wasn't found. We suggest you to go back to homepage.
      </p>
      <Link to='/'>Back to Home</Link>
    </WhiteBox>
  )
}

export default ErrorPage
