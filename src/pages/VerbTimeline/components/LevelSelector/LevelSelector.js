import React from 'react';

const LevelSelector = ({ 
  levels, 
  selectedLevel, 
  onLevelChange, 
  isDarkMode 
}) => {
  return (
    <div className="flex items-center gap-1">
      <span className={`text-base font-semibold mr-3 transition-colors duration-300 ${
        isDarkMode ? 'text-gray-200' : 'text-gray-800'
      }`}>
        Level:
      </span>
      {Object.entries(levels).map(([key, level]) => (
        <button
          key={key}
          onClick={() => onLevelChange(key)}
          className={`px-3 py-2 text-xl transition-all duration-300 rounded-lg hover:bg-gray-100 hover:bg-opacity-20 ${
            selectedLevel === key 
              ? 'opacity-100 scale-125 shadow-sm' 
              : 'opacity-50 hover:opacity-80 hover:scale-105'
          }`}
        >
          {level.difficulty}
        </button>
      ))}
    </div>
  );
};

export default LevelSelector;