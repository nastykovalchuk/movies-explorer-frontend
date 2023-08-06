import React from "react";
import { Link } from "react-router-dom";
import AuthForm from './../AuthForm/AuthForm';
import logo from "../../../images/logo.svg";
import '../Authentication.css'

function Login() {
  return (
    <main className="auth">
      <section className="auth__wrapper">
      <Link to='/'>
        <img src={logo} alt="Логотип" className="auth__logo" />
      </Link>
      <h1 className="auth__header">Рады видеть!</h1>
      <AuthForm buttonText={"Войти"} />
      </section>
      <p className="auth__subtext">
        Ещё не зарегистрированы?
        <Link to="/signup" className="auth__link">Регистрация</Link>
      </p>
    </main>
  );
}

export default Login;
