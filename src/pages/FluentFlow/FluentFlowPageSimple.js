import React, { useState, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import LevelSelector from './components/LevelSelector';
import { getRandomPromptWithHistory } from './data/promptDatabase';

const FluentFlowPage = () => {
  const { isDarkMode } = useOutletContext();

  // Level configuration - memoized to prevent re-renders
  const levels = useMemo(() => ({
    foundation: { name: 'Foundation', difficulty: '⭐', time: 30, description: '30s - Take your time' },
    building: { name: 'Building', difficulty: '⭐⭐', time: 20, description: '20s - Quicker responses' },
    mastery: { name: 'Mastery', difficulty: '⭐⭐⭐', time: 10, description: '10s - Rapid-fire' }
  }), []);

  // Game state
  const [currentPrompt, setCurrentPrompt] = useState(() => {
    const initialPrompt = getRandomPromptWithHistory([], null, 'foundation');
    return initialPrompt.prompt;
  });
  const [currentPromptInfo, setCurrentPromptInfo] = useState(() => {
    return getRandomPromptWithHistory([], null, 'foundation');
  });
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [promptCount, setPromptCount] = useState(0);
  const [response, setResponse] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('foundation');
  const [recentPrompts, setRecentPrompts] = useState([]);
  const [responseHistory, setResponseHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Timer state
  const [timeLeft, setTimeLeft] = useState(levels.foundation.time);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isTimerComplete, setIsTimerComplete] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      setIsTimerActive(false);
      setIsTimerComplete(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timeLeft]);

  // Update timer when level changes
  useEffect(() => {
    if (!isTimerActive && !isTimerComplete) {
      setTimeLeft(levels[selectedLevel].time);
    }
  }, [selectedLevel, isTimerActive, isTimerComplete, levels]);

  // Start timer
  const handleStartResponse = () => {
    setIsTimerActive(true);
    setIsTimerComplete(false);
    setTimeLeft(levels[selectedLevel].time);
  };

  // Generate new prompt
  const generateNewPrompt = (level = selectedLevel) => {
    const newPromptInfo = getRandomPromptWithHistory(recentPrompts, null, level);
    setCurrentPrompt(newPromptInfo.prompt);
    setCurrentPromptInfo(newPromptInfo);

    // Add to recent prompts and keep only last 20
    setRecentPrompts(prev => {
      const updated = [newPromptInfo.prompt, ...prev];
      return updated.slice(0, 20);
    });
  };

  // Handle level change
  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    // Reset timer and game state when level changes
    setIsTimerActive(false);
    setIsTimerComplete(false);
    setTimeLeft(levels[level].time);
    setResponse('');
    setScore(0);
    setStreak(0);
    setPromptCount(0);
    setRecentPrompts([]);
    setResponseHistory([]);

    // Generate new prompt for the new level
    generateNewPrompt(level);
  };

  // Handle response submission
  const handleSubmitResponse = () => {
    const responseLength = response.trim().length;
    const timeBonus = timeLeft;
    const baseScore = responseLength > 20 ? 10 : 5;
    const totalScore = baseScore + timeBonus;

    setScore(prev => prev + totalScore);
    setStreak(prev => prev + 1);
    setPromptCount(prev => prev + 1);

    // Save to response history
    setResponseHistory(prev => {
      const historyEntry = {
        prompt: currentPrompt,
        response: response.trim(),
        score: totalScore,
        timeUsed: levels[selectedLevel].time - timeLeft,
        timestamp: new Date().toLocaleTimeString(),
        level: selectedLevel,
        category: currentPromptInfo.category
      };
      const updated = [historyEntry, ...prev];
      return updated.slice(0, 10); // Keep last 10 responses
    });

    // Reset for next prompt
    setResponse('');
    setIsTimerActive(false);
    setIsTimerComplete(false);
    setTimeLeft(levels[selectedLevel].time);

    // Generate new random prompt
    generateNewPrompt();
  };

  // Skip prompt
  const handleSkipPrompt = () => {
    setStreak(0);
    setPromptCount(prev => prev + 1);

    // Save skipped prompt to history
    setResponseHistory(prev => {
      const historyEntry = {
        prompt: currentPrompt,
        response: '(skipped)',
        score: 0,
        timeUsed: levels[selectedLevel].time - timeLeft,
        timestamp: new Date().toLocaleTimeString(),
        level: selectedLevel,
        category: currentPromptInfo.category,
        skipped: true
      };
      const updated = [historyEntry, ...prev];
      return updated.slice(0, 10);
    });

    setResponse('');
    setIsTimerActive(false);
    setIsTimerComplete(false);
    setTimeLeft(levels[selectedLevel].time);

    // Generate new random prompt
    generateNewPrompt();
  };

  // Calculate progress percentage for timer circle based on current level
  const maxTime = levels[selectedLevel].time;
  const progressPercentage = (timeLeft / maxTime) * 100;
  const strokeDasharray = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = strokeDasharray - (progressPercentage / 100) * strokeDasharray;

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

        {/* Level Selector */}
        <div className="mb-8">
          <LevelSelector
            selectedLevel={selectedLevel}
            onLevelChange={handleLevelChange}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Stats Bar */}
        <div className={`flex justify-between items-center mb-8 p-4 rounded-lg border transition-colors duration-300 ${
          isDarkMode ? 'bg-orange-900/20 border-orange-800' : 'bg-orange-50 border-orange-200'
        }`}>
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
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s linear' }}
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
        } ${isDarkMode ? 'border-orange-800 bg-orange-900/20' : 'border-orange-200 bg-orange-50'}`}>
          {/* Prompt Category Badge */}
          <div className="flex justify-center mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              isDarkMode ? 'bg-orange-800 text-orange-200' : 'bg-orange-100 text-orange-800'
            }`}>
              {currentPromptInfo.categoryName} • {levels[selectedLevel].difficulty}
            </span>
          </div>

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
                Start Response ({levels[selectedLevel].time}s)
              </button>
            </div>
          )}

          {isTimerActive && (
            <div className="space-y-4">
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Start typing your response..."
                className={`w-full h-32 p-4 rounded-lg border-2 transition-colors resize-none ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:border-orange-500`}
                autoFocus
              />
              <div className="text-center">
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Keep typing! Time remaining: {timeLeft}s
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

        {/* Response History */}
        {responseHistory.length > 0 && (
          <div className={`mb-8 p-6 rounded-lg border transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Response History
              </h4>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  isDarkMode
                    ? 'bg-orange-800 text-orange-200 hover:bg-orange-700'
                    : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                }`}
              >
                {showHistory ? 'Hide' : 'Show'} ({responseHistory.length})
              </button>
            </div>

            {showHistory && (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {responseHistory.map((entry, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    entry.skipped
                      ? (isDarkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200')
                      : (isDarkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200')
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {entry.category} • {entry.level} • {entry.timestamp}
                      </span>
                      <span className={`text-sm font-medium ${
                        entry.skipped
                          ? (isDarkMode ? 'text-red-400' : 'text-red-600')
                          : (isDarkMode ? 'text-green-400' : 'text-green-600')
                      }`}>
                        {entry.skipped ? 'Skipped' : `+${entry.score} pts`}
                      </span>
                    </div>
                    <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      <strong>Prompt:</strong> {entry.prompt}
                    </p>
                    <p className={`text-sm ${
                      entry.skipped
                        ? (isDarkMode ? 'text-red-300 italic' : 'text-red-600 italic')
                        : (isDarkMode ? 'text-gray-300' : 'text-gray-700')
                    }`}>
                      <strong>Response:</strong> {entry.response}
                    </p>
                    {!entry.skipped && (
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Time used: {entry.timeUsed}s
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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