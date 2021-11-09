import React, {SyntheticEvent, useCallback, useEffect, useState} from 'react';
import {Card, DropdownProps, Select} from 'semantic-ui-react';
import {Line} from 'react-chartjs-2';

import {getCurrentPriceByType, getHistory} from './service/CoinDeskService';

import {currencyDecision, formatPrice} from './utils/numbersUtils';

import {CurrencyType, CurrentPrice} from './models/CurrentPriceModel';
import {ChartData} from './models/ChartDataModel';

import './App.scss';

function App() {
  const [currency, setCurrency] = useState<CurrentPrice>({
    code: CurrencyType.USD,
    rate_float: 0,
  });

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  const setCurrentPrice = (type: CurrencyType): void => {
    getCurrentPriceByType(type).then((currentPriceData) => {
      setCurrency({...currentPriceData.data.bpi[type]});
    });
  };

  const getChartData = useCallback(
    (type: CurrencyType): void => {
      getHistory(type).then((historyData) => {
        const history = historyData.data.bpi;
        const categories = Object.keys(history);
        const data: number[] = Object.values(history);
        setChartData({
          labels: categories,
          datasets: [
            {
              label: `${currency.code} Price`,
              data,
              fill: true,
              backgroundColor: '#4BC0C033',
              borderColor: '#4BC0C0FF',
            },
          ],
        });
      });
    },
    [currency.code],
  );

  const handleSelect = useCallback(
    (e: SyntheticEvent, {value}: DropdownProps): void => {
      setCurrentPrice(value as CurrencyType);
      getChartData(value as CurrencyType);
    },
    [getChartData],
  );

  useEffect(() => {
    setCurrentPrice(currency.code);
    getChartData(currency.code);
    const currencyInterval = setInterval(() => {
      setCurrentPrice(currency.code);
    }, 5000);
    return () => {
      clearInterval(currencyInterval);
    };
  }, [currency.code, getChartData]);

  return (
    <div className="main-container">
      <div className="nav-bar">Bitcoin price task app</div>
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
      <div className="chart-container">
        <div>
          <Line
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Bitcoin price',
                },
                legend: {
                  display: false,
                },
              },
              responsive: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
