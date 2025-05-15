import React from 'react'

const SkeletonCard = () => (
    <div className="bg-white border border-gray-200 rounded-lg shadow animate-pulse">
      <div className="p-5">
        <div className="bg-gray-200 h-40 w-full rounded"></div>
      </div>
      <div className="px-5 pb-5 space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-10 bg-gray-300 rounded mt-4"></div>
      </div>
    </div>
  );


export default SkeletonCard
