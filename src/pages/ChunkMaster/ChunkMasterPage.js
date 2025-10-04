import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { getRandomChunkWithHistory, generateWrongAnswers, getAllChunks } from './data/chunksDatabase';
import LevelSelector from './components/LevelSelector';

const ChunkMasterPage = () => {
  const { isDarkMode } = useOutletContext();

  // Practice modes
  const modes = useMemo(() => ({
    recognition: {
      name: 'Recognition',
      description: 'Choose the correct meaning',
      icon: '🎯'
    },
    completion: {
      name: 'Completion',
      description: 'Fill in the missing words',
      icon: '✏️'
    },
    context: {
      name: 'Context',
      description: 'Use in a sentence',
      icon: '💬'
    }
  }), []);

  // All chunks for generating wrong answers
  const allChunks = useMemo(() => getAllChunks(), []);

  // Game state
  const [selectedMode, setSelectedMode] = useState('recognition');
  const [currentChunk, setCurrentChunk] = useState(() => {
    return getRandomChunkWithHistory([], null, 'foundation');
  });
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [recentChunks, setRecentChunks] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState('foundation');
  const [exerciseHistory, setExerciseHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Generate new chunk
  const generateNewChunk = () => {
    const newChunk = getRandomChunkWithHistory(recentChunks, null, selectedLevel);
    setCurrentChunk(newChunk);

    // Add to recent chunks and keep only last 20
    setRecentChunks(prev => {
      const updated = [newChunk.expression, ...prev];
      return updated.slice(0, 20);
    });
  };

  // Handle mode change
  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    // Reset game state when mode changes
    setScore(0);
    setStreak(0);
    setExerciseCount(0);
    setUserAnswer('');
    setShowFeedback(false);
    setRecentChunks([]);
    setExerciseHistory([]);

    // Generate new chunk
    generateNewChunk();
  };

  // Handle level change
  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    // Reset game state when level changes
    setScore(0);
    setStreak(0);
    setExerciseCount(0);
    setUserAnswer('');
    setShowFeedback(false);
    setRecentChunks([]);
    setExerciseHistory([]);

    // Generate new chunk with new level
    const newChunk = getRandomChunkWithHistory([], null, level);
    setCurrentChunk(newChunk);
    setRecentChunks([newChunk.expression]);
  };

  // Handle answer submission
  const handleSubmitAnswer = () => {
    let correct = false;

    if (selectedMode === 'recognition') {
      // In recognition mode, check if selected answer matches the correct meaning
      correct = userAnswer === currentChunk.meaning;
    } else if (selectedMode === 'completion') {
      // In completion mode, check for key words from the expression
      const expressionWords = currentChunk.expression.toLowerCase().split(' ');
      const userWords = userAnswer.toLowerCase().trim();

      // Simple validation - check if user provided a reasonable word
      correct = expressionWords.some(word =>
        word.length > 2 && userWords.includes(word)
      );
    } else if (selectedMode === 'context') {
      // In context mode, check if the expression is used in the sentence
      const expressionLower = currentChunk.expression.toLowerCase();
      const userAnswerLower = userAnswer.toLowerCase();

      correct = userAnswerLower.includes(expressionLower) && userAnswer.trim().length > 10;
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    const pointsEarned = correct ? (10 + (streak >= 3 ? 5 : 0)) : -5;

    if (correct) {
      setScore(prev => prev + 10 + (streak >= 3 ? 5 : 0));
      setStreak(prev => prev + 1);
    } else {
      setScore(prev => Math.max(0, prev - 5));
      setStreak(0);
    }

    // Save to exercise history
    setExerciseHistory(prev => {
      const historyEntry = {
        expression: currentChunk.expression,
        meaning: currentChunk.meaning,
        userAnswer: userAnswer.trim(),
        correct: correct,
        mode: selectedMode,
        score: pointsEarned,
        timestamp: new Date().toLocaleTimeString(),
        level: selectedLevel,
        category: currentChunk.categoryName
      };
      const updated = [historyEntry, ...prev];
      return updated.slice(0, 10); // Keep last 10 exercises
    });

    setExerciseCount(prev => prev + 1);
  };

  // Handle next exercise
  const handleNextExercise = () => {
    setShowFeedback(false);
    setUserAnswer('');

    // Generate new chunk from database
    generateNewChunk();
  };

  // Render practice content based on mode
  const renderPracticeContent = () => {
    switch (selectedMode) {
      case 'recognition': {
        // Generate wrong answers dynamically
        const wrongAnswers = generateWrongAnswers(currentChunk, allChunks);
        const allOptions = [currentChunk.meaning, ...wrongAnswers].sort(() => Math.random() - 0.5);

        return (
          <div className="space-y-6">
            <div className={`p-6 rounded-lg border-2 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-900/20`}>
              <div className="flex justify-center mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isDarkMode ? 'bg-teal-800 text-teal-200' : 'bg-teal-100 text-teal-800'
                }`}>
                  {currentChunk.categoryName} • Recognition
                </span>
              </div>
              <h3 className={`text-2xl font-bold text-center mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                "{currentChunk.expression}"
              </h3>
              <p className={`text-center text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                What does this expression mean?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {allOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setUserAnswer(option)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    userAnswer === option
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30'
                      : isDarkMode
                        ? 'border-gray-600 bg-gray-700 hover:bg-gray-600'
                        : 'border-gray-300 bg-white hover:bg-gray-50'
                  }`}
                >
                  <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      }

      case 'completion': {
        // Create a version with missing words
        const words = currentChunk.expression.split(' ');
        const keyWordIndex = Math.floor(words.length / 2); // Remove middle word
        const keyWord = words[keyWordIndex];
        const incompleteExpression = words.map((word, index) =>
          index === keyWordIndex ? '_____' : word
        ).join(' ');

        return (
          <div className="space-y-6">
            <div className={`p-6 rounded-lg border-2 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-900/20`}>
              <div className="flex justify-center mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isDarkMode ? 'bg-teal-800 text-teal-200' : 'bg-teal-100 text-teal-800'
                }`}>
                  {currentChunk.categoryName} • Completion
                </span>
              </div>
              <h3 className={`text-xl font-semibold text-center mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Complete the expression:
              </h3>
              <p className={`text-center text-lg font-mono ${
                isDarkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                "{incompleteExpression}"
              </p>
              <p className={`text-center text-sm mt-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Meaning: {currentChunk.meaning}
              </p>
            </div>

            <div>
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder={`Type the missing word (hint: starts with "${keyWord[0]}")`}
                className={`w-full p-4 rounded-lg border-2 transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:border-teal-500`}
                autoFocus
              />
            </div>
          </div>
        );
      }

      case 'context':
        return (
          <div className="space-y-6">
            <div className={`p-6 rounded-lg border-2 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-900/20`}>
              <h3 className={`text-xl font-semibold text-center mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Use this expression in a sentence:
              </h3>
              <p className={`text-center text-2xl font-bold ${
                isDarkMode ? 'text-teal-400' : 'text-teal-600'
              }`}>
                "{currentChunk.expression}"
              </p>
              <p className={`text-center text-sm mt-2 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Meaning: {currentChunk.meaning}
              </p>
            </div>

            <div>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Write a sentence using this expression..."
                className={`w-full h-32 p-4 rounded-lg border-2 transition-colors resize-none ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:border-teal-500`}
                autoFocus
              />
            </div>
          </div>
        );

      default:
        return null;
    }
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
            ChunkMaster
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Master essential English expressions for natural conversation
          </p>
        </div>

        {/* Level Selector */}
        <LevelSelector
          selectedLevel={selectedLevel}
          onLevelChange={handleLevelChange}
          isDarkMode={isDarkMode}
        />

        {/* Mode Selector */}
        <div className={`p-6 rounded-lg border transition-colors duration-300 mb-8 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Practice Mode
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(modes).map(([key, mode]) => (
              <button
                key={key}
                onClick={() => handleModeChange(key)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedMode === key
                    ? `border-teal-500 ${isDarkMode ? 'bg-teal-900/30' : 'bg-teal-50'}`
                    : `border-gray-300 dark:border-gray-600 ${
                        isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                      }`
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{mode.icon}</div>
                  <div className={`text-sm font-medium mb-1 ${
                    selectedMode === key
                      ? 'text-teal-600 dark:text-teal-400'
                      : isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {mode.name}
                  </div>
                  <div className={`text-xs ${
                    selectedMode === key
                      ? 'text-teal-500 dark:text-teal-300'
                      : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    {mode.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className={`flex justify-between items-center mb-8 p-4 rounded-lg border transition-colors duration-300 ${
          isDarkMode ? 'bg-teal-900/20 border-teal-800' : 'bg-teal-50 border-teal-200'
        }`}>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>
              {score}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Score
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>
              {streak}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Streak
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-teal-400' : 'text-teal-600'}`}>
              {exerciseCount}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Exercises
            </div>
          </div>
        </div>

        {/* Practice Content */}
        {renderPracticeContent()}

        {/* Action Buttons */}
        {!showFeedback && (
          <div className="flex gap-4 justify-center mt-8">
            <button
              onClick={handleSubmitAnswer}
              disabled={!userAnswer.trim()}
              className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Check Answer
            </button>
          </div>
        )}

        {/* Feedback Modal */}
        {showFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`max-w-md w-full rounded-xl p-6 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="text-center">
                <div className="text-4xl mb-4">
                  {isCorrect ? '🎉' : '💭'}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {isCorrect ? 'Correct!' : 'Keep Learning!'}
                </h3>
                <p className={`text-sm mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {isCorrect
                    ? 'Great job! You understand this expression.'
                    : 'No worries, you\'ll get it with practice.'
                  }
                </p>

                <div className={`p-4 rounded-lg mb-4 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <p className={`text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    "{currentChunk.expression}"
                  </p>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {currentChunk.meaning}
                  </p>
                  <p className={`text-xs mt-2 italic ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    Example: {currentChunk.example}
                  </p>
                </div>

                <button
                  onClick={handleNextExercise}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Next Exercise
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Exercise History */}
        {exerciseHistory.length > 0 && (
          <div className={`mt-8 p-6 rounded-lg border transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Exercise History
              </h4>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  isDarkMode
                    ? 'bg-teal-800 text-teal-200 hover:bg-teal-700'
                    : 'bg-teal-100 text-teal-800 hover:bg-teal-200'
                }`}
              >
                {showHistory ? 'Hide' : 'Show'} ({exerciseHistory.length})
              </button>
            </div>

            {showHistory && (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {exerciseHistory.map((entry, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    entry.correct
                      ? (isDarkMode ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200')
                      : (isDarkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200')
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {entry.category} • {entry.mode} • {entry.level} • {entry.timestamp}
                      </span>
                      <span className={`text-sm font-medium ${
                        entry.correct
                          ? (isDarkMode ? 'text-green-400' : 'text-green-600')
                          : (isDarkMode ? 'text-red-400' : 'text-red-600')
                      }`}>
                        {entry.correct ? `+${entry.score} pts` : `${entry.score} pts`}
                      </span>
                    </div>
                    <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      <strong>Expression:</strong> "{entry.expression}"
                    </p>
                    <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>Meaning:</strong> {entry.meaning}
                    </p>
                    <p className={`text-sm ${
                      entry.correct
                        ? (isDarkMode ? 'text-gray-300' : 'text-gray-700')
                        : (isDarkMode ? 'text-red-300' : 'text-red-600')
                    }`}>
                      <strong>Your Answer:</strong> {entry.userAnswer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className={`mt-8 p-6 rounded-lg border transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h4 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            How ChunkMaster Works:
          </h4>
          <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></span>
              <strong>Recognition:</strong> Choose the correct meaning of expressions
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></span>
              <strong>Completion:</strong> Fill in missing words in common chunks
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></span>
              <strong>Context:</strong> Use expressions naturally in sentences
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></span>
              Build streaks to earn bonus points and master chunks faster
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChunkMasterPage;