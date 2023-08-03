import React from "react";
import Header from './../Header/Header';
import Footer from './../Footer/Footer';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import './Movies.css'

function Movies() {
  return (
    <>
      <Header colorScheme={{ isWhite: true }} />
      <main>
        <SearchForm />
        <MoviesCardList toDelete={false} />
        <section className="more">
          <button type='button' className="more__button">Ещё</button>
         </section>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
