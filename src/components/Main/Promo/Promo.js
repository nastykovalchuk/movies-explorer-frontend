import React from 'react'
import promoIogo from '../../../images/landing-logo.svg'
import './Promo.css'

function Promo() {
  return (
    <section className="promo">
    <h2 className="promo__header">Учебный проект студента факультета Веб&#8209;разработки.</h2>
    <div className='promo__image-wrapper'>
      <img className="promo__image" src={promoIogo} alt="Логотип" />
    </div>
  </section>
  )
}

export default Promo