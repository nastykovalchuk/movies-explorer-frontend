import React from 'react'
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css'

function MoviesCardList({ message, toDelete, currentMovies, onClickUpdate }) {
  return (
    <section className="card-list">
      <ul className='card-list-list'>
      {
            !message && currentMovies.length > 0
            ?
            currentMovies.map(movie => {
              return (
                <MoviesCard movie={movie} isLike={movie.isSaved} toDelete={toDelete} key={movie.id || movie._id} onClickUpdate={onClickUpdate} />
              )
            })
            :
            <p>{message || "Ничего не найдено"}</p>
          }
      </ul>
  </section>
  )
}

export default MoviesCardList