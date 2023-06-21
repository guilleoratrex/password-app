import axios from 'axios'
import React, { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PasswordScreen = ({ code }) => {

  const [status, setStatus] = useState('Aceptar')
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

    setStatus('Enviando ...')

    axios
      .post('http://localhost:1337/api/auth/reset-password', {
        code: formState.validationCode,
        password: formState.password,
        passwordConfirmation: formState.repeatPassword,
      })
      .then(() => {
        setStatus('Guardado!')
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
        <h1>Crea una contraseña nueva</h1>
        <p>La contraseña debe contener mínimo 8 caracteres: una mayúscula, una minúscula y un número</p>
      </div>
      <form onSubmit={handleSubmit} className='flex-container column justify-center'>

        <div className='input-container'>
          <label htmlFor="password">Introduce una contraseña nueva</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            value={formState.password}
            onChange={handleInputChange}
            placeholder='Nueva contraseña'
            disabled={status !== 'Aceptar'}
          />
          <i className='toggle-password'>
            <FontAwesomeIcon icon={!showPassword ? faEye : faEyeSlash} onClick={handleShowPassword} />
          </i>
        </div>


        <div className='input-container'>
          <label htmlFor="repeatPassword">Introduce de nuevo la contraseña</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name='repeatPassword'
            value={formState.repeatPassword}
            onChange={handleInputChange}
            placeholder='Repite nueva contraseña'
            disabled={status !== 'Aceptar'}
          />
          <i className='toggle-password'>
            <FontAwesomeIcon icon={!showPassword ? faEye : faEyeSlash} onClick={handleShowPassword} />
          </i>
        </div>

        <button type='submit'
          disabled={status !== 'Aceptar' ? true : false}
          className={status === 'Enviando...' ? 'btn-disabled' : ''}
        >
          Aceptar
        </button>
      </form>

      {
        status === 'Guardado!' &&
        <>
          <p className='text-center'>Se ha creado correctamente la nueva contraseña</p>
          <p className='text-center'>¡Ya puedes acceder de nuevo a tu cuenta!</p >
        </>
      }

      {
        error &&
        <p className='text-center'>{error}</p>
      }
    </>
  )
}
