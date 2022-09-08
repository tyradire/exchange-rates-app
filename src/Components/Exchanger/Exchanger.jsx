import React, { useState, useEffect } from 'react'
import ExchangerInput from '../ExchangerInput/ExchangerInput';
import { months } from '../../utils/months';
import './Exchanger.css';

const Exchanger = ({ currencyObj, location, date }) => {

  const [baseValue, setBaseValue] = useState(1);
  const [exchangeableValue, setExchangeableValue] = useState(1);

  const [baseCurrName, setBaseCurrName] = useState('');
  const [exchangeableCurrName, setExchangeableCurrName] = useState('');

  const [baseCurrRate, setBaseCurrRate] = useState(0);
  const [exchangeableCurrRate, setExchangeableCurrRate] = useState(0);

  const [baseCurrCharcode, setBaseCurrCharcode] = useState('');
  const [exchangeableCurrCharcode, setExchangeableCurrCharcode] = useState('');

  useEffect(() => {
    if (location) { 
    setCurrData('base', location, currencyObj[location].Name, currencyObj[location].Value);
    setCurrData('exch', 'USD', currencyObj['USD'].Name, currencyObj['USD'].Value);
    calculate(setExchangeableValue, baseValue, currencyObj[location].Value, currencyObj['USD'].Value);
    }
  }, [location])

  const calculate = (setter, value, firstRate, secondRate) => {
    setter((value * (firstRate / secondRate)).toFixed(3));
  }

  const setCurrData = (type, charcode, name, rate) => {
    if (type==='base') {
      setBaseCurrCharcode(charcode);
      setBaseCurrName(name);
      setBaseCurrRate(rate);
    } else {
      setExchangeableCurrCharcode(charcode);
    setExchangeableCurrName(name)
    setExchangeableCurrRate(rate);
    }
  }

  const changeCurrency = (type, value) => {
    if (type==='base') {
      calculate(setBaseValue, exchangeableValue, exchangeableCurrRate, value)
    } else {
      calculate(setExchangeableValue, baseValue, baseCurrRate, value);
    }
  }

  const changeBaseValue = (e) => {
    setBaseValue(e.target.value)
    calculate(setExchangeableValue, e.target.value, baseCurrRate, exchangeableCurrRate);
  }

  const changeExchangeableValue = (e) => {
    setExchangeableValue(e.target.value)
    calculate(setBaseValue, e.target.value, exchangeableCurrRate, baseCurrRate);
  }

  return (
    <div className='exchanger'>
      <div className='exchanger__container'>
        <div className='exchanger__info'>
          <p className='exchanger__base'>1 {baseCurrName || (location && currencyObj[location].Name)  || null} равно</p>
          <p className='exchanger__converted'>{(baseCurrRate / exchangeableCurrRate).toLocaleString()} {exchangeableCurrName}</p>
          <p className='exchanger__date'>{date[0]} {months[date[1]]}</p>
        </div>
        <div className='exchanger__inputs'>
          <ExchangerInput 
            baseValue={baseValue}
            currencyObj={currencyObj}
            currName={baseCurrName}
            location={location}
            currCharcode={baseCurrCharcode}
            changeValue={changeBaseValue}  
            changeCurrency={changeCurrency}
            setCurrData={setCurrData}
            type='base'
          />
          <ExchangerInput 
            baseValue={exchangeableValue}
            currencyObj={currencyObj}
            currName={exchangeableCurrName}
            currCharcode={exchangeableCurrCharcode}
            changeValue={changeExchangeableValue} 
            changeCurrency={changeCurrency}          
            setCurrData={setCurrData}
            type='exch'
          />
        </div>
      </div>
    </div>
  )
}

export default Exchanger