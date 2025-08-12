import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeIcon } from '../shared/Icons';

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gray-900 border-gray-700 text-white' 
        : 'bg-white border-gray-200 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EH</span>
            </div>
            <span>English Hub</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/verb-timeline" 
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/verb-timeline') 
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Verb Timeline
            </Link>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-md transition-colors ${
              isDarkMode 
                ? 'text-yellow-400 hover:bg-gray-800' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            aria-label="Toggle theme"
          >
            <ThemeIcon isDarkMode={isDarkMode} />
          </button>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className={`p-2 rounded-md transition-colors ${
                isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
              aria-label="Open menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className={`h-0.5 w-6 rounded ${isDarkMode ? 'bg-white' : 'bg-gray-900'}`}></div>
                <div className={`h-0.5 w-6 rounded ${isDarkMode ? 'bg-white' : 'bg-gray-900'}`}></div>
                <div className={`h-0.5 w-6 rounded ${isDarkMode ? 'bg-white' : 'bg-gray-900'}`}></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/verb-timeline" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/verb-timeline') 
                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              Verb Timeline
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;