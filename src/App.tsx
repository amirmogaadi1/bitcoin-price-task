import React, {useEffect, useState} from 'react';

import {CurrencyType, CurrentPrice} from './models/CurrentPriceModel';

import {getCurrentPriceByType} from './service/CoinDeskService';

import './App.css';

function App() {
  const [currency, setCurrency] = useState<CurrentPrice>({
    code: CurrencyType.USD,
  });

  const setCurrentPrice = (type: CurrencyType): void => {
    getCurrentPriceByType(type).then((currentPriceData) => {
      setCurrency({...currentPriceData.data.bpi[type]});
    });
  };

  useEffect(() => {
    setCurrentPrice(currency.code);
    const currencyInterval = setInterval(() => {
      setCurrentPrice(currency.code);
    }, 5000);
    return () => {
      clearInterval(currencyInterval);
    };
  }, [currency.code]);

  return <div className="App">{currency.rate_float}</div>;
}

export default App;
