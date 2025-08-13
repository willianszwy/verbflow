import React from 'react';

const FeedbackModal = ({ isCorrect, userAnswer, correctAnswer, onNext, isDarkMode }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`max-w-md w-full p-6 rounded-xl border transition-colors duration-300 shadow-lg ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="text-center">
          {/* Icon and Title */}
          <div className="mb-4">
            {isCorrect ? (
              <>
                <div className="text-6xl mb-2">✅</div>
                <h3 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}>
                  Correct!
                </h3>
              </>
            ) : (
              <>
                <div className="text-6xl mb-2">❌</div>
                <h3 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-red-400' : 'text-red-600'
                }`}>
                  Not quite right
                </h3>
              </>
            )}
          </div>
          
          {/* Answer comparison */}
          <div className="mb-6 space-y-3">
            {!isCorrect && (
              <div>
                <p className={`text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Your answer:
                </p>
                <p className={`p-2 rounded ${
                  isDarkMode 
                    ? 'bg-red-900 text-red-200 border border-red-700' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  "{userAnswer}"
                </p>
              </div>
            )}
            
            <div>
              <p className={`text-sm font-medium mb-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Correct answer:
              </p>
              <p className={`p-2 rounded ${
                isDarkMode 
                  ? 'bg-green-900 text-green-200 border border-green-700' 
                  : 'bg-green-50 text-green-800 border border-green-200'
              }`}>
                "{correctAnswer}"
              </p>
            </div>
          </div>
          
          {/* Motivational message */}
          <div className={`mb-6 text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {isCorrect 
              ? "Great job! Keep up the excellent work!" 
              : "Don't worry, you're learning! Try the next one."
            }
          </div>
          
          {/* Next button */}
          <button
            onClick={onNext}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
          >
            Next Exercise
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;