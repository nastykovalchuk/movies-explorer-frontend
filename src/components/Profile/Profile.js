import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Header from './../Header/Header';
import './Profile.css'

function Profile() {
  const [userName, setUserName] = useState("Анастасия");
  const [userEmail, setUserEmail] = useState("pochta@yandex.ru");

  return (
    <>
      <Header colorScheme={{ isWhite: true }} />
      <main className="profile">
        <h2 className="profile__greeting">Привет, {userName}!</h2>
        <form className="profile__form">
          <fieldset className="profile__fieldset">
            <p className="profile__input-name">Имя</p>
            <input
              className="profile__input"
              type="text"
              required
              value={userName || ""}
              placeholder="Имя"
              onChange={(e) => setUserName(e.target.value) }
            />
          </fieldset>
          <fieldset className="profile__fieldset">
            <p className="profile__input-name">E-mail</p>
            <input
              className="profile__input"
              type="text"
              required
              value={userEmail || ""}
              placeholder="Электронная почта"
              onChange={(e) => setUserEmail(e.target.value) }
            />
          </fieldset>
          <button className="profile__button" type="submit">
            Редактировать
          </button>
          <Link className="profile__logout" to="/signin"> Выйти из аккаунта </Link>
        </form>
      </main>
    </>
  );
}

export default Profile;
