import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, StepForward, Volume2, Info } from 'lucide-react';
import { HANGUL_LETTERS } from '../../data/hangulData';
import { HangulLetter } from '../../types';
import { audioService } from '../../utils/audioHelper';

export const StrokeOrderViewer: React.FC = () => {
  const [currentLetter, setCurrentLetter] = useState<HangulLetter>(HANGUL_LETTERS[0]);
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState<number>(currentLetter.strokes.length);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSlowMotion, setIsSlowMotion] = useState<boolean>(false);

  useEffect(() => {
    setCurrentStrokeIndex(currentLetter.strokes.length);
    setIsPlaying(false);
  }, [currentLetter]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying) {
      const speed = isSlowMotion ? 1200 : 700;
      timer = setInterval(() => {
        setCurrentStrokeIndex((prev) => {
          if (prev >= currentLetter.strokes.length) {
            return 1;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentLetter, isSlowMotion]);

  const handleStepNext = () => {
    setIsPlaying(false);
    setCurrentStrokeIndex((prev) => (prev >= currentLetter.strokes.length ? 1 : prev + 1));
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStrokeIndex(0);
  };

  return (
    <div className="space-y-6">
      {/* Letter Selector Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {HANGUL_LETTERS.map((letter) => (
          <button
            key={letter.id}
            onClick={() => {
              setCurrentLetter(letter);
              audioService.speak(letter.char);
            }}
            className={`flex-shrink-0 w-11 h-11 rounded-xl font-hangul text-lg font-bold border transition-all ${
              currentLetter.id === letter.id
                ? 'bg-rose-500 text-white border-rose-500 scale-105 shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-300'
            }`}
          >
            {letter.char}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Animation Stage */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
          <div className="text-center mb-4">
            <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
              {currentLetter.name} (Phím: {currentLetter.keyboardKey})
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Thứ tự {currentLetter.strokes.length} nét viết của chữ "{currentLetter.char}"
            </h3>
          </div>

          {/* SVG Canvas Area with 9-Box Guide Grid */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-inner overflow-hidden">
            {/* Background 9-box grid guide */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100">
              <line x1="33.3" y1="0" x2="33.3" y2="100" stroke="currentColor" strokeDasharray="2,2" strokeWidth="0.8" />
              <line x1="66.6" y1="0" x2="66.6" y2="100" stroke="currentColor" strokeDasharray="2,2" strokeWidth="0.8" />
              <line x1="0" y1="33.3" x2="100" y2="33.3" stroke="currentColor" strokeDasharray="2,2" strokeWidth="0.8" />
              <line x1="0" y1="66.6" x2="100" y2="66.6" stroke="currentColor" strokeDasharray="2,2" strokeWidth="0.8" />
              <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeDasharray="1,2" strokeWidth="0.5" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeDasharray="1,2" strokeWidth="0.5" />
            </svg>

            {/* Strokes SVG with Numbers & Colors */}
            <svg viewBox="0 0 100 100" className="w-56 h-56 sm:w-64 sm:h-64 relative z-10">
              {/* Ghost background strokes */}
              {currentLetter.strokes.map((s) => (
                <path
                  key={`ghost_${s.id}`}
                  d={s.d}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dark:opacity-20"
                />
              ))}

              {/* Animated active strokes */}
              {currentLetter.strokes.map((s, idx) => {
                const isRendered = idx < currentStrokeIndex;
                const isCurrentStroke = idx === currentStrokeIndex - 1;
                const strokeColors = ['#0F4C81', '#CD2E3A', '#10B981', '#F59E0B', '#8B5CF6'];
                const color = strokeColors[idx % strokeColors.length];

                if (!isRendered) return null;

                return (
                  <g key={`stroke_${s.id}`} className="transition-all duration-300">
                    <path
                      d={s.d}
                      fill="none"
                      stroke={color}
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={isCurrentStroke ? 'filter drop-shadow-md animate-pulse' : ''}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Current Stroke Badge */}
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
              Nét: {currentStrokeIndex} / {currentLetter.strokes.length}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-200 dark:shadow-none transition-all"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
              <span>{isPlaying ? 'Tạm dừng' : 'Tự động phát nét'}</span>
            </button>

            <button
              onClick={handleStepNext}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
            >
              <StepForward size={16} />
              <span>Từng nét một</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title="Vẽ lại từ đầu"
            >
              <RotateCcw size={16} />
            </button>

            <button
              onClick={() => setIsSlowMotion(!isSlowMotion)}
              className={`px-3 py-2.5 rounded-2xl text-xs font-semibold border transition-all ${
                isSlowMotion
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                  : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              Chậm 0.5x
            </button>

            <button
              onClick={() => audioService.speak(currentLetter.char)}
              className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors"
              title="Phát âm"
            >
              <Volume2 size={16} />
            </button>
          </div>
        </div>

        {/* Right Info: Stroke Rules Guide */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Info size={18} className="text-rose-500" />
              <span>Quy tắc viết nét Hangul</span>
            </h4>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-rose-500 block mb-0.5">1. Trên xuống dưới (Top to Bottom)</span>
                Các nét sổ dọc luôn được kéo từ trên xuống dưới, không đẩy từ dưới lên.
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-indigo-500 block mb-0.5">2. Trái sang phải (Left to Right)</span>
                Các nét ngang luôn được kéo từ bên trái sang bên phải.
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-emerald-500 block mb-0.5">3. Ngoài trước trong sau</span>
                Với các hình khung bao như chữ ㅁ (mieum) hoặc ㅂ (bieup): nét sổ bên trái trước, nét gập phía trên, nét gạch trong rồi đóng đáy sau cùng.
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-amber-500 block mb-0.5">4. Phụ âm trước, Nguyên âm sau</span>
                Khi ghép âm tiết, luôn viết phụ âm đầu (Chosung) trước, rồi mới đến nguyên âm và patchim ở đáy.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
