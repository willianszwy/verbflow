import React from 'react';

const PronounSelector = ({ 
  pronouns, 
  selectedPronoun, 
  onPronounChange, 
  isDarkMode 
}) => {
  return (
    <div>
      <label className={`text-base font-semibold mb-4 block transition-colors duration-300 ${
        isDarkMode ? 'text-gray-200' : 'text-gray-800'
      }`}>
        Choose Pronoun
      </label>
      <div className="flex flex-wrap gap-3">
        {pronouns.map((pronoun) => (
          <button
            key={pronoun.key}
            onClick={() => onPronounChange(pronoun.key)}
            className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 shadow-sm hover:shadow-md ${
              selectedPronoun === pronoun.key 
                ? isDarkMode ? 'bg-white text-gray-900 shadow-lg' : 'bg-gray-900 text-white shadow-lg'
                : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {pronoun.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PronounSelector;