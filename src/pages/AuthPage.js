import React, { useState, useEffect } from 'react'
import {
  Form,
  redirect,
  json,
  useActionData,
  useLocation,
  Link,
  useRouteLoaderData,
} from 'react-router-dom'
import classes from './AuthPage.module.css'
import { smtpexpressClient } from '../utils/smtp'

export const authAction = async ({ params, request }) => {
  let searchParams = new URL(request.url).searchParams
  let mode = searchParams.get('mode') === 'login' ? 'login' : 'signup'

  let formData = await request.formData()
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  if (formData.get('name')) {
    data.name = formData.get('name')
  }

  const errors = {}

  // validate the fields
  if (typeof data.email !== 'string' || !data.email.includes('@')) {
    errors.errorEmail = "That doesn't look like an email address"
  }

  if (typeof data.password !== 'string' || data.password.length < 6) {
    errors.errorPassword = 'Password must be > 6 characters'
  }

  if (Object.keys(errors).length) {
    return errors
  }

  if (mode === 'signup') {
    try {
      await smtpexpressClient.sendApi.sendMail({
        subject: 'Welcome to My Task Manager: Email verification',
        message: `<h2 style="font-size: .9rem;">WELCOME ${data.name}🎉 </h2><br><p style="font-size: .9rem;">Before you go out and play on My Task Manager, please verify your email address. To do this you just have to click on the button bellow.</p><p style="font-size: .9rem;">If you did not create a My Task Manager account using this address, please contact us at example@mytaskmanager.com.</p><a href="https://github.com/facebook/create-react-app/issues/11889#issuecomment-1114928008" target="_blank" style="background:black;color:white;text-decoration: none;display: block;width: fit-content;border-radius: .5rem;margin: 1rem auto;padding: .5rem 1.2rem;font-size: .9rem;">Verify your account</a>`,

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

  let response
  response = await fetch('https://taskmanagerback.onrender.com/' + mode, {
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
    console.log('Verification...')
    return { email: data.email, toBeVerified: true }
  } else {
    const token = resData.token
    localStorage.setItem('token', token)
    const expiration = new Date().getTime() + 60 * 60 * 1000
    localStorage.setItem('token-duration', new Date(expiration).toISOString())
    const name = resData.user.name
    localStorage.setItem('name', name)

    return redirect('/')
  }
}

const loginImages = [
  'https://images.unsplash.com/photo-1656273090626-f6e65b6f9f80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=1800&q=60',
  'https://images.unsplash.com/photo-1635377090186-036bca445c6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
  'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
  'https://images.unsplash.com/photo-1633907284646-7abf4a195875?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80',
]

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
        <div className={`${classes.loginCol} ${classes.loginColLeft}`}>
          <h3 className={classes.logoText}>my.task.manager</h3>
          <p className={classes.logoSubtext}>Your personal task manager.</p>

          {data?.toBeVerified ? (
            <div>{data.email}</div>
          ) : (
            <>
              {!isLogin && <div className={classes.loginTitle}>Sign Up</div>}

              {isLogin && isExpired && (
                <div className={classes.loginTitle}>Welcome back!</div>
              )}
              {isLogin && !isExpired && (
                <div className={classes.loginTitle}>Login</div>
              )}
              {data?.serverError && (
                <div className={`${classes.errorMsg} text-center`}>
                  {data.serverError}
                </div>
              )}
              <div className={classes.loginSubtitle}>
                {isLogin
                  ? 'Enter your credentials to access your account.'
                  : "Let's get started."}
              </div>
              <Form method='post' className={classes.loginForm}>
                <div className={classes.loginInputWrapper}>
                  <label className={classes.loginLabel} htmlFor='email'>
                    Email
                  </label>
                  <input
                    className={classes.loginInput}
                    type='text'
                    id='email'
                    name='email'
                    placeholder='alex@example.com'
                  ></input>
                </div>

                {data?.errorEmail && (
                  <div className={classes.errorMsg}>{data.errorEmail}</div>
                )}
                {data?.serverErrors?.email && (
                  <div>{data.serverErrors.email}</div>
                )}

                <div className={classes.loginInputWrapper}>
                  <label className={classes.loginLabel} htmlFor='password'>
                    Password
                  </label>
                  <input
                    className={classes.loginInput}
                    type='password'
                    id='password'
                    name='password'
                  ></input>
                </div>

                {data?.errorPassword && (
                  <div className={classes.errorMsg}>{data.errorPassword}</div>
                )}
                {data?.serverErrors?.password && (
                  <div className={classes.errorMsg}>
                    {data.serverErrors.password}
                  </div>
                )}
                {!isLogin && (
                  <div className={classes.loginInputWrapper}>
                    <label className={classes.loginLabel} htmlFor='name'>
                      Name
                    </label>
                    <input
                      className={classes.loginInput}
                      id='name'
                      name='name'
                      placeholder='Alex Parmen'
                    ></input>
                  </div>
                )}
                <div className={classes.loginButtonWrapper}>
                  <button className={classes.button}>
                    {isLogin ? 'Login' : 'Sign up'}
                  </button>
                  <div className={classes.subbutton}>
                    {isLogin ? "Don't have an account?" : 'Have an account?'}
                  </div>

                  <Link
                    className={classes.sublabel}
                    to={`?mode=${isLogin ? 'signup' : 'login'}`}
                  >
                    {isLogin ? 'Sign up' : 'Login'}
                  </Link>
                </div>
              </Form>
            </>
          )}
        </div>
        <div className={`${classes.loginCol} ${classes.loginColRight}`}>
          <img className={classes.loginImg} src={loginImg} alt='login' />
        </div>
      </div>
    </>
  )
}

export default AuthPage
