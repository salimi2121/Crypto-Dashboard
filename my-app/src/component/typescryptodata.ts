
export interface CryptoData {
  id: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  sparkline_in_7d?: {
    price: number[];
  };
}

export interface ChartDataPoint {
  name: string;
  btc: number;
  eth: number;
  ltc: number;
}