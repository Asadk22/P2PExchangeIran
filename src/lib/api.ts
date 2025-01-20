import axios from 'axios';

interface ExchangeRate {
  price: number;
  change: number;
  high: number;
  low: number;
  volume: number;
}

const NOBITEX_PAIRS = {
  'USD/IRR': 'USDIRT',
  'EUR/IRR': 'EURIRT',
  'GBP/IRR': 'GBPIRT',
  'CAD/IRR': 'CADIRT'
};

const DEFAULT_RATES = {
  'USD/IRR': { base: 520000, volume: 125000 },
  'EUR/IRR': { base: 600000, volume: 98000 },
  'GBP/IRR': { base: 660000, volume: 75000 },
  'CAD/IRR': { base: 385000, volume: 52000 }
};

// demo
const ALPHA_VANTAGE_API_KEY = 'QKI2O3U31PCIRUF5'; // Using demo key, replace with your API key
const BASE_URL = 'https://www.alphavantage.co/query';

export const CURRENCY_PAIRS = {
  'USD/IRR': 'USD/IRR',
  'EUR/IRR': 'EUR/IRR',
  'GBP/IRR': 'GBP/IRR',
  'CAD/IRR': 'CAD/IRR'
};

// Cache for historical data
const dataCache: Record<string, any> = {};

export async function getIRRExchangeRate(pair: string = 'USD/IRR'): Promise<ExchangeRate> {
  const defaultRate = DEFAULT_RATES[pair as keyof typeof DEFAULT_RATES];
  
  try {
    // Try Nobitex first
    const symbol = NOBITEX_PAIRS[pair as keyof typeof NOBITEX_PAIRS];
    const response = await axios.get(`https://api.nobitex.ir/v2/orderbook/${symbol}`);
    const data = response.data;
    
    if (data && data.lastTradePrice) {
      const price = parseFloat(data.lastTradePrice);
      return {
        price,
        change: parseFloat(data.stats['24h'].priceChange) || 0,
        high: parseFloat(data.stats['24h'].high) || price * 1.02,
        low: parseFloat(data.stats['24h'].low) || price * 0.98,
        volume: parseFloat(data.stats['24h'].volume) || defaultRate.volume,
      };
    }
    
    throw new Error('Invalid data from Nobitex');
  } catch (error) {
    console.error('Nobitex API failed:', error);
    
    // Fallback to Bonbast
    try {
      const response = await axios.get('https://bonbast.com/json');
      const data = response.data;
      
      if (data) {
        const currencies = {
          'USD/IRR': data.usd,
          'EUR/IRR': data.eur,
          'GBP/IRR': data.gbp,
          'CAD/IRR': data.cad
        };
        
        const currencyData = currencies[pair as keyof typeof currencies];
        if (currencyData && currencyData.value) {
          const price = parseFloat(currencyData.value) * 10; // Convert to IRR
          return {
            price,
            change: 0, // Bonbast doesn't provide change data
            high: price * 1.02,
            low: price * 0.98,
            volume: defaultRate.volume,
          };
        }
      }
      
      throw new Error('Invalid data from Bonbast');
    } catch (backupError) {
      console.error('Bonbast API failed:', backupError);
      
      // Return default data if both APIs fail
      return {
        price: defaultRate.base,
        change: 0,
        high: defaultRate.base * 1.02,
        low: defaultRate.base * 0.98,
        volume: defaultRate.volume,
      };
    }
  }
}

// Polling interval in milliseconds (30 seconds)
export const POLLING_INTERVAL = 30000;

// Fetch live currency rates from ExchangeRate-API (free tier)
export async function fetchLiveCurrencyRates() {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    return null;
  }
}

