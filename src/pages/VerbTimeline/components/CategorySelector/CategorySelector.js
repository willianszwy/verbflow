import React from 'react';

const CategorySelector = ({ 
  verbCategories, 
  selectedCategory, 
  selectedLevel, 
  onCategoryChange, 
  isDarkMode 
}) => {
  return (
    <div className="mb-6">
      <label className={`text-base font-semibold mb-4 block transition-colors duration-300 ${
        isDarkMode ? 'text-gray-200' : 'text-gray-800'
      }`}>
        Choose Category
      </label>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {Object.entries(verbCategories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => {
              onCategoryChange(key);
              const firstVerb = category.verbs[selectedLevel][0];
              return firstVerb;
            }}
            className={`px-6 py-3 text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-300 flex items-center gap-3 shadow-sm hover:shadow-md ${
              selectedCategory === key
                ? isDarkMode ? 'bg-white text-gray-900 shadow-lg' : 'bg-gray-900 text-white shadow-lg'
                : isDarkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;