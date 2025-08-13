import React from 'react';

const CategorySelector = ({ categories, selectedCategory, onCategoryChange, isDarkMode }) => {
  return (
    <div className={`p-6 rounded-xl border transition-colors duration-300 shadow-sm ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-medium mb-4 text-center ${
        isDarkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        Choose a Category
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {Object.entries(categories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => onCategoryChange(key)}
            className={`p-4 rounded-lg text-center transition-all duration-200 border ${
              selectedCategory === key
                ? isDarkMode 
                  ? 'bg-indigo-900 border-indigo-700 text-indigo-200' 
                  : 'bg-indigo-100 border-indigo-300 text-indigo-800'
                : isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <i className={`${category.icon} text-xl mb-2 block`}></i>
            <span className="text-sm font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;