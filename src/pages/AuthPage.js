import React, { useState, useEffect } from 'react'
import {
  useActionData,
  useLocation,
  useRouteLoaderData,
  Navigate,
} from 'react-router-dom'
import classes from './AuthPage.module.css'
import { InfoBanner } from '../components/InfoBanner'
import { VerificationModal } from '../components/VerificationModal'
import { loginImages } from '../data'
import { AuthForm } from '../components/AuthForm'
import { isLoggedIn } from '../utils/auth'

const AuthPage = () => {
  let data = useActionData()
  const token = useRouteLoaderData('root')
  let isExpired = token === 'EXPIRED'
  const location = useLocation()

  const [loginImg, setLoginImg] = useState(loginImages[0])
  const [isCloseClicked, setIsCloseClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setLoginImg(loginImages[randomNumber(0, 3)])
  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [data])

  if (isLoggedIn()) {
    return <Navigate to='/' replace={true} />
  }
  const searchParams = new URLSearchParams(location.search)
  let isLogin = searchParams.get('mode') === 'login'

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const handleCloseBanner = () => {
    setIsCloseClicked(true)
  }

  const resetForm = () => {
    setIsCloseClicked(false)
  }

  const loginTitle = () => {
    if (!isLogin) {
      return 'Sign Up'
    }
    return isExpired ? 'Welcome back!' : 'Login'
  }

  return (
    <>
      <style> {`header { display: none !important;} `}</style>
      <div className={classes.loginBg}></div>

      <div
        className={`${classes.loginWrapper} ${
          isLogin ? classes.slideInLogin : ''
        }`}
      >
        <div
          className={`${!data?.verifyEmailModalShow && classes.loginCol} ${
            classes.loginColLeft
          }`}
        >
          <h3 className={classes.logoText}>my.task.manager</h3>
          <p className={classes.logoSubtext}>Your personal task manager.</p>

          {data?.verifyEmailModalShow ? (
            <VerificationModal email={data.email} />
          ) : (
            <div>
              <div className={classes.loginTitle}>{loginTitle()}</div>

              <div className={classes.loginSubtitle}>
                {isLogin
                  ? 'Enter your credentials to access your account.'
                  : "Let's get started."}
              </div>
              <AuthForm
                resetForm={resetForm}
                data={data}
                isLogin={isLogin}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>
          )}
        </div>

        {!data?.verifyEmailModalShow && (
          <div className={`${classes.loginCol} ${classes.loginColRight}`}>
            <img className={classes.loginImg} src={loginImg} alt='login' />
          </div>
        )}
      </div>

      {/* Info: Waiting for email verification action */}
      {data?.verificationPending && !isCloseClicked && (
        <InfoBanner
          text={data.verificationError}
          isWarning
          clickFunc={handleCloseBanner}
        />
      )}

      {/* Info: Incorrect password/username */}
      {data?.serverError?.noMatch && !isCloseClicked && (
        <InfoBanner
          text={data?.serverError?.noMatch}
          clickFunc={handleCloseBanner}
        />
      )}
    </>
  )
}

export default AuthPage
