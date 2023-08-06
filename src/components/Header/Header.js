import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import logo from "../../images/logo.svg";
import "./Header.css";

function Header({ isLanding }) {
  return (
    <header className={`header ${isLanding ? 'header_landing' : ''}`}>
    <Link to='/'>
      <img src={logo} alt="Логотип" className="header__logo" />
    </Link>
    <Navigation isLanding={isLanding} />
  </header>
  );
}

export default Header;
