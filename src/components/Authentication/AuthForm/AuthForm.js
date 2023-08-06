import React from 'react'
import './AuthForm.css'

function AuthForm({ children, buttonText, isNotValid }) {
  return (
    <form className='auth__form'>
    {children}
    <label className='auth__label'>E-mail</label>
    <input type="email" className='auth__input' placeholder='example@domain.com' required pattern="[^@\s]+@[^@\s]+\.[^@\s]+" />
    <label className='auth__label'>Пароль</label>
    <input type="password" className={`auth__input ${isNotValid ? "auth__input_error": ""}`} placeholder='••••••••••••••' minLength={5} maxLength={60} required />
    <span className={`auth__prompt-error ${isNotValid ? "auth__prompt-error_active" : ""}`}>Что-то пошло не так...</span>
    <button type='submit' className='auth__button'>
      {buttonText}
    </button>
  </form>
  )
}

export default AuthForm
