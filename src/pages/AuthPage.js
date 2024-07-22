import React, { useState, useEffect } from 'react'
import {
  redirect,
  json,
  useActionData,
  useLocation,
  useRouteLoaderData,
} from 'react-router-dom'
import classes from './AuthPage.module.css'
import { smtpexpressClient } from '../utils/smtp'
import { InfoBanner } from '../components/InfoBanner'
import { VerificationModal } from '../components/VerificationModal'
import { loginImages } from '../data'
import { AuthForm } from '../components/AuthForm'

const sendEmail = async (userName, emailURL) => {
  try {
    await smtpexpressClient.sendApi.sendMail({
      subject: 'Welcome to My Task Manager: Email verification',
      message: `<h2 style="font-size: .9rem;">Welcome ${userName} 🎉 </h2><p style="font-size: .9rem;">Before you go out and play on My Task Manager, please verify your email address. To do this you just have to click on the button bellow.</p><p style="font-size: .9rem;">If you did not create a My Task Manager account using this address, please contact us at example@mytaskmanager.com.</p><a href="${emailURL}" target="_blank" style="background:black;color:white;text-decoration: none;display: block;width: fit-content;border-radius: .5rem;margin: 2rem auto;padding: .5rem 1.2rem;font-size: .9rem;">Verify your account</a><hr style="margin: 2rem 0 .5rem;"><div style="text-align: center;font-size: 12px;">© 2024 My Task Manager</div>`,
      sender: {
        name: 'My Task Manager',
        email: 'sm0pid-3E2AdEaB2cI_Wd485D6nBlMnK@projects.smtpexpress.com',
      },
      recipients: {
        email: 'examplee1245@gmail.com',
      },
    })
    console.log('Email sent!')
  } catch (error) {
    console.error(error)
  }
}

export const authAction = async ({ params, request }) => {
  let searchParams = new URL(request.url).searchParams
  let mode = searchParams.get('mode') === 'login' ? 'login' : 'signup'

  let formData = await request.formData()
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const errors = {}
  if (mode === 'signup') {
    if (formData.get('name')) {
      data.name = formData.get('name')
    } else {
      errors.errorName = 'Required field'
    }
  }

  // Validate fields
  if (typeof data.email !== 'string' || !data.email.includes('@')) {
    errors.errorEmail = "That doesn't look like an email address"
  }

  if (typeof data.password !== 'string' || data.password.length < 6) {
    errors.errorPassword = 'Password must be > 6 characters'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  let response
  response = await fetch('http://localhost:8080/' + mode, {
    //https://taskmanagerback.onrender.com/
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const resData = await response.json()

  if (response.status === 422 || response.status === 401) {
    return resData
  }
  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 })
  }
  if (mode === 'signup') {
    sendEmail(data.name, resData.emailURL)

    return { email: data.email, verificationModalShown: true }
  } else {
    const token = resData.token
    localStorage.setItem('token', token)
    const expiration = new Date().getTime() + 60 * 60 * 1000
    localStorage.setItem('token-expiration', new Date(expiration).toISOString())
    localStorage.setItem('isVerified', resData.user.isVerified)
    localStorage.setItem('name', resData.user.name)

    if (resData.user.isVerified) {
      return redirect('/')
    }
    return {
      verificationPending: true,
      verificationError:
        'Verification pending! You have to verify your account via the link we sent to your email!',
      verificationModalShown: false,
    }
  }
}

const AuthPage = () => {
  let data = useActionData()
  const token = useRouteLoaderData('root')
  let isExpired = token === 'EXPIRED'

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  let isLogin = searchParams.get('mode') === 'login'

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const [loginImg, setLoginImg] = useState(loginImages[0])
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(true)
  }

  const resetForm = () => {
    setIsClicked(false)
  }

  useEffect(() => {
    setLoginImg(loginImages[randomNumber(0, 3)])
  }, [])

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
          className={`${!data?.verificationModalShown && classes.loginCol} ${
            classes.loginColLeft
          }`}
        >
          <h3 className={classes.logoText}>my.task.manager</h3>
          <p className={classes.logoSubtext}>Your personal task manager.</p>

          {console.log(data)}
          {data?.verificationModalShown ? (
            <VerificationModal email={data.email} />
          ) : (
            <>
              {!isLogin && <div className={classes.loginTitle}>Sign Up</div>}

              {isLogin && isExpired && (
                <div className={classes.loginTitle}>Welcome back!</div>
              )}
              {isLogin && !isExpired && (
                <div className={classes.loginTitle}>Login</div>
              )}
              <div className={classes.loginSubtitle}>
                {isLogin
                  ? 'Enter your credentials to access your account.'
                  : "Let's get started."}
              </div>
              <AuthForm resetForm={resetForm} data={data} isLogin={isLogin} />
            </>
          )}
        </div>
        {!data?.verificationModalShown && (
          <div className={`${classes.loginCol} ${classes.loginColRight}`}>
            <img className={classes.loginImg} src={loginImg} alt='login' />
          </div>
        )}
      </div>

      {data?.verificationPending && !isClicked && (
        <InfoBanner
          text={data.verificationError}
          isWarning
          clickFunc={handleClick}
        />
      )}

      {data?.serverError?.noMatch && !isClicked && (
        <InfoBanner text={data?.serverError?.noMatch} clickFunc={handleClick} />
      )}
    </>
  )
}

export default AuthPage
