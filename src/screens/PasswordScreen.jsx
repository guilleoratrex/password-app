import axios from 'axios'
import React, { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTranslation } from 'react-i18next'

export const PasswordScreen = ({ code }) => {

  const { t } = useTranslation('common')

  const [status, setStatus] = useState(`${t('password-screen.status.accept')}`)
  const [error, setError] = useState()
  const [formState, setFormState] = useState({
    validationCode: code,
    password: '',
    repeatPassword: ''
  })

  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validatePassword(formState.password)) {
      setError(`${t('password-screen.error.password-error')}`)
      return
    }

    setStatus(`${t('password-screen.status.sending')}`)

    axios
      .post('http://localhost:1337/api/auth/reset-password', {
        code: formState.validationCode,
        password: formState.password,
        passwordConfirmation: formState.repeatPassword,
      })
      .then(() => {
        setStatus(`${t('password-screen.status.sent')}`)
        setError('')
      })
      .catch(error => {
        console.log(error)
        setStatus(`${t('password-screen.status.accept')}`)
        setError(`${t('password-screen.error.generic-error')}`)
      })
  }

  const validatePassword = (password) => {
    const res = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return res.test(password)
  }

  return (
    <>
      <div className='flex-container column justify-center align-center text-center'>
        <h1>{t('password-screen.title')}</h1>
        <p>{t('password-screen.instruction')}</p>
      </div>
      <form onSubmit={handleSubmit} className='flex-container column justify-center'>

        <div className='input-container'>
          <label htmlFor="password">{t('password-screen.label.l-1')}</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            value={formState.password}
            onChange={handleInputChange}
            placeholder={t('password-screen.placeholder.p-1')}
            disabled={status !== `${t('password-screen.status.accept')}`}
          />
          <i className='toggle-password'>
            <FontAwesomeIcon icon={!showPassword ? faEye : faEyeSlash} onClick={handleShowPassword} />
          </i>
        </div>


        <div className='input-container'>
          <label htmlFor="repeatPassword">{t('password-screen.label.l-2')}</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name='repeatPassword'
            value={formState.repeatPassword}
            onChange={handleInputChange}
            placeholder={t('password-screen.placeholder.p-2')}
            disabled={status !== `${t('password-screen.status.accept')}`}
          />
          <i className='toggle-password'>
            <FontAwesomeIcon icon={!showPassword ? faEye : faEyeSlash} onClick={handleShowPassword} />
          </i>
        </div>

        <button type='submit'
          disabled={status !== `${t('password-screen.status.accept')}` ? true : false}
          className={status === `${t('password-screen.status.sending')}` ? 'btn-disabled' : ''}
        >
          {status}
        </button>
      </form>

      {
        status === `${t('password-screen.status.sent')}` &&
        <>
          <p className='text-center'>{t('password-screen.success.m-1')}</p>
          <p className='text-center'>{t('password-screen.success.m-2')}</p >
        </>
      }

      {
        error &&
        <p className='text-center error'>{error}</p>
      }
    </>
  )
}
