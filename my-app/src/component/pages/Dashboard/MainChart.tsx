import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';


interface ChartDataPoint {
  time: string;  // زمان به صورت "10:59PM"
  hour: number;  // ساعت به عدد (0-23)
  btc: number;
  eth: number;
  ltc: number;
}

interface MainChartProps {
  data: ChartDataPoint[];
  activeCurrency: 'btc' | 'eth' | 'ltc';
}



const MainChart: React.FC<MainChartProps> = ({ data, activeCurrency }) => {
  // استفاده از undefined به جای null برای هماهنگی با تایپ‌های Recharts
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | undefined>(undefined);

  const currencyStyles = {
    btc: { color: '#FB49C0', gradientId: 'colorBtc' },
    eth: { color: '#31AFD6', gradientId: 'colorEth' },
    ltc: { color: '#F5A623', gradientId: 'colorLtc' }
  };

  // محور Y با فاصله 500 از 2000 تا 6500
  const yAxisTicks = [2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500];
const handleTooltipChange = (state: any) => {
  if (state.isTooltipActive && state.activePayload && state.activePayload.length > 0) {
    const timeValue = state.activePayload[0].payload.time;
    const dataIndex = data.findIndex(d => d.time === timeValue);
    setActiveTooltipIndex(dataIndex >= 0 ? dataIndex : undefined);
  } else {
    setActiveTooltipIndex(undefined);
  }
};


  return (
    <div className="h-[650px] pb-20 rounded-lg">
      {/* بخش نمایش نام ارزها */}
      <div className="flex justify-start gap-14 ml-20 mt-4 text-gray-400">
        {Object.entries(currencyStyles).map(([currency, style]) => (
          <div key={currency} className="flex gap-1 items-center">
            <div
              className="w-2 h-2 rounded-full mr-1"
              style={{
                backgroundColor: style.color,
                opacity: activeCurrency === currency ? 1 : 0.5
              }}
            ></div>
            <span className={`text-xs ${activeCurrency === currency ? 'font-bold' : ''}`}>
              {currency.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* نمودار اصلی */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: -20, bottom: 10 }}
          onMouseMove={handleTooltipChange}
          onMouseLeave={() => setActiveTooltipIndex(undefined)}
        >
          {/* خط عمودی هنگام hover */}
         {activeTooltipIndex !== undefined && data[activeTooltipIndex] && (
  <ReferenceLine
    x={data[activeTooltipIndex].time}
    stroke="#6B7280"
    strokeWidth={1}
    strokeDasharray="3 3"
  />
)}

          {/* محور X */}
          <XAxis
            dataKey="time"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12, dy: 22 }}
            padding={{ left: 30 }}
          />

          {/* محور Y */}
          <YAxis
            axisLine={false}
            tickLine={false}
            ticks={yAxisTicks}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickFormatter={(value) => `${new Intl.NumberFormat('en-US').format(value)}`}
            domain={[2000, 6500]}
          />

          {/* Tooltip سفارشی */}
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload || !payload.length) return null;

              // تنظیمات موقعیت برای هر ارز
              const positionSettings = {
                btc: -40,
                eth: 40,
                ltc: 90
              };
              const position = {
                btc: 60,
                eth: 30,
                ltc: 65
              };

              return (
                <div className="relative text-white p-3 rounded-lg shadow-md border bg-[#1B1942] border-gray-800 h-80 min-w-[120px]">
                  {payload.map((entry) => (
                    <div
                      key={entry.dataKey}
                      className="absolute flex gap-2 justify-center items-center bg-[#1B1942] border border-gray-800 rounded-xl mb-1 w-20 last:mb-0"
                      style={{
                        left: positionSettings[entry.dataKey as keyof typeof positionSettings] || 0,
                        top: position[entry.dataKey as keyof typeof position] || 0
                      }}
                    >
                      <div className="flex items-center">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: entry.stroke,
                            opacity: activeCurrency === entry.dataKey ? 1 : 0.5
                          }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold py-1">
                        ${new Intl.NumberFormat('en-US').format(entry.value)}
                      </span>
                    </div>
                  ))}
                </div>
              );
            }}
          />

          {/* مناطق نمودار برای هر ارز */}
          <Area
            type="monotone"
            dataKey="btc"
            stroke="#FB49C0"
            fill="none"
            strokeWidth={activeCurrency === 'btc' ? 2 : 1}
            opacity={activeCurrency === 'btc' ? 1 : 0.3}
          />
          <Area
            type="monotone"
            dataKey="eth"
            stroke="#31AFD6"
            fill="none"
            strokeWidth={activeCurrency === 'eth' ? 2 : 1}
            opacity={activeCurrency === 'eth' ? 1 : 0.3}
          />
          <Area
            type="monotone"
            dataKey="ltc"
            stroke="#F5A623"
            fill="none"
            strokeWidth={activeCurrency === 'ltc' ? 2 : 1}
            opacity={activeCurrency === 'ltc' ? 1 : 0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MainChart;