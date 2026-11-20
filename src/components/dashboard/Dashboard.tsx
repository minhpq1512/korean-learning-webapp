import React from 'react';
import {
  Play,
  Layers,
  Sparkles,
  BookOpen,
  Award,
  Calendar,
  Flame,
  Zap,
  Plus,
  Check,
  TrendingUp,
  Volume2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { COURSES_DATA } from '../../data/courseData';
import { HANGUL_LETTERS } from '../../data/hangulData';
import { audioService } from '../../utils/audioHelper';

export const Dashboard: React.FC = () => {
  const {
    profile,
    setActiveTab,
    setHangulSubTab,
    setActiveLesson,
    dueFlashcards,
    memorizedLetters,
    completedLessons,
    addFlashcardWord
  } = useApp();

  // Find next lesson to study
  let nextLesson = COURSES_DATA[0].lessons[0];
  let foundNext = false;
  for (const chapter of COURSES_DATA) {
    for (const lesson of chapter.lessons) {
      if (!completedLessons[lesson.id]?.completed) {
        nextLesson = lesson;
        foundNext = true;
        break;
      }
    }
    if (foundNext) break;
  }

  // Word of the day
  const wordOfTheDay = {
    hangul: '행복하다',
    romanization: 'haeng-bok-ha-da',
    meaning: 'Hạnh phúc',
    exampleHangul: '오늘 정말 행복해요.',
    exampleMeaning: 'Hôm nay tôi thật sự rất hạnh phúc.'
  };

  const handleStartNextLesson = () => {
    setActiveLesson(nextLesson);
    setActiveTab('lessons');
  };

  const handleOpenSrs = () => {
    setActiveTab('flashcards');
  };

  const progressPercent = Math.min(
    100,
    Math.round((Object.keys(completedLessons).length / 6) * 100)
  );

  // Mock community leaderboard
  const leaderboard = [
    { rank: 1, name: 'Minh Anh', avatar: '🌸', xp: 420, streak: 12 },
    { rank: 2, name: 'Quốc Bảo', avatar: '⚡', xp: 350, streak: 9 },
    { rank: 3, name: profile.name, avatar: profile.avatar, xp: profile.xp, streak: profile.streak, isMe: true },
    { rank: 4, name: 'Thu Thảo', avatar: '🌟', xp: 300, streak: 6 },
    { rank: 5, name: 'Kim Chi', avatar: '🍜', xp: 260, streak: 4 },
  ].sort((a, b) => b.xp - a.xp).map((item, idx) => ({ ...item, rank: idx + 1 }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-kr-blue via-indigo-900 to-rose-900 text-white p-6 sm:p-10 shadow-xl">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none text-9xl font-black font-hangul select-none">
          한글
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-rose-200 mb-4 border border-white/10">
            <Sparkles size={14} className="text-amber-300" />
            <span>Lộ trình thông minh dành cho người Việt</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Chào {profile.name}! 👋 <br />
            Hôm nay bạn sẵn sàng chinh phục tiếng Hàn chứ?
          </h1>

          <p className="mt-3 text-slate-200 text-sm sm:text-base leading-relaxed">
            Mục tiêu của bạn: <strong className="text-white">{profile.settings.dailyMinutes} phút mỗi ngày</strong>. Chỉ cần học đều đặn, bạn sẽ đọc thông viết thạo bảng chữ cái Hangul chỉ sau 1–2 tuần!
          </p>

          {/* Call-to-action buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={handleStartNextLesson}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold text-sm shadow-lg shadow-rose-900/40 transition-all hover:scale-105 active:scale-95"
            >
              <Play size={18} fill="currentColor" />
              <span>Học bài tiếp theo ({nextLesson.title.split(':')[0]})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('hangul');
                setHangulSubTab('canvas');
              }}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-sm border border-white/20 transition-all"
            >
              <Sparkles size={18} />
              <span>Luyện viết nét Hangul</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Tasks, Stats & Word of Day */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: 2 Cards (Next Lesson & Due Flashcards) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Today's Primary Tasks */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Calendar className="text-rose-500" size={20} />
                <span>Nhiệm vụ hôm nay</span>
              </h2>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                Lịch gợi ý: 5 ngày bài mới · 2 ngày ôn tập
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Task 1: Next Lesson Card */}
              <div className="p-4 rounded-2xl border border-rose-100 dark:border-rose-950 bg-gradient-to-br from-rose-50/60 to-white dark:from-rose-950/20 dark:to-slate-900 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400 mb-2">
                    <span>BÀI HỌC TIẾP THEO</span>
                    <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-900/50 text-[10px]">
                      5-10 phút
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {nextLesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {nextLesson.objective}
                  </p>
                </div>
                <button
                  onClick={handleStartNextLesson}
                  className="mt-4 w-full py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Play size={14} fill="currentColor" />
                  <span>Vào bài học ngay</span>
                </button>
              </div>

              {/* Task 2: SRS Due Cards */}
              <div className="p-4 rounded-2xl border border-indigo-100 dark:border-indigo-950 bg-gradient-to-br from-indigo-50/60 to-white dark:from-indigo-950/20 dark:to-slate-900 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    <span>HỆ THỐNG SRS ÔN TẬP</span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/50 text-[10px]">
                      Hằng ngày
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                      {dueFlashcards.length}
                    </span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      thẻ cần ôn hôm nay
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Ôn ngắt quãng giúp não bộ ghi nhớ từ vựng vĩnh viễn vào bộ nhớ dài hạn.
                  </p>
                </div>
                <button
                  onClick={handleOpenSrs}
                  className="mt-4 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Layers size={14} />
                  <span>Bắt đầu ôn {dueFlashcards.length} thẻ</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts to 6 Hangul Modes */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="text-amber-500" size={20} />
                  <span>Luyện Chữ Hangul Toàn Diện (6 Chế Độ)</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tự tay viết, ghép âm tiết, gõ bàn phím và luyện nghe phân biệt âm
                </p>
              </div>
              <button
                onClick={() => setActiveTab('hangul')}
                className="text-xs font-bold text-rose-500 hover:underline"
              >
                Xem tất cả →
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: 'table', title: 'Bảng chữ cái 40 chữ', icon: '🔤', desc: 'Bấm nghe & ví dụ' },
                { id: 'strokes', title: 'Thứ tự nét viết', icon: '✏️', desc: 'Animation chuẩn' },
                { id: 'canvas', title: 'Viết tay trên Canvas', icon: '🎨', desc: 'Chấm 1-3 sao' },
                { id: 'typing', title: 'Gõ phím 2-Beolsik', icon: '⌨️', desc: 'Tự ghép từ Latin' },
                { id: 'blocks', title: 'Ghép âm tiết', icon: '🧩', desc: 'Kéo thả âm đầu/cuối' },
                { id: 'listening', title: 'Nghe & Phát âm', icon: '🎧', desc: 'Phân biệt âm nhầm' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveTab('hangul');
                    setHangulSubTab(m.id);
                  }}
                  className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-700 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 text-left transition-all group"
                >
                  <div className="text-xl mb-1 group-hover:scale-110 transition-transform">{m.icon}</div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white">{m.title}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{m.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Word of Day, Stats, Community */}
        <div className="space-y-6">
          {/* Word of the Day */}
          <div className="bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-indigo-500/10 dark:from-amber-950/30 dark:via-rose-950/30 dark:to-indigo-950/30 rounded-3xl p-6 border border-amber-200/60 dark:border-amber-900/50 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>Từ vựng của ngày</span>
              </span>
              <button
                onClick={() => audioService.speak(wordOfTheDay.hangul)}
                className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-sm text-amber-600 hover:scale-110 transition-transform"
                title="Nghe phát âm"
              >
                <Volume2 size={16} />
              </button>
            </div>

            <div className="my-2">
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-hangul">
                {wordOfTheDay.hangul}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                [{wordOfTheDay.romanization}]
              </div>
              <div className="text-base font-semibold text-rose-600 dark:text-rose-400 mt-1">
                {wordOfTheDay.meaning}
              </div>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-amber-100 dark:border-slate-700/60 text-xs">
              <div className="font-medium text-slate-800 dark:text-slate-200">
                "{wordOfTheDay.exampleHangul}"
              </div>
              <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                {wordOfTheDay.exampleMeaning}
              </div>
            </div>

            <button
              onClick={() =>
                addFlashcardWord(
                  wordOfTheDay.hangul,
                  wordOfTheDay.meaning,
                  wordOfTheDay.romanization,
                  wordOfTheDay.exampleHangul
                )
              }
              className="mt-4 w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Plus size={14} />
              <span>Thêm vào bộ thẻ Flashcard</span>
            </button>
          </div>

          {/* Quick Progress Overview */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center justify-between">
              <span>Tiến độ học tập</span>
              <button
                onClick={() => setActiveTab('progress')}
                className="text-xs text-rose-500 hover:underline"
              >
                Chi tiết →
              </button>
            </h3>

            {/* Hangul Memorized / 40 */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                <span>Chữ Hangul đã thuộc</span>
                <span className="font-bold text-rose-500">
                  {memorizedLetters.length} / {HANGUL_LETTERS.length}
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(memorizedLetters.length / HANGUL_LETTERS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Course Progress */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                <span>Hoàn thành lộ trình</span>
                <span className="font-bold text-indigo-500">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Daily Streak Freeze Info */}
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50 flex items-center gap-3 text-xs text-amber-800 dark:text-amber-300">
              <Flame size={20} className="text-amber-500 flex-shrink-0" />
              <div>
                Chuỗi hiện tại: <strong>{profile.streak} ngày</strong>. Bạn còn <strong>1 ngày nghỉ phép</strong> bảo vệ streak tuần này.
              </div>
            </div>
          </div>

          {/* Weekly Community Leaderboard */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                <TrendingUp size={16} className="text-rose-500" />
                <span>Bảng xếp hạng tuần</span>
              </h3>
              <span className="text-[10px] text-slate-400">Cập nhật mỗi 24h</span>
            </div>

            <div className="space-y-2.5">
              {leaderboard.map((item) => (
                <div
                  key={item.name}
                  className={`flex items-center justify-between p-2.5 rounded-xl text-xs transition-all ${
                    item.isMe
                      ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 font-bold text-rose-900 dark:text-rose-200'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 text-center font-extrabold ${item.rank <= 3 ? 'text-amber-500' : 'text-slate-400'}`}>
                      {item.rank}
                    </span>
                    <span className="text-base">{item.avatar}</span>
                    <span>{item.name} {item.isMe && '(Bạn)'}</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400 text-[10px]">🔥{item.streak}</span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">{item.xp} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
