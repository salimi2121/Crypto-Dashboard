import React from "react";
import CryptoCard from "./CryptoCard";
import type { CryptoData } from "../../typescryptodata";
import { LuPlus } from "react-icons/lu";

type CurrencyType = 'btc' | 'eth' | 'ltc';

interface WalletsSectionProps {
  cryptoData: CryptoData[];
  activeCurrency: CurrencyType; // تغییر از string به CurrencyType
  onSelect: (currency: CurrencyType) => void;
}

const WalletsSection: React.FC<WalletsSectionProps> = ({ 
  cryptoData,
  activeCurrency,
  onSelect 
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-sm font-semibold mb-4 text-gray-400">WALLETS</h2>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 max-[640px]:grid-cols-2 max-[430px]:grid-cols-1 gap-4 mb-6 max-[380px]:mx-1">
        {cryptoData.map((crypto) => {
          // تبدیل symbol به CurrencyType
          const currencyType = crypto.symbol.toLowerCase() as CurrencyType;
          return (
            <CryptoCard
              key={crypto.id}
              isActive={currencyType === activeCurrency} // مقایسه صحیح
              onClick={() => onSelect(currencyType)}
              value={crypto.current_price.toLocaleString()}
              currency={crypto.symbol.toUpperCase()}
              image={crypto.image}
              change={`${crypto.price_change_percentage_24h >= 0 ? '+' : ''}${crypto.price_change_percentage_24h.toFixed(2)}%`}
              sparkline={crypto.sparkline_in_7d?.price.slice(0,10)}
            />
          );
        })}
        <div className="flex items-center justify-center p-3 text-sm text-gray-600 border-[#312F62] border-dashed border rounded-lg">
         <LuPlus />
          <span className=" pb-1 font-semibold"> Add Currency</span>
        </div>
      </div>
    </div>
  );
};

export default WalletsSection;