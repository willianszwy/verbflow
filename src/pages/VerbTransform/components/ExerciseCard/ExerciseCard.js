import React from 'react';
import { tenseLabels, exerciseCategories, levels } from '../../data/exerciseTemplates';

// VerbTimeline color system
const tenseColors = {
  past: '#E74C3C',
  present: '#27AE60',
  future: '#F39C12',
  perfect: '#8E44AD',
  continuous: '#3498DB'
};

const ExerciseCard = ({ exercise, isDarkMode }) => {
  if (!exercise) return null;

  const currentTenseColor = tenseColors[exercise.tense] || '#6B7280';
  const categoryInfo = exerciseCategories[exercise.category];
  const levelInfo = levels[exercise.level];

  return (
    <div className={`p-6 rounded-xl border transition-colors duration-300 shadow-sm ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <div className="text-center">
        {/* Category and Level indicators */}
        <div className="flex justify-center gap-3 mb-4">
          {categoryInfo && (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              isDarkMode 
                ? 'bg-indigo-900 text-indigo-200' 
                : 'bg-indigo-100 text-indigo-800'
            }`}>
              <i className={`${categoryInfo.icon} mr-1`}></i>
              {categoryInfo.name}
            </span>
          )}
          {levelInfo && (
            <span 
              className="px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: levelInfo.color }}
            >
              {levelInfo.difficulty} {levelInfo.name}
            </span>
          )}
        </div>
        
        <h3 className={`text-lg font-medium mb-4 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Transform this sentence:
        </h3>
        
        <div className={`p-4 rounded-lg mb-4 ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <p className={`text-2xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            "{exercise.sentence}"
          </p>
          <span 
            className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: currentTenseColor }}
          >
            {tenseLabels[exercise.tense] || exercise.tense}
          </span>
        </div>
        
        <div className={`text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <span className="font-medium">Subject:</span> {exercise.subject} | 
          <span className="font-medium ml-2">Verb:</span> {exercise.verb}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;