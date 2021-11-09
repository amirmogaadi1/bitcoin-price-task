import React, {SyntheticEvent, useCallback, useEffect, useState} from 'react';
import {Card, DropdownProps, Select} from 'semantic-ui-react';

import {CurrencyType, CurrentPrice} from './models/CurrentPriceModel';

import {getCurrentPriceByType} from './service/CoinDeskService';

import './App.css';
import {currencyDecision, formatPrice} from './utils/numbersUtils';

function App() {
  const [currency, setCurrency] = useState<CurrentPrice>({
    code: CurrencyType.USD,
    rate_float: 0,
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
    <div>
      <div className="price-container">
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
        <Card className="card-container">
          <Card.Content>
            <Card.Header>{currency.code} Price</Card.Header>
            <Card.Description>
              {currencyDecision(currency.code)}{' '}
              {formatPrice(currency.rate_float)}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

export default App;
