import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

// Helper to format date strings to "27th Feb"
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  
  // Adding ordinal suffix (st, nd, rd, th)
  const suffix = ["th", "st", "nd", "rd"];
  const v = day % 100;
  const ord = suffix[(v - 20) % 10] || suffix[v] || suffix[0];
  
  return `${day}${ord} ${month}`;
};

const IncomeGrpah = ({ data }) => {
  // Format the raw data for the chart
  const chartData = data.map(item => ({
    ...item,
    formattedDate: formatDate(item.date),
  }));

  const { pathname : action } = useLocation()

  return (
    <div className="bg-white p-4 md:p-8 rounded-b-3xl shadow-sm border border-gray-100 w-full">
      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-8">Last 10 {action.slice(1)}s</h2>
      
      <div className="h-64 md:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
            
            <XAxis 
              dataKey="formattedDate" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 11, fontWeight: 500 }}
              dy={10}
              interval={0}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 11 }} 
              width={40}
            />

            <Tooltip 
              cursor={{ fill: 'transparent' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white p-2 md:p-3 rounded-lg shadow-xl border-none text-xs md:text-sm">
                      <p className="text-[10px] md:text-xs opacity-70 mb-1">{item.formattedDate}</p>
                      <p className="font-bold flex items-center gap-2">
                        <span>{item.icon}</span> ${item.value.toLocaleString()}
                      </p>
                      <p className="text-[9px] md:text-[10px] mt-1 italic text-indigo-300">{item.description}</p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Bar 
              dataKey="value" 
              radius={[10, 10, 0, 0]}
              barSize={Math.min(40, window.innerWidth / chartData.length / 2)}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index % 2 === 0 ? '#7c4dff' : '#c7b3ff'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeGrpah;