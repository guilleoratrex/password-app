import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PasswordScreen } from './PasswordScreen'
import { EmailScreen } from './EmailScreen'

export const FormScreen = () => {

  const location = useLocation()

  const [code, setCode] = useState()

  useEffect(() => {
    setCode(new URLSearchParams(location.search).get('code'))
  }, [])

  return (
    <>
      {
        !code ? <EmailScreen /> : <PasswordScreen code={code} />
      }
    </>
  )
}
