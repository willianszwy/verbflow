import React from 'react';

export const ThemeIcon = ({ isDarkMode }) => (
  <i className={`text-xl ${isDarkMode ? 'fi fi-tr-sun' : 'fi fi-tr-moon'}`} />
);

export const RandomIcon = () => <i className="fi fi-tr-dice text-base" />;

export const VolumeIcon = () => <i className="fi fi-tr-volume text-xs" />;