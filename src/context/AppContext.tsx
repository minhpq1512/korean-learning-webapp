import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserProfile,
  UserRole,
  UserSettings,
  Flashcard,
  FlashcardDeck,
  MistakeItem,
  TestAttempt,
  Question,
  Lesson,
  UserAccount
} from '../types';
import {
  loadProfile,
  saveProfile,
  loadCompletedLessons,
  saveCompletedLesson,
  loadTestAttempts,
  saveTestAttempt,
  loadMistakes,
  saveMistakes,
  loadMemorizedLetters,
  saveMemorizedLetters,
  loadUserAccounts,
  saveUserAccounts,
  loadCurrentSession,
  saveCurrentSession
} from '../utils/storage';
import { calculateNextReview, isCardDue, SrsRating } from '../utils/srsHelper';
import { audioService } from '../utils/audioHelper';
import confetti from 'canvas-confetti';

interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  switchRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  hangulSubTab: string;
  setHangulSubTab: (subTab: string) => void;
  activeLesson: Lesson | null;
  setActiveLesson: (lesson: Lesson | null) => void;
  activeTestConfig: {
    type: 'mini_test' | 'chapter_test' | 'custom_test' | 'topik_mock';
    questions: Question[];
    title: string;
    mode: 'practice' | 'exam';
    lessonId?: string;
  } | null;
  setActiveTestConfig: (config: AppContextType['activeTestConfig']) => void;
  flashcards: Flashcard[];
  decks: FlashcardDeck[];
  dueFlashcards: Flashcard[];
  handleReviewCard: (cardId: string, rating: SrsRating) => void;
  addFlashcardWord: (hangul: string, meaning: string, romanization?: string, example?: string) => void;
  createCustomDeck: (title: string, description: string) => void;
  memorizedLetters: string[];
  toggleMemorizedLetter: (id: string) => void;
  completedLessons: Record<string, { completed: boolean; score: number }>;
  finishLesson: (lessonId: string, score: number) => void;
  mistakes: MistakeItem[];
  addMistake: (q: Question, userAnswer: string) => void;
  resolveMistakeItem: (id: string) => void;
  testAttempts: TestAttempt[];
  recordTestAttempt: (attempt: TestAttempt) => void;
  addXp: (amount: number, reason?: string) => void;
  toasts: ToastMessage[];
  showToast: (text: string, type?: 'success' | 'info' | 'warning') => void;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  currentUser: UserAccount | null;
  loginUser: (email: string, pass: string) => boolean;
  registerUser: (name: string, email: string, pass: string) => boolean;
  logoutUser: () => void;
  continueAsGuest: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_DECKS: FlashcardDeck[] = [
  { id: 'deck_hangul_40', title: '40 Chữ Cái Hangul', description: 'Trọn bộ 14 phụ âm, 10 nguyên âm và các âm ghép/đôi', isSystem: true, color: 'from-blue-500 to-indigo-600', cardCount: 40 },
  { id: 'deck_elem_1', title: 'Từ vựng Sơ cấp 1 (TOPIK I)', description: 'Chào hỏi, số đếm, mua sắm, đồ ăn và đồ dùng hàng ngày', isSystem: true, color: 'from-emerald-500 to-teal-600', cardCount: 25 },
  { id: 'deck_mistakes', title: 'Thẻ Ôn Từ Lỗi Sai', description: 'Tự động tạo từ các câu hỏi bạn từng làm sai trong bài kiểm tra', isSystem: true, color: 'from-rose-500 to-red-600', cardCount: 2 },
  { id: 'deck_custom_my', title: 'Bộ Thẻ Riêng Của Tôi', description: 'Các từ vựng bạn tự bấm thêm vào khi học bài', isSystem: false, color: 'from-amber-500 to-orange-600', cardCount: 5 }
];

