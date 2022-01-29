import React, { useEffect, useState } from 'react';
import CurrencyRow from './components/currency-row/CurrencyRow';
import './App.css';

const BASE_URL = 'http://localhost:5000';

const App = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]); // collection of currencies for selection
  const [fromCurrency, setFromCurrency] = useState(); // base currency
  const [toCurrency, setToCurrency] = useState(); // converted-to currency
  const [exchangeRate, setExchangeRate] = useState(361.9); //default exchange rate usd - zwl
  const [amount, setAmount] = useState(1);
  const [amntIsInFromCurrency, setAmntIsInFromCurrency] = useState(true); // flag to track which input updated

  // track updating inputs
  let fromAmount, toAmount;
  if (amntIsInFromCurrency) {
    fromAmount = amount;
    toAmount = exchangeRate * amount;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  // effect sets up default entries
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await fetch(`${BASE_URL}`);
      const data = await res.json();
      console.log(data);
      const firstCurrency = Object.keys(data.rates)[0];
      setCurrencyOptions([...Object.keys(data.rates)]);
      setFromCurrency(data.base);
      setToCurrency(firstCurrency);
      setExchangeRate(data.rates[firstCurrency]);
    };

    fetchAPI();
  }, []);

  // effect updates new entries
  useEffect(() => {
    const fetchAPI = async () => {
      const res = await fetch(
        `${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`
      );
      const data = await res.json();
      console.log('res:', data);
      setExchangeRate(data.rates[toCurrency]);
    };

    // make sure base currency and convert-to currency are set
    if (fromCurrency != null && toCurrency != null) {
      fetchAPI();
    }
  }, [fromCurrency, toCurrency]);

  // handles updates to the base currency input
  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmntIsInFromCurrency(true);
  };

  // handles updates to the convert-to currency input
  const handleToAmountChange = (e) => {
    setAmount(e.target.value);
    setAmntIsInFromCurrency(false);
  };

  // handles updates to selected currency
  const handleCurrencyChange = (e) => setFromCurrency(e.target.value);

  return (
    <div className='container'>
      <header>Currency Converter</header>
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={handleCurrencyChange}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        
        <CurrencyRow
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={handleCurrencyChange}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      
    </div>
  );
};

export default App;
