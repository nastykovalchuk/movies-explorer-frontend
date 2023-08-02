import React from "react";
import { Link } from "react-router-dom";
import AuthForm from './../AuthForm/AuthForm';
import logo from "../../../images/logo.svg";
import "../Authentication.css";

function Register() {
  return (
    <main className="auth">
      <img src={logo} alt="Лого" className="auth__logo" />
      <h2 className="auth__header">Добро пожаловать!</h2>
      <AuthForm buttonText={"Зарегистрироваться"} isNotValid>
        <>
          <label className="auth__label">Имя</label>
          <input type="text" className="auth__input" required  minLength={2} maxLength={30} />
        </>
      </AuthForm>
      <p className="auth__subtext">
        Уже зарегистрированы?
        <Link to="/signin" className="auth__link">Войти</Link>
      </p>
    </main>
  );
}

export default Register;
