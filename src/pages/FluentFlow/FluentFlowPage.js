import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const FluentFlowPage = () => {
  const { isDarkMode } = useOutletContext();

  // Timer state
  const [timeLeft, setTimeLeft] = useState(10);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerComplete, setIsTimerComplete] = useState(false);

  // Game state
  const [currentPrompt, setCurrentPrompt] = useState("What would you do if you won the lottery?");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [promptCount, setPromptCount] = useState(0);
  const [response, setResponse] = useState('');

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      setIsTimerComplete(true);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  // Start timer
  const handleStartResponse = () => {
    setIsTimerActive(true);
    setIsTimerComplete(false);
    setTimeLeft(10);
  };

  // Handle response submission
  const handleSubmitResponse = () => {
    const responseLength = response.trim().length;
    const timeBonus = timeLeft; // More time left = better bonus
    const baseScore = responseLength > 20 ? 10 : 5; // Basic scoring

    setScore(prev => prev + baseScore + timeBonus);
    setStreak(prev => prev + 1);
    setPromptCount(prev => prev + 1);

    // Reset for next prompt
    setResponse('');
    setIsTimerActive(false);
    setIsTimerComplete(false);
    setTimeLeft(10);

    // TODO: Generate new prompt
    setCurrentPrompt("What's your favorite way to spend a weekend?");
  };

  // Skip prompt
  const handleSkipPrompt = () => {
    setStreak(0);
    setPromptCount(prev => prev + 1);
    setResponse('');
    setIsTimerActive(false);
    setIsTimerComplete(false);
    setTimeLeft(10);

    // TODO: Generate new prompt
    setCurrentPrompt("Describe your ideal vacation destination.");
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            FluentFlow
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Quick response training for instant fluency
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex justify-between items-center mb-8 p-4 rounded-lg border transition-colors duration-300 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
              {score}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Score
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
              {streak}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Streak
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`}>
              {promptCount}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Prompts
            </div>
          </div>
        </div>

        {/* Timer Circle */}
        <div className="flex justify-center mb-8">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke={isDarkMode ? '#374151' : '#E5E7EB'}
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#F39C12"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(timeLeft / 10) * 283} 283`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-2xl font-bold ${
                timeLeft <= 3 ? 'text-red-500' : isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {timeLeft}
              </span>
            </div>
          </div>
        </div>

        {/* Prompt Card */}
        <div className={`p-6 rounded-xl border-2 mb-6 transition-all duration-200 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20`}>
          <h3 className={`text-xl font-semibold mb-4 text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {currentPrompt}
          </h3>

          {!isTimerActive && !isTimerComplete && (
            <div className="text-center">
              <button
                onClick={handleStartResponse}
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg"
              >
                Start Response (10s)
              </button>
            </div>
          )}

          {isTimerActive && (
            <div className="space-y-4">
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Start speaking or typing your response..."
                className={`w-full h-32 p-4 rounded-lg border-2 transition-colors resize-none ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:border-orange-500`}
                autoFocus
              />
              <div className="text-center">
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Keep talking! Time remaining: {timeLeft}s
                </p>
              </div>
            </div>
          )}

          {isTimerComplete && (
            <div className="space-y-4">
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Time's up! You can still add to your response..."
                className={`w-full h-32 p-4 rounded-lg border-2 transition-colors resize-none ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:border-orange-500`}
              />
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleSubmitResponse}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Submit Response
                </button>
                <button
                  onClick={handleSkipPrompt}
                  className={`px-6 py-2 rounded-lg font-medium border-2 transition-colors ${
                    isDarkMode
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Skip
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className={`p-6 rounded-lg border transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h4 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            How to Play:
          </h4>
          <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
              Read the prompt and click "Start Response"
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
              You have 10 seconds to respond as fluently as possible
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
              Longer responses and faster completion earn more points
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
              Build streaks for bonus multipliers
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FluentFlowPage;