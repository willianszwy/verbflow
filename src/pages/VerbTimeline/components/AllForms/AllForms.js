import React from 'react';
import { conjugateVerb } from '../../utils/verbConjugation';

const AllForms = ({ 
  verbData, 
  selectedVerb, 
  selectedBaseVerb, 
  selectedPronoun, 
  onVerbClick, 
  isDarkMode,
  isNegative = false,
  isQuestion = false
}) => {
  // Safety check for verbData
  if (!verbData || typeof verbData !== 'object') {
    return (
      <div className={`rounded-xl border transition-colors duration-300 p-6 shadow-sm ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-bold mb-4 transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          All Forms
        </h3>
        <div className={`text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Loading verb forms...
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border transition-colors duration-300 p-6 shadow-sm ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-bold mb-4 transition-colors duration-300 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        All Forms
      </h3>
      <div className="space-y-3">
        {Object.entries(verbData).map(([tenseKey, tenseData]) => (
          <div 
            key={tenseKey}
            className={`p-4 rounded-xl transition-all cursor-pointer text-base shadow-sm hover:shadow-md ${
              selectedVerb === tenseKey 
                ? isDarkMode ? 'bg-gray-700 shadow-md' : 'bg-gray-100 shadow-md'
                : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            }`}
            onClick={() => onVerbClick(tenseKey)}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm" style={{ color: tenseData.color }}>
                {tenseData.name.replace('Simple ', '').replace('Present ', '')}
              </span>
              <span className={`font-semibold text-sm sm:text-base truncate ml-3 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-900'
              }`}>
                {(() => {
                  const conjugated = conjugateVerb(selectedBaseVerb, tenseKey, selectedPronoun, isNegative, isQuestion);
                  if (isQuestion || (isNegative && isQuestion)) {
                    return conjugated;
                  }
                  return `${selectedPronoun} ${conjugated}`;
                })()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllForms;