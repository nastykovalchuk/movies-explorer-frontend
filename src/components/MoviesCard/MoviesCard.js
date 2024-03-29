import React from 'react'
import './MoviesCard.css'
import movieThumb from '../../images/movie-thumb.png'

function MoviesCard({isSaved, toDelete, alt}) {

  const movieButtonClasses = (
    `movie__button ${isSaved ? 'movie__button_saved' : ''}`
  );

  return (
    <div className="movie">
    <img className="movie__image" src={movieThumb} alt={alt} />
    <div className='movie__caption'>
      <h2 className="movie__name">33 слова о дизайне</h2>
      {toDelete ?
        (<button type='button' className='movie__button-delete'>&times;</button>) :
        (<button type='button' className={movieButtonClasses}></button>)
      }
      <p className="movie__length">1ч42м</p>
    </div>
  </div>
  )
}

export default MoviesCard