import { HomeIcon, ChatIcon, WalkIcon, BrainIcon, StarIcon, BasicIcon } from '../components/Icons';

export const verbCategories = {
  basics: {
    name: 'Basics',
    icon: <BasicIcon />,
    verbs: {
      foundation: ['be', 'have', 'do', 'can', 'will'],
      building: ['must', 'should', 'would', 'could', 'may'],
      mastery: ['might', 'ought', 'shall', 'need', 'dare']
    }
  },
  daily: {
    name: 'Daily',
    icon: <HomeIcon />,
    verbs: {
      foundation: ['work', 'eat', 'sleep', 'study', 'live'],
      building: ['cook', 'drive', 'shop', 'clean', 'exercise'],
      mastery: ['commute', 'organize', 'maintain', 'schedule', 'prioritize']
    }
  },
  communication: {
    name: 'Talk',
    icon: <ChatIcon />,
    verbs: {
      foundation: ['say', 'tell', 'speak', 'write', 'listen'],
      building: ['explain', 'discuss', 'argue', 'whisper', 'shout'],
      mastery: ['negotiate', 'persuade', 'debate', 'articulate', 'communicate']
    }
  },
  movement: {
    name: 'Move',
    icon: <WalkIcon />,
    verbs: {
      foundation: ['go', 'come', 'walk', 'run', 'travel'],
      building: ['drive', 'fly', 'climb', 'jump', 'dance'],
      mastery: ['navigate', 'migrate', 'explore', 'venture', 'embark']
    }
  },
  mental: {
    name: 'Think',
    icon: <BrainIcon />,
    verbs: {
      foundation: ['think', 'know', 'like', 'want', 'feel'],
      building: ['understand', 'remember', 'forget', 'believe', 'imagine'],
      mastery: ['contemplate', 'analyze', 'perceive', 'comprehend', 'rationalize']
    }
  },
  experience: {
    name: 'Experience',
    icon: <StarIcon />,
    verbs: {
      foundation: ['see', 'try', 'meet', 'visit', 'find'],
      building: ['discover', 'experience', 'encounter', 'explore', 'witness'],
      mastery: ['encounter', 'undergo', 'endure', 'accomplish', 'achieve']
    }
  }
};

export const levels = {
  foundation: { name: 'Foundation', color: '#E74C3C', difficulty: '⭐' },
  building: { name: 'Building', color: '#F39C12', difficulty: '⭐⭐' },
  mastery: { name: 'Mastery', color: '#8E44AD', difficulty: '⭐⭐⭐' }
};

export const verbData = {
  past: {
    color: '#E74C3C',
    position: 15,
    name: 'Simple Past',
    explanation: 'Completed action in the past',
    timeIndicator: 'Yesterday'
  },
  perfect: {
    color: '#8E44AD',
    position: 32,
    name: 'Present Perfect',
    explanation: 'Connection between past and present',
    timeIndicator: '3 years ago → Today'
  },
  present: {
    color: '#27AE60',
    position: 50,
    name: 'Simple Present',
    explanation: 'Habitual actions and general truths',
    timeIndicator: 'Every day'
  },
  continuous: {
    color: '#3498DB',
    position: 68,
    name: 'Present Continuous',
    explanation: 'Action in progress right now',
    timeIndicator: 'Now'
  },
  future: {
    color: '#F39C12',
    position: 85,
    name: 'Future',
    explanation: 'Planned actions for the future',
    timeIndicator: 'Tomorrow'
  }
};

export const pronouns = [
  { key: 'I', label: 'I', isThird: false },
  { key: 'you', label: 'You', isThird: false },
  { key: 'he', label: 'He', isThird: true },
  { key: 'she', label: 'She', isThird: true },
  { key: 'it', label: 'It', isThird: true },
  { key: 'we', label: 'We', isThird: false },
  { key: 'they', label: 'They', isThird: false }
];