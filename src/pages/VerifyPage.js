import React, { useEffect, useState } from 'react'
import { useActionData } from 'react-router-dom'

export const VerifyPage = () => {
  const [isVerified, setIsVerified] = useState(false)
  let data = useActionData() || null
  console.log(data)
  useEffect(() => {
    const fetchVerificationData = async () => {
      let searchParams = new URL(window.location.href).searchParams //request.url
      console.log('searchParams', searchParams.get('token'))
      try {
        const response = await fetch(
          encodeURI(
            'http://localhost:8080/verify?token=' + searchParams.get('token')
          )
        )
        const token = await response.json()
        console.log(token.isVerified)
        setIsVerified(token.isVerified)
      } catch (error) {
        console.log(error)
      }
    }
    fetchVerificationData()
  }, [])

  if (isVerified) {
    return (
      <div>
        Great news, your email has been verified! <a href='#'>Login</a>
      </div>
    )
  }
  return (
    <div>
      WRONG :( The verification link might be wrong or too old. Try once again
      to sign up. <a href='#'>Sign up</a>
    </div>
  )
}
