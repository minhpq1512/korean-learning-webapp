import React from 'react';
import { Sparkles, Edit3, Keyboard, Grid, Split, Volume2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AlphabetGrid } from './AlphabetGrid';
import { StrokeOrderViewer } from './StrokeOrderViewer';
import { HandwritingCanvas } from './HandwritingCanvas';
import { TypingPractice } from './TypingPractice';
import { SyllableBuilder } from './SyllableBuilder';
import { ListeningDrill } from './ListeningDrill';

export const HangulHub: React.FC = () => {
  const { hangulSubTab, setHangulSubTab } = useApp();

  const modes = [
    { id: 'table', label: '1. Bảng chữ cái 40 chữ', icon: Grid, desc: 'Lưới tương tác & phát âm' },
    { id: 'strokes', label: '2. Thứ tự nét viết', icon: Edit3, desc: 'Animation nét chuẩn SVG' },
    { id: 'canvas', label: '3. Luyện viết Canvas', icon: Sparkles, desc: 'Tô theo & Chấm 1-3 sao' },
    { id: 'typing', label: '4. Gõ phím 2-Beolsik', icon: Keyboard, desc: 'Tự động ghép từ phím Latin' },
    { id: 'blocks', label: '5. Ghép âm tiết', icon: Split, desc: 'Khung linh hoạt & Biến âm' },
    { id: 'listening', label: '6. Nghe & Phát âm', icon: Volume2, desc: 'Cặp âm nhầm & Ghi âm' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold mb-2">
            <Sparkles size={14} />
            <span>MODULE ĐẶC TRƯNG HÀNG ĐẦU</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Luyện Chữ Hangul Toàn Diện
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Không chỉ nhìn đọc, bạn tự tay vẽ nét, gõ phím, kéo thả ghép âm và ghi âm giọng nói.
          </p>
        </div>
      </div>

      {/* 6 Modes Sub-navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {modes.map((m) => {
          const Icon = m.icon;
          const isActive = hangulSubTab === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setHangulSubTab(m.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200 shadow-sm ring-2 ring-rose-500/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-rose-500' : 'text-slate-400'} />
              <div className="font-bold text-xs mt-2 truncate">{m.label}</div>
              <div className="text-[10px] text-slate-400 mt-0.5 truncate">{m.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Active Mode Render */}
      <div className="transition-all">
        {hangulSubTab === 'table' && <AlphabetGrid />}
        {hangulSubTab === 'strokes' && <StrokeOrderViewer />}
        {hangulSubTab === 'canvas' && <HandwritingCanvas />}
        {hangulSubTab === 'typing' && <TypingPractice />}
        {hangulSubTab === 'blocks' && <SyllableBuilder />}
        {hangulSubTab === 'listening' && <ListeningDrill />}
      </div>
    </div>
  );
};
