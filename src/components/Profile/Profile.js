import React, { useContext, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import CurentUserContext from "../../context/CurrentUserContext";
import Header from './../Header/Header';
import './Profile.css'
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Profile({ handleUpdateUser, handleLogout, profileResponse }) {

  const currentUser = useContext(CurentUserContext);

  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const inputName = useRef(null);
  const inputEmail = useRef(null);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  useEffect(() => {
    inputName.current.value = values.name;
    inputEmail.current.value = values.email;
  }, [values]);

  const isMatchesValue = values.name === currentUser.name && values.email === currentUser.email;

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUser({
        name: values.name,
        email: values.email,
      });
  }

  return (
    <>
      <Header/>
      <main className="profile">
        <h1 className="profile__greeting">Привет, {currentUser.name}!</h1>
        <form className="profile__form" onSubmit={handleSubmit}>
          <fieldset className="profile__fieldset">
            <p className="profile__input-name">Имя</p>
            <input
              className="profile__input"
              name="name"
              type="text"
              required
              ref={inputName}
              onChange={handleChange}
              placeholder="Имя"
              minLength="2"
              maxLength="30"
              pattern="[а-яА-ЯёЁa-zA-Z0-9\s\-]+$"
              title="Русские или латинские буквы, цифры, пробел, дефис"
            />
            <span className={`profile__input-error ${errors["name"] && "profile__input-error_visible"}`}>{errors["name"]}</span>
          </fieldset>
          <fieldset className="profile__fieldset">
            <p className="profile__input-name">E-mail</p>
            <input
              className="profile__input"
              name="email"
              type="email"
              required
              ref={inputEmail}
              onChange={handleChange}
              placeholder="Электронная почта"
            />
            <span className={`profile__input-error ${errors["email"] && "profile__input-error_visible"}`}>{errors["email"]}</span>
          </fieldset>
          <span className={`profile__prompt ${profileResponse ? "profile__prompt_active" : ""}`}>{profileResponse}</span>
          <button className="profile__button" type="submit" disabled={isMatchesValue || !isValid}>
            Редактировать
          </button>
          <Link className="profile__logout" onClick={handleLogout} to="/signin"> Выйти из аккаунта </Link>
        </form>
      </main>
    </>
  );
}

export default Profile;
