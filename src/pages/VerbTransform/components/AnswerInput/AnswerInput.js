import React from 'react';

const AnswerInput = ({ value, onChange, onSubmit, isDarkMode, disabled }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !disabled && value.trim()) {
      onSubmit();
    }
  };

  return (
    <div className={`p-6 rounded-xl border transition-colors duration-300 shadow-sm ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="text-center">
        <label className={`block text-lg font-medium mb-4 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Your answer:
        </label>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          placeholder="Type the transformed sentence here..."
          className={`w-full max-w-2xl px-4 py-3 text-lg rounded-lg border-2 ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
          } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50`}
        />
        
        <div className={`mt-2 text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Press Enter or click "Check Answer" when ready
        </div>
      </div>
    </div>
  );
};

export default AnswerInput;