const INITIAL_FLASHCARDS: Flashcard[] = [
  { id: 'fc_1', hangul: '고양이', romanization: 'go-yang-i', meaning: 'Con mèo', deckId: 'deck_hangul_40', status: 'review', intervalDays: 3, easeFactor: 2.5, repetitions: 2, nextReviewDate: new Date().toISOString().split('T')[0] },
  { id: 'fc_2', hangul: '나무', romanization: 'na-mu', meaning: 'Cái cây', deckId: 'deck_hangul_40', status: 'new', intervalDays: 0, easeFactor: 2.5, repetitions: 0, nextReviewDate: new Date().toISOString().split('T')[0] },
  { id: 'fc_3', hangul: '물', romanization: 'mul', meaning: 'Nước uống', deckId: 'deck_elem_1', status: 'mastered', intervalDays: 25, easeFactor: 2.8, repetitions: 5, nextReviewDate: '2026-12-15' },
  { id: 'fc_4', hangul: '감사합니다', romanization: 'gam-sa-ham-ni-da', meaning: 'Xin cảm ơn', deckId: 'deck_elem_1', status: 'learning', intervalDays: 1, easeFactor: 2.4, repetitions: 1, nextReviewDate: new Date().toISOString().split('T')[0] },
  { id: 'fc_5', hangul: '얼마예요?', romanization: 'eol-ma-ye-yo?', meaning: 'Bao nhiêu tiền thế?', deckId: 'deck_elem_1', status: 'learning', intervalDays: 1, easeFactor: 2.5, repetitions: 1, nextReviewDate: new Date().toISOString().split('T')[0] },
  { id: 'fc_6', hangul: '사과', romanization: 'sa-gwa', meaning: 'Quả táo', deckId: 'deck_custom_my', status: 'new', intervalDays: 0, easeFactor: 2.5, repetitions: 0, nextReviewDate: new Date().toISOString().split('T')[0] }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [hangulSubTab, setHangulSubTab] = useState<string>('table');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeTestConfig, setActiveTestConfig] = useState<AppContextType['activeTestConfig']>(null);
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    try {
      const raw = localStorage.getItem('hanguora_flashcards');
      if (raw) return JSON.parse(raw);
    } catch {}
    return INITIAL_FLASHCARDS;
  });
  const [decks, setDecks] = useState<FlashcardDeck[]>(INITIAL_DECKS);
  const [memorizedLetters, setMemorizedLetters] = useState<string[]>(loadMemorizedLetters);
  const [completedLessons, setCompletedLessons] = useState(loadCompletedLessons);
  const [mistakes, setMistakes] = useState<MistakeItem[]>(loadMistakes);
  const [testAttempts, setTestAttempts] = useState<TestAttempt[]>(loadTestAttempts);
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(loadCurrentSession);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(() => {
    return loadCurrentSession() === null;
  });
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>(loadUserAccounts);

  const loginUser = (email: string, pass: string): boolean => {
    const acc = userAccounts.find(
      (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase() && u.password === pass
    );
    if (acc) {
      setCurrentUser(acc);
      saveCurrentSession(acc);
      setProfile((prev) => ({
        ...prev,
        id: acc.id,
        name: acc.name,
        role: acc.role,
        avatar: acc.avatar,
      }));
      setIsAuthModalOpen(false);
      showToast(`Xin chào mừng, ${acc.name}! 👋`, 'success');
      return true;
    }
    showToast('Email hoặc mật khẩu không chính xác!', 'warning');
    return false;
  };

  const registerUser = (name: string, email: string, pass: string): boolean => {
    if (userAccounts.some((u) => u.email.trim().toLowerCase() === email.trim().toLowerCase())) {
      showToast('Email này đã được đăng ký tài khoản!', 'warning');
      return false;
    }
    const newAccount: UserAccount = {
      id: 'u_' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: pass,
      role: 'student',
      avatar: '🌟',
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [...userAccounts, newAccount];
    setUserAccounts(updated);
    saveUserAccounts(updated);
    setCurrentUser(newAccount);
    saveCurrentSession(newAccount);
    setProfile((prev) => ({
      ...prev,
      id: newAccount.id,
      name: newAccount.name,
      role: newAccount.role,
      avatar: newAccount.avatar,
    }));
    setIsAuthModalOpen(false);
    showToast(`Đăng ký thành công! Chào mừng ${newAccount.name} đến với Hanguora! 🎉`, 'success');
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    saveCurrentSession(null);
    setProfile((prev) => ({
      ...prev,
      name: 'Khách',
      role: 'guest',
      avatar: '👤',
    }));
    setIsAuthModalOpen(true);
    showToast('Đã đăng xuất tài khoản.', 'info');
  };

  const continueAsGuest = () => {
    setCurrentUser(null);
    saveCurrentSession(null);
    setProfile((prev) => ({
      ...prev,
      name: 'Khách (Chưa đăng nhập)',
      role: 'guest',
      avatar: '👤',
    }));
    setIsAuthModalOpen(false);
    showToast('Bạn đang duyệt với tư cách Khách. Hãy đăng nhập để lưu tiến độ nhé!', 'info');
  };

  useEffect(() => {
    saveProfile(profile);
    if (profile.settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('hanguora_flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setProfile((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
    showToast('Đã lưu cài đặt của bạn!', 'success');
  };

  const switchRole = (role: UserRole) => {
    setProfile((prev) => ({ ...prev, role }));
    const roleNames: Record<UserRole, string> = {
      guest: 'Khách (Chưa đăng nhập)',
      student: 'Học viên (Đầy đủ chức năng)',
      admin: 'Quản trị viên (Admin)'
    };
    showToast(`Đã chuyển sang vai trò: ${roleNames[role]}`, 'info');
  };

  const addXp = (amount: number, reason?: string) => {
    setProfile((prev) => {
      const nextXp = prev.xp + amount;
      return {
        ...prev,
        xp: nextXp,
      };
    });
    if (profile.settings.soundEffects) {
      audioService.playCorrectSound();
    }
    showToast(`+${amount} XP! ${reason ? `(${reason})` : ''}`, 'success');
  };

  const toggleMemorizedLetter = (id: string) => {
    setMemorizedLetters((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      saveMemorizedLetters(updated);
      showToast(exists ? 'Đã bỏ đánh dấu thuộc' : 'Đã đánh dấu đã thuộc chữ này! 🎉', exists ? 'info' : 'success');
      return updated;
    });
  };

  const handleReviewCard = (cardId: string, rating: SrsRating) => {
    setFlashcards((prev) =>
      prev.map((card) => {
        if (card.id === cardId) {
          const updated = calculateNextReview(card, rating);
          return updated;
        }
        return card;
      })
    );
    addXp(5, 'Ôn thẻ flashcard');
  };

  const addFlashcardWord = (hangul: string, meaning: string, romanization = '', example = '') => {
    const newCard: Flashcard = {
      id: 'fc_' + Date.now(),
      hangul,
      meaning,
      romanization,
      exampleSentence: example,
      deckId: 'deck_custom_my',
      status: 'new',
      intervalDays: 0,
      easeFactor: 2.5,
      repetitions: 0,
      nextReviewDate: new Date().toISOString().split('T')[0]
    };
    setFlashcards((prev) => [newCard, ...prev]);
    showToast(`Đã thêm từ "${hangul}" vào bộ thẻ cá nhân!`, 'success');
  };

  const createCustomDeck = (title: string, description: string) => {
    const newDeck: FlashcardDeck = {
      id: 'deck_' + Date.now(),
      title,
      description,
      isSystem: false,
      color: 'from-purple-500 to-indigo-600',
      cardCount: 0
    };
    setDecks((prev) => [...prev, newDeck]);
    showToast(`Đã tạo bộ thẻ mới: "${title}"`, 'success');
  };

  const finishLesson = (lessonId: string, score: number) => {
    saveCompletedLesson(lessonId, score);
    setCompletedLessons(loadCompletedLessons());
    addXp(10, 'Hoàn thành bài học');
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    if (profile.settings.soundEffects) {
      audioService.playLevelUpSound();
    }
  };

  const addMistake = (q: Question, userAnswer: string) => {
    setMistakes((prev) => {
      const existing = prev.find((m) => m.questionId === q.id);
      let updated: MistakeItem[];
      if (existing) {
        updated = prev.map((m) =>
          m.questionId === q.id
            ? { ...m, wrongCount: m.wrongCount + 1, consecutiveCorrect: 0, isResolved: false, date: new Date().toISOString().split('T')[0] }
            : m
        );
      } else {
        const newItem: MistakeItem = {
          id: 'err_' + Date.now(),
          questionId: q.id,
          prompt: q.prompt,
          userAnswer: Array.isArray(userAnswer) ? userAnswer.join(', ') : userAnswer,
          correctAnswer: Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer,
          explanation: q.explanation,
          skill: q.skill,
          wrongCount: 1,
          consecutiveCorrect: 0,
          isResolved: false,
          date: new Date().toISOString().split('T')[0]
        };
        updated = [newItem, ...prev];
      }
      saveMistakes(updated);
      return updated;
    });
  };

  const resolveMistakeItem = (id: string) => {
    setMistakes((prev) => {
      const updated = prev.map((m) => (m.id === id ? { ...m, isResolved: true } : m));
      saveMistakes(updated);
      return updated;
    });
    showToast('Đã đánh dấu đã khắc phục câu hỏi này!', 'success');
  };

  const recordTestAttempt = (attempt: TestAttempt) => {
    saveTestAttempt(attempt);
    setTestAttempts(loadTestAttempts());
    const xpBonus = Math.round((attempt.score / 100) * 15);
    addXp(xpBonus, `Bài kiểm tra ${attempt.score} điểm`);
  };

  const dueFlashcards = flashcards.filter(isCardDue);

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [showOnboarding, setShowOnboarding] = useState<boolean>(!profile.onboarded);

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        updateSettings,
        switchRole,
        activeTab,
        setActiveTab,
        hangulSubTab,
        setHangulSubTab,
        activeLesson,
        setActiveLesson,
        activeTestConfig,
        setActiveTestConfig,
        flashcards,
        decks,
        dueFlashcards,
        handleReviewCard,
        addFlashcardWord,
        createCustomDeck,
        memorizedLetters,
        toggleMemorizedLetter,
        completedLessons,
        finishLesson,
        mistakes,
        addMistake,
        resolveMistakeItem,
        testAttempts,
        recordTestAttempt,
        addXp,
        toasts,
        showToast,
        showOnboarding,
        setShowOnboarding,
        currentUser,
        loginUser,
        registerUser,
        logoutUser,
        continueAsGuest,
        isAuthModalOpen,
        setIsAuthModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
