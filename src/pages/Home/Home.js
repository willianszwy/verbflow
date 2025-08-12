import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';

const Home = () => {
  const { isDarkMode } = useOutletContext();

  const apps = [
    {
      id: 'verb-timeline',
      title: 'Verb Timeline',
      description: 'Master English verb conjugations with an interactive timeline visualization. Practice all tenses, irregular verbs, and pronunciations.',
      features: ['Interactive Timeline', 'All Verb Tenses', 'Pronunciation Support', 'Multiple Difficulty Levels'],
      link: '/verb-timeline',
      status: 'available',
      color: 'indigo'
    },
    {
      id: 'vocabulary-builder',
      title: 'Vocabulary Builder',
      description: 'Expand your English vocabulary with spaced repetition and contextual learning.',
      features: ['Spaced Repetition', 'Context Examples', 'Progress Tracking', 'Word Categories'],
      link: '#',
      status: 'coming-soon',
      color: 'green'
    },
    {
      id: 'pronunciation-trainer',
      title: 'Pronunciation Trainer',
      description: 'Improve your English pronunciation with AI-powered feedback and practice exercises.',
      features: ['AI Feedback', 'Phonetic Guide', 'Recording Practice', 'Accent Training'],
      link: '#',
      status: 'coming-soon',
      color: 'purple'
    },
    {
      id: 'grammar-check',
      title: 'Grammar Checker',
      description: 'Check and improve your English grammar with detailed explanations and suggestions.',
      features: ['Real-time Checking', 'Grammar Rules', 'Error Explanations', 'Writing Tips'],
      link: '#',
      status: 'coming-soon',
      color: 'orange'
    }
  ];

  const AppCard = ({ app }) => {
    const colorClasses = {
      indigo: {
        border: 'border-indigo-200 dark:border-indigo-800',
        bg: 'bg-indigo-50 dark:bg-indigo-900/20',
        badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-200',
        button: 'bg-indigo-600 hover:bg-indigo-700 text-white',
        comingSoon: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
      },
      green: {
        border: 'border-green-200 dark:border-green-800',
        bg: 'bg-green-50 dark:bg-green-900/20',
        badge: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200',
        button: 'bg-green-600 hover:bg-green-700 text-white',
        comingSoon: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
      },
      purple: {
        border: 'border-purple-200 dark:border-purple-800',
        bg: 'bg-purple-50 dark:bg-purple-900/20',
        badge: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-200',
        button: 'bg-purple-600 hover:bg-purple-700 text-white',
        comingSoon: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
      },
      orange: {
        border: 'border-orange-200 dark:border-orange-800',
        bg: 'bg-orange-50 dark:bg-orange-900/20',
        badge: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-200',
        button: 'bg-orange-600 hover:bg-orange-700 text-white',
        comingSoon: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
      }
    };

    const colors = colorClasses[app.color];

    return (
      <div className={`rounded-lg border-2 p-6 transition-all duration-200 hover:shadow-lg ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } ${colors.border} ${colors.bg}`}>
        <div className="flex justify-between items-start mb-4">
          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {app.title}
          </h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            app.status === 'available' ? colors.badge : colors.comingSoon
          }`}>
            {app.status === 'available' ? 'Available' : 'Coming Soon'}
          </span>
        </div>
        
        <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {app.description}
        </p>
        
        <div className="mb-6">
          <h4 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
            Features:
          </h4>
          <ul className="space-y-1">
            {app.features.map((feature, index) => (
              <li key={index} className={`text-sm flex items-center ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <span className="w-1.5 h-1.5 bg-current rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        {app.status === 'available' ? (
          <Link
            to={app.link}
            className={`block w-full text-center px-4 py-2 rounded-md font-medium transition-colors ${colors.button}`}
          >
            Launch App
          </Link>
        ) : (
          <button
            disabled
            className={`block w-full text-center px-4 py-2 rounded-md font-medium cursor-not-allowed ${colors.comingSoon}`}
          >
            Coming Soon
          </button>
        )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            English Hub
          </h1>
          <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Your complete destination for interactive English learning tools and resources
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/verb-timeline"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Start Learning
            </Link>
            <a
              href="#apps"
              className={`px-8 py-3 rounded-lg font-medium border-2 transition-colors ${
                isDarkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Explore Tools
            </a>
          </div>
        </div>
      </div>

      {/* Apps Section */}
      <div id="apps" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Learning Tools
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover our collection of interactive tools designed to make English learning engaging and effective
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {apps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Why Choose English Hub?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Interactive Learning',
                description: 'Engage with dynamic content that adapts to your learning style and pace.',
                icon: '🎯'
              },
              {
                title: 'Comprehensive Coverage',
                description: 'From basic grammar to advanced topics, we cover all aspects of English learning.',
                icon: '📚'
              },
              {
                title: 'Free & Accessible',
                description: 'All tools are completely free and accessible on any device, anywhere.',
                icon: '🌍'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className={`text-xl font-bold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;