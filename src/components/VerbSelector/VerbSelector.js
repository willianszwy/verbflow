import React from 'react';
import { RandomIcon } from '../Icons';

const VerbSelector = ({ 
  verbCategories, 
  selectedCategory, 
  selectedLevel, 
  selectedBaseVerb, 
  onVerbChange, 
  onRandomVerb,
  isDarkMode 
}) => {
  return (
    <div className="mb-6">
      <label className={`text-base font-semibold mb-4 block transition-colors duration-300 ${
        isDarkMode ? 'text-gray-200' : 'text-gray-800'
      }`}>
        Select Verb
      </label>
      <div className="flex gap-3 items-center">
        <select 
          value={selectedBaseVerb}
          onChange={(e) => onVerbChange(e.target.value)}
          className={`flex-1 px-4 py-3 border rounded-xl text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer transition-all duration-300 shadow-sm ${
            isDarkMode 
              ? 'bg-gray-700 text-white focus:ring-gray-500 border-gray-600' 
              : 'bg-gray-50 text-gray-900 focus:ring-gray-900 border-gray-200 hover:bg-white'
          }`}
        >
          {verbCategories[selectedCategory].verbs[selectedLevel].map((verb) => (
            <option key={verb} value={verb}>{verb}</option>
          ))}
        </select>
        
        <button 
          onClick={onRandomVerb}
          className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white' 
              : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
          }`}
        >
          <RandomIcon />
          Random
        </button>
      </div>
    </div>
  );
};

export default VerbSelector;