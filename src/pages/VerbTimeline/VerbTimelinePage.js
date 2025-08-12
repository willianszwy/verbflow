import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Header } from './components/Header';
import { CategorySelector } from './components/CategorySelector';
import { VerbSelector } from './components/VerbSelector';
import { PronounSelector } from './components/PronounSelector';
import { ModeSelector } from './components/ModeSelector';
import { LevelSelector } from './components/LevelSelector';
import { VerbTimeline } from './components/VerbTimeline';
import { VerbDisplay } from './components/VerbDisplay';
import { AllForms } from './components/AllForms';
import { verbCategories, levels, verbData, pronouns } from './data/verbData';
import { useAnalytics } from './hooks/useAnalytics';

const VerbTimelinePage = () => {
  // Get theme from layout context
  const { isDarkMode } = useOutletContext();
  
  const [selectedVerb, setSelectedVerb] = useState('present');
  const [selectedPronoun, setSelectedPronoun] = useState('I');
  const [selectedBaseVerb, setSelectedBaseVerb] = useState('be');
  const [selectedLevel, setSelectedLevel] = useState('foundation');
  const [selectedCategory, setSelectedCategory] = useState('basics');
  const [isNegative, setIsNegative] = useState(false);
  const [isQuestion, setIsQuestion] = useState(false);
  
  // Analytics and session tracking
  const analytics = useAnalytics();
  const sessionStartTime = useRef(Date.now());
  
  // Track session duration on unmount
  useEffect(() => {
    const startTime = sessionStartTime.current;
    return () => {
      const sessionDuration = Date.now() - startTime;
      analytics.trackSessionEnd(sessionDuration);
    };
  }, [analytics]);

  const handleVerbClick = (verbKey) => {
    if (verbKey === selectedVerb) return;
    
    // Track tense change
    analytics.trackTenseChange(selectedVerb, verbKey);
    
    setSelectedVerb(verbKey);
  };

  const handleRandomVerb = () => {
    const currentCategoryVerbs = verbCategories[selectedCategory].verbs[selectedLevel];
    let randomVerb;
    do {
      randomVerb = currentCategoryVerbs[Math.floor(Math.random() * currentCategoryVerbs.length)];
    } while (randomVerb === selectedBaseVerb && currentCategoryVerbs.length > 1);
    
    // Track random verb usage
    analytics.trackRandomVerb(selectedCategory, selectedLevel);
    
    setSelectedBaseVerb(randomVerb);
  };

  const handleCategoryChange = (category) => {
    // Track category change
    analytics.trackCategoryChange(category);
    
    setSelectedCategory(category);
    const categoryVerbs = verbCategories[category].verbs[selectedLevel];
    if (categoryVerbs.length > 0) {
      setSelectedBaseVerb(categoryVerbs[0]);
    }
  };

  const handleLevelChange = (level) => {
    // Track level change
    analytics.trackLevelChange(level);
    
    setSelectedLevel(level);
    const levelVerbs = verbCategories[selectedCategory].verbs[level];
    if (levelVerbs.length > 0) {
      setSelectedBaseVerb(levelVerbs[0]);
    }
  };

  const handlePronounChange = (pronoun) => {
    // Track pronoun change
    analytics.trackPronounSelection(pronoun);
    setSelectedPronoun(pronoun);
  };

  const handleVerbChange = (verb) => {
    // Track verb change
    analytics.trackVerbSelection(verb, selectedCategory, selectedLevel);
    setSelectedBaseVerb(verb);
  };

  const handleModeChange = (mode) => {
    // Track mode changes
    if (mode === 'negative') {
      analytics.trackModeChange('negative', !isNegative);
      setIsNegative(!isNegative);
      setIsQuestion(false);
    } else if (mode === 'question') {
      analytics.trackModeChange('question', !isQuestion);
      setIsQuestion(!isQuestion);
      setIsNegative(false);
    } else {
      analytics.trackModeChange('affirmative', true);
      setIsNegative(false);
      setIsQuestion(false);
    }
  };

  const handlePronunciationClick = (verb, tense, pronoun) => {
    // Track pronunciation usage
    analytics.trackPronunciationClick(verb, tense, pronoun);
    
    // Open YouGlish for pronunciation
    const query = `${pronoun} ${verb}`;
    const youglishUrl = `https://pt.youglish.com/pronounce/${encodeURIComponent(query)}/english?`;
    window.open(youglishUrl, '_blank');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Header 
        isDarkMode={isDarkMode}
        showThemeToggle={false} // Hide since it's in main navbar now
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Category Selection */}
          <CategorySelector
            verbCategories={verbCategories}
            selectedCategory={selectedCategory}
            selectedLevel={selectedLevel}
            onCategoryChange={handleCategoryChange}
            isDarkMode={isDarkMode}
          />

          {/* Level Selection */}
          <LevelSelector
            levels={levels}
            selectedLevel={selectedLevel}
            onLevelChange={handleLevelChange}
            isDarkMode={isDarkMode}
          />

          {/* Verb and Pronoun Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VerbSelector
              verbCategories={verbCategories}
              selectedCategory={selectedCategory}
              selectedLevel={selectedLevel}
              selectedBaseVerb={selectedBaseVerb}
              onVerbChange={handleVerbChange}
              onRandomVerb={handleRandomVerb}
              isDarkMode={isDarkMode}
            />
            
            <PronounSelector
              pronouns={pronouns}
              selectedPronoun={selectedPronoun}
              onPronounChange={handlePronounChange}
              isDarkMode={isDarkMode}
            />
          </div>

          {/* Mode Selection */}
          <ModeSelector
            isNegative={isNegative}
            isQuestion={isQuestion}
            onModeChange={handleModeChange}
            isDarkMode={isDarkMode}
          />

          {/* Current Verb Display */}
          <VerbDisplay
            currentVerb={verbData[selectedVerb]}
            selectedBaseVerb={selectedBaseVerb}
            selectedPronoun={selectedPronoun}
            verbCategories={verbCategories}
            selectedCategory={selectedCategory}
            levels={levels}
            selectedLevel={selectedLevel}
            isNegative={isNegative}
            isQuestion={isQuestion}
            isDarkMode={isDarkMode}
          />

          {/* Interactive Timeline */}
          <VerbTimeline
            verbData={verbData}
            selectedVerb={selectedVerb}
            selectedBaseVerb={selectedBaseVerb}
            selectedPronoun={selectedPronoun}
            isNegative={isNegative}
            isQuestion={isQuestion}
            onVerbClick={handleVerbClick}
            onPronunciationClick={handlePronunciationClick}
            isDarkMode={isDarkMode}
          />

          {/* All Forms Display */}
          <AllForms
            verbData={verbData}
            selectedVerb={selectedVerb}
            selectedBaseVerb={selectedBaseVerb}
            selectedPronoun={selectedPronoun}
            onVerbClick={handleVerbClick}
            isNegative={isNegative}
            isQuestion={isQuestion}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default VerbTimelinePage;