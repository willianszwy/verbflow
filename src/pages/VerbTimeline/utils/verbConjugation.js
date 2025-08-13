const irregularVerbs = {
  'be': { past: (pronoun) => (pronoun === 'I' || pronoun === 'he' || pronoun === 'she' || pronoun === 'it') ? 'was' : 'were', participle: 'been' },
  'have': { past: 'had', participle: 'had' },
  'do': { past: 'did', participle: 'done' },
  'can': { past: 'could', participle: 'been able' },
  'will': { past: 'would', participle: 'would have' },
  'must': { past: 'had to', participle: 'had to' },
  'should': { past: 'should have', participle: 'should have' },
  'would': { past: 'would have', participle: 'would have' },
  'could': { past: 'could have', participle: 'could have' },
  'may': { past: 'might', participle: 'might have' },
  'might': { past: 'might have', participle: 'might have' },
  'ought': { past: 'ought to have', participle: 'ought to have' },
  'shall': { past: 'should', participle: 'should have' },
  'need': { past: 'needed', participle: 'needed' },
  'dare': { past: 'dared', participle: 'dared' },
  'go': { past: 'went', participle: 'gone' },
  'come': { past: 'came', participle: 'come' },
  'see': { past: 'saw', participle: 'seen' },
  'say': { past: 'said', participle: 'said' },
  'think': { past: 'thought', participle: 'thought' },
  'know': { past: 'knew', participle: 'known' },
  'feel': { past: 'felt', participle: 'felt' },
  'find': { past: 'found', participle: 'found' },
  'meet': { past: 'met', participle: 'met' },
  'try': { past: 'tried', participle: 'tried' },
  'eat': { past: 'ate', participle: 'eaten' },
  'run': { past: 'ran', participle: 'run' },
  'drive': { past: 'drove', participle: 'driven' },
  'write': { past: 'wrote', participle: 'written' },
  'speak': { past: 'spoke', participle: 'spoken' },
  'fly': { past: 'flew', participle: 'flown' },
  'buy': { past: 'bought', participle: 'bought' },
  'understand': { past: 'understood', participle: 'understood' },
  'remember': { past: 'remembered', participle: 'remembered' },
  'forget': { past: 'forgot', participle: 'forgotten' },
  'believe': { past: 'believed', participle: 'believed' },
  'discover': { past: 'discovered', participle: 'discovered' },
  'experience': { past: 'experienced', participle: 'experienced' }
};

// Helper functions for negative and interrogative forms
const getAuxiliary = (tense, pronoun, verb) => {
  const isThirdPerson = ['he', 'she', 'it'].includes(pronoun.toLowerCase());
  
  switch (tense) {
    case 'present':
      if (verb === 'be') {
        if (pronoun === 'I') return 'am';
        if (isThirdPerson) return 'is';
        return 'are';
      }
      if (verb === 'have') {
        return isThirdPerson ? 'has' : 'have';
      }
      return isThirdPerson ? 'does' : 'do';
      
    case 'past':
      if (verb === 'be') {
        return (pronoun === 'I' || isThirdPerson) ? 'was' : 'were';
      }
      return 'did';
      
    case 'perfect':
      return ['I', 'you', 'we', 'they'].includes(pronoun) ? 'have' : 'has';
      
    case 'continuous':
      if (pronoun === 'I') return 'am';
      if (isThirdPerson) return 'is';
      return 'are';
      
    case 'future':
      return 'will';
      
    default:
      return 'do';
  }
};

const getNegativeAuxiliary = (auxiliary, useContractions = false) => {
  if (useContractions) {
    const contractedMap = {
      'am': "am not", // Note: "am not" doesn't have a standard contraction in statements
      'is': "isn't", 
      'are': "aren't",
      'was': "wasn't",
      'were': "weren't",
      'do': "don't",
      'does': "doesn't", 
      'did': "didn't",
      'have': "haven't",
      'has': "hasn't",
      'will': "won't"
    };
    return contractedMap[auxiliary] || `${auxiliary} not`;
  } else {
    // Return non-contracted forms
    const baseMap = {
      'am': "am not",
      'is': "is not", 
      'are': "are not",
      'was': "was not",
      'were': "were not",
      'do': "do not",
      'does': "does not", 
      'did': "did not",
      'have': "have not",
      'has': "has not",
      'will': "will not"
    };
    return baseMap[auxiliary] || `${auxiliary} not`;
  }
};

