import React, { useState, useEffect } from "react";
import axios from "axios";
import WalletsSection from "./WalletsSection";
import MainChart from "./MainChart";

type CurrencyType = 'btc' | 'eth' | 'ltc';

interface CryptoData {
  id: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  image: string;
  sparkline_in_7d?: {
    price: number[];
  };
}
interface ChartDataPoint {
  time: string;  
  hour: number;  
  btc: number;
  eth: number;
  ltc: number;
}


const Dashboard: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCurrency, setActiveCurrency] = useState<CurrencyType>('btc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            ids: 'bitcoin,ethereum,litecoin',
            order: 'market_cap_desc',
            per_page: 3,
            sparkline: true,
            price_change_percentage: '24h'
          }
        });
        setCryptoData(response.data);

        const now = new Date();
       const mockData: ChartDataPoint[] = Array.from({ length: 10 }, (_, i) => {
  const time = new Date(now.getTime() - (9 - i) * 60 * 60 * 1000);
  return {
    time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit',  hour12: true  }),
    hour: time.getHours(),
    btc: [6500, 6987, 7357, 3430, 4000, 4500, 5000, 5200, 4800, 5100][i],
    eth: [5500, 6000, 6200, 5800, 5900, 6100, 6300, 6400, 6000, 6200][i],
    ltc: [4500, 4800, 4900, 4700, 4750, 4850, 4950, 5000, 4800, 4900][i]
  };
});

        setChartData(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4 text-gray-400 bg-[#17153A] h-[30rem]">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 pt-0 rounded-lg shadow ">
      <WalletsSection 
        cryptoData={cryptoData} 
        activeCurrency={activeCurrency}
        onSelect={setActiveCurrency}
      />
      <div className="mt-8">
        <MainChart 
          data={chartData} 
          activeCurrency={activeCurrency}
        />
      </div>
    </div>
  );
};

export default Dashboard;