import React from 'react';
import { useOutletContext } from 'react-router-dom';

const FluentFlowTest = () => {
  const { isDarkMode } = useOutletContext();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className={`text-3xl md:text-4xl font-bold mb-2 text-center ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          FluentFlow Test
        </h1>
        <p className={`text-lg text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          This is a test page to see if the routing works
        </p>

        <div className="mt-8 p-6 rounded-lg border bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <p className={`text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            If you can see this text, the FluentFlow routing is working correctly!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FluentFlowTest;