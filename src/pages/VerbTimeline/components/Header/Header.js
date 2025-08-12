import React from 'react';

const Header = ({ isDarkMode, showThemeToggle = true }) => {
  return (
    <div className={`border-b transition-colors duration-300 py-6 ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-center">
        <h1 className={`text-2xl font-medium transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Verb Timeline
        </h1>
      </div>
    </div>
  );
};

export default Header;