import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { OnboardingModal } from './components/onboarding/OnboardingModal';
import { AuthModal } from './components/auth/AuthModal';
import { Dashboard } from './components/dashboard/Dashboard';
import { HangulHub } from './components/hangul/HangulHub';
import { LessonListView } from './components/lessons/LessonListView';
import { LessonStudyView } from './components/lessons/LessonStudyView';
import { FlashcardHub } from './components/flashcards/FlashcardHub';
import { TestHub } from './components/testing/TestHub';
import { ProgressDashboard } from './components/progress/ProgressDashboard';
import { AdminPanel } from './components/admin/AdminPanel';
import { Sparkles, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const AppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    activeLesson,
    setActiveLesson,
    toasts,
    profile
  } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1">
        {/* If studying a specific lesson */}
        {activeTab === 'lessons' && activeLesson ? (
          <LessonStudyView
            lesson={activeLesson}
            onBack={() => setActiveLesson(null)}
          />
        ) : (
          <>
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'hangul' && <HangulHub />}
            {activeTab === 'lessons' && <LessonListView />}
            {activeTab === 'flashcards' && <FlashcardHub />}
            {activeTab === 'testing' && <TestHub />}
            {activeTab === 'progress' && <ProgressDashboard />}
            {activeTab === 'admin' && <AdminPanel />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 mt-12 text-center text-xs text-slate-500 dark:text-slate-400 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-rose-500 font-hangul text-base">Hanguora</span>
            <span>· Web App Học Tiếng Hàn Cho Người Mới Bắt Đầu</span>
          </div>
          <div>
            Được thiết kế cho người Việt học Hangul & Sơ cấp (TOPIK I) · © 2026 Hanguora Team
          </div>
        </div>
      </footer>

      {/* Global Toast Notifications */}
      <div className="fixed bottom-5 right-5 z-50 space-y-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs font-bold text-white transition-all transform animate-fade-in ${
              toast.type === 'success'
                ? 'bg-emerald-600 shadow-emerald-900/20'
                : toast.type === 'warning'
                ? 'bg-amber-600 shadow-amber-900/20'
                : 'bg-slate-900 dark:bg-slate-100 dark:text-slate-900 shadow-slate-900/20'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 size={16} />}
            {toast.type === 'warning' && <AlertCircle size={16} />}
            {toast.type === 'info' && <Info size={16} />}
            <span>{toast.text}</span>
          </div>
        ))}
      </div>

      {/* Onboarding Wizard Modal */}
      <OnboardingModal />

      {/* Authentication Modal (Login / Register / Guest) */}
      <AuthModal />
    </div>
  );
};
