import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import profileIcon from "../../images/profile-icon.svg";
import "./Navigation.css";

function Navigation() {
  const [isBurgerMenuOpen, setBurgerIsOpen] = useState(false);
  const {pathname} = useLocation();

  return (
    <>
      {!JSON.parse(sessionStorage.getItem("loggedIn")) ? (
        <nav className="navigation">
          <ul className="navigation__list navigation__list_landing">
            <li><Link to="/signup" className="navigation__link navigation__link_landing">Регистрация</Link></li>
            <li className="navigation__button-container"><Link to="/signin" className="navigation__button">Войти</Link></li>
          </ul>
        </nav>
      ) : (
        <div className="navigation">
          <nav className={`navigation__movies ${isBurgerMenuOpen ? "visible" : ""}`}>
            <ul className="navigation__list">
              {isBurgerMenuOpen && (<li><Link to="/" className={`navigation__link ${pathname === '/' ? 'active' : '' }`}>Главная</Link></li>)}
              <li><NavLink to="/movies" className={`navigation__link ${pathname === '/movies' ? 'active' : '' }`}>Фильмы</NavLink></li>
              <li><NavLink to="/saved-movies"  className={`navigation__link ${pathname === '/saved-movies' ? 'active' : '' }`}>Сохранённые фильмы</NavLink></li>
            </ul>
            <ul className="navigation__profile">
              <li><Link to="/profile" className={`navigation__profile-link ${pathname === '/profile' ? 'active' : '' }`} >Аккаунт</Link></li>
              <li>
                <Link to="/profile" className="navigation__link">
                  <div className="navigation__icon-container">
                    <img src={profileIcon} alt="Иконка профиля" />
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
           <button type='button' className={`navigation__burger-button ${isBurgerMenuOpen ? "navigation__burger-button_active" : ""}`} onClick={() => setBurgerIsOpen(!isBurgerMenuOpen)}/>
          <div className={`navigation__overlay ${isBurgerMenuOpen ? "visible" : ""}`}/>
        </div>
      )}
    </>
  );
}

export default Navigation;
