import React, { useEffect, useState } from "react";
import Header from './../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import Footer from './../Footer/Footer';
import './SavedMovies.css'
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";
import { ERROR_MESSAGE, SHORT_MOVIE_DURATION_IN_MINUTES } from "../../utils/constants";

function SavedMovies( {message, setMessage, handleSearchSubmit} ) {

  const [sourceMovies, setSourceMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedSearch, setSavedSearch] = useState({ searchQuery: '', shorts: false });
  const [isLoading, setIsLoading] = useState(false);

  const filterMovies = (search, films) => {
    setSavedSearch(search);
    setFilteredMovies(films.filter((movie) => {
      const isValidName = movie.nameEN.toLowerCase().includes(search.searchQuery.toLowerCase()) || movie.nameRU.toLowerCase().includes(search.searchQuery.toLowerCase());
      return search.shorts ? (isValidName && movie.duration <= SHORT_MOVIE_DURATION_IN_MINUTES) : isValidName;
    }))
  }

  useEffect(() => {
    filterMovies(savedSearch, sourceMovies)
  }, [savedSearch]);

  useEffect(() => {
    setIsLoading(true);
    mainApi.getSavedMovies()
      .then((serverMovies) => {
        setSourceMovies(serverMovies);
        filterMovies(savedSearch, serverMovies);
      })
      .catch((err) => {
        setMessage(ERROR_MESSAGE);
      })
      .finally(()=>{
        setIsLoading(false);
      });
  }, [])

  const onClickRemove = (movie) =>{
    mainApi.deleteMovie(movie._id)
    .then(() => {
      const updateMovies = sourceMovies.filter((item) => item._id !== movie._id)
      setSourceMovies(updateMovies);
      filterMovies(savedSearch, updateMovies);
    })
    .catch((err) => {
      console.log(err);
    })}

  return (
    <>
      <Header/>
      <main className="savedMovies">
        <SearchForm savedSearch={savedSearch} setSavedSearch={setSavedSearch} handleSearchSubmit={handleSearchSubmit}/>
        {isLoading ? <Preloader /> :
          <MoviesCardList message={message} toDelete={true} currentMovies={filteredMovies} onClickUpdate={onClickRemove} />
        }
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
