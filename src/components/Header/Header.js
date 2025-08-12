import React from 'react';
import { ThemeIcon } from '../Icons';

const Header = ({ isDarkMode, onToggleTheme }) => {
  return (
    <div className={`border-b transition-colors duration-300 py-6 ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <h1 className={`text-2xl font-medium transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          VerbFlow
        </h1>
        
        <button
          onClick={onToggleTheme}
          className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
            isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
          aria-label="Toggle theme"
        >
          <ThemeIcon isDarkMode={isDarkMode} />
        </button>
      </div>
    </div>
  );
};

export default Header;