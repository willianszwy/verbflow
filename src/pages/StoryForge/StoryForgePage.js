import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';

const StoryForgePage = () => {
  const { isDarkMode } = useOutletContext();

  // Story modes
  const modes = useMemo(() => ({
    prompt: {
      name: 'Story Prompts',
      description: 'Tell stories from creative prompts',
      icon: '📖'
    },
    continuation: {
      name: 'Story Continuation',
      description: 'Continue existing stories',
      icon: '➡️'
    },
    visual: {
      name: 'Visual Stories',
      description: 'Create stories from images',
      icon: '🖼️'
    },
    personal: {
      name: 'Personal Stories',
      description: 'Share your own experiences',
      icon: '👤'
    }
  }), []);

  // Game state
  const [selectedMode, setSelectedMode] = useState('prompt');
  const [currentPrompt, setCurrentPrompt] = useState("A mysterious package arrives at your door with no return address...");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [storiesCompleted, setStoriesCompleted] = useState(0);
  const [currentStory, setCurrentStory] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  // Sample prompts for each mode
  const samplePrompts = {
    prompt: [
      "A mysterious package arrives at your door with no return address...",
      "You wake up with the ability to understand any language, but you've lost the ability to speak your native tongue...",
      "In a world where emotions have colors, yours is a shade no one has ever seen before...",
      "You discover your reflection has been living its own life when you're not looking in mirrors...",
      "The last bookstore on Earth is about to close, and you're its final customer..."
    ],
    continuation: [
      "Maria opened the old journal and found an entry written in her handwriting that she didn't remember writing. Continue this story...",
      "The lighthouse keeper noticed the light was flashing a pattern he'd never seen before. What happens next?",
      "As the train pulled into the station, Elena realized she was in the wrong century. Continue from here...",
      "The recipe card fell out of grandmother's cookbook, but the ingredients listed things that don't exist. What does Tom do?"
    ],
    visual: [
      "Describe what you see: An empty swing set in an abandoned playground at sunset.",
      "Tell a story about: A cat sitting on a windowsill watching the rain.",
      "Create a narrative around: An old man feeding pigeons in a city square.",
      "What story emerges from: A child's drawing stuck to a refrigerator door."
    ],
    personal: [
      "Tell about a time when you had to make a difficult decision.",
      "Describe your most memorable childhood moment.",
      "Share a story about overcoming a fear or challenge.",
      "Tell about someone who changed your perspective on life.",
      "Describe a moment when you felt truly proud of yourself."
    ]
  };

  // Handle mode change
  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    setCurrentStory('');
    setShowFeedback(false);
    setIsRecording(false);
    setRecordingTime(0);

    // Set random prompt for selected mode
    const prompts = samplePrompts[mode];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(randomPrompt);
  };

  // Generate new prompt
  const generateNewPrompt = () => {
    const prompts = samplePrompts[selectedMode];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(randomPrompt);
    setCurrentStory('');
    setShowFeedback(false);
  };

  // Toggle recording (placeholder for now)
  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setShowFeedback(true);
      setStoriesCompleted(prev => prev + 1);
    } else {
      setIsRecording(true);
      setRecordingTime(0);
    }
  };

  // Simulate recording timer
  React.useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            StoryForge
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Develop fluency through creative storytelling and narrative practice
          </p>
        </div>

        {/* Mode Selector */}
        <div className={`p-6 rounded-lg border transition-colors duration-300 mb-8 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Story Mode
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(modes).map(([key, mode]) => (
              <button
                key={key}
                onClick={() => handleModeChange(key)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedMode === key
                    ? `border-purple-500 ${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-50'}`
                    : `border-gray-300 dark:border-gray-600 ${
                        isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                      }`
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{mode.icon}</div>
                  <div className={`text-sm font-medium mb-1 ${
                    selectedMode === key
                      ? 'text-purple-600 dark:text-purple-400'
                      : isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {mode.name}
                  </div>
                  <div className={`text-xs ${
                    selectedMode === key
                      ? 'text-purple-500 dark:text-purple-300'
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
          isDarkMode ? 'bg-purple-900/20 border-purple-800' : 'bg-purple-50 border-purple-200'
        }`}>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              {storiesCompleted}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Stories Told
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              {formatTime(recordingTime)}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {isRecording ? 'Recording...' : 'Session Time'}
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
              {selectedMode}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Current Mode
            </div>
          </div>
        </div>

        {/* Story Prompt */}
        <div className={`p-6 rounded-lg border-2 mb-8 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20`}>
          <div className="flex justify-between items-start mb-4">
            <h3 className={`text-xl font-semibold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Your Story Prompt:
            </h3>
            <button
              onClick={generateNewPrompt}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                isDarkMode ? 'bg-purple-800 text-purple-200 hover:bg-purple-700' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
              }`}
            >
              New Prompt
            </button>
          </div>

          <p className={`text-lg leading-relaxed ${
            isDarkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            {currentPrompt}
          </p>
        </div>

        {/* Recording Controls */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={toggleRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-lg transition-all duration-200 ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {isRecording ? '⏹️' : '🎤'}
            </button>

            <div className="text-center">
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {isRecording ? 'Recording your story...' : 'Click to start recording'}
              </p>
              {isRecording && (
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Take your time, tell your story naturally
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Story Text Input (Alternative to Recording) */}
        <div className={`p-6 rounded-lg border transition-colors duration-300 mb-8 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h4 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Or Type Your Story:
          </h4>
          <textarea
            value={currentStory}
            onChange={(e) => setCurrentStory(e.target.value)}
            placeholder="Type your story here..."
            className={`w-full h-32 p-4 rounded-lg border-2 transition-colors resize-none ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:border-purple-500`}
          />

          {currentStory && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => {
                  setShowFeedback(true);
                  setStoriesCompleted(prev => prev + 1);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Submit Story
              </button>
            </div>
          )}
        </div>

        {/* Feedback Modal */}
        {showFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className={`max-w-md w-full rounded-xl p-6 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className={`text-xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Great Story!
                </h3>
                <p className={`text-sm mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  You've successfully completed a storytelling exercise. Keep practicing to improve your fluency!
                </p>

                <div className={`p-4 rounded-lg mb-4 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <p className={`text-sm font-medium mb-2 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    Story Tips:
                  </p>
                  <ul className={`text-xs space-y-1 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <li>• Use descriptive language</li>
                    <li>• Include dialogue when appropriate</li>
                    <li>• Focus on clear narrative flow</li>
                    <li>• Practice different story structures</li>
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setShowFeedback(false);
                    generateNewPrompt();
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Next Story
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className={`p-6 rounded-lg border transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h4 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            How StoryForge Works:
          </h4>
          <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
              <strong>Story Prompts:</strong> Create original stories from creative prompts
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
              <strong>Continuation:</strong> Practice building on existing story beginnings
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
              <strong>Visual Stories:</strong> Develop narratives from visual descriptions
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
              <strong>Personal Stories:</strong> Share your own experiences and memories
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
              Record yourself or type your stories to practice fluency and creativity
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StoryForgePage;