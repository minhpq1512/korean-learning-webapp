import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Plus,
  Volume2,
  Award,
  ArrowLeft,
  Clock,
  Filter,
  Layers,
  BookOpen
} from 'lucide-react';
import { TestAttempt, Question } from '../../types';
import { useApp } from '../../context/AppContext';
import { audioService } from '../../utils/audioHelper';

interface TestResultViewProps {
  attempt: TestAttempt;
  questions: Question[];
  onRetry: (onlyWrongs?: boolean) => void;
  onClose: () => void;
}

export const TestResultView: React.FC<TestResultViewProps> = ({
  attempt,
  questions,
  onRetry,
  onClose
}) => {
  const { addFlashcardWord, showToast } = useApp();
  const [filterWrongOnly, setFilterWrongOnly] = useState(false);

  const isPassed = attempt.score >= 70;

  // Add all failed questions' vocabulary to flashcards
  const handleAddWrongsToFlashcards = () => {
    attempt.answers.forEach((ans) => {
      if (!ans.isCorrect) {
        const q = questions.find((item) => item.id === ans.questionId);
        if (q && q.audioPrompt) {
          addFlashcardWord(q.audioPrompt, q.prompt);
        } else if (q) {
          addFlashcardWord(Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer, q.prompt);
        }
      }
    });
    showToast('Đã thêm các câu làm sai vào bộ thẻ ôn tập!', 'success');
  };

  const displayedAnswers = filterWrongOnly
    ? attempt.answers.filter((a) => !a.isCorrect)
    : attempt.answers;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-8 animate-fade-in">
      {/* Top Header Card */}
      <div
        className={`p-8 rounded-3xl text-center space-y-4 shadow-xl text-white ${
          isPassed
            ? 'bg-gradient-to-br from-emerald-600 via-teal-700 to-indigo-800'
            : 'bg-gradient-to-br from-rose-600 via-red-700 to-amber-700'
        }`}
      >
        <div className="text-5xl">{isPassed ? '🏆' : '💪'}</div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider opacity-80">
            KẾT QUẢ BÀI KIỂM TRA
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">{attempt.title}</h2>
        </div>

        {/* Big Score Number */}
        <div className="flex items-center justify-center gap-3">
          <div className="text-6xl sm:text-7xl font-black">{attempt.score}</div>
          <div className="text-left text-xs sm:text-sm font-semibold opacity-90">
            <div>/ {attempt.type === 'topik_mock' ? '200 điểm' : '100 điểm'}</div>
            <div>
              {attempt.correctCount} / {attempt.totalQuestions} câu đúng
            </div>
            <div className="flex items-center gap-1 font-mono text-[11px] opacity-80">
              <Clock size={12} />
              <span>{Math.round(attempt.timeSpentSeconds / 60)} phút {attempt.timeSpentSeconds % 60}s</span>
            </div>
          </div>
        </div>

        {/* TOPIK prediction level if applicable */}
        {attempt.predictedTopikLevel && (
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold border border-white/20">
            Ước tính TOPIK I: <strong className="underline">{attempt.predictedTopikLevel}</strong>
          </div>
        )}

        <p className="text-xs sm:text-sm max-w-md mx-auto opacity-95">
          {isPassed
            ? 'Tuyệt vời! Bạn đã vượt qua bài kiểm tra này xuất sắc.'
            : 'Đừng nản lòng! Hãy xem lại giải thích các câu sai bên dưới và làm lại nhé.'}
        </p>

        {/* Top Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onRetry(false)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-800 font-bold text-xs hover:bg-slate-100 transition-colors shadow-md"
          >
            <RotateCcw size={14} />
            <span>Làm lại toàn bộ</span>
          </button>

          {attempt.correctCount < attempt.totalQuestions && (
            <button
              onClick={() => onRetry(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xs transition-colors shadow-md"
            >
              <RotateCcw size={14} />
              <span>Chỉ làm lại câu sai</span>
            </button>
          )}

          <button
            onClick={handleAddWrongsToFlashcards}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-black/20 hover:bg-black/30 border border-white/30 text-white font-semibold text-xs transition-colors"
          >
            <Plus size={14} />
            <span>Thêm câu sai vào Flashcard</span>
          </button>
        </div>
      </div>

      {/* Review Questions & Vietnamese Explanations */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Xem lại chi tiết từng câu hỏi & đáp án
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kèm giải thích ngữ pháp chi tiết bằng tiếng Việt
            </p>
          </div>

          <button
            onClick={() => setFilterWrongOnly(!filterWrongOnly)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              filterWrongOnly
                ? 'border-rose-500 bg-rose-50 text-rose-600 dark:bg-rose-950/40'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Filter size={14} />
            <span>{filterWrongOnly ? 'Hiện tất cả câu' : 'Chỉ xem câu sai'}</span>
          </button>
        </div>

        {/* Questions list */}
        <div className="space-y-4">
          {displayedAnswers.map((ans, idx) => {
            const question = questions.find((q) => q.id === ans.questionId);
            if (!question) return null;

            return (
              <div
                key={ans.questionId}
                className={`p-5 rounded-2xl border transition-all space-y-3 ${
                  ans.isCorrect
                    ? 'border-emerald-100 dark:border-emerald-950/60 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {ans.isCorrect ? (
                      <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={20} />
                    ) : (
                      <XCircle className="text-rose-500 flex-shrink-0" size={20} />
                    )}
                    <span className="text-xs font-bold uppercase text-slate-400">
                      Câu hỏi #{idx + 1} ({question.skill})
                    </span>
                  </div>

                  {question.audioPrompt && (
                    <button
                      onClick={() => audioService.speak(question.audioPrompt!)}
                      className="p-1 rounded-lg text-rose-500 hover:bg-rose-100"
                      title="Nghe lại âm thanh"
                    >
                      <Volume2 size={16} />
                    </button>
                  )}
                </div>

                <div className="font-semibold text-sm text-slate-900 dark:text-white">
                  {question.prompt}
                </div>

                {question.passage && (
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl text-xs font-hangul leading-relaxed border border-slate-200 dark:border-slate-700 whitespace-pre-line">
                    {question.passage}
                  </div>
                )}

                {/* Answers Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className={`p-2.5 rounded-xl border ${
                    ans.isCorrect
                      ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300'
                      : 'border-rose-200 bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300'
                  }`}>
                    <span className="font-bold block text-[10px] opacity-75">Đáp án của bạn:</span>
                    <span className="font-semibold">
                      {Array.isArray(ans.userAnswer) ? ans.userAnswer.join(', ') : ans.userAnswer || '(Bỏ trống)'}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300">
                    <span className="font-bold block text-[10px] opacity-75">Đáp án đúng:</span>
                    <span className="font-semibold">
                      {Array.isArray(question.correctAnswer) ? question.correctAnswer.join(', ') : question.correctAnswer}
                    </span>
                  </div>
                </div>

                {/* Vietnamese Explanation */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                  💡 <strong>Giải thích:</strong> {question.explanation}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-opacity"
          >
            Đóng & Quay về trung tâm kiểm tra
          </button>
        </div>
      </div>
    </div>
  );
};
