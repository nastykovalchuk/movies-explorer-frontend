import React, { useState } from 'react'
import './FilterCheckbox.css'

function FilterCheckbox(state = false) {
  const [checkboxState, setCheckboxState] = useState(state)
  return (
    <input type="checkbox" className="filter-checkbox" defaultChecked={state} onClick={() => setCheckboxState(!checkboxState)} />
  )
}

export default FilterCheckbox