// Fetch historical currency data
export async function fetchHistoricalData(base: string, target: string, days: number = 30) {
  try {
    // For demo, generate realistic looking data
    const data = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    let currentDate = new Date(startDate);
    let basePrice = base === 'USD' ? 385000 :
                   base === 'EUR' ? 420000 :
                   base === 'GBP' ? 490000 :
                   285000; // CAD

    while (currentDate <= endDate) {
      // Generate smoother price movements
      const randomChange = (Math.random() - 0.5) * (basePrice * 0.002); // 0.2% max change
      basePrice += randomChange;
      
      data.push({
        x: currentDate.getTime(),
        y: Math.round(basePrice)
      });

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return data;
  } catch (error) {
    console.error('Error generating historical data:', error);
    return [];
  }
}

// Fetch live market depth from Nobitex (Iranian crypto exchange)
export async function fetchMarketDepth(symbol: string = 'USDTIRT') {
  try {
    const response = await fetch(`https://api.nobitex.ir/v2/orderbook/${symbol}`);
    const data = await response.json();
    return {
      bids: data.bids.slice(0, 10).map((bid: any) => ({
        price: parseInt(bid[0]),
        amount: parseFloat(bid[1])
      })),
      asks: data.asks.slice(0, 10).map((ask: any) => ({
        price: parseInt(ask[0]),
        amount: parseFloat(ask[1])
      }))
    };
  } catch (error) {
    console.error('Error fetching market depth:', error);
    return { bids: [], asks: [] };
  }
}

// Fetch live trades from Nobitex
export async function fetchLiveTrades(symbol: string = 'USDTIRT') {
  try {
    const response = await fetch(`https://api.nobitex.ir/v2/trades/${symbol}`);
    const data = await response.json();
    return data.trades.map((trade: any) => ({
      price: parseInt(trade.price),
      amount: parseFloat(trade.amount),
      time: new Date(trade.time).getTime()
    }));
  } catch (error) {
    console.error('Error fetching live trades:', error);
    return [];
  }
}

export const getHistoricalData = async (pair: string, timeRange: string) => {
  // console.log("pair--->>>",pair)
  // console.log("timeRange--->>>",timeRange)
  
  const cacheKey = `${pair}-${timeRange}`;
  if (dataCache[cacheKey]) {
    return dataCache[cacheKey];
  }

  try {
    // Since IRR is not directly available, we'll use USD/EUR rates and multiply by USD/IRR base rate
    const [fromCurrency] = pair.split('/');
    let interval = '60min';
    let outputSize = 'compact';

    switch (timeRange) {
      case '1D':
        interval = '5min';
        break;
      case '1M':
        interval = 'daily';
        outputSize = 'compact'; // Last 100 data points
        break;
      case '3M':
      case '1Y':
      case '5Y':
      case 'All':
        interval = 'daily';
        outputSize = 'full'; // Full data set
        break;
    }

    const response = await axios.get(BASE_URL, {
      params: {
        function: interval === 'daily' ? 'FX_DAILY' : 'FX_INTRADAY',
        from_symbol: fromCurrency,
        to_symbol: 'USD', // We'll convert to IRR later
        interval,
        outputsize: outputSize,
        apikey: ALPHA_VANTAGE_API_KEY
      }
    });

    // Base rates for IRR conversion
    const irrRates = {
      USD: 385000,
      EUR: 420000,
      GBP: 490000,
      CAD: 285000
    };

    const baseRate = irrRates[fromCurrency as keyof typeof irrRates];
    const timeSeriesKey = interval === 'daily' ? 'Time Series FX (Daily)' : `Time Series FX (${interval})`;
    const timeSeries = response.data[timeSeriesKey];

    if (!timeSeries) {
      throw new Error('No data available');
    }

    // const data: [number, number][] = Object.entries(timeSeries)
    //   .map(([date, values]: [string, any]) => {
    //     const closePrice = parseFloat(values['4. close']);
    //     // Convert to IRR
    //     const irrPrice = closePrice * baseRate;
    //     return [new Date(date).getTime(), irrPrice];
    //   })
    //   .sort((a, b) => a[0] - b[0]); // Sort by timestamp
    const data: number[][] = Object.entries(timeSeries)
      .map(([date, values]: [string, any]) => {
        const closePrice = parseFloat(values['4. close']);
        // Convert to IRR
        const irrPrice = closePrice * baseRate;
        return [new Date(date).getTime(), irrPrice];
      })
      .sort((a, b) => a[0] - b[0]);

    // Filter data based on time range
    const now = Date.now();
    const filtered = data.filter(([timestamp]) => {
      const age = now - timestamp;
      switch (timeRange) {
        case '1D':
          return age <= 24 * 60 * 60 * 1000;
        case '1M':
          return age <= 30 * 24 * 60 * 60 * 1000;
        case '3M':
          return age <= 90 * 24 * 60 * 60 * 1000;
        case '1Y':
          return age <= 365 * 24 * 60 * 60 * 1000;
        case '5Y':
          return age <= 5 * 365 * 24 * 60 * 60 * 1000;
        default:
          return true;
      }
    });

    // Cache the result
    dataCache[cacheKey] = filtered;
    return filtered;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    // Return mock data as fallback
    return generateMockData(pair, timeRange);
  }
};

// Generate mock data as fallback
function generateMockData(pair: string, timeRange: string): [number, number][] {
  const basePrices = {
    'USD/IRR': 385000,
    'EUR/IRR': 420000,
    'GBP/IRR': 490000,
    'CAD/IRR': 285000
  };

  const basePrice = basePrices[pair as keyof typeof basePrices];
  const data: [number, number][] = [];
  const now = Date.now();
  let timeStep: number;
  let numPoints: number;

  switch (timeRange) {
    case '1D':
      timeStep = 5 * 60 * 1000; // 5 minutes
      numPoints = 288; // 24 hours
      break;
    case '1M':
      timeStep = 60 * 60 * 1000; // 1 hour
      numPoints = 720; // 30 days
      break;
    case '3M':
      timeStep = 3 * 60 * 60 * 1000; // 3 hours
      numPoints = 720; // 90 days
      break;
    case '1Y':
      timeStep = 8 * 60 * 60 * 1000; // 8 hours
      numPoints = 1095; // 365 days
      break;
    case '5Y':
      timeStep = 24 * 60 * 60 * 1000; // 1 day
      numPoints = 1825; // 5 years
      break;
    default:
      timeStep = 24 * 60 * 60 * 1000; // 1 day
      numPoints = 2190; // 6 years
  }

  let currentPrice = basePrice;
  for (let i = numPoints - 1; i >= 0; i--) {
    const timestamp = now - (i * timeStep);
    // Add some random variation (-0.5% to +0.5%)
    const variation = (Math.random() - 0.5) * 0.01;
    currentPrice = currentPrice * (1 + variation);
    data.push([timestamp, Math.round(currentPrice)]);
  }

  return data;
}

export const getMarketDepth = () => {
  const depth: Record<string, any> = {};
  
  Object.keys(CURRENCY_PAIRS).forEach(pair => {
    const [currency] = pair.split('/');
    const basePrice = {
      'USD': 385000,
      'EUR': 420000,
      'GBP': 490000,
      'CAD': 285000
    }[currency] || 385000;

    // Add some random variation
    const randomVariation = () => (Math.random() - 0.5) * 0.02; // ±1%
    
    depth[pair] = {
      price: Math.round(basePrice * (1 + randomVariation())),
      volume: Math.round(1000000 + Math.random() * 2000000),
      high: Math.round(basePrice * (1.02 + randomVariation())),
      low: Math.round(basePrice * (0.98 + randomVariation()))
    };
  });

  return depth;
};

export const getOpenTrades = () => {
  const trades: Record<string, any[]> = {};
  
  Object.keys(CURRENCY_PAIRS).forEach(pair => {
    const [currency] = pair.split('/');
    const basePrice = {
      'USD': 385000,
      'EUR': 420000,
      'GBP': 490000,
      'CAD': 285000
    }[currency] || 385000;

    trades[pair] = Array.from({ length: 20 }, (_, i) => {
      const type = Math.random() > 0.5 ? 'buy' : 'sell';
      const price = Math.round(basePrice * (1 + (Math.random() - 0.5) * 0.02));
      const amount = +(Math.random() * 10).toFixed(2);
      return {
        id: i + 1,
        type,
        price,
        amount,
        total: price * amount
      };
    }).sort((a, b) => b.price - a.price);
  });

  return trades;
};
