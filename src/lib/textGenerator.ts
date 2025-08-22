import type { WordDifficulty } from "@/pages/Index";

const easyWords = [
  "the", "and", "for", "are", "but", "not", "you", "all", "can", "had", "her", "was", "one", "our", "out", "day", "get", "has", "him", "his", "how", "man", "new", "now", "old", "see", "two", "way", "who", "boy", "did", "its", "let", "put", "say", "she", "too", "use"
];

const mediumWords = [
  "about", "after", "again", "before", "being", "could", "every", "first", "found", "great", "group", "house", "large", "might", "never", "other", "place", "right", "small", "sound", "still", "such", "these", "think", "those", "three", "under", "water", "where", "while", "world", "would", "write", "young"
];

const hardWords = [
  "achievement", "environment", "extraordinary", "implementation", "infrastructure", "metamorphosis", "pharmaceutical", "reconnaissance", "responsibility", "sophisticated", "transcendental", "unprecedented", "breakthrough", "catastrophic", "contemporary", "demonstration", "documentation", "encyclopedia", "fundamentally", "geographical", "hypothetically", "internationally", "jurisdiction", "knowledgeable", "longitudinal", "manufacturing", "nomenclature", "opportunities", "psychological", "questionnaire", "revolutionary", "significantly", "technological", "understanding", "visualization"
];

const sentences = {
  easy: [
    "The cat sat on the mat and looked at the dog.",
    "I like to eat ice cream on hot summer days.",
    "She went to the store to buy some bread and milk.",
    "The sun is bright and the sky is blue today.",
    "We can play games after we finish our work.",
    "My friend has a new bike that is red and fast.",
    "The book on the table is very good to read.",
    "They will go to the park when it stops raining.",
    "The small bird flew from tree to tree quickly.",
    "He likes to draw pictures of cars and planes."
  ],
  medium: [
    "Technology has revolutionized the way we communicate with each other.",
    "The environmental impact of plastic pollution requires immediate attention.",
    "Scientific research continues to unlock mysteries of the universe.",
    "Education plays a crucial role in developing critical thinking skills.",
    "Artificial intelligence is transforming various industries worldwide.",
    "Climate change presents significant challenges for future generations.",
    "Innovation drives economic growth and creates new opportunities.",
    "Cultural diversity enriches our understanding of different perspectives.",
    "Sustainable development balances economic progress with environmental protection.",
    "Digital transformation has accelerated rapidly in recent years."
  ],
  hard: [
    "The inexorable march of technological advancement necessitates a paradigmatic shift in our pedagogical methodologies.",
    "Quantum mechanics demonstrates the counterintuitive nature of reality at subatomic scales through probabilistic interpretations.",
    "Epistemological considerations regarding the acquisition of knowledge reveal the intricate relationship between perception and understanding.",
    "Neuroscientific investigations into consciousness have elucidated the complex mechanisms underlying cognitive processing and awareness.",
    "Phenomenological approaches to existential philosophy examine the fundamental structures of human experience and meaning-making.",
    "Bioengineering applications in regenerative medicine showcase the convergence of interdisciplinary scientific methodologies.",
    "Geopolitical ramifications of economic globalization necessitate sophisticated diplomatic negotiations and multilateral cooperation.",
    "Psychological resilience emerges from the dynamic interplay between individual characteristics and environmental circumstances.",
    "Archaeological evidence substantiates hypotheses regarding the sociocultural evolution of ancient civilizations and their technological innovations.",
    "Mathematical modeling techniques facilitate comprehensive analysis of complex systems exhibiting nonlinear dynamical behavior."
  ]
};

export function generateText(difficulty: WordDifficulty): string {
  // Mix of sentences and individual words for variety
  const useSentence = Math.random() > 0.3; // 70% chance for sentences
  
  if (useSentence) {
    const sentenceList = sentences[difficulty];
    const randomSentences = [];
    
    // Generate 2-4 sentences
    const numSentences = Math.floor(Math.random() * 3) + 2;
    
    for (let i = 0; i < numSentences; i++) {
      const randomIndex = Math.floor(Math.random() * sentenceList.length);
      randomSentences.push(sentenceList[randomIndex]);
    }
    
    return randomSentences.join(" ");
  } else {
    // Generate text from word lists
    let wordList: string[];
    
    switch (difficulty) {
      case "easy":
        wordList = easyWords;
        break;
      case "medium":
        wordList = [...easyWords, ...mediumWords];
        break;
      case "hard":
        wordList = [...easyWords, ...mediumWords, ...hardWords];
        break;
      default:
        wordList = mediumWords;
    }
    
    // Generate 15-25 words
    const numWords = Math.floor(Math.random() * 11) + 15;
    const words = [];
    
    for (let i = 0; i < numWords; i++) {
      const randomIndex = Math.floor(Math.random() * wordList.length);
      words.push(wordList[randomIndex]);
    }
    
    return words.join(" ");
  }
}