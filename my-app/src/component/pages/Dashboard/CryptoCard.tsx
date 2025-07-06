import React from "react";
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface CryptoCardProps {
  isActive: boolean;
  onClick: () => void;
  value: string;
  currency: string;
  change: string;
  image?: string;
  sparkline?: number[];
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  isActive,
  onClick,
  value,
  currency,
  change,
  image,
  sparkline
}) => {
  const cardChartData = sparkline?.map((price, index) => ({
    time: index,
    price: price
  })) || [];
  return (
    <div
      className={`px-3 py-1 rounded-lg cursor-pointer transition-colors ${isActive
          ? 'bg-gradient-to-br from-[#40DDFF] to-[#0B98C5]'
          : 'bg-transparent border border-[#312F62] hover:bg-gray-200'
        }`}
      onClick={onClick}
    >
      <div className="flex gap-3 items-center">
        {image && (
          <img
            src={image}
            alt={currency}
            className="w-9 h-9"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        )}
        <div className={`flex flex-col flex-grow ${isActive ? '' : 'bg-transparent'
          }`}>
          <div className="flex gap-2 items-center mb-1">
            <span className={`text-lg font-semibold ${isActive ? 'text-gray-200' : 'text-gray-400'
              }`} >{value}</span>
            <span className="text-sm font-semibold text-gray-500">
              {currency.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center ">
            <div className="h-6 w-1/2 ">
              {cardChartData.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cardChartData}>
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke={change.startsWith('+') ? '#10B981' : '#EF4444'}
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
                
              )}
           
            </div>
              
            <span className={`text-xs ml-2 ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'
              }`}>
              {change}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;