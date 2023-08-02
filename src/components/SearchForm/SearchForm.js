import React from "react";
import './SearchForm.css'
import FilterCheckbox from './../FilterCheckbox/FilterCheckbox';

function SearchForm() {

  const onFocus = (e) => {
    e.target.placeholder = "";
  };

  const onBlur = (e) => {
    e.target.placeholder = "Фильм";
  };

  return (
    <form className="search-form">
      <fieldset className="search-form__fieldset-search">
        <input
          className="search-form__input"
          placeholder="Фильм"
          type="text"
          required
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <button type="submit" className="search-form__button">Найти</button>
      </fieldset>
      <fieldset className="search-form__fieldset-toggle">
        <FilterCheckbox state={true} />
        <span className="search-form__toggle-text">Короткометражки</span>
      </fieldset>
    </form>
  );
}

export default SearchForm;
