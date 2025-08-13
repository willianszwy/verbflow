import React from 'react';

const ProgressTracker = ({ current, total, isDarkMode }) => {
  const percentage = (current / total) * 100;

  return (
    <div className={`p-4 rounded-lg border transition-colors duration-300 shadow-sm ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="text-center">
        <div className={`text-sm font-medium mb-2 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Progress: {current}/{total}
        </div>
        
        <div className={`w-32 h-2 rounded-full ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <div 
            className="h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className={`text-xs mt-1 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {Math.round(percentage)}% complete
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;