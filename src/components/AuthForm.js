import React, { useState } from 'react'
import { Form, Link } from 'react-router-dom'
import classes from './AuthForm.module.css'
import Loader from './Loader'
export const AuthForm = ({
  resetForm,
  data,
  isLogin,
  isLoading,
  setIsLoading,
}) => {
  const [passwordShown, setPasswordShown] = useState(false)
  return (
    <Form
      method='post'
      className={classes.loginForm}
      onSubmit={() => {
        setIsLoading(true)
        resetForm()
      }}
    >
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
        <p className={classes.errorMsg}>{data.errorEmail}</p>
      )}
      {data?.serverErrors?.email && (
        <p className={classes.errorMsg}>{data.serverErrors.email}</p>
      )}

      <div className={classes.loginInputWrapper}>
        <label className={classes.loginLabel} htmlFor='password'>
          Password
        </label>
        <div className={classes.passwordInputWrapper}>
          <input
            className={classes.loginInput}
            type={passwordShown ? 'text' : 'password'}
            id='password'
            name='password'
          ></input>
          <i
            className={`${classes.passwordIcon} fa-solid fa-eye${
              !passwordShown ? '-slash' : ''
            }`}
            onClick={() => setPasswordShown(!passwordShown)}
          ></i>
        </div>
      </div>

      {data?.errorPassword && (
        <p className={classes.errorMsg}>{data.errorPassword}</p>
      )}
      {data?.serverErrors?.password && (
        <p className={classes.errorMsg}>{data.serverErrors.password}</p>
      )}
      {!isLogin && (
        <>
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
          {data?.errorName && (
            <p className={classes.errorMsg}>{data.errorName}</p>
          )}
        </>
      )}
      <div className={classes.loginButtonWrapper}>
        <button className={classes.button}>
          {isLoading ? <Loader /> : isLogin ? 'Login' : 'Sign up'}
        </button>
        <div className={classes.subButton}>
          {isLogin ? "Don't have an account?" : 'Have an account?'}
        </div>

        <Link
          className={classes.subLabel}
          to={`?mode=${isLogin ? 'signup' : 'login'}`}
        >
          {isLogin ? 'Sign up' : 'Login'}
        </Link>
      </div>
    </Form>
  )
}
