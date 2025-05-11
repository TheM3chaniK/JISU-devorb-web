import React from 'react';

// Define the props interface for the StatCard component
interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon, 
  bgColor, 
  borderColor 
}) => {
  // Determine if change is positive, negative, or neutral
  const isPositive = change && change.startsWith('+');
  const isNegative = change && change.startsWith('-');
  const isNeutral = change && change === '0';

  return (
    <div className={`rounded-xl shadow-sm ${bgColor} ${borderColor} border p-5 transition-all duration-200 hover:shadow-md`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
          <div className="flex items-end">
            <span className="text-2xl font-bold text-gray-800 mr-2">{value}</span>
            {change && (
              <span className={`text-xs font-medium ${
                isPositive ? 'text-green-600' : 
                isNegative ? 'text-red-600' : 
                'text-gray-500'
              }`}>
                {change}
                {!isNeutral && (
                  <span className="ml-1">
                    {isPositive ? 'from last month' : isNegative ? 'from last month' : ''}
                  </span>
                )}
              </span>
            )}
          </div>
        </div>
        <div className={`p-2 rounded-lg ${
          bgColor === 'bg-amber-50' ? 'bg-amber-100' :
          bgColor === 'bg-emerald-50' ? 'bg-emerald-100' :
          bgColor === 'bg-purple-50' ? 'bg-purple-100' :
          bgColor === 'bg-blue-50' ? 'bg-blue-100' :
          'bg-gray-100'
        }`}>
          {icon}
        </div>
      </div>
      
      {isPositive && (
        <div className="mt-4 pt-3 border-t border-dashed border-gray-200">
          <div className="flex items-center">
            <svg className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-xs text-gray-500">Growing trend</span>
          </div>
        </div>
      )}
      
      {isNegative && (
        <div className="mt-4 pt-3 border-t border-dashed border-gray-200">
          <div className="flex items-center">
            <svg className="h-4 w-4 text-red-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
            </svg>
            <span className="text-xs text-gray-500">Declining trend</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;