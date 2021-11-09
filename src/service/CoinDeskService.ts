import http from '../utils/httpCommon';
import {CurrencyType} from '../models/CurrentPriceModel';
import {
  CurrentChartDataModel,
  CurrentPriceDataModel,
} from '../models/PriceDataModel';

export const getCurrentPriceByType = (type: CurrencyType) => {
  return http.get<CurrentPriceDataModel>(`/currentprice/${type}.json`);
};

export const getHistory = (type: CurrencyType) => {
  return http.get<CurrentChartDataModel>(
    `/historical/close.json?currency=${type}`,
  );
};
