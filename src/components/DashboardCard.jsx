import React from 'react';

const DashboardCard = ({ title, amount, icon: Icon, bgColor }) => {
  return (
    <div className="flex flex-1 items-center gap-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-50 max-w-xs">
      <div 
        className={`flex h-14 w-14 items-center justify-center rounded-full text-white text-2xl shadow-inner`}
        style={{ backgroundColor: bgColor }} // Using style for truly dynamic color hexes
      >
        <Icon />
      </div>

      {/* Text Content */}
      <div className="flex flex-col">
        <span className="text-gray-400 text-sm font-medium text-nowrap">
          {title}
        </span>
        <span className="text-2xl font-bold text-gray-800 text-nowrap">
          ${amount}
        </span>
      </div>
    </div>
  );
};

export default DashboardCard;