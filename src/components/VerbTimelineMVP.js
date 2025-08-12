import React, { useState, useEffect, useRef } from 'react';
import { Header } from './Header';
import { CategorySelector } from './CategorySelector';
import { VerbSelector } from './VerbSelector';
import { PronounSelector } from './PronounSelector';
import { LevelSelector } from './LevelSelector';
import { VerbTimeline } from './VerbTimeline';
import { VerbDisplay } from './VerbDisplay';
import { AllForms } from './AllForms';
import { verbCategories, levels, verbData, pronouns } from '../data/verbData';
import { useAnalytics } from '../hooks/useAnalytics';

const VerbTimelineMVP = () => {
  const [selectedVerb, setSelectedVerb] = useState('present');
  const [selectedPronoun, setSelectedPronoun] = useState('I');
  const [selectedBaseVerb, setSelectedBaseVerb] = useState('be');
  const [selectedLevel, setSelectedLevel] = useState('foundation');
  const [selectedCategory, setSelectedCategory] = useState('basics');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
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
    
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedVerb(verbKey);
      setIsAnimating(false);
    }, 300);
  };

  const handleCategoryChange = (categoryKey) => {
    analytics.trackCategoryChange(categoryKey);
    
    setSelectedCategory(categoryKey);
    const firstVerb = verbCategories[categoryKey].verbs[selectedLevel][0];
    setSelectedBaseVerb(firstVerb);
    
    // Track new verb selection
    analytics.trackVerbSelection(firstVerb, categoryKey, selectedLevel);
  };

  const handleLevelChange = (levelKey) => {
    analytics.trackLevelChange(levelKey);
    
    setSelectedLevel(levelKey);
    const firstVerb = verbCategories[selectedCategory].verbs[levelKey][0];
    setSelectedBaseVerb(firstVerb);
    
    // Track new verb selection
    analytics.trackVerbSelection(firstVerb, selectedCategory, levelKey);
  };

  const handleRandomVerb = () => {
    analytics.trackRandomVerb(selectedCategory, selectedLevel);
    
    const verbs = verbCategories[selectedCategory].verbs[selectedLevel];
    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
    setSelectedBaseVerb(randomVerb);
    
    // Track random verb selection
    analytics.trackVerbSelection(randomVerb, selectedCategory, selectedLevel);
  };

  const handlePronounChange = (pronoun) => {
    analytics.trackPronounSelection(pronoun);
    setSelectedPronoun(pronoun);
  };

  const handleVerbChange = (verb) => {
    analytics.trackVerbSelection(verb, selectedCategory, selectedLevel);
    setSelectedBaseVerb(verb);
  };

  const handleThemeToggle = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    analytics.trackThemeToggle(newTheme);
    setIsDarkMode(!isDarkMode);
  };

  const currentVerb = verbData[selectedVerb];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`} style={{ fontFamily: 'Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      <Header 
        isDarkMode={isDarkMode} 
        onToggleTheme={handleThemeToggle} 
      />

      <div className="max-w-5xl mx-auto px-6 py-6">
        
        {/* Controls Panel */}
        <div className={`rounded-xl border transition-colors duration-300 p-6 mb-8 shadow-sm ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          
          <CategorySelector
            verbCategories={verbCategories}
            selectedCategory={selectedCategory}
            selectedLevel={selectedLevel}
            onCategoryChange={handleCategoryChange}
            isDarkMode={isDarkMode}
          />

          <VerbSelector
            verbCategories={verbCategories}
            selectedCategory={selectedCategory}
            selectedLevel={selectedLevel}
            selectedBaseVerb={selectedBaseVerb}
            onVerbChange={handleVerbChange}
            onRandomVerb={handleRandomVerb}
            isDarkMode={isDarkMode}
          />

          <div className="space-y-6">
            <PronounSelector
              pronouns={pronouns}
              selectedPronoun={selectedPronoun}
              onPronounChange={handlePronounChange}
              isDarkMode={isDarkMode}
            />

            <div className={`flex items-center justify-between pt-6 border-t transition-colors duration-300 ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div></div>
              <LevelSelector
                levels={levels}
                selectedLevel={selectedLevel}
                onLevelChange={handleLevelChange}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          
          {/* Verb Timeline */}
          <VerbTimeline
            verbData={verbData}
            selectedVerb={selectedVerb}
            selectedBaseVerb={selectedBaseVerb}
            selectedPronoun={selectedPronoun}
            onVerbClick={handleVerbClick}
            onPronunciationClick={analytics.trackPronunciationClick}
            isDarkMode={isDarkMode}
          />

          {/* Verb Display and All Forms */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <VerbDisplay
              currentVerb={currentVerb}
              selectedBaseVerb={selectedBaseVerb}
              selectedPronoun={selectedPronoun}
              verbCategories={verbCategories}
              selectedCategory={selectedCategory}
              levels={levels}
              selectedLevel={selectedLevel}
              isAnimating={isAnimating}
              isDarkMode={isDarkMode}
              onPronunciationClick={analytics.trackPronunciationClick}
            />

            <AllForms
              verbData={verbData}
              selectedVerb={selectedVerb}
              selectedBaseVerb={selectedBaseVerb}
              selectedPronoun={selectedPronoun}
              onVerbClick={handleVerbClick}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerbTimelineMVP;