export enum CurrencyType {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CNY = 'CNY',
  JPY = 'JPY',
  PLN = 'PLN',
}

export interface CurrentPrice {
  code: CurrencyType;
  rate?: string;
  description?: string;
  rate_float: number;
}
