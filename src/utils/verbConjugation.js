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

export const conjugateVerb = (verb, tense, pronoun) => {
  const isThirdPerson = ['he', 'she', 'it'].includes(pronoun.toLowerCase());
  const irregular = irregularVerbs[verb];
  
  switch (tense) {
    case 'present':
      if (['can', 'will', 'must', 'should', 'would', 'could', 'may', 'might', 'ought', 'shall'].includes(verb)) {
        return verb;
      }
      
      if (verb === 'be') {
        if (pronoun === 'I') return 'am';
        if (isThirdPerson) return 'is';
        return 'are';
      }
      
      if (verb === 'have') {
        if (isThirdPerson) return 'has';
        return 'have';
      }
      
      if (verb === 'do') {
        if (isThirdPerson) return 'does';
        return 'do';
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
      const auxiliary = ['I', 'you', 'we', 'they'].includes(pronoun) ? 'have' : 'has';
      return `${auxiliary} ${participle}`;
      
    case 'continuous':
      if (['can', 'will', 'must', 'should', 'would', 'could', 'may', 'might', 'ought', 'shall'].includes(verb)) {
        return `${verb} be + verb-ing`;
      }
      
      let base = verb;
      if (verb.endsWith('e') && !verb.endsWith('ee')) {
        base = verb.slice(0, -1);
      }
      const progressive = base + 'ing';
      const continuousAuxiliary = pronoun === 'I' ? 'am' : isThirdPerson ? 'is' : 'are';
      return `${continuousAuxiliary} ${progressive}`;
      
    case 'future':
      return `will ${verb}`;
      
    default:
      return verb;
  }
};