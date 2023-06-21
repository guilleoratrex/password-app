import axios from 'axios'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const EmailScreen = () => {

  const { t } = useTranslation('common')

  const [status, setStatus] = useState(`${t('email-screen.status.accept')}`)
  const [error, setError] = useState()
  const [formState, setFormState] = useState({
    email: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormState({
      ...formState,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setStatus(`${t('email-screen.status.sending')}`)

    axios.post('http://localhost:1337/api/auth/forgot-password', formState)
      .then(() => {
        setStatus(`${t('email-screen.status.sent')}`)
        setError('')
      })
      .catch(error => {
        console.log(error)
        setStatus(`${t('email-screen.status.accept')}`)
        setError(`${t('email-screen.error')}`)
      })
  }

  return (
    <>
      <div className='flex-container column justify-center align-center text-center'>
        <h1>{t('email-screen.title')}</h1>
        <p className='text-center'>{t('email-screen.instruction')}</p>
      </div>
      <form onSubmit={handleSubmit} className='flex-container column justify-center'>
        <label htmlFor="email">{t('email-screen.label')}</label>
        <input
          type='email'
          name='email'
          value={formState.email}
          onChange={handleInputChange}
          placeholder='Email'
          disabled={status !== `${t('email-screen.status.accept')}`}
        />

        <button type='submit'
          disabled={status !== `${t('email-screen.status.accept')}` ? true : false}
          className={status === `${t('email-screen.status.sending')}` ? 'btn-disabled' : ''}
        >
          {status}
        </button>
      </form>

      {
        status === `${t('email-screen.status.sent')}` &&
        <>
          <p className='text-center'>{t('email-screen.success.m-1')} <span className='text-bold'>{formState.email}</span></p>
          <p className='text-center'>{t('email-screen.success.m-2')}</p >
        </>
      }

      {
        error &&
        <p className='text-center error'>{error}</p>
      }
    </>
  )
}
