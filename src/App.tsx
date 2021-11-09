import React, {SyntheticEvent, useCallback, useEffect, useState} from 'react';
import {DropdownProps, Select} from 'semantic-ui-react';

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

  const handleSelect = useCallback(
    (e: SyntheticEvent, {value}: DropdownProps): void => {
      setCurrentPrice(value as CurrencyType);
    },
    [],
  );

  useEffect(() => {
    setCurrentPrice(currency.code);
    const currencyInterval = setInterval(() => {
      setCurrentPrice(currency.code);
    }, 5000);
    return () => {
      clearInterval(currencyInterval);
    };
  }, [currency.code]);

  return (
    <div className="App">
      {' '}
      <Select
        placeholder="Select your currency"
        value={currency.code}
        onChange={handleSelect}
        options={[
          {value: 'USD', text: 'USD'},
          {value: 'EUR', text: 'EUR'},
          {value: 'GBP', text: 'GBP'},
          {value: 'CNY', text: 'CNY'},
          {value: 'JPY', text: 'JPY'},
          {value: 'PLN', text: 'PLN'},
        ]}
      />
      {currency.rate_float}
    </div>
  );
}

export default App;
