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

const getNegativeAuxiliary = (auxiliary) => {
  const negativeMap = {
    'am': "am not",
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
  return negativeMap[auxiliary] || `${auxiliary} not`;
};

export const conjugateVerb = (verb, tense, pronoun, isNegative = false, isQuestion = false) => {
  const isThirdPerson = ['he', 'she', 'it'].includes(pronoun.toLowerCase());
  const irregular = irregularVerbs[verb];
  
  switch (tense) {
    case 'present':
      if (['can', 'will', 'must', 'should', 'would', 'could', 'may', 'might', 'ought', 'shall'].includes(verb)) {
        if (isNegative && isQuestion) return `${verb}n't ${pronoun}`;
        if (isNegative) return `${verb} not`;
        if (isQuestion) return `${verb} ${pronoun}`;
        return verb;
      }
      
      if (verb === 'be') {
        const auxiliary = getAuxiliary('present', pronoun, verb);
        if (isNegative && isQuestion) return `${getNegativeAuxiliary(auxiliary)} ${pronoun}`;
        if (isNegative) return getNegativeAuxiliary(auxiliary);
        if (isQuestion) return `${auxiliary} ${pronoun}`;
        return auxiliary;
      }
      
      const auxiliary = getAuxiliary('present', pronoun, verb);
      
      if (isNegative && isQuestion) {
        return `${getNegativeAuxiliary(auxiliary)} ${pronoun} ${verb}`;
      }
      if (isNegative) {
        if (verb === 'have') return getNegativeAuxiliary(auxiliary);
        if (verb === 'do') return getNegativeAuxiliary(auxiliary);
        return `${getNegativeAuxiliary(auxiliary)} ${verb}`;
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
      if (verb === 'be') {
        const auxiliary = getAuxiliary('past', pronoun, verb);
        if (isNegative && isQuestion) return `${getNegativeAuxiliary(auxiliary)} ${pronoun}`;
        if (isNegative) return getNegativeAuxiliary(auxiliary);
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
        return `${getNegativeAuxiliary(perfectAuxiliary)} ${pronoun} ${participle}`;
      }
      if (isNegative) {
        return `${getNegativeAuxiliary(perfectAuxiliary)} ${participle}`;
      }
      if (isQuestion) {
        return `${perfectAuxiliary} ${pronoun} ${participle}`;
      }
      
      return `${perfectAuxiliary} ${participle}`;
      
    case 'continuous':
      if (['can', 'will', 'must', 'should', 'would', 'could', 'may', 'might', 'ought', 'shall'].includes(verb)) {
        if (isNegative && isQuestion) return `${verb}n't ${pronoun} be + verb-ing`;
        if (isNegative) return `${verb} not be + verb-ing`;
        if (isQuestion) return `${verb} ${pronoun} be + verb-ing`;
        return `${verb} be + verb-ing`;
      }
      
      let base = verb;
      if (verb.endsWith('e') && !verb.endsWith('ee')) {
        base = verb.slice(0, -1);
      }
      const progressive = base + 'ing';
      const continuousAuxiliary = pronoun === 'I' ? 'am' : isThirdPerson ? 'is' : 'are';
      
      if (isNegative && isQuestion) {
        return `${getNegativeAuxiliary(continuousAuxiliary)} ${pronoun} ${progressive}`;
      }
      if (isNegative) {
        return `${getNegativeAuxiliary(continuousAuxiliary)} ${progressive}`;
      }
      if (isQuestion) {
        return `${continuousAuxiliary} ${pronoun} ${progressive}`;
      }
      
      return `${continuousAuxiliary} ${progressive}`;
      
    case 'future':
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