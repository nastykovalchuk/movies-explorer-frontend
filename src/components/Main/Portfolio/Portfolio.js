import React from 'react'
import arrowIcon from '../../../images/slash-arrow-icon.svg'
import './Portfolio.css'

function Portfolio() {
  return (
    <section className='portfolio'>
    <h2 className='portfolio__header'>Портфолио</h2>
    <ul className='portfolio__items'>
      <li className='portfolio__item'>
        <a className='portfolio__link' href='https://github.com/nastykovalchuk/how-to-learn' target="_blank" rel="noopener noreferrer">
          <h3 className='portfolio__item-name'>Статичный сайт</h3>
          <img alt='переход по ссылке' src={arrowIcon} className='portfolio__button'/>
        </a>
      </li>
      <li className='portfolio__item'>
        <a className='portfolio__link' href='https://github.com/nastykovalchuk/russian-travel' target="_blank" rel="noopener noreferrer">
          <h3 className='portfolio__item-name'>Адаптивный сайт</h3>
          <img alt='переход по ссылке' src={arrowIcon} className='portfolio__button'/>
        </a>
      </li>
      <li className='portfolio__item'>
        <a className='portfolio__link' href='https://github.com/nastykovalchuk/react-mesto-auth' target="_blank" rel="noopener noreferrer">
          <h3 className='portfolio__item-name'>Одностраничное приложение</h3>
          <img alt='переход по ссылке' src={arrowIcon} className='portfolio__button'/>
        </a>
      </li>
    </ul>
  </section>
  )
}

export default Portfolio