import React, { useState, useEffect } from 'react';
import {
  Clock,
  ArrowRight,
  ArrowLeft,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Send
} from 'lucide-react';
import { Question, TestAttempt, TestAttemptAnswer } from '../../types';
import { useApp } from '../../context/AppContext';
import { audioService } from '../../utils/audioHelper';
import { TestResultView } from './TestResultView';

interface TestRunnerProps {
  title: string;
  type: 'mini_test' | 'chapter_test' | 'custom_test' | 'topik_mock';
  questions: Question[];
  mode: 'practice' | 'exam';
  lessonId?: string;
  onExit: () => void;
}

export const TestRunner: React.FC<TestRunnerProps> = ({
  title,
  type,
  questions,
  mode,
  lessonId,
  onExit
}) => {
  const { recordTestAttempt, addMistake, finishLesson } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | string[]>>({});
  const [scramblePicks, setScramblePicks] = useState<Record<string, string[]>>({});
  const [showInstantExplanation, setShowInstantExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [completedAttempt, setCompletedAttempt] = useState<TestAttempt | null>(null);

  // Timer
  const timeLimitSeconds = type === 'topik_mock' ? 6000 : (type === 'chapter_test' ? 1200 : 0);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQ = questions[currentIndex];

  // Scramble helpers
  const handlePickWord = (word: string) => {
    const currentPicks = scramblePicks[currentQ.id] || [];
    if (currentPicks.includes(word)) {
      const updated = currentPicks.filter((w) => w !== word);
      setScramblePicks((prev) => ({ ...prev, [currentQ.id]: updated }));
      setUserAnswers((prev) => ({ ...prev, [currentQ.id]: updated.join(',') }));
    } else {
      const updated = [...currentPicks, word];
      setScramblePicks((prev) => ({ ...prev, [currentQ.id]: updated }));
      setUserAnswers((prev) => ({ ...prev, [currentQ.id]: updated.join(',') }));
    }
  };

  const handleSelectOption = (opt: string) => {
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: opt }));
    if (mode === 'practice') {
      setShowInstantExplanation(true);
      const isCorrect = opt.trim().toLowerCase() === String(currentQ.correctAnswer).trim().toLowerCase();
      if (isCorrect) audioService.playCorrectSound();
      else audioService.playWrongSound();
    }
  };

  // Grade test
  const handleSubmitTest = () => {
    let correctCount = 0;
    const answers: TestAttemptAnswer[] = [];
    const skillStats: Record<string, { total: number; correct: number }> = {
      hangul: { total: 0, correct: 0 },
      vocab: { total: 0, correct: 0 },
      grammar: { total: 0, correct: 0 },
      listening: { total: 0, correct: 0 },
      reading: { total: 0, correct: 0 },
    };

    questions.forEach((q) => {
      const userAns = userAnswers[q.id] || '';
      let isCorrect = false;

      if (Array.isArray(q.correctAnswer)) {
        isCorrect = q.correctAnswer.some((ans) => ans.trim().toLowerCase() === String(userAns).trim().toLowerCase());
      } else {
        isCorrect = String(q.correctAnswer).trim().toLowerCase() === String(userAns).trim().toLowerCase();
      }

      if (isCorrect) {
        correctCount += 1;
        skillStats[q.skill].correct += 1;
      } else {
        // Record mistake in notebook
        addMistake(q, Array.isArray(userAns) ? userAns.join(', ') : userAns);
      }
      skillStats[q.skill].total += 1;

      answers.push({
        questionId: q.id,
        userAnswer: userAns,
        isCorrect,
      });
    });

    const scoreScale = type === 'topik_mock' ? 200 : 100;
    const finalScore = Math.round((correctCount / questions.length) * scoreScale);

    let predictedLevel: 'Không đạt' | 'Level 1' | 'Level 2' | undefined;
    if (type === 'topik_mock') {
      if (finalScore >= 140) predictedLevel = 'Level 2';
      else if (finalScore >= 80) predictedLevel = 'Level 1';
      else predictedLevel = 'Không đạt';
    }

    const attempt: TestAttempt = {
      id: 'att_' + Date.now(),
      testId: 'test_' + Date.now(),
      title,
      type,
      date: new Date().toISOString().split('T')[0],
      score: finalScore,
      totalQuestions: questions.length,
      correctCount,
      timeSpentSeconds: timeSpent,
      answers,
      skillScores: {
        hangul: skillStats.hangul.total ? Math.round((skillStats.hangul.correct / skillStats.hangul.total) * 100) : 80,
        vocab: skillStats.vocab.total ? Math.round((skillStats.vocab.correct / skillStats.vocab.total) * 100) : 80,
        grammar: skillStats.grammar.total ? Math.round((skillStats.grammar.correct / skillStats.grammar.total) * 100) : 80,
        listening: skillStats.listening.total ? Math.round((skillStats.listening.correct / skillStats.listening.total) * 100) : 80,
        reading: skillStats.reading.total ? Math.round((skillStats.reading.correct / skillStats.reading.total) * 100) : 80,
      },
      predictedTopikLevel: predictedLevel,
    };

    recordTestAttempt(attempt);

    // If lesson mini-test and score >= 70%, unlock lesson
    if (type === 'mini_test' && lessonId && finalScore >= 70) {
      finishLesson(lessonId, finalScore);
    }

    setCompletedAttempt(attempt);
    setIsFinished(true);
  };

  if (isFinished && completedAttempt) {
    return (
      <TestResultView
        attempt={completedAttempt}
        questions={questions}
        onRetry={(onlyWrongs) => {
          setIsFinished(false);
          setCompletedAttempt(null);
          setCurrentIndex(0);
          setUserAnswers({});
          setScramblePicks({});
          setTimeSpent(0);
          setShowInstantExplanation(false);
        }}
        onClose={onExit}
      />
    );
  }

  const currentUserAns = userAnswers[currentQ.id];

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6 animate-fade-in">
      {/* Test Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
            {type === 'topik_mock' ? 'MÔ PHỎNG ĐỀ THI TOPIK I' : mode === 'practice' ? 'CHẾ ĐỘ LUYỆN TẬP' : 'CHẾ ĐỘ KIỂM TRA'}
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{title}</h2>
        </div>

        {/* Timer Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold">
          <Clock size={14} className="text-rose-500" />
          <span>
            {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Progress Bar & Question Index Navigation */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500">
          <span>Câu hỏi {currentIndex + 1} / {questions.length}</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 uppercase">
            Kỹ năng: {currentQ.skill}
          </span>
        </div>
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
          <div
            className="bg-rose-500 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
            {currentQ.prompt}
          </h3>

          {/* Audio Prompt if Listening question */}
          {currentQ.audioPrompt && (
            <div className="mt-4">
              <button
                onClick={() => audioService.speak(currentQ.audioPrompt!)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all"
              >
                <Volume2 size={18} />
                <span>Bấm nghe âm thanh câu hỏi</span>
              </button>
            </div>
          )}

          {/* Reading passage if Reading comprehension */}
          {currentQ.passage && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 font-hangul text-sm leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-line">
              {currentQ.passage}
            </div>
          )}
        </div>

        {/* Input Formats by Question Type */}
        {/* Type 1: Multiple choice / Listen choose / Reading passage */}
        {['multiple_choice', 'listen_choose', 'fill_blank', 'reading_passage'].includes(currentQ.type) && currentQ.options && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = currentUserAns === opt;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-2xl border text-left text-xs font-semibold transition-all ${
                    isSelected
                      ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/20'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-400">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Type 2: Listen & Type */}
        {currentQ.type === 'listen_type' && (
          <div className="max-w-sm mx-auto space-y-3">
            <input
              type="text"
              value={(currentUserAns as string) || ''}
              onChange={(e) => setUserAnswers((prev) => ({ ...prev, [currentQ.id]: e.target.value }))}
              placeholder="Gõ từ tiếng Hàn bạn vừa nghe..."
              className="w-full text-center text-xl font-bold font-hangul py-3 px-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        )}

        {/* Type 3: Scramble Sentence Arrangement */}
        {currentQ.type === 'scramble_sentence' && currentQ.options && (
          <div className="space-y-4">
            <div className="min-h-[50px] p-3 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap gap-2 items-center justify-center">
              {(scramblePicks[currentQ.id] || []).length > 0 ? (
                (scramblePicks[currentQ.id] || []).map((word, wIdx) => (
                  <span
                    key={wIdx}
                    onClick={() => handlePickWord(word)}
                    className="px-3 py-1.5 rounded-xl bg-rose-500 text-white font-bold text-xs cursor-pointer hover:bg-rose-600 transition-colors"
                  >
                    {word} ✕
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-400 italic">Bấm chọn các từ bên dưới theo thứ tự câu đúng...</span>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {currentQ.options.map((word, wIdx) => {
                const isPicked = (scramblePicks[currentQ.id] || []).includes(word);
                return (
                  <button
                    key={wIdx}
                    onClick={() => handlePickWord(word)}
                    disabled={isPicked}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      isPicked
                        ? 'opacity-30 border-slate-200 cursor-not-allowed'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-rose-400 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Practice Mode: Instant Explanation Banner */}
        {mode === 'practice' && showInstantExplanation && currentUserAns && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 animate-fade-in">
            <span className="font-bold text-rose-500 block mb-1">💡 Giải thích chi tiết:</span>
            {currentQ.explanation}
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex((prev) => prev - 1);
              setShowInstantExplanation(false);
            }
          }}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            currentIndex > 0
              ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              : 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
          }`}
        >
          <ArrowLeft size={16} />
          <span>Câu trước</span>
        </button>

        {currentIndex + 1 < questions.length ? (
          <button
            onClick={() => {
              setCurrentIndex((prev) => prev + 1);
              setShowInstantExplanation(false);
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all"
          >
            <span>Câu tiếp theo</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmitTest}
            className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-lg transition-all"
          >
            <Send size={16} />
            <span>Nộp bài & Chấm điểm</span>
          </button>
        )}
      </div>
    </div>
  );
};
