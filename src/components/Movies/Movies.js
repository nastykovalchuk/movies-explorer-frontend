import React, { useEffect, useState } from "react";
import Header from './../Header/Header';
import Footer from './../Footer/Footer';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardList from './../MoviesCardList/MoviesCardList';
import mainApi from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";
import { BIG_TABLET_SCREEN_WIDTH, MOBILE_SCREEN_WIDTH, MORE_CARDS_FOR_BIG_TABLET, MORE_CARDS_FOR_DESKTOP, MORE_CARDS_FOR_MOBILE, MORE_CARDS_FOR_TABLET, NUMBER_OF_CARDS_FOR_BIG_TABLET, NUMBER_OF_CARDS_FOR_DESKTOP, NUMBER_OF_CARDS_FOR_MOBILE, NUMBER_OF_CARDS_FOR_TABLET, SHORT_MOVIE_DURATION_IN_MINUTES, TABLET_SCREEN_WIDTH } from "../../utils/constants";
import './Movies.css'

function Movies({ allMovies, setAllMovies, screenWidth, message, isLoading }) {

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [savedSearch, setSavedSearch] = useState(JSON.parse(
    localStorage.getItem('search') || '{ "searchQuery":"","shorts":false }'
  ));
  const [page, setPage] = React.useState(0);


  const moviesToRender = React.useMemo(() => {
    let countToRender = NUMBER_OF_CARDS_FOR_MOBILE;
    let cardToRender = MORE_CARDS_FOR_MOBILE;
    if (screenWidth > MOBILE_SCREEN_WIDTH){
      countToRender = NUMBER_OF_CARDS_FOR_TABLET;
      cardToRender = MORE_CARDS_FOR_TABLET;
    }
    if (screenWidth > TABLET_SCREEN_WIDTH){
      countToRender = NUMBER_OF_CARDS_FOR_BIG_TABLET;
      cardToRender = MORE_CARDS_FOR_BIG_TABLET;
    }
    if (screenWidth > BIG_TABLET_SCREEN_WIDTH){
      countToRender = NUMBER_OF_CARDS_FOR_DESKTOP;
      cardToRender = MORE_CARDS_FOR_DESKTOP;
    }

    return filteredMovies.slice(0, countToRender + page * cardToRender);
  }, [filteredMovies, page, screenWidth]);


  const handleMoreClick = React.useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const filterMovies = (search, movies) => {
    setSavedSearch(search);
    localStorage.setItem('search', JSON.stringify(search));
    if (!search.searchQuery){
      return [];
    }
    setFilteredMovies(movies.filter((movie) => {
      const isValidName = movie.nameEN.toLowerCase().includes(search.searchQuery.toLowerCase()) || movie.nameRU.toLowerCase().includes(search.searchQuery.toLowerCase());
      return search.shorts ? (isValidName && movie.duration <= SHORT_MOVIE_DURATION_IN_MINUTES) : isValidName;
    }));
  }

  useEffect(() => {
    filterMovies(savedSearch, allMovies);
  }, [savedSearch, allMovies]);

  useEffect(() => {
    const localSearch = localStorage.getItem('search');
    const localMovies = localStorage.getItem('movies');
    if(localSearch && localMovies){
      const parsedSearch = JSON.parse(localSearch);
      const parsedMovies = JSON.parse(localMovies);
      setAllMovies(parsedMovies);
      filterMovies(parsedSearch, parsedMovies);
    }
  }, []);

  const handleMovieLike = (movie) => {
    setAllMovies((state) => state.map((item) => item.id === movie.id ? movie : item));
    localStorage.setItem('movies', JSON.stringify(allMovies));
  }

  const onClickSaved = (movie) => mainApi.saveMovie(movie)
    .then((updateMovies) => {
      movie.isSaved = true;
      movie._id = updateMovies._id;
      handleMovieLike(updateMovies);
    })
    .catch((err) => {
      console.log(err)
    })

  const onClickRemove = (movie) => {
    mainApi.deleteMovie(movie._id)
    .then(() => {
      delete movie._id;
      movie.isSaved = false;
      handleMovieLike(movie);
    })
    .catch((err) => {
      console.log(err)
    })}

  const onClickUpdate = (movie) => (movie.isSaved ? onClickRemove(movie) : onClickSaved(movie))

  return (
    <>
      <Header/>
      <main>
        <SearchForm savedSearch={savedSearch} setSavedSearch={setSavedSearch} />
        {isLoading ? <Preloader /> :
          <MoviesCardList message={message} currentMovies={moviesToRender} onClickUpdate={onClickUpdate} />
        }
        { filteredMovies > moviesToRender &&
          (<section className="more">
            <button type='button' className="more__button" onClick={handleMoreClick}>Ещё</button>
          </section>)
          }
      </main>
      <Footer />
    </>
  );
}

export default Movies;
