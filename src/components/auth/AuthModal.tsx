import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User,
  LogIn,
  UserPlus,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  GraduationCap,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    loginUser,
    registerUser,
    continueAsGuest,
    currentUser
  } = useApp();

  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email, password);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    registerUser(name, email, password);
  };

  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    loginUser(demoEmail, demoPass);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md shadow-2xl p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto">
        {/* Close Button (if user is already logged in or wants to dismiss) */}
        {currentUser && (
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        )}

        {/* Branding & Welcome */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 via-kr-red to-kr-blue flex items-center justify-center text-white font-black text-2xl shadow-lg mx-auto mb-3">
            한
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {tab === 'login' ? 'Đăng Nhập Hanguora' : 'Tạo Tài Khoản Học Viên'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Đăng nhập để lưu tiến độ, làm bài test và đồng bộ thẻ Flashcard của bạn.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold mb-6">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              tab === 'login'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Đăng Nhập
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-2 rounded-xl transition-all ${
              tab === 'register'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Đăng Ký Mới
          </button>
        </div>

        {/* LOGIN FORM */}
        {tab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Mật khẩu</label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-kr-red hover:from-rose-600 hover:to-red-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-rose-200 dark:shadow-none transition-all flex items-center justify-center gap-2"
            >
              <LogIn size={16} />
              <span>Đăng nhập ngay</span>
            </button>
          </form>
        )}

        {/* REGISTER FORM */}
        {tab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Họ và tên của bạn</label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Mật khẩu</label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Xác nhận mật khẩu</label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-indigo-600 hover:opacity-95 text-white font-bold text-xs rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <UserPlus size={16} />
              <span>Đăng ký & Bắt đầu học</span>
            </button>
          </form>
        )}

        {/* Demo 1-Click Quick Login Buttons */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase text-center">
            Hoặc đăng nhập nhanh bằng tài khoản mẫu:
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickLogin('hocvien@hanguora.vn', '123')}
              className="p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 text-left hover:border-emerald-400 transition-all flex items-center gap-2"
            >
              <GraduationCap size={16} className="text-emerald-600 flex-shrink-0" />
              <div>
                <div className="font-bold text-xs">Học viên mẫu</div>
                <div className="text-[10px] text-slate-400">hocvien@...</div>
              </div>
            </button>

            <button
              onClick={() => handleQuickLogin('admin@hanguora.vn', 'admin')}
              className="p-2.5 rounded-xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/50 dark:bg-purple-950/20 text-purple-800 dark:text-purple-300 text-left hover:border-purple-400 transition-all flex items-center gap-2"
            >
              <SlidersHorizontal size={16} className="text-purple-600 flex-shrink-0" />
              <div>
                <div className="font-bold text-xs">Admin hệ thống</div>
                <div className="text-[10px] text-slate-400">admin@...</div>
              </div>
            </button>
          </div>
        </div>

        {/* Continue as Guest button */}
        <div className="mt-4 text-center">
          <button
            onClick={continueAsGuest}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:underline inline-flex items-center gap-1"
          >
            <span>Duyệt thử với tư cách Khách (Chưa đăng nhập)</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};
