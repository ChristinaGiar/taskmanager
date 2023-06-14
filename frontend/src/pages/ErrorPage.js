import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <>
        <h1>404</h1>
        <h3>Ooops!</h3>
        <h3>Page not Found</h3>
        <p>This page wasn't found. We suggest you to go back to homepage</p>
        <Link to="/">Back to Home</Link>
        </>
  )
}

export default ErrorPage;