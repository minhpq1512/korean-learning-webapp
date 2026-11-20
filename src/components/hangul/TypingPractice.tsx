import React, { useState, useEffect, useRef } from 'react';
import { Volume2, RotateCcw, Keyboard, CheckCircle2, Zap, HelpCircle } from 'lucide-react';
import { KEYBOARD_MAP, assembleJamoSequence } from '../../utils/hangulHelper';
import { audioService } from '../../utils/audioHelper';
import { useApp } from '../../context/AppContext';

// Drill items per level
const TYPING_DRILLS = {
  letter: [
    { target: 'ㄱ', keySeq: ['r'], tip: 'Phím R = ㄱ' },
    { target: 'ㅏ', keySeq: ['k'], tip: 'Phím K = ㅏ' },
    { target: 'ㄴ', keySeq: ['s'], tip: 'Phím S = ㄴ' },
    { target: 'ㅗ', keySeq: ['h'], tip: 'Phím H = ㅗ' },
    { target: 'ㅁ', keySeq: ['a'], tip: 'Phím A = ㅁ' },
    { target: 'ㅣ', keySeq: ['l'], tip: 'Phím L = ㅣ' },
    { target: 'ㅂ', keySeq: ['q'], tip: 'Phím Q = ㅂ' },
    { target: 'ㄲ', keySeq: ['R'], tip: 'Phím Shift+R = ㄲ' },
  ],
  syllable: [
    { target: '가', keySeq: ['r', 'k'], tip: 'r (ㄱ) + k (ㅏ) → 가' },
    { target: '나', keySeq: ['s', 'k'], tip: 's (ㄴ) + k (ㅏ) → 나' },
    { target: '간', keySeq: ['r', 'k', 's'], tip: 'r (ㄱ) + k (ㅏ) + s (ㄴ) → 간' },
    { target: '물', keySeq: ['a', 'n', 'f'], tip: 'a (ㅁ) + n (ㅜ) + f (ㄹ) → 물' },
    { target: '밥', keySeq: ['q', 'k', 'q'], tip: 'q (ㅂ) + k (ㅏ) + q (ㅂ) → 밥' },
    { target: '한', keySeq: ['g', 'k', 's'], tip: 'g (ㅎ) + k (ㅏ) + s (ㄴ) → 한' },
  ],
  words: [
    { target: '한국', keySeq: ['g', 'k', 's', 'r', 'n', 'r'], tip: 'gks (한) + rnr (국) → 한국 (Hàn Quốc)' },
    { target: '우유', keySeq: ['d', 'n', 'd', 'b'], tip: 'dn (우) + db (유) → 우유 (Sữa)' },
    { target: '사과', keySeq: ['t', 'k', 'r', 'h', 'k'], tip: 'tk (사) + rhk (과) → 사과 (Quả táo)' },
    { target: '사랑', keySeq: ['t', 'k', 'f', 'k', 'd'], tip: 'tk (사) + fkd (랑) → 사랑 (Tình yêu)' },
    { target: '감사', keySeq: ['r', 'k', 'a', 't', 'k'], tip: 'rka (감) + tk (사) → 감사 (Cảm ơn)' },
  ]
};

// 2-beolsik virtual keyboard layout
const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

