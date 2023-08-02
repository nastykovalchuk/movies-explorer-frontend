import React from 'react'
import studentImage from '../../../images/student.png'
import './AboutMe.css'

function AboutMe() {
  return (
    <section className='student'>
    <h3 className='student__header'>Студент</h3>
    <div className='student__info'>
      <div className='student__text'>
        <h4 className='student__name'>Анастасия</h4>
        <h5 className='student__title'>Фронтенд-разработчик, 30 лет</h5>
        <p className='student__about'>Я родилась и живу в Орле, закончила художественно-графический факультет ОГУ. У меня есть дочь.
        Я люблю слушать музыку, а ещё увлекаюсь рисованием. Недавно начала кодить. С 2018 года работаю в компании «Телеконтакт».
        После того, как прошла курс по веб-разработке, планирую начать заниматься фриланс-заказами и уйти с постоянной работы.</p>
        <a className='student__link' href='https://github.com/nastykovalchuk'>GitHub</a>
      </div>
      <img className='student__image' src={studentImage} alt='Фото студента' />
    </div>
  </section>
  )
}

export default AboutMe