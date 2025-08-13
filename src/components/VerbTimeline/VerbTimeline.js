import React from 'react';
import { VolumeIcon } from '../Icons';
import { conjugateVerb } from '../../utils/verbConjugation';

const VerbTimeline = ({ 
  verbData, 
  selectedVerb, 
  selectedBaseVerb, 
  selectedPronoun, 
  onVerbClick, 
  onPronunciationClick,
  isDarkMode,
  isNegative = false,
  isQuestion = false
}) => {
  const getCurrentExample = () => {
    const conjugated = conjugateVerb(selectedBaseVerb, selectedVerb, selectedPronoun, isNegative, isQuestion);
    if (isQuestion || (isNegative && isQuestion)) {
      return isQuestion ? `${conjugated}?` : conjugated;
    }
    return `${selectedPronoun} ${conjugated}`;
  };

  return (
    <div className={`rounded-xl border transition-colors duration-300 p-6 shadow-sm ${
      isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-xl font-bold mb-8 text-center transition-colors duration-300 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Verb Timeline
      </h3>
      
      <div className="relative mb-32">
        <div className={`relative h-3 rounded-full mx-4 transition-colors duration-300 shadow-inner ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          
          {selectedVerb === 'perfect' && (
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 h-3 rounded-full shadow-sm"
              style={{
                backgroundColor: verbData.perfect.color,
                left: '15%',
                width: '35%'
              }}
            />
          )}

          {selectedVerb === 'continuous' && (
            <div
              className="absolute top-1/2 transform -translate-y-1/2 h-3 bg-blue-400 opacity-70 rounded-full shadow-sm"
              style={{
                left: '50%',
                width: '22%'
              }}
            />
          )}

          <div 
            className={`absolute top-1/2 transform -translate-y-1/2 w-1 h-6 rounded-full transition-colors duration-300 ${
              isDarkMode ? 'bg-white' : 'bg-gray-900'
            }`}
            style={{ left: '50%', transform: 'translateX(-50%) translateY(-50%)' }}
          />
          
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <div className={`text-xs font-medium transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              TODAY
            </div>
          </div>

          <div className={`absolute -top-5 left-0 text-xs font-medium transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            PAST
          </div>
          <div className={`absolute -top-5 right-0 text-xs font-medium transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            FUTURE
          </div>

          {Object.entries(verbData).map(([key, verb]) => (
            <div key={key} className="relative">
              <button
                onClick={() => onVerbClick(key)}
                className={`absolute top-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-4 cursor-pointer transform -translate-y-1/2 transition-all duration-200 hover:scale-125 shadow-md ${
                  selectedVerb === key ? 'scale-150 shadow-lg z-30' : 'z-20'
                } ${isDarkMode ? 'border-gray-800' : 'border-white'}`}
                style={{
                  left: `${verb.position}%`,
                  backgroundColor: verb.color,
                  transform: `translateX(-50%) translateY(-50%) ${
                    selectedVerb === key ? 'scale(1.5)' : ''
                  }`
                }}
              />
              
              {selectedVerb === key && (
                <div 
                  className="absolute pointer-events-auto transition-all duration-200 opacity-100 scale-100"
                  style={{ 
                    left: `${verb.position}%`,
                    transform: 'translateX(-50%)',
                    top: '35px',
                    width: '180px',
                    zIndex: 10
                  }}
                >
                  <div className={`rounded-lg px-3 py-2 shadow-lg border-2 transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-white text-white' 
                      : 'bg-white border-gray-900 text-gray-900'
                  }`}>
                    <div className={`text-xs mb-1 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {verb.name.replace('Simple ', '').replace('Present ', '')}
                    </div>
                    <div className="font-semibold text-sm leading-tight mb-2">
                      <div className="break-words">
                        {(() => {
                          const conjugated = conjugateVerb(selectedBaseVerb, key, selectedPronoun, isNegative, isQuestion);
                          if (isQuestion || (isNegative && isQuestion)) {
                            return isQuestion ? `${conjugated}?` : conjugated;
                          }
                          return `${selectedPronoun} ${conjugated}`;
                        })()}
                      </div>
                    </div>
                    
                    <a
                      href={`https://pt.youglish.com/pronounce/${encodeURIComponent(getCurrentExample())}/english`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => onPronunciationClick && onPronunciationClick(selectedBaseVerb, selectedVerb, selectedPronoun)}
                      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors duration-200 ${
                        isDarkMode 
                          ? 'bg-gray-600 hover:bg-gray-500 text-gray-200' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <VolumeIcon /> 
                      Pronunciation
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-3">
        {Object.entries(verbData).map(([key, verb]) => (
          <button
            key={key}
            onClick={() => onVerbClick(key)}
            className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border shadow-sm hover:shadow-md ${
              selectedVerb === key
                ? 'text-white border-transparent shadow-lg'
                : isDarkMode 
                  ? 'text-gray-300 bg-gray-700 hover:bg-gray-600 border-gray-600 hover:text-white' 
                  : 'text-gray-700 bg-white hover:bg-gray-50 border-gray-200'
            }`}
            style={{
              backgroundColor: selectedVerb === key ? verb.color : undefined
            }}
          >
            {verb.name.replace('Simple ', '').replace('Present ', '')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default VerbTimeline;