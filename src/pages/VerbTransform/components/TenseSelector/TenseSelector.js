import React from 'react';
import { tenseLabels, tenseExamples } from '../../data/exerciseTemplates';

const TenseSelector = ({ currentTense, targetTense, onTenseChange, isDarkMode, tenseColors }) => {
  const availableTenses = Object.keys(tenseLabels).filter(tense => tense !== currentTense);

  return (
    <div className={`p-6 rounded-xl border transition-colors duration-300 shadow-sm ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="text-center">
        <h3 className={`text-lg font-medium mb-4 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Transform to:
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {availableTenses.map(tense => (
            <button
              key={tense}
              onClick={() => onTenseChange(tense)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border shadow-sm hover:shadow-md ${
                targetTense === tense
                  ? 'text-white border-transparent shadow-lg'
                  : isDarkMode 
                    ? 'text-gray-300 bg-gray-700 hover:bg-gray-600 border-gray-600 hover:text-white' 
                    : 'text-gray-700 bg-white hover:bg-gray-50 border-gray-200'
              }`}
              style={{
                backgroundColor: targetTense === tense ? tenseColors[tense] : undefined
              }}
            >
              {tenseLabels[tense]}
            </button>
          ))}
        </div>
        
        <div className={`text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <span className="font-medium">Example:</span> {tenseExamples[targetTense]}
        </div>
      </div>
    </div>
  );
};

export default TenseSelector;