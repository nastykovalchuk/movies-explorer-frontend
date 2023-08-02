import React from 'react'
import MoviesCard from './../MoviesCard/MoviesCard';
import './MoviesCardList.css'

function MoviesCardList({ toDelete }) {
  return (
    <section className="cardList">
    {toDelete ? (
      <>
       { [...Array(3)].map((item, index) => <MoviesCard key={index} toDelete={toDelete} /> ) }
      </>
    ) : (
      <>
        { [...Array(8)].map((item, index) => <MoviesCard key={index} isSaved={true} /> ) }
        { [...Array(8)].map((item, index) => <MoviesCard key={index} /> ) }
      </>
    )}

  </section>
  )
}

export default MoviesCardList