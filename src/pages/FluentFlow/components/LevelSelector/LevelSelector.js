import React from 'react';

const LevelSelector = ({ selectedLevel, onLevelChange, isDarkMode }) => {
  const levels = {
    foundation: {
      name: 'Foundation',
      difficulty: '⭐',
      color: '#E74C3C',
      time: 30,
      description: '30 seconds - Take your time'
    },
    building: {
      name: 'Building',
      difficulty: '⭐⭐',
      color: '#F39C12',
      time: 20,
      description: '20 seconds - Quicker responses'
    },
    mastery: {
      name: 'Mastery',
      difficulty: '⭐⭐⭐',
      color: '#8E44AD',
      time: 10,
      description: '10 seconds - Rapid-fire'
    }
  };

  return (
    <div className={`p-6 rounded-lg border transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Difficulty Level
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(levels).map(([key, level]) => (
          <button
            key={key}
            onClick={() => onLevelChange(key)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedLevel === key
                ? `border-orange-500 ${isDarkMode ? 'bg-orange-900/30' : 'bg-orange-50'}`
                : `border-gray-300 dark:border-gray-600 ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                  }`
            }`}
          >
            <div className="text-center">
              <div className={`text-xl font-bold mb-1 ${
                selectedLevel === key
                  ? 'text-orange-600 dark:text-orange-400'
                  : isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {level.difficulty}
              </div>
              <div className={`text-sm font-medium mb-1 ${
                selectedLevel === key
                  ? 'text-orange-600 dark:text-orange-400'
                  : isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {level.name}
              </div>
              <div className={`text-xs ${
                selectedLevel === key
                  ? 'text-orange-500 dark:text-orange-300'
                  : isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {level.description}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className={`mt-4 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        Current: <span className={`font-medium ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
          {levels[selectedLevel].time} seconds
        </span>
      </div>
    </div>
  );
};

export default LevelSelector;