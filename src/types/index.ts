export type UserRole = 'guest' | 'student' | 'admin';

export type GoalOption = 'tourism' | 'media' | 'work' | 'study' | 'topik' | 'fun';

export type LevelOption = 'none' | 'hangul' | 'basic_phrases' | 'elementary';

export interface UserSettings {
  goals: GoalOption[];
  currentLevel: LevelOption;
  dailyMinutes: number; // 5, 10, 15, 30
  dailyXpGoal: number;
  romanizationEnabled: boolean;
  autoPlayAudio: boolean;
  audioSpeed: number; // 0.75 or 1.0
  soundEffects: boolean;
  theme: 'light' | 'dark';
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  role: UserRole;
  avatar: string;
  settings: UserSettings;
  xp: number;
  streak: number;
  streakFreezesAvailable: number;
  lastActiveDate: string; // YYYY-MM-DD
  onboarded: boolean;
  badges: string[]; // badge IDs
}

export type HangulCategory = 'consonant_basic' | 'consonant_double' | 'consonant_aspirated' | 'vowel_basic' | 'vowel_compound';

export interface StrokePath {
  id: number;
  d: string;
  arrow?: { x: number; y: number; dir: string };
  order: number;
}

export interface HangulLetter {
  id: string; // e.g. "g"
  char: string; // e.g. "ㄱ"
  name: string; // e.g. "기역 (giyeok)"
  category: HangulCategory;
  ipa: string;
  vietnameseGuide: string;
  exampleWord: {
    hangul: string;
    vietnamese: string;
    romanization: string;
  };
  strokes: StrokePath[];
  keyboardKey: string; // e.g. "r"
  memorized?: boolean;
}

export interface ConfusingPair {
  id: string;
  title: string;
  charA: string;
  charB: string;
  charC?: string;
  explanation: string;
  practiceWords: {
    hangul: string;
    meaning: string;
    targetChar: string;
  }[];
}

export interface Vocabulary {
  id: string;
  hangul: string;
  romanization: string;
  meaning: string;
  partOfSpeech: string;
  exampleSentence: string;
  exampleMeaning: string;
  topic?: string;
  lessonId?: string;
  imageUrl?: string;
}

export interface GrammarPoint {
  id: string;
  title: string;
  formula: string;
  explanation: string;
  examples: {
    hangul: string;
    meaning: string;
  }[];
  commonMistakes: string;
}

export interface DialogueLine {
  id: string;
  speaker: string;
  hangul: string;
  romanization: string;
  vietnamese: string;
}

export interface InteractiveDrill {
  id: string;
  type: 'choose_correct' | 'fill_blank' | 'match_pair';
  prompt: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
}

export interface Lesson {
  id: string;
  chapterId: string;
  stage: 1 | 2 | 3;
  order: number;
  title: string;
  objective: string;
  topics: string[];
  skills: ('listening' | 'reading' | 'vocab' | 'grammar' | 'hangul' | 'speaking' | 'writing')[];
  vocabularies: Vocabulary[];
  grammars: GrammarPoint[];
  dialogue: DialogueLine[];
  quickPractices: InteractiveDrill[];
  miniTestId: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  score?: number;
}

export interface Chapter {
  id: string;
  stage: 1 | 2 | 3;
  stageName: string;
  title: string;
  description: string;
  lessons: Lesson[];
  testId?: string;
}

export type QuestionType =
  | 'multiple_choice'
  | 'listen_choose'
  | 'listen_type'
  | 'fill_blank'
  | 'scramble_sentence'
  | 'match_pairs'
  | 'reading_passage';

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  audioPrompt?: string; // Hangul to pronounce
  passage?: string; // For reading comprehension
  options?: string[];
  correctAnswer: string | string[]; // For scramble, array of words or comma-separated; for match, json of pairs
  explanation: string;
  skill: 'hangul' | 'vocab' | 'grammar' | 'listening' | 'reading';
  difficulty: 'easy' | 'medium' | 'hard';
  lessonId?: string;
}

export interface TestAttemptAnswer {
  questionId: string;
  userAnswer: string | string[];
  isCorrect: boolean;
}

export interface TestAttempt {
  id: string;
  testId: string;
  title: string;
  type: 'mini_test' | 'chapter_test' | 'custom_test' | 'topik_mock';
  date: string;
  score: number; // 0-100 or 0-200 for TOPIK
  totalQuestions: number;
  correctCount: number;
  timeSpentSeconds: number;
  answers: TestAttemptAnswer[];
  skillScores: {
    hangul: number;
    vocab: number;
    grammar: number;
    listening: number;
    reading: number;
  };
  predictedTopikLevel?: 'Không đạt' | 'Level 1' | 'Level 2';
}

export interface Flashcard {
  id: string;
  hangul: string;
  meaning: string;
  romanization?: string;
  exampleSentence?: string;
  exampleMeaning?: string;
  deckId: string;
  // SRS properties
  status: 'new' | 'learning' | 'review' | 'mastered';
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
  nextReviewDate: string; // YYYY-MM-DD
  isStarred?: boolean;
}

export interface FlashcardDeck {
  id: string;
  title: string;
  description: string;
  isSystem: boolean;
  color: string;
  cardCount?: number;
}

export interface MistakeItem {
  id: string;
  questionId: string;
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  skill: string;
  wrongCount: number;
  consecutiveCorrect: number;
  isResolved: boolean;
  lessonId?: string;
  date: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}
