import React from 'react'
import MoviesCard from './../MoviesCard/MoviesCard';
import './MoviesCardList.css'

function MoviesCardList({ toDelete }) {
  return (
    <section className="card-list">
      <ul className='card-list-list'>
      {toDelete ? (
      <>
       { [...Array(3)].map((item, index) => <li key={index}><MoviesCard alt={`33 слова о дизайне № ${index + 1 }`} toDelete={toDelete} /></li> )}
      </>
    ) : (
      <>
        { [...Array(8)].map((item, index) => <li key={index}><MoviesCard alt={`33 слова о дизайне № ${index + 1 }`} isSaved={true} /></li> )}
        { [...Array(8)].map((item, index) => <li key={index}><MoviesCard alt={`33 слова о дизайне № ${index + 9 }`} /></li> )}
      </>
    )}
      </ul>
  </section>
  )
}

export default MoviesCardList