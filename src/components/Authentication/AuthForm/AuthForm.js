import React from 'react'
import './AuthForm.css'

function AuthForm({ children, buttonText, handleSubmit, disabled }) {
  return (
    <form className='auth__form' onSubmit={handleSubmit}>
    {children}
    <button type='submit' className='auth__button' disabled={disabled}>
      {buttonText}
    </button>
  </form>
  )
}

export default AuthForm
