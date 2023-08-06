import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section className="techs">
      <h2 className="techs__header">Технологии</h2>
      <h3 className="techs__subheader">7 технологий</h3>
      <p className="techs__text">
        На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые
        применили в&nbsp;дипломном проекте.
      </p>
      <ul className="techs__cards">
        <li className="techs__card">HTML</li>
        <li className="techs__card">CSS</li>
        <li className="techs__card">JS</li>
        <li className="techs__card">React</li>
        <li className="techs__card">Git</li>
        <li className="techs__card">Express.js</li>
        <li className="techs__card">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
