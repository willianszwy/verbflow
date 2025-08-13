import { conjugateVerb } from '../../VerbTimeline/utils/verbConjugation';

// Transform a sentence from one tense to another
export const transformSentence = (originalSentence, fromTense, toTense, subject) => {
  // Parse the sentence to extract verb and complement
  const parts = parseSentence(originalSentence, subject);
  
  if (!parts) return originalSentence;
  
  const { verb, complement } = parts;
  
  // Get the new conjugated verb
  const newVerb = conjugateVerb(verb, toTense, subject, false, false, false);
  
  // Reconstruct the sentence
  if (verb === 'be' && toTense === 'future') {
    return `${subject} will be ${complement}`;
  }
  
  if (verb === 'be' && toTense === 'perfect') {
    return `${subject} ${newVerb} ${complement}`;
  }
  
  if (verb === 'be') {
    return `${subject} ${newVerb} ${complement}`;
  }
  
  // Handle regular verbs
  if (toTense === 'future') {
    return `${subject} will ${verb} ${complement}`;
  }
  
  if (toTense === 'perfect') {
    return `${subject} ${newVerb} ${complement}`;
  }
  
  if (toTense === 'continuous') {
    const beForm = conjugateVerb('be', 'present', subject, false, false, false);
    const ingForm = getIngForm(verb);
    return `${subject} ${beForm} ${ingForm} ${complement}`;
  }
  
  // For present and past simple
  return `${subject} ${newVerb} ${complement}`;
};

// Parse sentence to extract verb and complement
const parseSentence = (sentence, subject) => {
  // Remove the subject from the beginning
  let remaining = sentence.replace(new RegExp(`^${subject}\\s+`, 'i'), '').trim();
  
  // Common verb patterns
  const verbPatterns = [
    // "am/is/are + complement" -> be verb
    /^(am|is|are)\s+(.+)$/,
    // "was/were + complement" -> be verb  
    /^(was|were)\s+(.+)$/,
    // "have/has + complement" -> have verb
    /^(have|has)\s+(.+)$/,
    // "had + complement" -> have verb
    /^(had)\s+(.+)$/,
    // "work/works + complement" -> work verb
    /^(work|works)\s+(.+)$/,
    // "worked + complement" -> work verb
    /^(worked)\s+(.+)$/,
    // Generic verb pattern: "verb + complement"
    /^(\w+(?:s|ed)?)\s+(.+)$/
  ];
  
  for (const pattern of verbPatterns) {
    const match = remaining.match(pattern);
    if (match) {
      const verbForm = match[1];
      const complement = match[2];
      
      // Map verb forms to base verbs
      const baseVerb = getBaseVerb(verbForm);
      
      return {
        verb: baseVerb,
        complement: complement
      };
    }
  }
  
  return null;
};

// Map conjugated verb forms to base verbs
const getBaseVerb = (verbForm) => {
  const verbMap = {
    // Be verb forms
    'am': 'be',
    'is': 'be', 
    'are': 'be',
    'was': 'be',
    'were': 'be',
    
    // Have verb forms
    'have': 'have',
    'has': 'have',
    'had': 'have',
    
    // Regular verbs
    'work': 'work',
    'works': 'work',
    'worked': 'work',
    
    'study': 'study',
    'studies': 'study',
    'studied': 'study',
    
    'play': 'play',
    'plays': 'play',
    'played': 'play',
    
    'read': 'read',
    'reads': 'read',
    
    'write': 'write',
    'writes': 'write',
    'wrote': 'write',
    
    'eat': 'eat',
    'eats': 'eat',
    'ate': 'eat',
    
    'sleep': 'sleep',
    'sleeps': 'sleep',
    'slept': 'sleep',
    
    'cook': 'cook',
    'cooks': 'cook',
    'cooked': 'cook',
    
    'drive': 'drive',
    'drives': 'drive',
    'drove': 'drive',
    
    'clean': 'clean',
    'cleans': 'clean',
    'cleaned': 'clean',
    
    'feel': 'feel',
    'feels': 'feel',
    'felt': 'feel',
    
    'love': 'love',
    'loves': 'love',
    'loved': 'love',
    
    'enjoy': 'enjoy',
    'enjoys': 'enjoy',
    'enjoyed': 'enjoy',
    
    'like': 'like',
    'likes': 'like',
    'liked': 'like',
    
    'want': 'want',
    'wants': 'want',
    'wanted': 'want',
    
    'live': 'live',
    'lives': 'live',
    'lived': 'live',
    
    'come': 'come',
    'comes': 'come',
    'came': 'come',
    
    'travel': 'travel',
    'travels': 'travel',
    'traveled': 'travel',
    
    'go': 'go',
    'goes': 'go',
    'went': 'go',
    
    'stay': 'stay',
    'stays': 'stay',
    'stayed': 'stay',
    
    'watch': 'watch',
    'watches': 'watch',
    'watched': 'watch'
  };
  
  return verbMap[verbForm.toLowerCase()] || verbForm;
};

// Get -ing form of verb
const getIngForm = (verb) => {
  if (verb.endsWith('e') && !verb.endsWith('ee')) {
    return verb.slice(0, -1) + 'ing';
  }
  
  // Double consonant for CVC pattern
  if (verb.length >= 3) {
    const lastThree = verb.slice(-3);
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const vowels = 'aeiou';
    
    if (vowels.includes(lastThree[0]) && 
        consonants.includes(lastThree[1]) && 
        consonants.includes(lastThree[2])) {
      return verb + lastThree[2] + 'ing';
    }
  }
  
  return verb + 'ing';
};

// Validate user answer against correct answer
export const validateAnswer = (userAnswer, correctAnswer) => {
  // Normalize both answers for comparison
  const normalize = (str) => str
    .toLowerCase()
    .trim()
    .replace(/[.,!?]/g, '') // Remove punctuation
    .replace(/\s+/g, ' '); // Normalize whitespace
  
  const normalizedUser = normalize(userAnswer);
  const normalizedCorrect = normalize(correctAnswer);
  
  // Exact match
  if (normalizedUser === normalizedCorrect) {
    return true;
  }
  
  // Allow for common variations
  const variations = generateAnswerVariations(normalizedCorrect);
  
  return variations.some(variation => normalize(variation) === normalizedUser);
};

// Generate acceptable variations of the correct answer
const generateAnswerVariations = (correctAnswer) => {
  const variations = [correctAnswer];
  
  // Add contraction variations
  const contractionMap = {
    'i will': "i'll",
    'you will': "you'll", 
    'he will': "he'll",
    'she will': "she'll",
    'we will': "we'll",
    'they will': "they'll",
    'i am': "i'm",
    'you are': "you're",
    'he is': "he's", 
    'she is': "she's",
    'we are': "we're",
    'they are': "they're",
    'i have': "i've",
    'you have': "you've",
    'he has': "he's",
    'she has': "she's", 
    'we have': "we've",
    'they have': "they've"
  };
  
  // Add contracted versions
  for (const [full, contracted] of Object.entries(contractionMap)) {
    if (correctAnswer.includes(full)) {
      variations.push(correctAnswer.replace(full, contracted));
    }
    if (correctAnswer.includes(contracted)) {
      variations.push(correctAnswer.replace(contracted, full));
    }
  }
  
  return variations;
};