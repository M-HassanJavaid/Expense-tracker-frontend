import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const FinancialOverview = ({ data }) => {
  // Mapping the input data to Recharts format
  const chartData = [
    { name: 'Total Balance', value: data.totalBalance, color: '#8B5CF6' }, // Purple
    { name: 'Total Expenses', value: data.expense, color: '#EF4444' },    // Red
    { name: 'Total Income', value: data.income, color: '#F97316' },     // Orange
  ];

  // Custom Tooltip Component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-gray-600">${payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 max-w-md mx-auto w-full lg:mx-0">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Financial Overview</h2>
      
      <div className="relative h-64 w-full">
        {/* Center Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-gray-500 text-sm font-medium">Total Balance</span>
          <span className="text-3xl font-bold text-gray-800 mt-1">
            ${data.totalBalance.toLocaleString()}
          </span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={chartData}
              innerRadius={75}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
              startAngle={180}
              endAngle={-180}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="flex justify-center gap-6 mt-6">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs font-medium text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialOverview;