export function formatPrice(price: number): string {
  return price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function currencyDecision(currency: string): string {
  switch (currency) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'GBP':
      return '£';
    case 'CNY':
      return '¥';
    case 'JPY':
      return 'JP¥';
    case 'PLN':
      return 'zł';
    default:
      return currency;
  }
}
