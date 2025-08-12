import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      setIsDarkMode(JSON.parse(savedTheme));
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main className="flex-grow">
        <Outlet context={{ isDarkMode, toggleTheme }} />
      </main>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Layout;