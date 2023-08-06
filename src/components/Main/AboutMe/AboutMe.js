import React from "react";
import studentImage from "../../../images/student.png";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="student">
      <h2 className="student__header">Студент</h2>
      <div className="student__info">
        <div className="student__text">
          <h3 className="student__name">Виталий</h3>
          <h4 className="student__title">Фронтенд-разработчик, 30 лет</h4>
          <p className="student__about">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className="student__link" target={"_blank"} rel="noopener noreferrer" href="https://github.com/nastykovalchuk?tab=repositories">
            Github
          </a>
        </div>
        <img className="student__image" src={studentImage} alt="Фото студента" />
      </div>
    </section>
  );
}

export default AboutMe;
