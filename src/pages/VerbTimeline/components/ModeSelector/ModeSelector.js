import React from 'react';

const ModeSelector = ({ 
  isNegative, 
  isQuestion, 
  isContraction, 
  onNegativeChange, 
  onQuestionChange, 
  onContractionChange, 
  isDarkMode 
}) => {
  return (
    <div>
      <label className={`text-base font-semibold mb-4 block transition-colors duration-300 ${
        isDarkMode ? 'text-gray-200' : 'text-gray-800'
      }`}>
        Sentence Mode
      </label>
      <div className="flex gap-4 flex-wrap">
        
        {/* Negative Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNegativeChange(!isNegative)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isNegative 
                ? 'bg-red-500 focus:ring-red-500' 
                : isDarkMode ? 'bg-gray-600 focus:ring-gray-400' : 'bg-gray-300 focus:ring-gray-500'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                isNegative ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors duration-300 ${
            isNegative 
              ? 'text-red-500' 
              : isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Negative
          </span>
        </div>

        {/* Question Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onQuestionChange(!isQuestion)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isQuestion 
                ? 'bg-blue-500 focus:ring-blue-500' 
                : isDarkMode ? 'bg-gray-600 focus:ring-gray-400' : 'bg-gray-300 focus:ring-gray-500'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                isQuestion ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors duration-300 ${
            isQuestion 
              ? 'text-blue-500' 
              : isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Question
          </span>
        </div>

        {/* Contraction Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onContractionChange(!isContraction)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isContraction 
                ? 'bg-green-500 focus:ring-green-500' 
                : isDarkMode ? 'bg-gray-600 focus:ring-gray-400' : 'bg-gray-300 focus:ring-gray-500'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                isContraction ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors duration-300 ${
            isContraction 
              ? 'text-green-500' 
              : isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Contractions
          </span>
        </div>

      </div>
    </div>
  );
};

export default ModeSelector;