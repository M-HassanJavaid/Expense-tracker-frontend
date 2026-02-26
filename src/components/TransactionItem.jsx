import React from 'react';
import { HiArrowTrendingUp, HiArrowTrendingDown } from "react-icons/hi2";

const formatReadableDate = (isoString) => {
  if (!isoString) return "";

  const date = new Date(isoString);

  // Get the day and determine the suffix
  const day = date.getDate();
  const getSuffix = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  // Format Month (short version like 'Feb')
  const month = date.toLocaleString('en-US', { month: 'short' });

  // Get Full Year
  const year = date.getFullYear();

  return `${day}${getSuffix(day)} ${month} ${year}`;
};



const TransactionItem = ({
  source: title,
  date,
  value: amount,
  action,
  icon,
  _id
}) => {

  const isIncome = action === 'income';

  return (
    <div className="flex items-center justify-between p-3 bg-white rounded-2xl w-full border border-gray-50/50">
      {/* Left Section: Emoji Icon and Details */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-full text-2xl">
          {icon}
        </div>
        <div>
          <h3 className="text-[15px] font-bold text-gray-800 leading-tight">
            {title}
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            {formatReadableDate(date)}
          </p>
        </div>
      </div>

      {/* Right Section: Dynamic Badge */}
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs flex-nowrap ${isIncome
          ? 'bg-green-50 text-green-500'
          : 'bg-red-50 text-red-500'
        }`}>
        <span className='text-nowrap'>
          {isIncome ? '+' : '-'} ${Math.abs(amount).toLocaleString()}
        </span>
        {isIncome ? (
          <HiArrowTrendingUp size={16} />
        ) : (
          <HiArrowTrendingDown size={16} />
        )}
      </div>
    </div>
  );
};

export default TransactionItem;