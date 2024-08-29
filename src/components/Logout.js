import { redirect } from 'react-router-dom'

export function logoutAction() {
  localStorage.removeItem('token')
  localStorage.removeItem('token-expiration')
  localStorage.removeItem('name')
  localStorage.removeItem('userId')
  localStorage.removeItem('isVerified')
  return redirect('/auth?mode=login')
}

const Logout = () => {
  return <></>
}

export default Logout
