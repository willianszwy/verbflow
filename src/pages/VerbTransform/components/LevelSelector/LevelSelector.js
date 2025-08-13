import React from 'react';

const LevelSelector = ({ levels, selectedLevel, onLevelChange, isDarkMode }) => {
  return (
    <div className={`p-6 rounded-xl border transition-colors duration-300 shadow-sm ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-medium mb-4 text-center ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        Select Difficulty Level
      </h3>
      
      <div className="flex justify-center gap-4">
        {Object.entries(levels).map(([key, level]) => (
          <button
            key={key}
            onClick={() => onLevelChange(key)}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border shadow-sm hover:shadow-md ${
              selectedLevel === key
                ? 'text-white border-transparent shadow-lg'
                : isDarkMode 
                  ? 'text-gray-300 bg-gray-700 hover:bg-gray-600 border-gray-600 hover:text-white' 
                  : 'text-gray-700 bg-white hover:bg-gray-50 border-gray-200'
            }`}
            style={{
              backgroundColor: selectedLevel === key ? level.color : undefined
            }}
          >
            <div className="flex flex-col items-center">
              <span className="mb-1">{level.difficulty}</span>
              <span>{level.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;