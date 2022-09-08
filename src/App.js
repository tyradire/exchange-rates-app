import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from './Components/Header/Header';
import Exchanger from './Components/Exchanger/Exchanger';
import { BANK_URL, COUNTRIES_URL } from './utils/constants';
import './App.css';

function App() {

  const [currencyObj, setCurrencyObj] = useState({});
  const [location, setLocacion] = useState();
  const [date, setDate] = useState([]);

  const createObj = (arr) => {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].currencies) {
        obj[arr[i].alpha2Code] = arr[i].currencies[0].code;
      } else {
        obj[arr[i].alpha2Code] = 'none';
      };
    }
    setLocacion(obj[window.navigator.language.split('-')[1]])
  }

  useEffect(() => {
    axios.get(BANK_URL)
    .then(({data}) => {
      setDate(data.Timestamp.slice(5,10).split('-').reverse());
      data.Valute.RUB = {CharCode: "RUB", Name: "Российский рубль", Value: 1}
      setCurrencyObj(data.Valute)
      return axios.get(COUNTRIES_URL)
    })
    .then((data) => {
      createObj(data.data)
    })
    .catch(err => {
      console.log(err);
      setLocacion('RUB');
    })
  }, [])

  return (
    <div className="App">
      <Header />
      <Exchanger currencyObj={currencyObj} location={location} date={date} />
    </div>
  );
}

export default App;
