import { redirect, json } from 'react-router-dom'
import { smtpexpressClient } from '../utils/smtp'

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('token-expiration')
  const expirationDate = new Date(storedExpirationDate)
  const currentDate = new Date()
  const duration = expirationDate.getTime() - currentDate.getTime()
  return duration
}

export function getAuthToken() {
  const token = localStorage.getItem('token')

  if (!token) {
    return null
  }

  const tokenDuration = getTokenDuration()

  if (tokenDuration < 0) {
    return 'EXPIRED'
  }

  return token
}

export async function tokenLoader({ request }) {
  const token = getAuthToken()

  if (token) {
    // let searchParams = new URL(request.url).searchParams;
    // if (searchParams.get('mode')) {
    //   return redirect("/");
    // }
    return token
  }
  return null
}

export function checkAuthLoader() {
  const token = getAuthToken()

  if (!token) {
    return redirect('/auth')
  }
}

export function isLoggedIn() {
  const token = localStorage.getItem('token')
  if (!token) {
    return false
  }

  const isVerified = localStorage.getItem('isVerified')
  if (!/^true$/i.test(isVerified)) {
    return false
  }

  const tokenDuration = getTokenDuration()

  if (tokenDuration < 0) {
    return false
  }
  return true
}

export function getIsVerified() {
  const isVerified = localStorage.getItem('isVerified')
  if (!/^true$/i.test(isVerified)) {
    return false
  }
  return true
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
  response = await fetch(process.env.REACT_APP_BACKEND_URL + mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const resData = await response.json()

  if (response.status === 422 || response.status === 401) {
    return resData // Server errors
  }
  if (!response.ok) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 })
  }

  if (mode === 'signup') {
    sendEmail(data.name, resData.emailURL, data.email)

    return { email: data.email, verifyEmailModalShow: true }
  }

  // Login
  const token = resData.token
  localStorage.setItem('token', token)
  const expiration = new Date().getTime() + 60 * 60 * 1000
  localStorage.setItem('token-expiration', new Date(expiration).toISOString())
  localStorage.setItem('isVerified', resData.user.isVerified)
  localStorage.setItem('name', resData.user.name)
  localStorage.setItem('userId', resData.user.id)

  if (resData.user.isVerified) {
    return redirect('/') // Go to dashboard
  }
  return {
    // Show modal
    verificationPending: true,
    verificationError:
      'Verification pending! You have to verify your account via the link we sent to your email!',
    verifyEmailModalShow: false,
  }
}

const sendEmail = async (userName, emailURL, email) => {
  try {
    await smtpexpressClient.sendApi.sendMail({
      subject: 'Welcome to My Task Manager: Email verification',
      message: `<h2 style="font-size: .9rem;">Welcome ${userName} 🎉 </h2><p style="font-size: .9rem;">Before you go out and play on My Task Manager, please verify your email address. To do this you just have to click on the button bellow.</p><p style="font-size: .9rem;">If you did not create a My Task Manager account using this address, please contact us at example@mytaskmanager.com.</p><a href="${emailURL}" target="_blank" style="background:black;color:white;text-decoration: none;display: block;width: fit-content;border-radius: .5rem;margin: 2rem auto;padding: .5rem 1.2rem;font-size: .9rem;">Verify your account</a><hr style="margin: 2rem 0 .5rem;"><div style="text-align: center;font-size: 12px;">© 2024 My Task Manager</div>`,
      sender: {
        name: 'My Task Manager',
        email: 'sm0pid-3E2AdEaB2cI_Wd485D6nBlMnK@projects.smtpexpress.com',
      },
      recipients: {
        email: email,
      },
    })
    console.log('Email sent!')
  } catch (error) {
    console.error(error)
  }
}

export function logoutAction() {
  localStorage.removeItem('token')
  localStorage.removeItem('token-expiration')
  localStorage.removeItem('name')
  localStorage.removeItem('userId')
  localStorage.removeItem('isVerified')
  return redirect('/auth?mode=login')
}
