import React from "react";
import { Link } from 'react-router-dom';
import './NotFound.css'

function NotFound() {
  return (
    <main className="not-found-page">
      <h2 className="not-found-page__header">404</h2>
      <p className="not-found-page__text">Страница не найдена</p>
      <Link className="not-found-page__link" to={-1}>Назад</Link>
    </main>
  );
}

export default NotFound;
