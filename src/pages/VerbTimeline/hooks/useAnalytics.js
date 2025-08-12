import { useEffect } from 'react';

// Google Analytics helper functions
export const gtag = (...args) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

// Custom hook for Google Analytics
export const useAnalytics = () => {
  useEffect(() => {
    // Track page load
    gtag('event', 'page_view', {
      page_title: 'VerbFlow - English Verb Learning',
      page_location: window.location.href,
      content_group1: 'Educational App',
      content_group2: 'English Learning'
    });
  }, []);

  // Track verb selection
  const trackVerbSelection = (verb, category, level) => {
    gtag('event', 'verb_selected', {
      event_category: 'Learning',
      event_label: verb,
      custom_parameter_1: category,
      custom_parameter_2: level,
      value: 1
    });
  };

  // Track tense change
  const trackTenseChange = (fromTense, toTense) => {
    gtag('event', 'tense_changed', {
      event_category: 'Navigation',
      event_label: `${fromTense}_to_${toTense}`,
      value: 1
    });
  };

  // Track pronoun selection
  const trackPronounSelection = (pronoun) => {
    gtag('event', 'pronoun_selected', {
      event_category: 'Learning',
      event_label: pronoun,
      value: 1
    });
  };

  // Track category change
  const trackCategoryChange = (category) => {
    gtag('event', 'category_selected', {
      event_category: 'Learning',
      event_label: category,
      value: 1
    });
  };

  // Track level change
  const trackLevelChange = (level) => {
    gtag('event', 'level_selected', {
      event_category: 'Learning',
      event_label: level,
      value: 1
    });
  };

  // Track pronunciation clicks
  const trackPronunciationClick = (verb, tense, pronoun) => {
    gtag('event', 'pronunciation_clicked', {
      event_category: 'Engagement',
      event_label: `${verb}_${tense}_${pronoun}`,
      value: 1
    });
  };

  // Track theme toggle
  const trackThemeToggle = (theme) => {
    gtag('event', 'theme_toggled', {
      event_category: 'UI',
      event_label: theme,
      value: 1
    });
  };

  // Track random verb usage
  const trackRandomVerb = (category, level) => {
    gtag('event', 'random_verb_used', {
      event_category: 'Learning',
      event_label: `${category}_${level}`,
      value: 1
    });
  };

  // Track mode changes (negative/question)
  const trackModeChange = (mode, enabled) => {
    gtag('event', 'mode_toggled', {
      event_category: 'Learning',
      event_label: `${mode}_${enabled ? 'enabled' : 'disabled'}`,
      value: enabled ? 1 : 0
    });
  };

  // Track session duration (call on app unmount)
  const trackSessionEnd = (duration) => {
    gtag('event', 'session_duration', {
      event_category: 'Engagement',
      value: Math.round(duration / 1000), // Convert to seconds
      custom_parameter_1: 'learning_session'
    });
  };

  return {
    trackVerbSelection,
    trackTenseChange,
    trackPronounSelection,
    trackCategoryChange,
    trackLevelChange,
    trackPronunciationClick,
    trackThemeToggle,
    trackRandomVerb,
    trackModeChange,
    trackSessionEnd
  };
};