const applyContractions = (text, isContraction) => {
  if (!isContraction) return text;
  
  const contractions = {
    // Positive contractions
    'I am': "I'm",
    'you are': "you're",
    'he is': "he's",
    'she is': "she's", 
    'it is': "it's",
    'we are': "we're",
    'they are': "they're",
    'I have': "I've",
    'you have': "you've",
    'he has': "he's",
    'she has': "she's",
    'it has': "it's", 
    'we have': "we've",
    'they have': "they've",
    'I will': "I'll",
    'you will': "you'll",
    'he will': "he'll",
    'she will': "she'll",
    'it will': "it'll",
    'we will': "we'll",
    'they will': "they'll",
    'I would': "I'd",
    'you would': "you'd",
    'he would': "he'd",
    'she would': "she'd",
    'it would': "it'd",
    'we would': "we'd",
    'they would': "they'd"
  };
  
  let result = text;
  for (const [full, contracted] of Object.entries(contractions)) {
    const regex = new RegExp(`\\b${full}\\b`, 'gi');
    result = result.replace(regex, contracted);
  }
  
  return result;
};

export { applyContractions };

export const conjugateVerb = (verb, tense, pronoun, isNegative = false, isQuestion = false, isContraction = false) => {
  const isThirdPerson = ['he', 'she', 'it'].includes(pronoun.toLowerCase());
  const irregular = irregularVerbs[verb];
  
  switch (tense) {
    case 'present':
      if (['can', 'will', 'must', 'should', 'would', 'could', 'may', 'might', 'ought', 'shall'].includes(verb)) {
        if (isNegative && isQuestion) {
          // For modal verbs like "might", "may", use "didn't" in negative questions
          if (['might', 'may', 'must', 'ought', 'shall'].includes(verb)) {
            const didForm = isContraction ? "didn't" : "did not";
            return `${didForm} ${pronoun}`;
          }
          // Special cases for modal verbs with contractions
          const modalContractions = {
            'can': isContraction ? "can't" : "can not",
            'will': isContraction ? "won't" : "will not", 
            'would': isContraction ? "wouldn't" : "would not",
            'could': isContraction ? "couldn't" : "could not",
            'should': isContraction ? "shouldn't" : "should not"
          };
          const negForm = modalContractions[verb] || `${verb} not`;
          return `${negForm} ${pronoun}`;
        }
        if (isNegative) {
          // For modal verbs like "might", "may", use "don't" in negative statements  
          if (['might', 'may', 'must', 'ought', 'shall'].includes(verb)) {
            const doForm = isContraction ? "don't" : "do not";
            return doForm;
          }
          const modalContractions = {
            'can': isContraction ? "can't" : "can not",
            'will': isContraction ? "won't" : "will not",
            'would': isContraction ? "wouldn't" : "would not", 
            'could': isContraction ? "couldn't" : "could not",
            'should': isContraction ? "shouldn't" : "should not"
          };
          return modalContractions[verb] || `${verb} not`;
        }
        if (isQuestion) return `${verb} ${pronoun}`;
        return verb;
      }
      
      if (verb === 'be') {
        const auxiliary = getAuxiliary('present', pronoun, verb);
        if (isNegative && isQuestion) return `${getNegativeAuxiliary(auxiliary, isContraction)} ${pronoun}`;
        if (isNegative) return getNegativeAuxiliary(auxiliary, isContraction);
        if (isQuestion) return `${auxiliary} ${pronoun}`;
        return auxiliary;
      }
      
      const auxiliary = getAuxiliary('present', pronoun, verb);
      
      if (isNegative && isQuestion) {
        return `${getNegativeAuxiliary(auxiliary, isContraction)} ${pronoun} ${verb}`;
      }
      if (isNegative) {
        if (verb === 'have') return getNegativeAuxiliary(auxiliary, isContraction);
        if (verb === 'do') return getNegativeAuxiliary(auxiliary, isContraction);
        return `${getNegativeAuxiliary(auxiliary, isContraction)} ${verb}`;
      }
      if (isQuestion) {
        return `${auxiliary} ${pronoun} ${verb}`;
      }
      
      // Affirmative form (original logic)
      if (verb === 'have') {
        return isThirdPerson ? 'has' : 'have';
      }
      if (verb === 'do') {
        return isThirdPerson ? 'does' : 'do';
      }
      if (verb === 'be') {
        return isThirdPerson ? 'is' : (pronoun.toLowerCase() === 'i' ? 'am' : 'are');
      }
      if (isThirdPerson) {
        if (verb.endsWith('y') && !['a', 'e', 'i', 'o', 'u'].includes(verb[verb.length - 2])) {
          return verb.slice(0, -1) + 'ies';
        }
        if (verb.endsWith('s') || verb.endsWith('sh') || verb.endsWith('ch') || verb.endsWith('x') || verb.endsWith('z')) {
          return verb + 'es';
        }
        return verb + 's';
      }
      return verb;
      
    case 'past':
      if (['can', 'will', 'must', 'should', 'would', 'could', 'may', 'might', 'ought', 'shall'].includes(verb)) {
        const pastModal = irregularVerbs[verb]?.past || verb;
        if (isNegative && isQuestion) {
          const modalContractions = {
            'could': isContraction ? "couldn't" : "could not",
            'would': isContraction ? "wouldn't" : "would not",
            'should': isContraction ? "shouldn't" : "should not",
            'might': isContraction ? "mightn't" : "might not"
          };
          const negForm = modalContractions[pastModal] || `${pastModal} not`;
          return `${negForm} ${pronoun}`;
        }
        if (isNegative) {
          const modalContractions = {
            'could': isContraction ? "couldn't" : "could not",
            'would': isContraction ? "wouldn't" : "would not",
            'should': isContraction ? "shouldn't" : "should not",
            'might': isContraction ? "mightn't" : "might not"
          };
          return modalContractions[pastModal] || `${pastModal} not`;
        }
        if (isQuestion) return `${pastModal} ${pronoun}`;
        return pastModal;
      }
      
      if (verb === 'be') {
        const auxiliary = getAuxiliary('past', pronoun, verb);
        if (isNegative && isQuestion) return `${getNegativeAuxiliary(auxiliary, isContraction)} ${pronoun}`;
        if (isNegative) return getNegativeAuxiliary(auxiliary, isContraction);
        if (isQuestion) return `${auxiliary} ${pronoun}`;
        return auxiliary;
      }
      
      if (isNegative && isQuestion) {
        return `didn't ${pronoun} ${verb}`;
      }
      if (isNegative) {
        return `didn't ${verb}`;
      }
      if (isQuestion) {
        return `did ${pronoun} ${verb}`;
      }
      
      // Affirmative form (original logic)
      if (irregular) {
        return typeof irregular.past === 'function' ? irregular.past(pronoun) : irregular.past;
      }
      if (verb.endsWith('e')) return verb + 'd';
      if (verb.endsWith('y') && !['a', 'e', 'i', 'o', 'u'].includes(verb[verb.length - 2])) {
        return verb.slice(0, -1) + 'ied';
      }
      return verb + 'ed';
      
    case 'perfect':
      const participle = irregular ? irregular.participle : 
        verb.endsWith('e') ? verb + 'd' :
        verb.endsWith('y') && !['a', 'e', 'i', 'o', 'u'].includes(verb[verb.length - 2]) ? verb.slice(0, -1) + 'ied' :
        verb + 'ed';
      const perfectAuxiliary = ['I', 'you', 'we', 'they'].includes(pronoun) ? 'have' : 'has';
      
      if (isNegative && isQuestion) {
        return `${getNegativeAuxiliary(perfectAuxiliary, isContraction)} ${pronoun} ${participle}`;
      }
      if (isNegative) {
        return `${getNegativeAuxiliary(perfectAuxiliary, isContraction)} ${participle}`;
      }
      if (isQuestion) {
        return `${perfectAuxiliary} ${pronoun} ${participle}`;
      }
      
      return `${perfectAuxiliary} ${participle}`;
      
    case 'continuous':
      if (['can', 'will', 'must', 'should', 'would', 'could', 'may', 'might', 'ought', 'shall'].includes(verb)) {
        if (isNegative && isQuestion) {
          const modalContractions = {
            'can': isContraction ? "can't" : "can not",
            'will': isContraction ? "won't" : "will not",
            'would': isContraction ? "wouldn't" : "would not", 
            'could': isContraction ? "couldn't" : "could not",
            'should': isContraction ? "shouldn't" : "should not"
          };
          const negForm = modalContractions[verb] || `${verb} not`;
          return `${negForm} ${pronoun} be + verb-ing`;
        }
        if (isNegative) return `${verb} not be + verb-ing`;
        if (isQuestion) return `${verb} ${pronoun} be + verb-ing`;
        return `${verb} be + verb-ing`;
      }
      
      let base = verb;
      if (verb.endsWith('e') && !verb.endsWith('ee')) {
        base = verb.slice(0, -1);
      }
      // Special case for "be" -> "being"
      if (verb === 'be') {
        base = 'be';
      }
      const progressive = base + 'ing';
      const continuousAuxiliary = pronoun === 'I' ? 'am' : isThirdPerson ? 'is' : 'are';
      
      if (isNegative && isQuestion) {
        // Special case for pronoun "I" in negative questions - use "aren't" instead of "am not"
        if (pronoun === 'I') {
          const specialAuxiliary = isContraction ? "aren't" : "are not";
          return `${specialAuxiliary} ${pronoun} ${progressive}`;
        }
        return `${getNegativeAuxiliary(continuousAuxiliary, isContraction)} ${pronoun} ${progressive}`;
      }
      if (isNegative) {
        return `${getNegativeAuxiliary(continuousAuxiliary, isContraction)} ${progressive}`;
      }
      if (isQuestion) {
        return `${continuousAuxiliary} ${pronoun} ${progressive}`;
      }
      
      return `${continuousAuxiliary} ${progressive}`;
      
    case 'future':
      if (['can', 'will', 'must', 'should', 'would', 'could', 'may', 'might', 'ought', 'shall'].includes(verb)) {
        // For modal verbs in future, use "be able to" for most cases
        if (verb === 'can') {
          if (isNegative && isQuestion) {
            const negForm = isContraction ? "won't" : "will not";
            return `${negForm} ${pronoun} be able to`;
          }
          if (isNegative) {
            const negForm = isContraction ? "won't" : "will not";
            return `${negForm} be able to`;
          }
          if (isQuestion) return `will ${pronoun} be able to`;
          return `will be able to`;
        }
        // For other modals, use the modal itself
        if (isNegative && isQuestion) {
          const negForm = isContraction ? "won't" : "will not";
          return `${negForm} ${pronoun} ${verb}`;
        }
        if (isNegative) {
          const negForm = isContraction ? "won't" : "will not";
          return `${negForm} ${verb}`;
        }
        if (isQuestion) return `will ${pronoun} ${verb}`;
        return `will ${verb}`;
      }
      
      if (isNegative && isQuestion) {
        return `won't ${pronoun} ${verb}`;
      }
      if (isNegative) {
        return `won't ${verb}`;
      }
      if (isQuestion) {
        return `will ${pronoun} ${verb}`;
      }
      
      return `will ${verb}`;
      
    default:
      return verb;
  }
};