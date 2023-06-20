import axios from 'axios'
import React, { useState } from 'react'

export const EmailScreen = () => {

  const [status, setStatus] = useState('Aceptar')
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

    setStatus('Enviando ...')

    axios.post('http://localhost:1337/api/auth/forgot-password', formState)
      .then(() => {
        setStatus('Enviado!')
        setError('')
      })
      .catch(error => {
        console.log(error)
        setStatus('Aceptar')
        setError('Ha habido un problema. Por favor, inténtalo de nuevo')
      })
  }

  return (
    <>
      <div className='flex-container column justify-center align-center text-center'>
        <h1>¿Olvidaste la contraseña?</h1>
        <p className='text-center'>Introduce tu dirección de email y te enviaremos un código para poder crear una nueva contraseña.</p>
      </div>
      <form onSubmit={handleSubmit} className='flex-container column justify-center'>
        <label htmlFor="email">Introduce tu email</label>
        <input
          type='text'
          name='email'
          value={formState.email}
          onChange={handleInputChange}
          placeholder='Email'
        />

        <button type='submit'
          disabled={status !== 'Aceptar' ? true : false}
          className={status === 'Enviando...' ? 'btn-disabled' : ''}
        >
          {status}
        </button>
      </form>

      {
        status === 'Enviado!' &&
        <>
          <p className='text-center'>Hemos enviado un email a <span className='text-bold'>{formState.email}</span></p>
          <p className='text-center'>Revisa tu bandeja de entrada y sigue las instrucciones para crear una nueva contraseña.</p >
        </>
      }

      {
        error &&
        <p className='text-center'>{error}</p>
      }
    </>
  )
}
