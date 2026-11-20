import React, { useState, useEffect } from 'react';
import {
  Volume2,
  RotateCw,
  Star,
  Layers,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ArrowRightLeft
} from 'lucide-react';
import { Flashcard } from '../../types';
import { useApp } from '../../context/AppContext';
import { SrsRating } from '../../utils/srsHelper';
import { audioService } from '../../utils/audioHelper';
import confetti from 'canvas-confetti';

interface FlashcardStudyProps {
  cards: Flashcard[];
  onFinish: () => void;
}

export const FlashcardStudy: React.FC<FlashcardStudyProps> = ({ cards, onFinish }) => {
  const { handleReviewCard, profile } = useApp();
  const [studyMode, setStudyMode] = useState<'flip' | 'quiz' | 'typing' | 'listen' | 'pairs'>('flip');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [reverseDirection, setReverseDirection] = useState<boolean>(false); // Korean -> Viet vs Viet -> Korean

  // Quiz Mode State
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);

  // Typing Mode State
  const [typedInput, setTypedInput] = useState<string>('');
  const [typingFeedback, setTypingFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Pairs Match 6x6 Mode State
  const [matchPairs, setMatchPairs] = useState<{ id: string; text: string; type: 'kr' | 'vi'; pairId: string; matched: boolean }[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<{ id: string; text: string; type: 'kr' | 'vi'; pairId: string } | null>(null);
  const [matchTimer, setMatchTimer] = useState<number>(0);

  const currentCard = cards[currentIndex];

  // Prepare Quiz options
  useEffect(() => {
    if (cards.length > 0 && currentCard) {
      const wrongPool = cards
        .filter((c) => c.id !== currentCard.id)
        .map((c) => c.meaning);
      const shuffledWrongs = wrongPool.sort(() => 0.5 - Math.random()).slice(0, 3);
      const allOpts = [...shuffledWrongs, currentCard.meaning].sort(() => 0.5 - Math.random());
      setQuizOptions(allOpts);
      setSelectedQuizAnswer(null);
      setIsFlipped(false);
      setTypedInput('');
      setTypingFeedback(null);
    }
  }, [currentIndex, currentCard, studyMode]);

  // Setup 6x6 Pairs Match
  useEffect(() => {
    if (studyMode === 'pairs') {
      const sampleSet = cards.slice(0, 6);
      const items: { id: string; text: string; type: 'kr' | 'vi'; pairId: string; matched: boolean }[] = [];
      sampleSet.forEach((c) => {
        items.push({ id: `kr_${c.id}`, text: c.hangul, type: 'kr', pairId: c.id, matched: false });
        items.push({ id: `vi_${c.id}`, text: c.meaning, type: 'vi', pairId: c.id, matched: false });
      });
      setMatchPairs(items.sort(() => 0.5 - Math.random()));
      setSelectedMatch(null);
      setMatchTimer(0);
    }
  }, [studyMode, cards]);

  // Pairs timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (studyMode === 'pairs') {
      interval = setInterval(() => setMatchTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [studyMode]);

  if (!cards || cards.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="text-5xl">🎉</div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Không có thẻ nào cần ôn hôm nay!
        </h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Bạn đã hoàn thành tất cả các thẻ ôn ngắt quãng cho hôm nay. Hãy quay lại vào ngày mai nhé!
        </p>
        <button
          onClick={onFinish}
          className="px-6 py-2.5 bg-rose-500 text-white rounded-xl text-xs font-bold"
        >
          Quay lại danh sách bộ thẻ
        </button>
      </div>
    );
  }

  const handleRating = (rating: SrsRating) => {
    handleReviewCard(currentCard.id, rating);
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    } else {
      confetti({ particleCount: 70, spread: 60 });
      onFinish();
    }
  };

  const handlePairClick = (item: typeof matchPairs[0]) => {
    if (item.matched) return;
    if (!selectedMatch) {
      setSelectedMatch(item);
      if (item.type === 'kr') audioService.speak(item.text);
      return;
    }

    // Check if matching pair
    if (selectedMatch.type !== item.type && selectedMatch.pairId === item.pairId) {
      audioService.playCorrectSound();
      setMatchPairs((prev) =>
        prev.map((p) => (p.pairId === item.pairId ? { ...p, matched: true } : p))
      );
      setSelectedMatch(null);
    } else {
      audioService.playWrongSound();
      setSelectedMatch(null);
    }
  };

  const allPairsMatched = matchPairs.length > 0 && matchPairs.every((p) => p.matched);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Top Header & 5 Modes */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onFinish}
          className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1.5"
        >
          <ArrowLeft size={16} />
          <span>Thoát ôn tập</span>
        </button>

        {/* 5 Study Modes */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold overflow-x-auto scrollbar-none">
          {[
            { id: 'flip', label: '1. Lật thẻ' },
            { id: 'quiz', label: '2. Trắc nghiệm' },
            { id: 'typing', label: '3. Gõ đáp án' },
            { id: 'listen', label: '4. Nghe' },
            { id: 'pairs', label: '5. Nối cặp 6x6' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setStudyMode(m.id as any)}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                studyMode === m.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Counter */}
      {studyMode !== 'pairs' && (
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Thẻ {currentIndex + 1} / {cards.length}</span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] uppercase">
              Trạng thái: {currentCard.status}
            </span>
            <button
              onClick={() => setReverseDirection(!reverseDirection)}
              className="p-1 text-slate-400 hover:text-rose-500 flex items-center gap-1 text-[11px]"
              title="Đảo chiều Việt - Hàn"
            >
              <ArrowRightLeft size={12} />
              <span>{reverseDirection ? 'Việt → Hàn' : 'Hàn → Việt'}</span>
            </button>
          </div>
        </div>
      )}

      {/* MODE 1: FLIP CARD */}
      {studyMode === 'flip' && (
        <div className="space-y-6">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-80 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-md p-8 flex flex-col justify-between items-center text-center cursor-pointer hover:border-rose-300 dark:hover:border-rose-700 transition-all select-none relative group"
          >
            <div className="w-full flex justify-between items-center text-xs text-slate-400">
              <span>{isFlipped ? 'Mặt sau (Giải nghĩa)' : 'Mặt trước (Bấm để lật)'}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  audioService.speak(currentCard.hangul);
                }}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-rose-500"
              >
                <Volume2 size={20} />
              </button>
            </div>

            {/* Front or Back Content */}
            {!isFlipped ? (
              <div className="space-y-2">
                <div className="text-5xl font-black font-hangul text-slate-900 dark:text-white">
                  {reverseDirection ? currentCard.meaning : currentCard.hangul}
                </div>
                {profile.settings.romanizationEnabled && !reverseDirection && (
                  <div className="text-xs text-slate-400 font-mono">
                    [{currentCard.romanization}]
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3 animate-fade-in">
                <div className="text-3xl font-bold text-rose-600 dark:text-rose-400">
                  {reverseDirection ? currentCard.hangul : currentCard.meaning}
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  [{currentCard.romanization}]
                </div>
                {currentCard.exampleSentence && (
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs border border-slate-100 dark:border-slate-800 text-left max-w-sm">
                    <div className="font-hangul font-semibold text-slate-800 dark:text-slate-200">
                      "{currentCard.exampleSentence}"
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <RotateCw size={12} />
              <span>Bấm vào thẻ để lật</span>
            </div>
          </div>

          {/* SM-2 Rating Buttons (4 Buttons from prompt) */}
          {isFlipped && (
            <div className="space-y-2 animate-fade-in">
              <span className="text-[11px] font-bold text-slate-400 uppercase text-center block">
                Mức độ ghi nhớ của bạn (Quyết định lần ôn kế tiếp):
              </span>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => handleRating(1)}
                  className="py-3 px-2 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 font-bold text-xs hover:bg-rose-100 transition-colors flex flex-col items-center"
                >
                  <span>Quên</span>
                  <span className="text-[10px] font-normal opacity-70">10 phút</span>
                </button>

                <button
                  onClick={() => handleRating(2)}
                  className="py-3 px-2 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-400 font-bold text-xs hover:bg-amber-100 transition-colors flex flex-col items-center"
                >
                  <span>Khó</span>
                  <span className="text-[10px] font-normal opacity-70">2 ngày</span>
                </button>

                <button
                  onClick={() => handleRating(3)}
                  className="py-3 px-2 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 font-bold text-xs hover:bg-indigo-100 transition-colors flex flex-col items-center"
                >
                  <span>Được</span>
                  <span className="text-[10px] font-normal opacity-70">3 ngày</span>
                </button>

                <button
                  onClick={() => handleRating(4)}
                  className="py-3 px-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-bold text-xs hover:bg-emerald-100 transition-colors flex flex-col items-center"
                >
                  <span>Dễ</span>
                  <span className="text-[10px] font-normal opacity-70">7 ngày</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: MULTIPLE CHOICE QUIZ */}
      {studyMode === 'quiz' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-center">
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase">Chọn nghĩa đúng của từ:</span>
            <div className="text-5xl font-black font-hangul text-slate-900 dark:text-white flex items-center justify-center gap-2">
              <span>{currentCard.hangul}</span>
              <button
                onClick={() => audioService.speak(currentCard.hangul)}
                className="p-1.5 text-rose-500 hover:scale-110 transition-transform"
              >
                <Volume2 size={24} />
              </button>
            </div>
            {profile.settings.romanizationEnabled && (
              <div className="text-xs text-slate-400 font-mono">[{currentCard.romanization}]</div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            {quizOptions.map((opt) => {
              const isSelected = selectedQuizAnswer === opt;
              const isCorrect = isSelected && opt === currentCard.meaning;
              const isWrong = isSelected && opt !== currentCard.meaning;

              return (
                <button
                  key={opt}
                  onClick={() => {
                    setSelectedQuizAnswer(opt);
                    if (opt === currentCard.meaning) {
                      audioService.playCorrectSound();
                      setTimeout(() => handleRating(3), 900);
                    } else {
                      audioService.playWrongSound();
                    }
                  }}
                  className={`p-4 rounded-2xl border text-left text-xs font-bold transition-all ${
                    isCorrect
                      ? 'bg-emerald-500 text-white border-emerald-500 scale-102'
                      : isWrong
                      ? 'bg-rose-500 text-white border-rose-500 animate-shake'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* MODE 3: TYPING PRACTICE */}
      {studyMode === 'typing' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-center">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Thấy nghĩa tiếng Việt, gõ lại từ tiếng Hàn:</span>
            <div className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 mt-2">
              {currentCard.meaning}
            </div>
            <div className="text-xs text-slate-400">
              Gợi ý số âm tiết: {currentCard.hangul.length} chữ
            </div>
          </div>

          <div className="max-w-xs mx-auto space-y-3">
            <input
              type="text"
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (typedInput.trim() === currentCard.hangul) {
                    setTypingFeedback('correct');
                    audioService.playCorrectSound();
                    setTimeout(() => handleRating(4), 1000);
                  } else {
                    setTypingFeedback('wrong');
                    audioService.playWrongSound();
                  }
                }
              }}
              placeholder="Gõ từ tiếng Hàn..."
              className="w-full text-center text-2xl font-bold font-hangul py-3 px-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />

            <button
              onClick={() => {
                if (typedInput.trim() === currentCard.hangul) {
                  setTypingFeedback('correct');
                  audioService.playCorrectSound();
                  setTimeout(() => handleRating(4), 1000);
                } else {
                  setTypingFeedback('wrong');
                  audioService.playWrongSound();
                }
              }}
              className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Kiểm tra
            </button>
          </div>

          {typingFeedback === 'correct' && (
            <div className="text-emerald-600 font-bold text-xs animate-fade-in">
              🎉 Hoàn hảo! Bạn nhớ rất chắc từ này!
            </div>
          )}
          {typingFeedback === 'wrong' && (
            <div className="text-rose-500 font-bold text-xs animate-shake">
              ❌ Đáp án đúng là: <strong>{currentCard.hangul}</strong>
            </div>
          )}
        </div>
      )}

      {/* MODE 4: LISTENING MODE */}
      {studyMode === 'listen' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-center">
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Chỉ nghe âm thanh và chọn nghĩa đúng:</span>
            <div>
              <button
                onClick={() => audioService.speak(currentCard.hangul)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-3xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-200 dark:shadow-none hover:scale-105 active:scale-95 transition-all"
              >
                <Volume2 size={24} />
                <span>Bấm nghe phát âm</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            {quizOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setSelectedQuizAnswer(opt);
                  if (opt === currentCard.meaning) {
                    audioService.playCorrectSound();
                    setTimeout(() => handleRating(3), 900);
                  } else {
                    audioService.playWrongSound();
                  }
                }}
                className={`p-4 rounded-2xl border text-left text-xs font-bold transition-all ${
                  selectedQuizAnswer === opt
                    ? opt === currentCard.meaning
                      ? 'bg-emerald-500 text-white border-emerald-500'
                      : 'bg-rose-500 text-white border-rose-500'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MODE 5: MATCH PAIRS 6x6 TIMED */}
      {studyMode === 'pairs' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Ghép 6 cặp từ Hàn - nghĩa Việt
              </h3>
              <p className="text-xs text-slate-400">Chọn 1 từ tiếng Hàn và 1 nghĩa tiếng Việt tương ứng</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold">
              <Clock size={14} />
              <span>{matchTimer} giây</span>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
            {matchPairs.map((p) => {
              const isSelected = selectedMatch?.id === p.id;
              if (p.matched) {
                return (
                  <div
                    key={p.id}
                    className="h-20 rounded-2xl border border-emerald-200 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs opacity-60 line-through"
                  >
                    {p.text}
                  </div>
                );
              }

              return (
                <button
                  key={p.id}
                  onClick={() => handlePairClick(p)}
                  className={`h-20 p-2 rounded-2xl border font-bold text-xs transition-all flex items-center justify-center text-center ${
                    isSelected
                      ? 'bg-rose-500 text-white border-rose-500 scale-105 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-rose-400'
                  } ${p.type === 'kr' ? 'font-hangul text-base' : ''}`}
                >
                  {p.text}
                </button>
              );
            })}
          </div>

          {allPairsMatched && (
            <div className="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl text-center space-y-2 animate-fade-in shadow-lg">
              <div className="text-2xl">🎉</div>
              <h4 className="text-lg font-bold">Hoàn thành ghép cặp xuất sắc!</h4>
              <p className="text-xs">Thời gian của bạn: {matchTimer} giây.</p>
              <button
                onClick={onFinish}
                className="mt-3 px-6 py-2 bg-white text-emerald-800 font-bold rounded-xl text-xs hover:bg-slate-100 transition-colors"
              >
                Tiếp tục bài tiếp theo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
