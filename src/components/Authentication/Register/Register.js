import React from "react";
import { Link } from "react-router-dom";
import AuthForm from './../AuthForm/AuthForm';
import logo from "../../../images/logo.svg";
import { useFormWithValidation } from "../../../hooks/useFormWithValidation";
import "../Authentication.css";

function Register({ handleSignup, message, isLoading }) {

  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
      handleSignup({
        name: values.name,
        email: values.email,
        password: values.password,
      });
  }

  return (
    <main className="auth">
      <section className="auth__wrapper">
      <Link to='/'>
        <img src={logo} alt="Логотип" className="auth__logo" />
      </Link>
      <h1 className="auth__header">Добро пожаловать!</h1>
      <AuthForm buttonText={"Зарегистрироваться"} handleSubmit={handleSubmit} disabled={!isValid || isLoading}>
        <>
          <label  className="auth__label">Имя</label>
          <input type="text" name="name" onChange={handleChange} placeholder="Имя пользователя" className={`auth__input ${errors["name"] !== "" ? "auth__input_error" : ""}`} required minLength={2} maxLength={30} pattern="[а-яА-ЯёЁa-zA-Z0-9\s\-]+$"
              title="Русские или латинские буквы, цифры, пробел, дефис" />
          <span className={`auth__input-error ${errors["name"] && "auth__input-error_visible"}`}>{errors["name"]}</span>
          <label className='auth__label'>E-mail</label>
          <input type="email" name="email" onChange={handleChange} className={`auth__input ${errors["email"] !== "" ? "auth__input_error" : ""}`} placeholder='example@domain.com' required />
          <span className={`auth__input-error ${errors["email"] && "auth__input-error_visible"}`}>{errors["email"]}</span>
          <label className='auth__label'>Пароль</label>
          <input type="password" name="password" onChange={handleChange} className={`auth__input ${errors["password"] !== "" ? "auth__input_error" : ""}`} placeholder='••••••••••••••' minLength={6} maxLength={60} required />
          <span className={`auth__input-error ${errors["password"] && "auth__input-error_visible"}`}>{errors["password"]}</span>
          <span className={`auth__prompt-error ${message ? "auth__prompt-error_active" : ""}`}>{message}</span>
        </>
      </AuthForm>
      </section>
      <p className="auth__subtext">
        Уже зарегистрированы?
        <Link to="/signin" className="auth__link">Войти</Link>
      </p>
    </main>
  );
}

export default Register;
