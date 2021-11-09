import {CurrentPrice} from './CurrentPriceModel';

export interface CurrentPriceDataModel {
  time: {
    updated: string;
    updatedISO: string;
    updateduk: string;
  };
  disclaimer: string;
  bpi: {
    [key: string]: CurrentPrice;
  };
}

export interface CurrentChartDataModel {
  time: {
    updated: string;
    updatedISO: string;
  };
  disclaimer: string;
  bpi: {
    [key: string]: number;
  };
}
