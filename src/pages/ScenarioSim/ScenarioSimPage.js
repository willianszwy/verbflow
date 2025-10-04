import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';

const ScenarioSimPage = () => {
  const { isDarkMode } = useOutletContext();

  // Scenario categories
  const scenarios = useMemo(() => ({
    restaurant: {
      name: 'Restaurant',
      icon: '🍽️',
      description: 'Ordering food, asking questions, making requests',
      situations: [
        {
          title: 'Ordering at a restaurant',
          context: 'You are at a nice restaurant and want to order dinner for two people.',
          yourRole: 'Customer',
          otherRole: 'Waiter/Server',
          objective: 'Order appetizers, main courses, and drinks',
          keyPhrases: ['Could I have...', 'What do you recommend?', 'Is there a vegetarian option?', 'Could we get the check?'],
          difficulty: 'foundation'
        },
        {
          title: 'Complaining about food',
          context: 'Your meal arrived but it\'s not what you ordered and it\'s cold.',
          yourRole: 'Customer',
          otherRole: 'Manager',
          objective: 'Politely complain and get the issue resolved',
          keyPhrases: ['I\'m sorry, but...', 'This isn\'t what I ordered', 'Could you please...', 'I appreciate your help'],
          difficulty: 'building'
        },
        {
          title: 'Making a reservation',
          context: 'You need to book a table for a special anniversary dinner next week.',
          yourRole: 'Customer',
          otherRole: 'Host/Hostess',
          objective: 'Book a romantic table for two with specific requirements',
          keyPhrases: ['I\'d like to make a reservation', 'Do you have any tables available?', 'Could we request...', 'What time slots do you have?'],
          difficulty: 'mastery'
        }
      ]
    },
    shopping: {
      name: 'Shopping',
      icon: '🛍️',
      description: 'Buying items, asking for help, comparing prices',
      situations: [
        {
          title: 'Buying clothes',
          context: 'You\'re looking for a jacket for an important job interview.',
          yourRole: 'Customer',
          otherRole: 'Sales Associate',
          objective: 'Find the right jacket in your size and budget',
          keyPhrases: ['Do you have this in...', 'What size would you recommend?', 'Is this on sale?', 'Could I try this on?'],
          difficulty: 'foundation'
        },
        {
          title: 'Returning an item',
          context: 'You bought shoes online but they don\'t fit properly.',
          yourRole: 'Customer',
          otherRole: 'Customer Service',
          objective: 'Return the shoes and get a refund or exchange',
          keyPhrases: ['I need to return this', 'Do you have the receipt?', 'What\'s your return policy?', 'Could I get a refund?'],
          difficulty: 'building'
        },
        {
          title: 'Negotiating price',
          context: 'You\'re at a market and want to buy souvenirs but think the prices are too high.',
          yourRole: 'Tourist',
          otherRole: 'Vendor',
          objective: 'Negotiate a fair price for multiple items',
          keyPhrases: ['That seems a bit expensive', 'What\'s your best price?', 'If I buy three, could you...', 'Is that your final offer?'],
          difficulty: 'mastery'
        }
      ]
    },
    travel: {
      name: 'Travel',
      icon: '✈️',
      description: 'Airport, hotel, directions, transportation',
      situations: [
        {
          title: 'Checking into a hotel',
          context: 'You\'ve just arrived at your hotel after a long flight.',
          yourRole: 'Guest',
          otherRole: 'Front Desk Clerk',
          objective: 'Check in and ask about hotel amenities',
          keyPhrases: ['I have a reservation under...', 'What time is breakfast?', 'Do you have WiFi?', 'Could I get a wake-up call?'],
          difficulty: 'foundation'
        },
        {
          title: 'Lost luggage at airport',
          context: 'Your luggage didn\'t arrive and you need to report it.',
          yourRole: 'Passenger',
          otherRole: 'Airline Agent',
          objective: 'Report lost luggage and arrange delivery',
          keyPhrases: ['My luggage didn\'t arrive', 'Here\'s my baggage claim ticket', 'When will it be delivered?', 'What should I do in the meantime?'],
          difficulty: 'building'
        },
        {
          title: 'Getting directions',
          context: 'You\'re lost in a foreign city and need to get to an important meeting.',
          yourRole: 'Tourist',
          otherRole: 'Local Person',
          objective: 'Get clear directions and transportation options',
          keyPhrases: ['Excuse me, could you help me?', 'How do I get to...', 'Is it walking distance?', 'Which bus/train should I take?'],
          difficulty: 'mastery'
        }
      ]
    },
    work: {
      name: 'Work',
      icon: '💼',
      description: 'Job interviews, meetings, workplace conversations',
      situations: [
        {
          title: 'Job interview',
          context: 'You\'re interviewing for your dream job at a tech company.',
          yourRole: 'Candidate',
          otherRole: 'Interviewer',
          objective: 'Answer questions confidently and ask good questions',
          keyPhrases: ['I have experience in...', 'Could you tell me more about...', 'What are the biggest challenges?', 'When can I expect to hear back?'],
          difficulty: 'foundation'
        },
        {
          title: 'Disagreeing in a meeting',
          context: 'Your team is making a decision you think is wrong.',
          yourRole: 'Team Member',
          otherRole: 'Colleague/Manager',
          objective: 'Express disagreement professionally and suggest alternatives',
          keyPhrases: ['I see your point, but...', 'Have we considered...', 'What if we tried...', 'I\'d like to suggest...'],
          difficulty: 'building'
        },
        {
          title: 'Negotiating salary',
          context: 'You\'re offered a job but want to negotiate the compensation package.',
          yourRole: 'Candidate',
          otherRole: 'HR Manager',
          objective: 'Negotiate salary and benefits professionally',
          keyPhrases: ['I\'m very excited about this opportunity', 'Based on my research...', 'Would it be possible to...', 'What\'s the flexibility around...'],
          difficulty: 'mastery'
        }
      ]
    },
    medical: {
      name: 'Medical',
      icon: '🏥',
      description: 'Doctor visits, pharmacy, health emergencies',
      situations: [
        {
          title: 'Doctor appointment',
          context: 'You\'re not feeling well and need to describe your symptoms.',
          yourRole: 'Patient',
          otherRole: 'Doctor',
          objective: 'Explain symptoms and understand treatment options',
          keyPhrases: ['I\'ve been feeling...', 'It started about...', 'The pain is...', 'Should I be worried about...'],
          difficulty: 'foundation'
        },
        {
          title: 'At the pharmacy',
          context: 'You need to pick up prescription medication and have questions.',
          yourRole: 'Customer',
          otherRole: 'Pharmacist',
          objective: 'Get medication and understand instructions',
          keyPhrases: ['I\'m here to pick up...', 'How often should I take this?', 'Are there any side effects?', 'Can I take this with...'],
          difficulty: 'building'
        },
        {
          title: 'Emergency room',
          context: 'You\'ve had an accident and need immediate medical attention.',
          yourRole: 'Patient',
          otherRole: 'Emergency Staff',
          objective: 'Explain emergency situation and get help',
          keyPhrases: ['I need help immediately', 'I fell and I think...', 'The pain is getting worse', 'Am I going to be okay?'],
          difficulty: 'mastery'
        }
      ]
    }
  }), []);

  // Game state
  const [selectedCategory, setSelectedCategory] = useState('restaurant');
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [currentStep, setCurrentStep] = useState('categories'); // categories, scenario, conversation
  const [conversationHistory, setConversationHistory] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [scenariosCompleted, setScenariosCompleted] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [sessionHistory, setSessionHistory] = useState([]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentStep('scenario');
  };

  // Handle scenario selection
  const handleScenarioSelect = (scenario) => {
    setSelectedScenario(scenario);
    setCurrentStep('conversation');
    setConversationHistory([
      {
        speaker: scenario.otherRole,
        message: getOpeningMessage(scenario),
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  };

  // Get opening message based on scenario
  const getOpeningMessage = (scenario) => {
    const openings = {
      'Ordering at a restaurant': 'Good evening! Welcome to our restaurant. How many will be dining with us tonight?',
      'Complaining about food': 'I understand you have a concern about your meal. How can I help you today?',
      'Making a reservation': 'Thank you for calling. How can I assist you with your reservation?',
      'Buying clothes': 'Hello! Welcome to our store. Are you looking for anything specific today?',
      'Returning an item': 'Hi there! I see you have something to return. Do you have your receipt with you?',
      'Negotiating price': 'Hello! These are beautiful handmade items. Which ones caught your eye?',
      'Checking into a hotel': 'Welcome to our hotel! How can I help you today?',
      'Lost luggage at airport': 'I\'m sorry to hear about your luggage. Let me help you file a report.',
      'Getting directions': 'Of course! I\'d be happy to help you find your way. Where are you trying to go?',
      'Job interview': 'Thank you for coming in today. Please, have a seat. How are you feeling about this opportunity?',
      'Disagreeing in a meeting': 'So we\'re all in agreement about moving forward with Plan A. Any final thoughts?',
      'Negotiating salary': 'Congratulations! We\'d like to offer you the position. Let\'s discuss the details.',
      'Doctor appointment': 'Good morning! What brings you in to see me today?',
      'At the pharmacy': 'Hello! How can I help you today?',
      'Emergency room': 'What seems to be the emergency today? Can you tell me what happened?'
    };
    return openings[scenario.title] || 'Hello! How can I help you today?';
  };

  // Handle sending user message
  const handleSendMessage = () => {
    if (!userMessage.trim()) return;

    // Add user message
    const newUserMessage = {
      speaker: selectedScenario.yourRole,
      message: userMessage.trim(),
      timestamp: new Date().toLocaleTimeString()
    };

    setConversationHistory(prev => [...prev, newUserMessage]);

    // Generate AI response (simplified)
    setTimeout(() => {
      const aiResponse = {
        speaker: selectedScenario.otherRole,
        message: generateAIResponse(userMessage, selectedScenario),
        timestamp: new Date().toLocaleTimeString()
      };
      setConversationHistory(prev => [...prev, aiResponse]);
    }, 1000);

    setUserMessage('');
  };

  // Simple AI response generation
  const generateAIResponse = (userMsg, scenario) => {
    const responses = {
      'restaurant': [
        'Excellent choice! And what would you like to drink with that?',
        'Of course! Let me check on that for you.',
        'That comes with a side salad. Is that okay?',
        'Would you like to see our dessert menu?'
      ],
      'shopping': [
        'Let me check what we have in stock for you.',
        'That\'s a great choice! It\'s very popular this season.',
        'We have a special promotion running this week.',
        'Would you like me to check if we have other colors?'
      ],
      'travel': [
        'I\'d be happy to help you with that.',
        'Let me look that up for you right away.',
        'Yes, we can definitely arrange that.',
        'Here\'s what I can do for you...'
      ],
      'work': [
        'That\'s a great question. Let me explain...',
        'I appreciate you bringing that up.',
        'Your background looks very impressive.',
        'We\'re looking for someone with exactly that experience.'
      ],
      'medical': [
        'I understand your concern. Let me examine that.',
        'How long have you been experiencing this?',
        'Let\'s run some tests to be sure.',
        'This is quite common, nothing to worry about.'
      ]
    };

    const categoryResponses = responses[selectedCategory] || responses['restaurant'];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  };

  // End scenario
  const handleEndScenario = () => {
    setScenariosCompleted(prev => prev + 1);

    // Save to session history
    setSessionHistory(prev => {
      const historyEntry = {
        scenario: selectedScenario.title,
        category: selectedCategory,
        difficulty: selectedScenario.difficulty,
        duration: conversationHistory.length,
        timestamp: new Date().toLocaleTimeString()
      };
      const updated = [historyEntry, ...prev];
      return updated.slice(0, 10);
    });

    // Reset
    setCurrentStep('categories');
    setSelectedScenario(null);
    setConversationHistory([]);
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
            ScenarioSim
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Practice English in real-world situations and conversations
          </p>
        </div>

        {/* Stats Bar */}
        <div className={`flex justify-between items-center mb-8 p-4 rounded-lg border transition-colors duration-300 ${
          isDarkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
        }`}>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
              {scenariosCompleted}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Scenarios Completed
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
              {Object.keys(scenarios).length}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Categories Available
            </div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
              {currentStep}
            </div>
            <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Current Step
            </div>
          </div>
        </div>

        {/* Main Content */}
        {currentStep === 'categories' && (
          <div>
            <h2 className={`text-2xl font-bold text-center mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Choose a Scenario Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(scenarios).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => handleCategorySelect(key)}
                  className={`p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 hover:border-red-500 hover:bg-red-900/20'
                      : 'bg-white border-gray-300 hover:border-red-500 hover:bg-red-50'
                  }`}
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className={`text-xl font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {category.name}
                  </h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {category.description}
                  </p>
                  <p className={`text-xs mt-2 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                    {category.situations.length} scenarios available
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'scenario' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {scenarios[selectedCategory].name} Scenarios
              </h2>
              <button
                onClick={() => setCurrentStep('categories')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                ← Back to Categories
              </button>
            </div>

            <div className="space-y-4">
              {scenarios[selectedCategory].situations.map((situation, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
                    isDarkMode
                      ? 'bg-gray-800 border-gray-700 hover:border-red-500'
                      : 'bg-white border-gray-300 hover:border-red-500'
                  }`}
                  onClick={() => handleScenarioSelect(situation)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {situation.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      situation.difficulty === 'foundation'
                        ? (isDarkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800')
                        : situation.difficulty === 'building'
                        ? (isDarkMode ? 'bg-yellow-800 text-yellow-200' : 'bg-yellow-100 text-yellow-800')
                        : (isDarkMode ? 'bg-red-800 text-red-200' : 'bg-red-100 text-red-800')
                    }`}>
                      {situation.difficulty === 'foundation' ? '⭐ Foundation' :
                       situation.difficulty === 'building' ? '⭐⭐ Building' : '⭐⭐⭐ Mastery'}
                    </span>
                  </div>
                  <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {situation.context}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>Your Role:</strong> {situation.yourRole}
                    </div>
                    <div>
                      <strong className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>Other Role:</strong> {situation.otherRole}
                    </div>
                  </div>
                  <div className="mt-3">
                    <strong className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Objective:</strong>
                    <span className={`text-sm ml-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {situation.objective}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'conversation' && selectedScenario && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {selectedScenario.title}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={handleEndScenario}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  End Scenario
                </button>
                <button
                  onClick={() => setCurrentStep('scenario')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  ← Back
                </button>
              </div>
            </div>

            {/* Scenario Info */}
            <div className={`p-4 rounded-lg mb-6 ${
              isDarkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'
            }`}>
              <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Context:</strong> {selectedScenario.context}
              </p>
              <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Your Role:</strong> {selectedScenario.yourRole} | <strong>Objective:</strong> {selectedScenario.objective}
              </p>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <strong>Key Phrases:</strong> {selectedScenario.keyPhrases.join(' • ')}
              </div>
            </div>

            {/* Conversation */}
            <div className={`h-64 overflow-y-auto border rounded-lg p-4 mb-4 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
            }`}>
              {conversationHistory.map((msg, index) => (
                <div key={index} className={`mb-3 ${
                  msg.speaker === selectedScenario.yourRole ? 'text-right' : 'text-left'
                }`}>
                  <div className={`inline-block max-w-xs p-3 rounded-lg ${
                    msg.speaker === selectedScenario.yourRole
                      ? 'bg-red-600 text-white'
                      : (isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800')
                  }`}>
                    <div className="text-sm">{msg.message}</div>
                    <div className={`text-xs mt-1 opacity-70`}>
                      {msg.speaker} • {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your response..."
                className={`flex-1 p-3 rounded-lg border transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:border-red-500`}
              />
              <button
                onClick={handleSendMessage}
                disabled={!userMessage.trim()}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* Session History */}
        {sessionHistory.length > 0 && (
          <div className={`mt-8 p-6 rounded-lg border transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex justify-between items-center mb-4">
              <h4 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Session History
              </h4>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  isDarkMode
                    ? 'bg-red-800 text-red-200 hover:bg-red-700'
                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                }`}
              >
                {showHistory ? 'Hide' : 'Show'} ({sessionHistory.length})
              </button>
            </div>

            {showHistory && (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {sessionHistory.map((entry, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${
                    isDarkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {entry.category} • {entry.difficulty} • {entry.timestamp}
                      </span>
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-red-400' : 'text-red-600'
                      }`}>
                        {entry.duration} messages
                      </span>
                    </div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      <strong>Scenario:</strong> {entry.scenario}
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
            How ScenarioSim Works:
          </h4>
          <ul className={`space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
              <strong>Choose a Category:</strong> Select from restaurant, shopping, travel, work, or medical scenarios
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
              <strong>Pick a Scenario:</strong> Each category has foundation, building, and mastery level situations
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
              <strong>Practice Conversation:</strong> Type responses and engage in realistic dialogue
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
              <strong>Use Key Phrases:</strong> Practice the suggested phrases to sound more natural
            </li>
            <li className="flex items-center">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
              Build confidence for real-world English conversations
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScenarioSimPage;