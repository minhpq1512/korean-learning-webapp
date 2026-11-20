import React from 'react';
import {
  Flame,
  Zap,
  Moon,
  Sun,
  ShieldCheck,
  Settings,
  Volume2,
  Type,
  BookOpen,
  LayoutGrid,
  Sparkles,
  Award,
  Layers,
  FileCheck2,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const {
    profile,
    updateSettings,
    switchRole,
    activeTab,
    setActiveTab,
    setShowOnboarding
  } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Trang chủ', icon: LayoutGrid },
    { id: 'hangul', label: 'Luyện chữ Hangul', icon: Sparkles, badge: 'Đặc trưng' },
    { id: 'lessons', label: 'Bài học', icon: BookOpen },
    { id: 'flashcards', label: 'Flashcard SRS', icon: Layers },
    { id: 'testing', label: 'Kiểm tra & Thi thử', icon: FileCheck2 },
    { id: 'progress', label: 'Tiến độ & Điểm yếu', icon: Award },
    ...(profile.role === 'admin' ? [{ id: 'admin', label: 'Quản trị (Admin)', icon: SlidersHorizontal }] : [])
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with Branding, Role switch and Quick toggles */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 via-kr-red to-kr-blue flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                한
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-rose-600 via-kr-blue to-indigo-600 bg-clip-text text-transparent">
                  Hanguora
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 rounded-full">
                  Tiếng Hàn Người Mới
                </span>
              </div>
            </button>
          </div>

          {/* Quick Stats: Streak & XP */}
          <div className="hidden md:flex items-center gap-3">
            {/* Streak */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 rounded-full text-amber-700 dark:text-amber-400 font-semibold text-sm shadow-sm" title="Chuỗi ngày học liên tục. Có 1 ngày nghỉ phép bảo vệ streak/tuần!">
              <Flame size={18} className="text-amber-500 animate-bounce" />
              <span>{profile.streak} ngày</span>
              {profile.streakFreezesAvailable > 0 && (
                <span title="Có bảo vệ đóng băng chuỗi">
                  <ShieldCheck size={14} className="text-emerald-500 ml-0.5" />
                </span>
              )}
            </div>

            {/* Daily XP */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-full text-rose-700 dark:text-rose-400 font-semibold text-sm shadow-sm">
              <Zap size={18} className="text-rose-500" />
              <span>{profile.xp} XP</span>
              <span className="text-xs text-rose-400 font-normal">/ {profile.settings.dailyXpGoal} XP</span>
            </div>
          </div>

          {/* Controls: Audio Speed, Romanization, Dark mode, Role, Settings */}
          <div className="flex items-center gap-2">
            {/* Romanization Toggle */}
            <button
              onClick={() => updateSettings({ romanizationEnabled: !profile.settings.romanizationEnabled })}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                profile.settings.romanizationEnabled
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
              title="Bật/Tắt phiên âm Latin (Romanization)"
            >
              <Type size={16} />
              <span className="hidden lg:inline">{profile.settings.romanizationEnabled ? 'Latin: Bật' : 'Latin: Tắt'}</span>
            </button>

            {/* Audio Speed Toggle */}
            <button
              onClick={() => updateSettings({ audioSpeed: profile.settings.audioSpeed === 1.0 ? 0.75 : 1.0 })}
              className="p-2 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Tốc độ phát âm tiếng Hàn (1.0x chuẩn hoặc 0.75x chậm)"
            >
              <Volume2 size={16} />
              <span>{profile.settings.audioSpeed}x</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => updateSettings({ theme: profile.settings.theme === 'light' ? 'dark' : 'light' })}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Chuyển chế độ Sáng / Tối"
            >
              {profile.settings.theme === 'light' ? <Moon size={17} /> : <Sun size={17} className="text-amber-400" />}
            </button>

            {/* Role Switcher Pill */}
            <div className="relative group">
              <select
                value={profile.role}
                onChange={(e) => switchRole(e.target.value as UserRole)}
                className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 py-1.5 px-2.5 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="student">🎓 Học viên</option>
                <option value="guest">👤 Khách</option>
                <option value="admin">⚙️ Admin</option>
              </select>
            </div>

            {/* Onboarding / Personalize Button */}
            <button
              onClick={() => setShowOnboarding(true)}
              className="p-2 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 transition-colors"
              title="Mở lại khảo sát Onboarding & Cá nhân hoá"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-100 dark:border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-sm shadow-rose-200 dark:shadow-none'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                    isActive ? 'bg-white/20 text-white' : 'bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
