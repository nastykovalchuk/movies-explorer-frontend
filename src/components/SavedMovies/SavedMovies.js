import React, { useEffect, useState } from "react";
import Header from './../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import Footer from './../Footer/Footer';
import './SavedMovies.css'
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";
import { SHORT_MOVIE_DURATION_IN_MINUTES } from "../../utils/constants";

function SavedMovies({ allMovies, setAllMovies, message, handleSearchSubmit, isLoading }) {

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedSearch, setSavedSearch] = useState({ searchQuery: '', shorts: false });

  const filterMovies = (search, movies) => {
    setSavedSearch(search);
    setFilteredMovies(movies.filter((movie) => {
      const isValidName = movie.nameEN.toLowerCase().includes(search.searchQuery.toLowerCase()) || movie.nameRU.toLowerCase().includes(search.searchQuery.toLowerCase());
      if (movie.isSaved){
        return search.shorts ? (isValidName && movie.duration <= SHORT_MOVIE_DURATION_IN_MINUTES) : isValidName;
      }
    }))
  }

  useEffect(() => {
    filterMovies(savedSearch, allMovies)
  }, [savedSearch, allMovies]);

  const onClickRemove = (movie) =>{
    mainApi.deleteMovie(movie._id)
    .then(() => {
      delete movie._id;
      movie.isSaved = false;
      setAllMovies((state) => state.map((item) => item.id === movie.id ? movie : item));
      localStorage.setItem('movies', JSON.stringify(allMovies));
      filterMovies(savedSearch, movie);
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
