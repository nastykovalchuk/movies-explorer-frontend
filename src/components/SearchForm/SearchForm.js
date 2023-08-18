import React, { useState } from "react";
import FilterCheckbox from "./../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm({ setSavedSearch, savedSearch }) {

  const [isActive, setIsActive] = useState(savedSearch.shorts || false);
  const [searchQuery, setSearchQuery] = useState(savedSearch.searchQuery || "");
  const [errorQuery, setErrorQuery] = useState('');

  function heandlerChenge(e) {
    if (!e.target.value){
      setErrorQuery("Нужно ввести ключевое слово");
    } else {
      setErrorQuery("");
    }
    setSearchQuery(e.target.value);
  }

  function handlerSubmit(e) {
    e.preventDefault();
    setSavedSearch({ searchQuery: searchQuery, shorts: savedSearch.shorts });
  }

  function handlerClick() {
    if(isActive) {
      setIsActive(false);
      setSavedSearch({ searchQuery: savedSearch.searchQuery, shorts: false });
    } else {
      setIsActive(true);
      setSavedSearch({ searchQuery: savedSearch.searchQuery, shorts: true });
    }
  }

  const onFocus = (e) => {
    e.target.placeholder = "";
  };

  const onBlur = (e) => {
    e.target.placeholder = "Фильм";
  };

  return (
    <section>
      <form className="search-form" onSubmit={handlerSubmit}>
        <fieldset className="search-form__fieldset-search">
          <input
            onChange={heandlerChenge}
            value={searchQuery}
            className="search-form__input"
            placeholder="Фильм"
            type="text"
            onFocus={onFocus}
            onBlur={onBlur}
            required
          />
          <button type="submit" className="search-form__button">
            Найти
          </button>
          <span className="search-form__error">{errorQuery}</span>
        </fieldset>
        <fieldset className="search-form__fieldset-toggle">
          <FilterCheckbox state={isActive} onClick={handlerClick} />
          <span className="search-form__toggle-text">Короткометражки</span>
        </fieldset>
      </form>
    </section>
  );
}

export default SearchForm;
