import { UserProfile, TestAttempt, Flashcard, FlashcardDeck, MistakeItem, UserAccount } from '../types';

const STORAGE_KEYS = {
  USER_PROFILE: 'hanguora_user_profile',
  COMPLETED_LESSONS: 'hanguora_completed_lessons',
  TEST_ATTEMPTS: 'hanguora_test_attempts',
  FLASHCARDS: 'hanguora_flashcards',
  FLASHCARD_DECKS: 'hanguora_flashcard_decks',
  MISTAKES: 'hanguora_mistakes',
  MEMORIZED_LETTERS: 'hanguora_memorized_letters',
  USER_ACCOUNTS: 'hanguora_user_accounts',
  CURRENT_SESSION: 'hanguora_current_session',
};

export const INITIAL_DEMO_ACCOUNTS: UserAccount[] = [
  {
    id: 'u_student_demo',
    name: 'Minh Anh (Học viên)',
    email: 'hocvien@hanguora.vn',
    password: '123',
    role: 'student',
    avatar: '🎓',
    createdAt: '2026-11-20',
  },
  {
    id: 'u_admin_demo',
    name: 'Admin Hanguora',
    email: 'admin@hanguora.vn',
    password: 'admin',
    role: 'admin',
    avatar: '⚙️',
    createdAt: '2026-11-20',
  }
];

export function loadUserAccounts(): UserAccount[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_ACCOUNTS);
    if (raw) return JSON.parse(raw);
  } catch {}
  saveUserAccounts(INITIAL_DEMO_ACCOUNTS);
  return INITIAL_DEMO_ACCOUNTS;
}

export function saveUserAccounts(accounts: UserAccount[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_ACCOUNTS, JSON.stringify(accounts));
  } catch {}
}

export function loadCurrentSession(): UserAccount | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null; // By default requires login or guest choice
}

export function saveCurrentSession(account: UserAccount | null): void {
  try {
    if (account) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(account));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
    }
  } catch {}
}

export const defaultProfile: UserProfile = {
  id: 'user_1',
  name: 'Học viên Mới',
  role: 'student',
  avatar: '🇰🇷',
  settings: {
    goals: ['tourism', 'fun'],
    currentLevel: 'none',
    dailyMinutes: 15,
    dailyXpGoal: 30,
    romanizationEnabled: true,
    autoPlayAudio: true,
    audioSpeed: 1.0,
    soundEffects: true,
    theme: 'light',
  },
  xp: 45,
  streak: 3,
  streakFreezesAvailable: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  onboarded: true,
  badges: ['badge_welcome', 'badge_first_streak'],
};

export function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return defaultProfile;
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch {
    // ignore
  }
}

export function loadCompletedLessons(): Record<string, { completed: boolean; score: number }> {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return {
    'l_hangul_1': { completed: true, score: 100 },
  };
}

export function saveCompletedLesson(lessonId: string, score: number): void {
  const current = loadCompletedLessons();
  current[lessonId] = { completed: true, score };
  localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(current));
}

export function loadTestAttempts(): TestAttempt[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TEST_ATTEMPTS);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [
    {
      id: 'att_sample_1',
      testId: 'mini_test_hangul_1',
      title: 'Mini Test: Nguyên âm cơ bản',
      type: 'mini_test',
      date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
      score: 100,
      totalQuestions: 5,
      correctCount: 5,
      timeSpentSeconds: 95,
      answers: [],
      skillScores: { hangul: 100, vocab: 80, grammar: 70, listening: 90, reading: 85 },
    },
    {
      id: 'att_sample_2',
      testId: 'test_custom_1',
      title: 'Đề tự tạo: Phân biệt âm & Từ vựng',
      type: 'custom_test',
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      score: 80,
      totalQuestions: 10,
      correctCount: 8,
      timeSpentSeconds: 210,
      answers: [],
      skillScores: { hangul: 80, vocab: 90, grammar: 70, listening: 75, reading: 80 },
    }
  ];
}

export function saveTestAttempt(attempt: TestAttempt): void {
  const list = loadTestAttempts();
  list.unshift(attempt);
  localStorage.setItem(STORAGE_KEYS.TEST_ATTEMPTS, JSON.stringify(list));
}

export function loadMistakes(): MistakeItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MISTAKES);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [
    {
      id: 'err_1',
      questionId: 'q_diff_1',
      prompt: 'Nghe và chọn chữ cái đúng giữa cặp âm dễ nhầm: [ㅓ] hay [ㅗ]?',
      userAnswer: 'ㅗ',
      correctAnswer: 'ㅓ',
      explanation: 'Âm ㅓ (eo) mở miệng dọc tự nhiên như "ơ", còn ㅗ (o) chu tròn môi giống âm "ô".',
      skill: 'hangul',
      wrongCount: 2,
      consecutiveCorrect: 1,
      isResolved: false,
      date: new Date().toISOString().split('T')[0],
    },
    {
      id: 'err_2',
      questionId: 'q_vocab_2',
      prompt: 'Từ nào sau đây có nghĩa là "Cảm ơn"?',
      userAnswer: '죄송합니다',
      correctAnswer: '감사합니다',
      explanation: '감사합니다 là Cảm ơn. 죄송합니다 là Xin lỗi.',
      skill: 'vocab',
      wrongCount: 1,
      consecutiveCorrect: 2,
      isResolved: false,
      date: new Date().toISOString().split('T')[0],
    }
  ];
}

export function saveMistakes(mistakes: MistakeItem[]): void {
  localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
}

export function loadMemorizedLetters(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MEMORIZED_LETTERS);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return ['g', 'n', 'd', 'a', 'ya', 'eo'];
}

export function saveMemorizedLetters(letters: string[]): void {
  localStorage.setItem(STORAGE_KEYS.MEMORIZED_LETTERS, JSON.stringify(letters));
}
