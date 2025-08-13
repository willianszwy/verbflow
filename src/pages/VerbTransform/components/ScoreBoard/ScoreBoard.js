import React from 'react';

const ScoreBoard = ({ score, streak, isDarkMode }) => {
  return (
    <div className={`p-4 rounded-lg border transition-colors duration-300 shadow-sm ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center gap-6">
        {/* Score */}
        <div className="text-center">
          <div className={`text-2xl font-bold ${
            isDarkMode ? 'text-green-400' : 'text-green-600'
          }`}>
            {score}
          </div>
          <div className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Score
          </div>
        </div>
        
        {/* Streak */}
        <div className="text-center">
          <div className={`flex items-center justify-center ${
            streak >= 3 
              ? (isDarkMode ? 'text-orange-400' : 'text-orange-500')
              : (isDarkMode ? 'text-gray-400' : 'text-gray-600')
          }`}>
            <span className="text-xl font-bold">{streak}</span>
            {streak >= 3 && <span className="ml-1 text-lg">🔥</span>}
          </div>
          <div className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Streak
          </div>
        </div>
        
        {/* Streak bonus indicator */}
        {streak >= 3 && (
          <div className={`text-xs px-2 py-1 rounded-full ${
            isDarkMode 
              ? 'bg-orange-900 text-orange-200' 
              : 'bg-orange-100 text-orange-800'
          }`}>
            +5 bonus
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreBoard;