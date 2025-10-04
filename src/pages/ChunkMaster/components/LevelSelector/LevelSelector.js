import React from 'react';

const LevelSelector = ({ selectedLevel, onLevelChange, isDarkMode }) => {
  const levels = [
    {
      key: 'foundation',
      name: 'Foundation',
      icon: '⭐',
      description: 'Basic expressions'
    },
    {
      key: 'building',
      name: 'Building',
      icon: '⭐⭐',
      description: 'Common chunks'
    },
    {
      key: 'mastery',
      name: 'Mastery',
      icon: '⭐⭐⭐',
      description: 'Advanced expressions'
    }
  ];

  return (
    <div className={`p-6 rounded-lg border transition-colors duration-300 mb-8 ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        Difficulty Level
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {levels.map((level) => (
          <button
            key={level.key}
            onClick={() => onLevelChange(level.key)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedLevel === level.key
                ? `border-teal-500 ${isDarkMode ? 'bg-teal-900/30' : 'bg-teal-50'}`
                : `border-gray-300 dark:border-gray-600 ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                  }`
            }`}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">{level.icon}</div>
              <div className={`text-sm font-medium mb-1 ${
                selectedLevel === level.key
                  ? 'text-teal-600 dark:text-teal-400'
                  : isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {level.name}
              </div>
              <div className={`text-xs ${
                selectedLevel === level.key
                  ? 'text-teal-500 dark:text-teal-300'
                  : isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {level.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;