import axios from 'axios';

async function getCurrencyRate(fromCurrency, toCurrency) {
  const currencyRate = await axios.get(`https://currency-converter-server.onrender.com/api?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`);
  return currencyRate.data;
}

export { getCurrencyRate }