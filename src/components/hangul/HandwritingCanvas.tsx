import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, HelpCircle, Star, Sparkles, Volume2, CheckCircle2 } from 'lucide-react';
import { HANGUL_LETTERS } from '../../data/hangulData';
import { HangulLetter } from '../../types';
import { audioService } from '../../utils/audioHelper';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';

export const HandwritingCanvas: React.FC = () => {
  const { addXp, profile } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentLetter, setCurrentLetter] = useState<HangulLetter>(HANGUL_LETTERS[0]);
  const [mode, setMode] = useState<'trace' | 'freehand'>('trace');
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnStrokeCount, setDrawnStrokeCount] = useState(0);
  const [scoreStars, setScoreStars] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hasDrawnContent, setHasDrawnContent] = useState(false);

  // Clear and setup canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setDrawnStrokeCount(0);
    setScoreStars(null);
    setShowHint(false);
    setHasDrawnContent(false);
  };

  useEffect(() => {
    clearCanvas();
  }, [currentLetter, mode]);

  // Canvas drawing coordinate helpers
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#CD2E3A'; // Korean vermilion red

    setIsDrawing(true);
    setHasDrawnContent(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coords = getCanvasCoords(e);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setDrawnStrokeCount((prev) => prev + 1);
  };

  // Evaluate drawing and award stars
  const handleCheckWriting = () => {
    if (!hasDrawnContent) return;

    // Evaluate stroke completion
    const targetStrokes = currentLetter.strokes.length;
    let stars = 3;
    if (drawnStrokeCount < targetStrokes) {
      stars = 2;
    } else if (drawnStrokeCount > targetStrokes + 3) {
      stars = 1;
    }

    setScoreStars(stars);
    if (stars === 3) {
      confetti({ particleCount: 60, spread: 55, origin: { y: 0.6 } });
      audioService.playCorrectSound();
      addXp(10, `Luyện viết hoàn hảo chữ ${currentLetter.char}`);
    } else {
      audioService.playCorrectSound();
      addXp(5, `Tập viết chữ ${currentLetter.char}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Letter Selector Chips */}
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
        {/* Canvas Workspace */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
          {/* Header & Mode Switcher */}
          <div className="w-full flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-rose-500 uppercase">
                Tập viết chữ: {currentLetter.name}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-hangul">
                {currentLetter.char} ({currentLetter.strokes.length} nét)
              </h3>
            </div>

            {/* Mode toggle */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setMode('trace')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  mode === 'trace'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Tô theo nét
              </button>
              <button
                onClick={() => setMode('freehand')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  mode === 'freehand'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Tự viết
              </button>
            </div>
          </div>

          {/* Canvas Box with Grid & Ghost Template */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 bg-white dark:bg-slate-950 rounded-3xl border-2 border-slate-300 dark:border-slate-700 shadow-inner overflow-hidden select-none touch-none">
            {/* Background 9-box grid guide */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100">
              <line x1="33.3" y1="0" x2="33.3" y2="100" stroke="#0F4C81" strokeDasharray="2,2" strokeWidth="0.8" />
              <line x1="66.6" y1="0" x2="66.6" y2="100" stroke="#0F4C81" strokeDasharray="2,2" strokeWidth="0.8" />
              <line x1="0" y1="33.3" x2="100" y2="33.3" stroke="#0F4C81" strokeDasharray="2,2" strokeWidth="0.8" />
              <line x1="0" y1="66.6" x2="100" y2="66.6" stroke="#0F4C81" strokeDasharray="2,2" strokeWidth="0.8" />
              <line x1="0" y1="0" x2="100" y2="100" stroke="#CD2E3A" strokeDasharray="1,2" strokeWidth="0.5" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="#CD2E3A" strokeDasharray="1,2" strokeWidth="0.5" />
            </svg>

            {/* Trace mode: Ghost background character */}
            {mode === 'trace' && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[170px] sm:text-[190px] font-bold font-hangul text-slate-200 dark:text-slate-800 select-none opacity-85 leading-none">
                  {currentLetter.char}
                </span>
              </div>
            )}

            {/* Hint Next Stroke Overlay */}
            {showHint && (
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10 animate-pulse">
                {currentLetter.strokes.map((s, idx) => (
                  <path
                    key={`hint_${s.id}`}
                    d={s.d}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-70"
                  />
                ))}
              </svg>
            )}

            {/* Interactive Drawing Canvas */}
            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="absolute inset-0 w-full h-full cursor-crosshair z-20"
            />
          </div>

          {/* Action Tools */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleCheckWriting}
              disabled={!hasDrawnContent}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs shadow-md transition-all ${
                hasDrawnContent
                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-200 dark:shadow-none hover:scale-105'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 size={16} />
              <span>Chấm điểm nét viết</span>
            </button>

            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 font-semibold text-xs transition-colors"
            >
              <HelpCircle size={16} />
              <span>Gợi ý nét ({showHint ? 'Tắt' : 'Bật'})</span>
            </button>

            <button
              onClick={clearCanvas}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors"
            >
              <RotateCcw size={16} />
              <span>Xóa / Viết lại</span>
            </button>

            <button
              onClick={() => audioService.speak(currentLetter.char)}
              className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-rose-500 transition-colors"
              title="Phát âm"
            >
              <Volume2 size={16} />
            </button>
          </div>
        </div>

        {/* Right Info & Star Score Evaluation */}
        <div className="space-y-4">
          {/* Star Scoring Panel */}
          {scoreStars !== null ? (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 rounded-3xl p-6 border border-amber-200 dark:border-amber-900/60 shadow-sm text-center animate-fade-in">
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Kết quả đánh giá nét viết
              </span>
              <div className="flex items-center justify-center gap-1.5 my-3">
                {[1, 2, 3].map((starIndex) => (
                  <Star
                    key={starIndex}
                    size={36}
                    className={`transition-all ${
                      starIndex <= scoreStars
                        ? 'text-amber-400 fill-amber-400 scale-110 drop-shadow-sm'
                        : 'text-slate-300 dark:text-slate-700'
                    }`}
                  />
                ))}
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                {scoreStars === 3 ? 'Xuất sắc! Nét viết rất chuẩn!' : scoreStars === 2 ? 'Rất tốt! Cố gắng đúng số nét hơn nhé.' : 'Cần luyện thêm! Hãy xem lại thứ tự nét.'}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Số nét bạn đã vẽ: <strong>{drawnStrokeCount} nét</strong> (Chuẩn: {currentLetter.strokes.length} nét).
              </p>
              <button
                onClick={clearCanvas}
                className="mt-4 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors"
              >
                Tập viết lại chữ này
              </button>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Sparkles size={18} className="text-rose-500" />
                <span>Cách chấm điểm thông minh</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                App sẽ đếm số nét vẽ và đối chiếu với dữ liệu nét chuẩn của bảng chữ cái:
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span><strong>3 sao:</strong> Đúng đủ số nét và vị trí.</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span><strong>2 sao:</strong> Thiếu nét hoặc nét dính liền.</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span><strong>1 sao:</strong> Thừa quá nhiều nét gạch lung tung.</span>
                </div>
              </div>
            </div>
          )}

          {/* Letter Info Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase">Thông tin chữ cái</div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900 dark:text-white">{currentLetter.name}</span>
              <span className="text-xs font-mono text-slate-500">IPA: /{currentLetter.ipa}/</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {currentLetter.vietnameseGuide}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
