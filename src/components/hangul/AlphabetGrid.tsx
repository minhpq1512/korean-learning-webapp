import React, { useState } from 'react';
import { Volume2, Check, Star, Sparkles, BookOpen } from 'lucide-react';
import { HANGUL_LETTERS } from '../../data/hangulData';
import { HangulCategory, HangulLetter } from '../../types';
import { useApp } from '../../context/AppContext';
import { audioService } from '../../utils/audioHelper';

export const AlphabetGrid: React.FC<{ onSelectLetter?: (letter: HangulLetter) => void }> = ({ onSelectLetter }) => {
  const { memorizedLetters, toggleMemorizedLetter, profile } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<HangulCategory | 'all'>('all');
  const [activeLetter, setActiveLetter] = useState<HangulLetter>(HANGUL_LETTERS[0]);

  const categories: { id: HangulCategory | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'Tất cả (40)', count: 40 },
    { id: 'consonant_basic', label: 'Phụ âm cơ bản (14)', count: 14 },
    { id: 'consonant_double', label: 'Phụ âm đôi (5)', count: 5 },
    { id: 'consonant_aspirated', label: 'Phụ âm bật hơi (4)', count: 4 },
    { id: 'vowel_basic', label: 'Nguyên âm cơ bản (10)', count: 10 },
    { id: 'vowel_compound', label: 'Nguyên âm ghép (11)', count: 11 },
  ];

  const filteredLetters = HANGUL_LETTERS.filter(
    (l) => selectedCategory === 'all' || l.category === selectedCategory
  );

  const handlePlayAudio = (letter: HangulLetter) => {
    setActiveLetter(letter);
    audioService.speak(letter.char, profile.settings.audioSpeed);
    if (onSelectLetter) onSelectLetter(letter);
  };

  return (
    <div className="space-y-6">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-rose-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-rose-400'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Letters & Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Letters Grid */}
        <div className="lg:col-span-2 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
          {filteredLetters.map((l) => {
            const isMemorized = memorizedLetters.includes(l.id);
            const isSelected = activeLetter.id === l.id;

            return (
              <div
                key={l.id}
                onClick={() => handlePlayAudio(l)}
                className={`relative group p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 ring-2 ring-rose-500/30'
                    : isMemorized
                    ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 hover:border-emerald-400'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                {/* Memorized Indicator */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMemorizedLetter(l.id);
                  }}
                  title={isMemorized ? 'Đã thuộc' : 'Đánh dấu đã thuộc'}
                  className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                    isMemorized
                      ? 'bg-emerald-500 text-white'
                      : 'text-slate-300 dark:text-slate-600 hover:text-slate-500'
                  }`}
                >
                  <Check size={12} />
                </button>

                {/* Hangul Char */}
                <div className="text-3xl font-bold font-hangul text-slate-900 dark:text-white group-hover:scale-110 transition-transform mt-1">
                  {l.char}
                </div>

                {/* Name / IPA */}
                <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-1 truncate">
                  {l.name.split(' ')[0]}
                </div>

                <div className="text-[10px] text-slate-400 font-mono">
                  /{l.ipa}/
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Letter Detail Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 h-fit">
          <div className="text-center pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="text-6xl font-black font-hangul text-rose-600 dark:text-rose-400 my-2">
              {activeLetter.char}
            </div>
            <div className="text-lg font-bold text-slate-900 dark:text-white">
              {activeLetter.name}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Phiên âm IPA: /{activeLetter.ipa}/ · Phím gõ: [{activeLetter.keyboardKey}]
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => audioService.speak(activeLetter.char, profile.settings.audioSpeed)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-md shadow-rose-200 dark:shadow-none"
              >
                <Volume2 size={16} />
                <span>Nghe phát âm ({profile.settings.audioSpeed}x)</span>
              </button>

              <button
                onClick={() => toggleMemorizedLetter(activeLetter.id)}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  memorizedLetters.includes(activeLetter.id)
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                }`}
              >
                <Check size={16} />
                <span>{memorizedLetters.includes(activeLetter.id) ? 'Đã thuộc' : 'Thuộc'}</span>
              </button>
            </div>
          </div>

          {/* Pronunciation Guide for Vietnamese */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Mẹo phát âm cho người Việt
            </h4>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed border border-slate-100 dark:border-slate-800">
              💡 {activeLetter.vietnameseGuide}
            </div>
          </div>

          {/* Example Word */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Từ vựng ví dụ
            </h4>
            <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-base font-bold font-hangul text-slate-900 dark:text-white">
                  {activeLetter.exampleWord.hangul}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  [{activeLetter.exampleWord.romanization}] : {activeLetter.exampleWord.vietnamese}
                </div>
              </div>
              <button
                onClick={() => audioService.speak(activeLetter.exampleWord.hangul)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-rose-500 hover:scale-110 transition-transform"
                title="Nghe từ ví dụ"
              >
                <Volume2 size={16} />
              </button>
            </div>
          </div>

          {/* Mini Stroke visual */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Số nét viết ({activeLetter.strokes.length} nét)
            </h4>
            <div className="h-24 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-700">
              <svg viewBox="0 0 100 100" className="w-20 h-20">
                {activeLetter.strokes.map((s, idx) => (
                  <path
                    key={s.id}
                    d={s.d}
                    fill="none"
                    stroke="#CD2E3A"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
