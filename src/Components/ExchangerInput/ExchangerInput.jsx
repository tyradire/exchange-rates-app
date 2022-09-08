import React from 'react'
import CurrencyItem from '../CurrencyItem/CurrencyItem';
import './ExchangerInput.css';

const ExchangerInput = ({ 
    setCurrData, 
    currCharcode, 
    type, 
    changeCurrency, 
    baseValue, 
    changeValue, 
    currencyObj, 
    currName 
  }) => {

  const selectCurrency = (e) => {
    setCurrData(type, e.target.value, currencyObj[e.target.value].Name, currencyObj[e.target.value].Value);
    changeCurrency(type, currencyObj[e.target.value].Value);
  }

  return (
    <div className='exchanger-input'>
      <input className='exchanger-input__value' type='number' value={baseValue} onChange={changeValue}></input>
      <select className='exchanger-input__select' onChange={selectCurrency} value={currCharcode}>
        {
          Object.keys(currencyObj).map(elem => {
            return <CurrencyItem key={currencyObj[elem].CharCode} value={currencyObj[elem].CharCode} name={currencyObj[elem].Name} currName={currName}/>
          })
        }
      </select>
    </div>
  )
}

export default ExchangerInput