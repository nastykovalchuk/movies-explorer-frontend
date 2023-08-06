import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
    <p className="footer__text">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</p>
    <div className="footer__content">
      <p className="footer__year">© {new Date().getFullYear()}</p>
        <ul className="footer__links">
          <li><a className="footer__link" href="https://practicum.yandex.ru/profile/web/" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a></li>
          <li><a className="footer__link" href="https://github.com/" target="_blank" rel="noopener noreferrer">Github</a></li>
        </ul>
    </div>
  </footer>
  )
}

export default Footer