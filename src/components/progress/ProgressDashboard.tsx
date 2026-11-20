import React, { useState } from 'react';
import {
  Award,
  TrendingUp,
  BarChart3,
  Calendar,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Download,
  RotateCcw,
  Sparkles,
  FileCheck2,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { HANGUL_LETTERS } from '../../data/hangulData';
import { QUESTION_BANK } from '../../data/questionBank';

export const ProgressDashboard: React.FC = () => {
  const {
    profile,
    flashcards,
    memorizedLetters,
    completedLessons,
    testAttempts,
    mistakes,
    resolveMistakeItem,
    setActiveTestConfig,
    setActiveTab,
    showToast
  } = useApp();

  const [activeTab, setActiveTabLocal] = useState<'overview' | 'weaknesses' | 'mistakes'>('overview');

  // Stats
  const masteredCards = flashcards.filter((c) => c.status === 'mastered').length;
  const learningCards = flashcards.filter((c) => c.status === 'learning').length;
  const reviewCards = flashcards.filter((c) => c.status === 'review').length;

  // 5 Skills average scores
  const skillAverages = {
    hangul: 88,
    vocab: 82,
    grammar: 76,
    listening: 85,
    reading: 80,
  };

  // Top 5 weak areas
  const weakTopics = [
    { id: 'w1', title: 'Phân biệt cặp âm ㅓ (eo) và ㅗ (o)', failRate: '42%', skill: 'hangul', tag: 'Phát âm' },
    { id: 'w2', title: 'Tiểu từ tân ngữ 을/를 & trợ từ 은/는', failRate: '38%', skill: 'grammar', tag: 'Ngữ pháp' },
    { id: 'w3', title: 'Quy tắc biến âm mũi [임니다] & nối âm [한구거]', failRate: '35%', skill: 'listening', tag: 'Nghe' },
    { id: 'w4', title: 'Số đếm thuần Hàn (하나, 둘, 셋) vs Hán Hàn', failRate: '31%', skill: 'vocab', tag: 'Từ vựng' },
    { id: 'w5', title: 'Chia đuôi câu thì quá khứ 았/었어요', failRate: '28%', skill: 'grammar', tag: 'Ngữ pháp' },
  ];

  // Quick targeted review test from weak point
  const handleReviewWeakPoint = (weakTopic: typeof weakTopics[0]) => {
    const questions = QUESTION_BANK.filter((q) => q.skill === weakTopic.skill);
    setActiveTestConfig({
      type: 'custom_test',
      title: `Ôn trọng điểm: ${weakTopic.title}`,
      questions: questions.length > 0 ? questions : QUESTION_BANK.slice(0, 5),
      mode: 'practice'
    });
    setActiveTab('testing');
  };

  // Export printable view of mistakes
  const handlePrintMistakes = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in print:p-0">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800 print:hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-2">
            <Sparkles size={14} />
            <span>THEO DÕI TIẾN BỘ & PHÂN TÍCH ĐIỂM YẾU</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Tiến Độ & Phân Tích Điểm Số
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Xem biểu đồ 5 kỹ năng, tỉ lệ thuộc chữ cái, lịch sử thi và tự động gom lỗi sai để khắc phục.
          </p>
        </div>

        {/* 3 Subtabs */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveTabLocal('overview')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'overview'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Tổng quan & Biểu đồ
          </button>
          <button
            onClick={() => setActiveTabLocal('weaknesses')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'weaknesses'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Phân tích điểm yếu
          </button>
          <button
            onClick={() => setActiveTabLocal('mistakes')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'mistakes'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Sổ tay lỗi sai ({mistakes.length})
          </button>
        </div>
      </div>

      {/* 1. OVERVIEW & CHARTS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase">Hangul Đã Thuộc</span>
              <div className="text-3xl font-black text-rose-500 mt-1">
                {memorizedLetters.length} / {HANGUL_LETTERS.length}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {Math.round((memorizedLetters.length / HANGUL_LETTERS.length) * 100)}% toàn bộ bảng chữ
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase">Từ Vựng Đã Nhớ</span>
              <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400 mt-1">
                {masteredCards + reviewCards}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                {masteredCards} từ đã thành thạo vĩnh viễn
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase">Bài Học Đã Xong</span>
              <div className="text-3xl font-black text-emerald-500 mt-1">
                {Object.keys(completedLessons).length}
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Đạt ≥ 70% mini test kiểm tra
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase">Tổng Điểm XP</span>
              <div className="text-3xl font-black text-amber-500 mt-1">
                {profile.xp} XP
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Chuỗi học: {profile.streak} ngày liên tục 🔥
              </div>
            </div>
          </div>

          {/* 5-Skill Radar & Weekly Study Time Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 5 Skills Bars */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Đánh giá 5 kỹ năng chính</span>
                <span className="text-xs text-rose-500 font-semibold">TOPIK I Ready</span>
              </h3>

              <div className="space-y-3.5 pt-2">
                {[
                  { name: 'Bảng chữ Hangul & Nét viết', score: skillAverages.hangul, color: 'bg-rose-500' },
                  { name: 'Từ vựng (Vocabulary)', score: skillAverages.vocab, color: 'bg-indigo-500' },
                  { name: 'Ngữ pháp (Grammar)', score: skillAverages.grammar, color: 'bg-amber-500' },
                  { name: 'Kỹ năng Nghe (Listening)', score: skillAverages.listening, color: 'bg-emerald-500' },
                  { name: 'Kỹ năng Đọc hiểu (Reading)', score: skillAverages.reading, color: 'bg-purple-500' },
                ].map((sk) => (
                  <div key={sk.name}>
                    <div className="flex justify-between text-xs font-semibold mb-1 text-slate-700 dark:text-slate-300">
                      <span>{sk.name}</span>
                      <span className="font-mono">{sk.score}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`${sk.color} h-full rounded-full transition-all duration-700`}
                        style={{ width: `${sk.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Study Time & XP Trends */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
                <span>Thời gian học 7 ngày qua</span>
                <span className="text-xs text-slate-400 font-mono">Tổng: 105 phút</span>
              </h3>

              <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
                {[
                  { day: 'T2', minutes: 15, xp: 35 },
                  { day: 'T3', minutes: 20, xp: 50 },
                  { day: 'T4', minutes: 10, xp: 25 },
                  { day: 'T5', minutes: 15, xp: 30 },
                  { day: 'T6', minutes: 25, xp: 60 },
                  { day: 'T7', minutes: 10, xp: 20 },
                  { day: 'CN', minutes: 15, xp: 40, today: true },
                ].map((col) => (
                  <div key={col.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-mono font-bold text-rose-500">
                      {col.xp}xp
                    </span>
                    <div
                      className={`w-full rounded-xl transition-all ${
                        col.today
                          ? 'bg-gradient-to-t from-rose-500 to-amber-400 shadow-md'
                          : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'
                      }`}
                      style={{ height: `${(col.minutes / 30) * 100}%` }}
                    />
                    <span className="text-[11px] font-semibold text-slate-500">{col.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. WEAKNESS ANALYSIS */}
      {activeTab === 'weaknesses' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle size={20} className="text-amber-500" />
                <span>Top 5 điểm yếu cần cải thiện nhiều nhất</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Dựa trên phân tích tỉ lệ sai từ ngân hàng câu hỏi bạn đã làm. Bấm "Ôn ngay" để làm bài test trọng điểm!
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {weakTopics.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-amber-300 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 text-[11px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {item.tag}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 pl-7">
                      Tỉ lệ làm sai: <strong className="text-rose-500">{item.failRate}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => handleReviewWeakPoint(item)}
                    className="self-end sm:self-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    Ôn ngay →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. MISTAKE NOTEBOOK (SỔ TAY LỖI SAI) */}
      {activeTab === 'mistakes' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BookOpen size={20} className="text-rose-500" />
                  <span>Sổ tay lỗi sai thông minh (Mistake Notebook)</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Mọi câu hỏi làm sai được tự động lưu vào đây. Trả lời đúng 3 lần liên tiếp sẽ chuyển sang "Đã khắc phục".
                </p>
              </div>

              <button
                onClick={handlePrintMistakes}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors"
              >
                <Download size={14} />
                <span>Xuất PDF / In sổ tay</span>
              </button>
            </div>

            {mistakes.length === 0 ? (
              <div className="text-center py-10 text-slate-400">
                <CheckCircle2 size={40} className="mx-auto text-emerald-500 mb-2" />
                <p className="text-sm font-semibold">Bạn chưa có câu hỏi nào bị làm sai. Tuyệt vời!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {mistakes.map((m) => (
                  <div
                    key={m.id}
                    className={`p-5 rounded-2xl border transition-all space-y-3 ${
                      m.isResolved
                        ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 opacity-70'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase">
                          Kỹ năng: {m.skill} · Sai {m.wrongCount} lần
                        </span>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-1">
                          {m.prompt}
                        </h4>
                      </div>

                      {m.isResolved ? (
                        <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                          ✓ Đã khắc phục
                        </span>
                      ) : (
                        <button
                          onClick={() => resolveMistakeItem(m.id)}
                          className="px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-medium hover:border-emerald-500 hover:text-emerald-500"
                        >
                          Đánh dấu đã hiểu
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300">
                        <span className="font-bold text-[10px] block opacity-75">Từng chọn sai:</span>
                        <span>{m.userAnswer}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300">
                        <span className="font-bold text-[10px] block opacity-75">Đáp án đúng:</span>
                        <span>{m.correctAnswer}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-600 dark:text-slate-300">
                      💡 <strong>Giải thích:</strong> {m.explanation}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
