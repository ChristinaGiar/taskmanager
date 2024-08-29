import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { WhiteBox } from '../components/styledComponents/WhiteBox'
import ErrorPage from './ErrorPage'
import { isLoggedIn } from '../utils/auth'

export const VerifyPage = () => {
  const [verified, setVerified] = useState({ isVerified: null, status: '' })

  useEffect(() => {
    const fetchVerificationData = async () => {
      let searchParams = new URL(window.location.href).searchParams
      const query = searchParams.get('token')
      if (query) {
        try {
          const response = await fetch(
            encodeURI(
              process.env.REACT_APP_BACKEND_URL + 'verify?token=' + query
            )
          )
          const token = await response.json()
          setVerified({ status: response.status, isVerified: token.isVerified })
        } catch (error) {
          console.error(error)
        }
      }
    }
    fetchVerificationData()
  }, [])

  if (isLoggedIn()) {
    return <ErrorPage />
  }

  if (verified.isVerified && verified.status === 200) {
    return (
      <WhiteBox>
        <h5>Great news! </h5>
        <p>Your email has been verified! You can proceed with login!</p>
        <Link to='/auth?mode=login'>Login</Link>
      </WhiteBox>
    )
  } else if (!verified.isVerified) {
    if (verified.status === 401) {
      return (
        <div>
          <p>Your account was not found :&#x28; Please proceed with sign up.</p>
          <Link to='/auth'>Sign up</Link>
        </div>
      )
    } else if (verified.status === 400) {
      return (
        <WhiteBox>
          <h5>Oops... :&#x28;</h5>
          <p>
            The verification link might be wrong or too old. Try once again to
            sign up.
          </p>
          <Link to='/auth'>Sign up</Link>
        </WhiteBox>
      )
    }
  }
  return <ErrorPage />
}
