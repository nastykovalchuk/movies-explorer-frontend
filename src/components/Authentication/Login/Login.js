import React from "react";
import { Link } from "react-router-dom";
import AuthForm from './../AuthForm/AuthForm';
import logo from "../../../images/logo.svg";
import '../Authentication.css'

function Login() {
  return (
    <main className="auth">
      <img src={logo} alt="Лого" className="auth__logo" />
      <h2 className="auth__header">Рады видеть!</h2>
      <AuthForm buttonText={"Войти"} />
      <p className="auth__subtext">
        Ещё не зарегистрированы?
        <Link to="/signup" className="auth__link">Регистрация</Link>
      </p>
    </main>
  );
}

export default Login;
