import React from 'react';
import { conjugateVerb } from '../../utils/verbConjugation';

const VerbDisplay = ({ 
  currentVerb, 
  selectedBaseVerb, 
  selectedPronoun, 
  verbCategories,
  selectedCategory,
  levels,
  selectedLevel,
  isAnimating, 
  isDarkMode 
}) => {
  const getCurrentExample = () => {
    const conjugated = conjugateVerb(selectedBaseVerb, currentVerb.name.toLowerCase().includes('past') ? 'past' : 
      currentVerb.name.toLowerCase().includes('perfect') ? 'perfect' :
      currentVerb.name.toLowerCase().includes('continuous') ? 'continuous' :
      currentVerb.name.toLowerCase().includes('future') ? 'future' : 'present', selectedPronoun);
    return `${selectedPronoun} ${conjugated}`;
  };

  return (
    <div className={`rounded-xl border transition-all duration-300 p-6 shadow-sm ${
      isAnimating ? 'opacity-50' : 'opacity-100'
    } ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-4 h-4 rounded-full shadow-sm"
          style={{ backgroundColor: currentVerb.color }}
        />
        <h3 className={`text-lg font-bold transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {currentVerb.name}
        </h3>
      </div>
      
      <div className="text-2xl font-bold mb-4" style={{ color: currentVerb.color }}>
        "{getCurrentExample()}"
      </div>
      
      <div className={`text-base mb-4 transition-colors duration-300 ${
        isDarkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {currentVerb.explanation}
      </div>
      
      <div className={`text-sm transition-colors duration-300 ${
        isDarkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        <span className="inline-flex items-center gap-2">
          {verbCategories[selectedCategory].icon} {verbCategories[selectedCategory].name}
        </span> • {levels[selectedLevel].difficulty}
      </div>
    </div>
  );
};

export default VerbDisplay;