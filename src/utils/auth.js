import { redirect } from 'react-router-dom'

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
  console.log('TOKEN LOADER', request)

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
  console.log(token, isVerified)

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
