import React from 'react';

const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`border-t transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-900 border-gray-700 text-gray-300' 
        : 'bg-gray-50 border-gray-200 text-gray-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">EH</span>
              </div>
              <span className="text-xl font-bold text-indigo-600">English Hub</span>
            </div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Your complete destination for interactive English learning tools and resources.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Learning Tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="/verb-timeline" 
                  className={`hover:text-indigo-600 transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-500'
                  }`}
                >
                  Verb Timeline
                </a>
              </li>
              <li>
                <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  More tools coming soon...
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Info */}
          <div className="space-y-4">
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              About
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://github.com/willianszwy/verbflow" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`hover:text-indigo-600 transition-colors ${
                    isDarkMode ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-500'
                  }`}
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Free & Open Source
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-8 pt-8 border-t ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              © 2024 English Hub. Made with ❤️ for English learners worldwide.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Built with React & Tailwind CSS
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;