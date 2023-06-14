import React from 'react';
import { Form, redirect, json, useActionData, useLocation, Link } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

export const authAction = async ({ params, request }) => {
  let searchParams = new URL(request.url).searchParams;
  // let isLogin = searchParams.get('mode') === 'login';
  let mode = searchParams.get('mode') === 'login' ? 'login' : 'signup';

  let formData = await request.formData();
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  if (formData.get('name')) {
    data.name = formData.get('name');
  }

  const errors = {};

  // validate the fields
  if (typeof data.email !== "string" || !data.email.includes("@")) {
    errors.email =
      "That doesn't look like an email address";
  }

  if (typeof data.password !== "string" || data.password.length < 6) {
    errors.password = "Password must be > 6 characters";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  let response;
  response = await fetch('http://localhost:8080/' + mode, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })

  const resData = await response.json();

  if (response.status === 422 || response.status === 401) {
    return resData;
    // return resData.serverErrors;
  }
  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 })
  }

  const token = resData.token;
  localStorage.setItem('token', token);
  const expiration = new Date().getTime() + 60 * 60 * 1000;
  localStorage.setItem('token-duration', new Date(expiration).toISOString());
  const name = resData.user.name;
  localStorage.setItem('name', name);

  // otherwise create the user and redirect
  return redirect("/");
}

const AuthPage = () => {

  let data = useActionData();
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let isLogin = searchParams.get('mode') === 'login';
  // let mode = searchParams.get('mode') === 'login' ? 'login' : 'signup';
  return (
    <>
      <Form method="post">
      {data?.serverError && <div>{data.serverError}</div>}

        <label htmlFor='email'>Email</label>
        <input id="email" name="email"></input>
        {data?.errors?.email && <div>{data.errors.email}</div>}
        {data?.serverErrors?.email && <div>{data.serverErrors.email}</div>}
        {/* {errors[0]?.email && <div>{errors[0].email}</div>} */}
        {/* {serverErrors?.email && <div>{serverErrors.email}</div>} */}
        <label htmlFor='password'>Password</label>

        <input id="password" name="password"></input>
        {data?.errors?.password && <div>{data.errors.password}</div>}
        {data?.serverErrors?.password && <div>{data.serverErrors.password}</div>}
        {!isLogin &&
          <>
            <label htmlFor='name'>Name</label>
            <input id="name" name="name"></input>
          </>
        }
        <div>
        <button>{isLogin ? 'Login' : 'Sign up'}</button>
        <Link  className='' to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Sign up' : 'Login'}
          </Link>
        </div>
      </Form>
    </>
  )
}

export default AuthPage;