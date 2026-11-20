import React, { useState } from 'react';
import { Sliders, X, Sparkles, CheckSquare, Target, Clock } from 'lucide-react';
import { Question } from '../../types';
import { QUESTION_BANK } from '../../data/questionBank';
import { useApp } from '../../context/AppContext';

interface CustomTestBuilderProps {
  onClose: () => void;
  onStartTest: (config: {
    title: string;
    type: 'custom_test';
    questions: Question[];
    mode: 'practice' | 'exam';
  }) => void;
}

export const CustomTestBuilderModal: React.FC<CustomTestBuilderProps> = ({
  onClose,
  onStartTest
}) => {
  const { mistakes } = useApp();

  const [scope, setScope] = useState<'all' | 'mistakes' | 'hangul' | 'elementary'>('all');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'vocab',
    'grammar',
    'listening',
    'reading',
    'hangul'
  ]);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | 'mixed'>('mixed');
  const [mode, setMode] = useState<'practice' | 'exam'>('practice');

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.length > 1
          ? prev.filter((s) => s !== skill)
          : prev
        : [...prev, skill]
    );
  };

  const handleGenerate = () => {
    let pool = [...QUESTION_BANK];

    // Filter by scope
    if (scope === 'mistakes') {
      const mistakeQIds = mistakes.map((m) => m.questionId);
      pool = pool.filter((q) => mistakeQIds.includes(q.id));
    } else if (scope === 'hangul') {
      pool = pool.filter((q) => q.skill === 'hangul' || q.lessonId?.includes('hangul'));
    } else if (scope === 'elementary') {
      pool = pool.filter((q) => q.lessonId?.includes('elem'));
    }

    // Filter by skills
    pool = pool.filter((q) => selectedSkills.includes(q.skill));

    // Filter by difficulty if not mixed
    if (difficulty !== 'mixed') {
      const diffMatches = pool.filter((q) => q.difficulty === difficulty);
      if (diffMatches.length > 0) pool = diffMatches;
    }

    // Shuffle and slice
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const finalQuestions = (shuffled.length > 0 ? shuffled : QUESTION_BANK).slice(0, questionCount);

    onStartTest({
      title: `Đề tự tạo: ${scope === 'mistakes' ? 'Sổ tay lỗi sai' : 'Tổng hợp kỹ năng'} (${finalQuestions.length} câu)`,
      type: 'custom_test',
      questions: finalQuestions,
      mode
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X size={20} />
        </button>

        <div className="space-y-1">
          <span className="text-xs font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders size={14} />
            <span>TẠO BÀI TEST THEO NHU CẦU</span>
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Tuỳ chỉnh cấu hình đề kiểm tra
          </h2>
        </div>

        {/* 1. Scope */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">1. Phạm vi kiến thức</label>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            {[
              { id: 'all', label: 'Tất cả bài học' },
              { id: 'mistakes', label: `Chỉ câu từng làm sai (${mistakes.length})` },
              { id: 'hangul', label: 'Chuyên đề chữ Hangul' },
              { id: 'elementary', label: 'Chuyên đề Sơ cấp 1-2' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setScope(s.id as any)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  scope === s.id
                    ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 ring-2 ring-rose-500/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Skills */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">2. Kỹ năng kiểm tra</label>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            {[
              { id: 'vocab', label: 'Từ vựng' },
              { id: 'grammar', label: 'Ngữ pháp' },
              { id: 'listening', label: 'Nghe' },
              { id: 'reading', label: 'Đọc hiểu' },
              { id: 'hangul', label: 'Viết Hangul' },
            ].map((sk) => {
              const isSelected = selectedSkills.includes(sk.id);
              return (
                <button
                  key={sk.id}
                  type="button"
                  onClick={() => toggleSkill(sk.id)}
                  className={`px-3 py-1.5 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {isSelected ? '✓ ' : ''}{sk.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Question Count & Difficulty */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">3. Số lượng câu</label>
            <div className="flex gap-2">
              {[10, 20, 30].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setQuestionCount(count)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                    questionCount === count
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {count} câu
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase">4. Độ khó</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
            >
              <option value="mixed">Trộn độ khó (Gợi ý)</option>
              <option value="easy">Dễ</option>
              <option value="medium">Vừa phải</option>
              <option value="hard">Khó</option>
            </select>
          </div>
        </div>

        {/* 5. Mode: Practice vs Exam */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase">5. Chế độ làm bài</label>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <button
              type="button"
              onClick={() => setMode('practice')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                mode === 'practice'
                  ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20 font-bold'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div>Luyện tập</div>
              <div className="text-[10px] opacity-75 mt-0.5">Xem đáp án & giải thích ngay sau mỗi câu</div>
            </button>

            <button
              type="button"
              onClick={() => setMode('exam')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                mode === 'exam'
                  ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20 font-bold'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <div>Kiểm tra bấm giờ</div>
              <div className="text-[10px] opacity-75 mt-0.5">Có đồng hồ đếm giờ, chỉ hiện kết quả khi nộp bài</div>
            </button>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-indigo-600 text-white font-bold text-xs rounded-2xl shadow-lg hover:opacity-95 transition-all"
        >
          Tạo đề & Bắt đầu làm bài ngay 🚀
        </button>
      </div>
    </div>
  );
};
