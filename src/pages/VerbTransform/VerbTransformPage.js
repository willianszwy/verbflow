import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ExerciseCard from './components/ExerciseCard/ExerciseCard';
import TenseSelector from './components/TenseSelector/TenseSelector';
import AnswerInput from './components/AnswerInput/AnswerInput';
import ScoreBoard from './components/ScoreBoard/ScoreBoard';
import FeedbackModal from './components/FeedbackModal/FeedbackModal';
import ProgressTracker from './components/ProgressTracker/ProgressTracker';
import CategorySelector from './components/CategorySelector/CategorySelector';
import LevelSelector from './components/LevelSelector/LevelSelector';
import { exerciseCategories, levels, tenseLabels } from './data/exerciseTemplates';
import { transformSentence, validateAnswer } from './utils/sentenceTransformer';

// VerbTimeline color system
const tenseColors = {
  past: '#E74C3C',
  present: '#27AE60',
  future: '#F39C12',
  perfect: '#8E44AD',
  continuous: '#3498DB'
};

const VerbTransformPage = () => {
  const { isDarkMode } = useOutletContext();
  
  // Game state
  const [currentExercise, setCurrentExercise] = useState(null);
  const [targetTense, setTargetTense] = useState('past');
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [totalExercises] = useState(10);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [gameCompleted, setGameCompleted] = useState(false);
  
  // Category and level selection
  const [selectedCategory, setSelectedCategory] = useState('basics');
  const [selectedLevel, setSelectedLevel] = useState('foundation');

  // Generate random exercise from selected category and level
  const generateExercise = () => {
    const categoryExercises = exerciseCategories[selectedCategory]?.exercises[selectedLevel];
    if (!categoryExercises || categoryExercises.length === 0) {
      // Fallback to basics foundation if selected category/level is empty
      const fallbackExercises = exerciseCategories.basics.exercises.foundation;
      const randomTemplate = fallbackExercises[Math.floor(Math.random() * fallbackExercises.length)];
      return {
        ...randomTemplate,
        category: 'basics',
        level: 'foundation'
      };
    }
    
    const randomTemplate = categoryExercises[Math.floor(Math.random() * categoryExercises.length)];
    return {
      ...randomTemplate,
      category: selectedCategory,
      level: selectedLevel
    };
  };

  // Initialize first exercise and regenerate when category/level changes
  useEffect(() => {
    setCurrentExercise(generateExercise());
    // Reset game state when category/level changes
    setScore(0);
    setStreak(0);
    setExerciseCount(0);
    setGameCompleted(false);
    setShowFeedback(false);
    setUserAnswer('');
  }, [selectedCategory, selectedLevel]);

  // Handle answer submission
  const handleSubmitAnswer = () => {
    if (!currentExercise || !userAnswer.trim()) return;

    const correctTransformation = transformSentence(
      currentExercise.sentence,
      currentExercise.tense,
      targetTense,
      currentExercise.subject
    );

    const isAnswerCorrect = validateAnswer(userAnswer.trim(), correctTransformation);
    
    setIsCorrect(isAnswerCorrect);
    setCorrectAnswer(correctTransformation);
    setShowFeedback(true);

    // Update score and streak
    if (isAnswerCorrect) {
      setScore(prev => prev + 10 + (streak >= 3 ? 5 : 0)); // Bonus for streak
      setStreak(prev => prev + 1);
    } else {
      setScore(prev => Math.max(0, prev - 5));
      setStreak(0);
    }

    setExerciseCount(prev => prev + 1);
  };

  // Handle next exercise
  const handleNextExercise = () => {
    setShowFeedback(false);
    setUserAnswer('');
    
    if (exerciseCount >= totalExercises) {
      setGameCompleted(true);
    } else {
      setCurrentExercise(generateExercise());
      // Randomize target tense occasionally
      if (Math.random() > 0.7) {
        const tenses = ['past', 'future', 'perfect', 'continuous'];
        setTargetTense(tenses[Math.floor(Math.random() * tenses.length)]);
      }
    }
  };

  // Handle skip exercise
  const handleSkipExercise = () => {
    setStreak(0);
    setExerciseCount(prev => prev + 1);
    
    if (exerciseCount >= totalExercises - 1) {
      setGameCompleted(true);
    } else {
      setCurrentExercise(generateExercise());
      setUserAnswer('');
    }
  };

  // Reset game
  const handleResetGame = () => {
    setCurrentExercise(generateExercise());
    setUserAnswer('');
    setScore(0);
    setStreak(0);
    setExerciseCount(0);
    setGameCompleted(false);
    setShowFeedback(false);
  };
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  
  // Handle level change
  const handleLevelChange = (level) => {
    setSelectedLevel(level);
  };

  if (gameCompleted) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className={`text-center p-8 rounded-xl border transition-colors duration-300 shadow-sm ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <h1 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              🎉 Game Complete!
            </h1>
            <p className={`text-xl mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Final Score: <span className={`font-bold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>{score}</span> points
            </p>
            <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              You completed {totalExercises} exercises with a best streak of {Math.max(streak, 0)}!
            </p>
            <button
              onClick={handleResetGame}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            Verb Transform
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Transform sentences between different verb tenses
          </p>
        </div>

        {/* Category and Level Selection */}
        <div className="space-y-6 mb-8">
          <CategorySelector
            categories={exerciseCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            isDarkMode={isDarkMode}
          />
          
          <LevelSelector
            levels={levels}
            selectedLevel={selectedLevel}
            onLevelChange={handleLevelChange}
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Score and Progress */}
        <div className="flex justify-between items-center mb-8">
          <ScoreBoard 
            score={score} 
            streak={streak} 
            isDarkMode={isDarkMode}
          />
          <ProgressTracker 
            current={exerciseCount} 
            total={totalExercises} 
            isDarkMode={isDarkMode}
          />
        </div>

        {/* Main Exercise Area */}
        <div className="space-y-6">
          {currentExercise && (
            <>
              <ExerciseCard 
                exercise={currentExercise}
                isDarkMode={isDarkMode}
              />
              
              <TenseSelector 
                currentTense={currentExercise.tense}
                targetTense={targetTense}
                onTenseChange={setTargetTense}
                isDarkMode={isDarkMode}
                tenseColors={tenseColors}
              />
              
              <AnswerInput 
                value={userAnswer}
                onChange={setUserAnswer}
                onSubmit={handleSubmitAnswer}
                isDarkMode={isDarkMode}
                disabled={showFeedback}
              />
              
              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer.trim() || showFeedback}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Check Answer
                </button>
                <button
                  onClick={handleSkipExercise}
                  disabled={showFeedback}
                  className={`px-6 py-2 rounded-lg font-medium border-2 transition-colors ${
                    isDarkMode 
                      ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Skip
                </button>
              </div>
            </>
          )}
        </div>

        {/* Feedback Modal */}
        {showFeedback && (
          <FeedbackModal
            isCorrect={isCorrect}
            userAnswer={userAnswer}
            correctAnswer={correctAnswer}
            onNext={handleNextExercise}
            isDarkMode={isDarkMode}
            currentTense={currentExercise.tense}
            targetTense={targetTense}
          />
        )}
      </div>
    </div>
  );
};

export default VerbTransformPage;