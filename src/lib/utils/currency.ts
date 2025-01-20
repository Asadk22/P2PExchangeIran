// Cache exchange rates for 5 minutes
let exchangeRatesCache: {
  rates: Record<string, number>;
  lastUpdated: number;
} | null = null;

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function getExchangeRates() {
  const now = Date.now();

  // Return cached rates if they're still valid
  if (
    exchangeRatesCache &&
    now - exchangeRatesCache.lastUpdated < CACHE_DURATION
  ) {
    return exchangeRatesCache.rates;
  }

  try {
    // Fetch latest exchange rates from an API
    // Note: You'll need to sign up for an API key from a service like exchangerate-api.com
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/USD`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch exchange rates');
    }

    const data = await response.json();
    
    // Update cache
    exchangeRatesCache = {
      rates: data.conversion_rates,
      lastUpdated: now,
    };

    return exchangeRatesCache.rates;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    
    // Return hardcoded fallback rates if API fails
    // These should be updated regularly
    return {
      USD: 1,
      EUR: 0.91,
      GBP: 0.79,
      IRR: 42000, // Update this rate regularly
      BTC: 0.000024, // These are approximate and should be updated
      ETH: 0.00039,
      USDT: 1,
    };
  }
}

export function convertToIRR(amount: number, fromCurrency: string): number {
  if (!exchangeRatesCache?.rates) {
    throw new Error('Exchange rates not available');
  }

  const rates = exchangeRatesCache.rates;
  const usdToIrr = rates.IRR;

  if (fromCurrency === 'IRR') return amount;

  let usdAmount: number;

  switch (fromCurrency) {
    case 'USD':
      usdAmount = amount;
      break;
    case 'EUR':
      usdAmount = amount / rates.EUR;
      break;
    case 'GBP':
      usdAmount = amount / rates.GBP;
      break;
    case 'BTC':
      usdAmount = amount / rates.BTC;
      break;
    case 'ETH':
      usdAmount = amount / rates.ETH;
      break;
    case 'USDT':
      usdAmount = amount;
      break;
    default:
      throw new Error(`Unsupported currency: ${fromCurrency}`);
  }

  return usdAmount * usdToIrr;
}

export function convertFromIRR(amount: number, toCurrency: string): number {
  if (!exchangeRatesCache?.rates) {
    throw new Error('Exchange rates not available');
  }

  const rates = exchangeRatesCache.rates;
  const irrToUsd = 1 / rates.IRR;

  if (toCurrency === 'IRR') return amount;

  const usdAmount = amount * irrToUsd;

  switch (toCurrency) {
    case 'USD':
      return usdAmount;
    case 'EUR':
      return usdAmount * rates.EUR;
    case 'GBP':
      return usdAmount * rates.GBP;
    case 'BTC':
      return usdAmount * rates.BTC;
    case 'ETH':
      return usdAmount * rates.ETH;
    case 'USDT':
      return usdAmount;
    default:
      throw new Error(`Unsupported currency: ${toCurrency}`);
  }
}

export function formatCurrency(amount: number, currency: string): string {
  const formatter = new Intl.NumberFormat('fa-IR', {
    style: 'currency',
    currency: currency === 'IRR' ? 'IRR' : 'USD',
    maximumFractionDigits: currency === 'IRR' ? 0 : 2,
  });

  if (currency === 'BTC') {
    return `${amount.toFixed(8)} BTC`;
  } else if (currency === 'ETH') {
    return `${amount.toFixed(6)} ETH`;
  } else if (currency === 'IRR') {
    return formatter.format(amount);
  } else {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

export function validateTradeAmount(amount: number, currency: string): boolean {
  const minAmounts: Record<string, number> = {
    BTC: 0.001,
    ETH: 0.01,
    USDT: 10,
    USD: 10,
    EUR: 10,
    GBP: 10,
    IRR: 1000000, // 1 million IRR
  };

  const maxAmounts: Record<string, number> = {
    BTC: 10,
    ETH: 100,
    USDT: 100000,
    USD: 100000,
    EUR: 100000,
    GBP: 100000,
    IRR: 10000000000, // 10 billion IRR
  };

  return amount >= minAmounts[currency] && amount <= maxAmounts[currency];
}
