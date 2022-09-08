import React from 'react'

const CurrencyItem = ({ value, name }) => {

  return (
    <option className='currency-item' value={value}>
      {name}
    </option>
  )
}

export default CurrencyItem