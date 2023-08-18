import React from 'react'
import './MoviesCard.css'

function MoviesCard({ movie, isLike, toDelete, onClickUpdate}) {

  const movieButtonClasses = (
    `movie__button ${isLike ? 'movie__button_saved' : ''}`
  );

  const buttonEventHendler = () => {
    return onClickUpdate(movie);
  }

  function durationTime(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = Math.trunc(duration - hours * 60);

    if(minutes === 0) return `${hours}ч`
    if(hours === 0) return `${minutes}м`
    return `${hours}ч ${minutes}м`
}

  return (
    <div className="movie">
      <a className='movie_link' href={movie.trailerLink} target="_blank" rel="noreferrer">
       <img className="movie__image" src={`https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} />
      </a>
    <div className='movie__caption'>
      <h2 className="movie__name">{movie.nameRU}</h2>
      {toDelete ?
        (<button type='button' onClick={buttonEventHendler} className='movie__button-delete'>&times;</button>) :
        (<button type='button' onClick={buttonEventHendler} className={movieButtonClasses}></button>)
      }
      <p className="movie__length">{durationTime(movie.duration)}</p>
    </div>
  </div>
  )
}

export default MoviesCard