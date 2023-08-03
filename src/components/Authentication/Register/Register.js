import React from "react";
import { Link } from "react-router-dom";
import AuthForm from './../AuthForm/AuthForm';
import logo from "../../../images/logo.svg";
import "../Authentication.css";

function Register() {
  return (
    <main className="auth">
      <section className="auth__wrapper">
      <Link to='/'>
        <img src={logo} alt="Логотип" className="auth__logo" />
      </Link>
      <h1 className="auth__header">Добро пожаловать!</h1>
      <AuthForm buttonText={"Зарегистрироваться"} isNotValid>
        <>
          <label className="auth__label">Имя</label>
          <input type="text" placeholder="Имя пользователя" className="auth__input" required  minLength={2} maxLength={30} />
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
