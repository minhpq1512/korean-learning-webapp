import React, { useState } from 'react';
import { Volume2, ArrowRightLeft, Sparkles, RotateCcw, BookOpen } from 'lucide-react';
import {
  CHOSUNG,
  JUNGSUNG,
  JONGSUNG,
  composeHangul,
  decomposeHangul,
  getVowelLayout,
  PHONETIC_RULES
} from '../../utils/hangulHelper';
import { audioService } from '../../utils/audioHelper';
import { useApp } from '../../context/AppContext';

export const SyllableBuilder: React.FC = () => {
  const { addXp } = useApp();
  const [activeMode, setActiveMode] = useState<'build' | 'decompose'>('build');

  // Build mode state
  const [selectedInitial, setSelectedInitial] = useState<string>('ㅎ');
  const [selectedVowel, setSelectedVowel] = useState<string>('ㅏ');
  const [selectedFinal, setSelectedFinal] = useState<string>('ㄴ');

  // Decompose mode state
  const sampleSyllables = ['한', '글', '국', '어', '밥', '물', '사', '과', '선', '생', '님'];
  const [targetSyllable, setTargetSyllable] = useState<string>('한');

  const composedSyllable = composeHangul(selectedInitial, selectedVowel, selectedFinal);
  const layout = getVowelLayout(selectedVowel);
  const decomposed = decomposeHangul(targetSyllable);

  const handlePlaySound = (text: string) => {
    audioService.speak(text);
  };

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between">
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setActiveMode('build')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeMode === 'build'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Ghép thành âm tiết (Build)
          </button>
          <button
            onClick={() => setActiveMode('decompose')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeMode === 'decompose'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Tách âm tiết (Deconstruct)
          </button>
        </div>

        <button
          onClick={() => {
            setSelectedInitial('ㄱ');
            setSelectedVowel('ㅏ');
            setSelectedFinal('');
          }}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
          title="Làm mới"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {activeMode === 'build' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Interactive Selector */}
          <div className="lg:col-span-2 space-y-5">
            {/* 1. Initial Consonant (Chosung) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>1. Chọn phụ âm đầu (Chosung)</span>
                <span className="text-rose-500 font-bold font-hangul text-sm">{selectedInitial}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {CHOSUNG.map((cho) => (
                  <button
                    key={cho}
                    onClick={() => {
                      setSelectedInitial(cho);
                      audioService.playClickSound();
                    }}
                    className={`w-9 h-9 rounded-xl font-hangul font-bold text-base border transition-all ${
                      selectedInitial === cho
                        ? 'bg-rose-500 text-white border-rose-500 scale-105 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-rose-300'
                    }`}
                  >
                    {cho}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Vowel (Jungsung) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>2. Chọn nguyên âm (Jungsung)</span>
                <span className="text-indigo-500 font-bold font-hangul text-sm">{selectedVowel}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {JUNGSUNG.map((jung) => (
                  <button
                    key={jung}
                    onClick={() => {
                      setSelectedVowel(jung);
                      audioService.playClickSound();
                    }}
                    className={`w-9 h-9 rounded-xl font-hangul font-bold text-base border transition-all ${
                      selectedVowel === jung
                        ? 'bg-indigo-600 text-white border-indigo-600 scale-105 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                    }`}
                  >
                    {jung}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Patchim (Jongsung) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>3. Chọn phụ âm cuối (Patchim / Jongsung - Tuỳ chọn)</span>
                <span className="text-emerald-500 font-bold font-hangul text-sm">
                  {selectedFinal ? selectedFinal : 'Không có patchim'}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedFinal('')}
                  className={`px-3 h-9 rounded-xl text-xs font-semibold border transition-all ${
                    selectedFinal === ''
                      ? 'bg-slate-700 text-white border-slate-700'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Không có
                </button>
                {JONGSUNG.filter(Boolean).map((jong) => (
                  <button
                    key={jong}
                    onClick={() => {
                      setSelectedFinal(jong);
                      audioService.playClickSound();
                    }}
                    className={`w-9 h-9 rounded-xl font-hangul font-bold text-base border transition-all ${
                      selectedFinal === jong
                        ? 'bg-emerald-600 text-white border-emerald-600 scale-105 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                    }`}
                  >
                    {jong}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Syllable Block Dynamic Frame Visualizer */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-between text-center">
            <div className="w-full">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Bố cục khung âm tiết tự điều chỉnh:
              </span>
              <div className="mt-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 inline-block">
                Bố cục {layout === 'vertical' ? 'Ngang (Dọc)' : layout === 'horizontal' ? 'Dọc (Dưới)' : 'Hỗn hợp'} {selectedFinal ? '+ Có Patchim' : ''}
              </div>

              {/* Dynamic Frame Box */}
              <div className="my-6 p-4 rounded-3xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 w-56 h-56 mx-auto flex flex-col justify-center items-center shadow-inner">
                {/* Visualizing Slots */}
                {layout === 'vertical' && !selectedFinal && (
                  <div className="flex w-full h-full gap-2 items-center justify-center">
                    <div className="w-1/2 h-full flex items-center justify-center bg-rose-50 dark:bg-rose-950/40 text-rose-600 text-4xl font-bold font-hangul rounded-2xl border border-rose-200 dark:border-rose-900">
                      {selectedInitial}
                    </div>
                    <div className="w-1/2 h-full flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 text-4xl font-bold font-hangul rounded-2xl border border-indigo-200 dark:border-indigo-900">
                      {selectedVowel}
                    </div>
                  </div>
                )}

                {layout === 'vertical' && selectedFinal && (
                  <div className="flex flex-col w-full h-full gap-2">
                    <div className="flex w-full h-2/3 gap-2">
                      <div className="w-1/2 h-full flex items-center justify-center bg-rose-50 dark:bg-rose-950/40 text-rose-600 text-3xl font-bold font-hangul rounded-2xl border border-rose-200">
                        {selectedInitial}
                      </div>
                      <div className="w-1/2 h-full flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 text-3xl font-bold font-hangul rounded-2xl border border-indigo-200">
                        {selectedVowel}
                      </div>
                    </div>
                    <div className="w-full h-1/3 flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 text-2xl font-bold font-hangul rounded-2xl border border-emerald-200">
                      {selectedFinal}
                    </div>
                  </div>
                )}

                {layout === 'horizontal' && !selectedFinal && (
                  <div className="flex flex-col w-full h-full gap-2">
                    <div className="w-full h-1/2 flex items-center justify-center bg-rose-50 dark:bg-rose-950/40 text-rose-600 text-3xl font-bold font-hangul rounded-2xl border border-rose-200">
                      {selectedInitial}
                    </div>
                    <div className="w-full h-1/2 flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 text-3xl font-bold font-hangul rounded-2xl border border-indigo-200">
                      {selectedVowel}
                    </div>
                  </div>
                )}

                {(layout === 'horizontal' || layout === 'mixed') && selectedFinal && (
                  <div className="flex flex-col w-full h-full gap-1.5">
                    <div className="w-full h-1/3 flex items-center justify-center bg-rose-50 dark:bg-rose-950/40 text-rose-600 text-2xl font-bold font-hangul rounded-xl border border-rose-200">
                      {selectedInitial}
                    </div>
                    <div className="w-full h-1/3 flex items-center justify-center bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 text-2xl font-bold font-hangul rounded-xl border border-indigo-200">
                      {selectedVowel}
                    </div>
                    <div className="w-full h-1/3 flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 text-2xl font-bold font-hangul rounded-xl border border-emerald-200">
                      {selectedFinal}
                    </div>
                  </div>
                )}
              </div>

              {/* Composed Output */}
              <div className="text-5xl font-black font-hangul text-slate-900 dark:text-white my-2">
                {composedSyllable}
              </div>
            </div>

            <button
              onClick={() => handlePlaySound(composedSyllable)}
              className="w-full py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-200 dark:shadow-none transition-all flex items-center justify-center gap-2"
            >
              <Volume2 size={16} />
              <span>Nghe âm tiết "{composedSyllable}"</span>
            </button>
          </div>
        </div>
      ) : (
        /* Deconstruct Mode */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center max-w-2xl mx-auto space-y-6">
          <div className="text-xs font-bold text-slate-400 uppercase">
            Chọn âm tiết để phân tích cấu tạo:
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {sampleSyllables.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setTargetSyllable(s);
                  audioService.speak(s);
                }}
                className={`w-12 h-12 rounded-2xl text-xl font-bold font-hangul border transition-all ${
                  targetSyllable === s
                    ? 'bg-rose-500 text-white border-rose-500 scale-105 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col items-center">
            <div className="text-6xl font-black font-hangul text-slate-900 dark:text-white mb-4">
              {targetSyllable}
            </div>

            {decomposed && (
              <div className="flex items-center gap-3 text-lg font-bold">
                <div className="px-4 py-2 bg-rose-50 dark:bg-rose-950/40 text-rose-600 rounded-2xl border border-rose-200">
                  Phụ âm đầu: {decomposed.initial}
                </div>
                <span>+</span>
                <div className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 rounded-2xl border border-indigo-200">
                  Nguyên âm: {decomposed.vowel}
                </div>
                {decomposed.final && (
                  <>
                    <span>+</span>
                    <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 rounded-2xl border border-emerald-200">
                      Patchim: {decomposed.final}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Phonetic Rules Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <BookOpen size={18} className="text-rose-500" />
          <span>Các quy tắc biến âm khi ghép chữ tiếng Hàn</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PHONETIC_RULES.map((rule, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1.5"
            >
              <div className="font-bold text-rose-600 dark:text-rose-400 text-sm">{rule.name}</div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{rule.description}</p>
              <div className="p-2 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium">
                👉 <strong>Ví dụ:</strong> {rule.example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
