import React from "react";
import Header from './../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import Footer from './../Footer/Footer';
import './SavedMovies.css'

function SavedMovies() {
  return (
    <>
      <Header colorScheme={{ isWhite: true }} />
      <main className="savedMovies">
        <SearchForm />
        <MoviesCardList toDelete={true} />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