export const TypingPractice: React.FC = () => {
  const { addXp, profile } = useApp();
  const [level, setLevel] = useState<'letter' | 'syllable' | 'words'>('syllable');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputBuffer, setInputBuffer] = useState<string[]>([]);
  const [assembledText, setAssembledText] = useState<string>('');
  const [showKeyHint, setShowKeyHint] = useState<boolean>(true);
  const [isShiftActive, setIsShiftActive] = useState<boolean>(false);

  // Speed and accuracy stats
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [totalKeyPresses, setTotalKeyPresses] = useState(0);
  const [correctKeyPresses, setCorrectKeyPresses] = useState(0);

  const drills = TYPING_DRILLS[level];
  const currentItem = drills[currentIndex % drills.length];
  const nextTargetKey = currentItem.keySeq[inputBuffer.length] || '';

  // Process key input (from physical Latin keyboard or virtual keyboard)
  const handleInputKey = (key: string) => {
    if (!startTime) setStartTime(Date.now());
    setTotalKeyPresses((prev) => prev + 1);

    const expectedKey = currentItem.keySeq[inputBuffer.length];
    if (key.toLowerCase() === expectedKey?.toLowerCase() || (key === expectedKey)) {
      setCorrectKeyPresses((prev) => prev + 1);
      const newBuffer = [...inputBuffer, key];
      setInputBuffer(newBuffer);

      // Translate typed keys to Korean jamos and assemble
      const jamos = newBuffer.map((k) => KEYBOARD_MAP[k] || k);
      const assembled = assembleJamoSequence(jamos);
      setAssembledText(assembled);

      audioService.playClickSound();

      // Check if finished current target
      if (newBuffer.length === currentItem.keySeq.length) {
        audioService.playCorrectSound();
        audioService.speak(currentItem.target);
        addXp(5, `Gõ chính xác "${currentItem.target}"`);

        setTimeout(() => {
          setInputBuffer([]);
          setAssembledText('');
          setCurrentIndex((prev) => (prev + 1) % drills.length);
        }, 600);
      }
    } else {
      audioService.playWrongSound();
    }
  };

  // Physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsShiftActive(true);
        return;
      }
      if (e.key === 'Backspace') {
        e.preventDefault();
        setInputBuffer((prev) => {
          const next = prev.slice(0, -1);
          const jamos = next.map((k) => KEYBOARD_MAP[k] || k);
          setAssembledText(assembleJamoSequence(jamos));
          return next;
        });
        return;
      }

      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        e.preventDefault();
        handleInputKey(e.key);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsShiftActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [inputBuffer, currentItem, startTime]);

  // Update WPM and Accuracy
  useEffect(() => {
    if (startTime && totalKeyPresses > 0) {
      const elapsedMinutes = (Date.now() - startTime) / 60000;
      if (elapsedMinutes > 0.05) {
        const calculatedWpm = Math.round((correctKeyPresses / 5) / elapsedMinutes);
        setWpm(calculatedWpm);
      }
      setAccuracy(Math.round((correctKeyPresses / totalKeyPresses) * 100));
    }
  }, [correctKeyPresses, totalKeyPresses, startTime]);

  const handleReset = () => {
    setInputBuffer([]);
    setAssembledText('');
    setStartTime(null);
    setTotalKeyPresses(0);
    setCorrectKeyPresses(0);
    setWpm(0);
    setAccuracy(100);
  };

  return (
    <div className="space-y-6">
      {/* Level Selector & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold">
          {[
            { id: 'letter', label: '1. Chữ cái đơn' },
            { id: 'syllable', label: '2. Âm tiết (Ghép âm)' },
            { id: 'words', label: '3. Từ vựng ngắn' },
          ].map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => {
                setLevel(lvl.id as any);
                setCurrentIndex(0);
                handleReset();
              }}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                level === lvl.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={() => setShowKeyHint(!showKeyHint)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
              showKeyHint
                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                : 'border-slate-200 dark:border-slate-700 text-slate-500'
            }`}
          >
            <HelpCircle size={14} />
            <span>Gợi ý phím: {showKeyHint ? 'Bật' : 'Tắt'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
            title="Làm mới bài gõ"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Main Target Display & Buffer Visualizer */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center relative overflow-hidden">
        {/* Stats Badges */}
        <div className="absolute top-4 right-4 flex items-center gap-3">
          <div className="px-3 py-1 bg-amber-50 dark:bg-amber-950/40 rounded-full border border-amber-200 dark:border-amber-900 text-xs font-bold text-amber-700 dark:text-amber-400">
            ⚡ {wpm} WPM
          </div>
          <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 rounded-full border border-emerald-200 dark:border-emerald-900 text-xs font-bold text-emerald-700 dark:text-emerald-400">
            🎯 {accuracy}%
          </div>
        </div>

        <div className="max-w-md mx-auto space-y-4">
          <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
            Từ cần gõ ({currentIndex + 1} / {drills.length})
          </span>

          {/* Big Target Display */}
          <div className="text-6xl sm:text-7xl font-extrabold font-hangul text-slate-900 dark:text-white my-3 flex items-center justify-center gap-3">
            <span>{currentItem.target}</span>
            <button
              onClick={() => audioService.speak(currentItem.target)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-rose-500 hover:scale-110 transition-transform"
              title="Nghe phát âm"
            >
              <Volume2 size={24} />
            </button>
          </div>

          {/* Typing Buffer Assembling Visualizer */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col items-center justify-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase mb-1">
              Quá trình tự ghép âm tiết trong thời gian thực:
            </span>
            <div className="text-2xl font-bold font-hangul text-rose-600 dark:text-rose-400 min-h-[36px] flex items-center gap-1">
              {assembledText ? (
                <span>{assembledText}</span>
              ) : (
                <span className="text-slate-300 dark:text-slate-600 italic text-sm">
                  Gõ phím để bắt đầu ghép...
                </span>
              )}
            </div>
            {/* Keystrokes chips */}
            <div className="flex items-center gap-1.5 mt-2">
              {currentItem.keySeq.map((k, idx) => {
                const isTyped = idx < inputBuffer.length;
                const isCurrent = idx === inputBuffer.length;
                return (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-all ${
                      isTyped
                        ? 'bg-emerald-500 text-white'
                        : isCurrent
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {k} ({KEYBOARD_MAP[k] || k})
                  </span>
                );
              })}
            </div>
          </div>

          {/* Tip */}
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            💡 Gợi ý: {currentItem.tip} (Gõ phím Latin trực tiếp trên bàn phím của bạn!)
          </div>
        </div>
      </div>

      {/* On-screen 2-Beolsik Virtual Keyboard */}
      <div className="bg-slate-100 dark:bg-slate-900/90 rounded-3xl p-4 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm max-w-3xl mx-auto space-y-2">
        <div className="flex justify-between items-center px-1 mb-2">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
            <Keyboard size={16} />
            <span>Bàn phím Hàn Quốc (2-Beolsik)</span>
          </span>
          <button
            onClick={() => setIsShiftActive(!isShiftActive)}
            className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
              isShiftActive
                ? 'bg-rose-500 text-white border-rose-500'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
            }`}
          >
            Shift ({isShiftActive ? 'Bật' : 'Tắt'})
          </button>
        </div>

        {KEYBOARD_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-center gap-1.5 sm:gap-2">
            {row.map((keyChar) => {
              const displayChar = isShiftActive ? keyChar.toUpperCase() : keyChar;
              const hangulChar = KEYBOARD_MAP[displayChar] || KEYBOARD_MAP[keyChar] || '';
              const isHighlight =
                showKeyHint &&
                (nextTargetKey === displayChar || nextTargetKey.toLowerCase() === keyChar);

              return (
                <button
                  key={keyChar}
                  onClick={() => handleInputKey(displayChar)}
                  className={`w-10 sm:w-14 h-12 sm:h-14 rounded-xl font-bold flex flex-col items-center justify-center transition-all ${
                    isHighlight
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-300 dark:shadow-none scale-105 border-2 border-rose-400'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 active:scale-95'
                  }`}
                >
                  <span className="text-base sm:text-lg font-hangul">{hangulChar}</span>
                  <span className="text-[10px] font-mono opacity-60 uppercase">{keyChar}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
