import './FilterCheckbox.css'

function FilterCheckbox({ state = false, onClick }) {
  return (
    <input type="checkbox" className="filter-checkbox" checked={state} onChange={onClick} />
  )
}

export default FilterCheckbox