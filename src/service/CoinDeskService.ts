import http from '../utils/httpCommon';
import {CurrencyType} from '../models/CurrentPriceModel';
import {CurrentPriceDataModel} from '../models/CurrentPriceDataModel';

export const getCurrentPriceByType = (type: CurrencyType) => {
  return http.get<CurrentPriceDataModel>(`/currentprice/${type}.json`);
};
