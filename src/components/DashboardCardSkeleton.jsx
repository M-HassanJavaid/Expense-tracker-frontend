import React from 'react';

const DashboardCardSkeleton = () => {
  return (
    <div className="flex items-center gap-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-50 max-w-xs animate-pulse">
      {/* Skeleton Icon Circle */}
      <div className="h-14 w-14 rounded-full bg-gray-200" />

      {/* Skeleton Text Content */}
      <div className="flex flex-col gap-2">
        {/* Title Placeholder */}
        <div className="h-3 w-20 rounded bg-gray-200" />
        {/* Amount Placeholder */}
        <div className="h-6 w-28 rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default DashboardCardSkeleton;