import React, { useState, useRef } from 'react';
import { Volume2, Mic, Square, Play, RotateCcw, CheckCircle2, HelpCircle } from 'lucide-react';
import { CONFUSING_PAIRS } from '../../data/hangulData';
import { audioService } from '../../utils/audioHelper';
import { useApp } from '../../context/AppContext';

export const ListeningDrill: React.FC = () => {
  const { addXp } = useApp();
  const [subMode, setSubMode] = useState<'minimal_pairs' | 'dictation' | 'recorder'>('minimal_pairs');

  // Minimal Pairs State
  const [pairIndex, setPairIndex] = useState(0);
  const currentPair = CONFUSING_PAIRS[pairIndex % CONFUSING_PAIRS.length];
  const [targetWordIndex, setTargetWordIndex] = useState(0);
  const currentWord = currentPair.practiceWords[targetWordIndex % currentPair.practiceWords.length];
  const [userChoice, setUserChoice] = useState<string | null>(null);

  // Dictation Drill State
  const dictationWords = [
    { hangul: '고양이', vietnamese: 'Con mèo', hint: 'Phụ âm đầu ㄱ' },
    { hangul: '한국어', vietnamese: 'Tiếng Hàn', hint: 'Nối âm [한구거]' },
    { hangul: '안녕하세요', vietnamese: 'Xin chào', hint: 'Lời chào phổ biến' },
    { hangul: '감사합니다', vietnamese: 'Xin cảm ơn', hint: 'Biến âm [임니다]' },
    { hangul: '사과', vietnamese: 'Quả táo', hint: 'Nguyên âm ghép ㅘ' },
  ];
  const [dictIndex, setDictIndex] = useState(0);
  const [dictInput, setDictInput] = useState('');
  const [dictFeedback, setDictFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Audio Recorder State
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Minimal pairs choice handler
  const handleSelectChar = (char: string) => {
    setUserChoice(char);
    const isCorrect = char === currentWord.targetChar;
    if (isCorrect) {
      audioService.playCorrectSound();
      addXp(5, `Phân biệt chuẩn âm "${char}"`);
      setTimeout(() => {
        setUserChoice(null);
        setTargetWordIndex((prev) => (prev + 1) % currentPair.practiceWords.length);
      }, 1000);
    } else {
      audioService.playWrongSound();
    }
  };

  // Dictation submit handler
  const handleCheckDictation = () => {
    const target = dictationWords[dictIndex].hangul;
    if (dictInput.trim() === target) {
      setDictFeedback('correct');
      audioService.playCorrectSound();
      addXp(10, `Chép chính tả đúng từ "${target}"`);
      setTimeout(() => {
        setDictFeedback(null);
        setDictInput('');
        setDictIndex((prev) => (prev + 1) % dictationWords.length);
      }, 1200);
    } else {
      setDictFeedback('wrong');
      audioService.playWrongSound();
    }
  };

  // Start recording voice
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      alert('Không thể truy cập microphone. Vui lòng cấp quyền trong trình duyệt.');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div className="space-y-6">
      {/* Submode Switcher */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold w-fit">
        <button
          onClick={() => setSubMode('minimal_pairs')}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            subMode === 'minimal_pairs'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          1. Cặp âm dễ nhầm
        </button>
        <button
          onClick={() => setSubMode('dictation')}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            subMode === 'dictation'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          2. Nghe - Chép chính tả (Dictation)
        </button>
        <button
          onClick={() => setSubMode('recorder')}
          className={`px-3.5 py-2 rounded-xl transition-all ${
            subMode === 'recorder'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          3. Ghi âm giọng & So sánh
        </button>
      </div>

      {/* 1. MINIMAL PAIRS DRILL */}
      {subMode === 'minimal_pairs' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
                {currentPair.title}
              </span>
              <button
                onClick={() => setPairIndex((prev) => (prev + 1) % CONFUSING_PAIRS.length)}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Đổi cặp âm khác →
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              💡 <strong>Bí quyết phân biệt:</strong> {currentPair.explanation}
            </div>

            {/* Audio prompt button */}
            <div className="text-center py-6">
              <button
                onClick={() => audioService.speak(currentWord.hangul)}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-3xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-base shadow-xl shadow-rose-200 dark:shadow-none hover:scale-105 active:scale-95 transition-all"
              >
                <Volume2 size={24} />
                <span>Bấm nghe từ mẫu</span>
              </button>
              <div className="mt-2 text-xs text-slate-400">
                Nghĩa của từ: "{currentWord.meaning}"
              </div>
            </div>

            {/* Multiple Choice Options */}
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase text-center mb-3">
                Âm bạn vừa nghe chứa chữ cái nào?
              </div>
              <div className="flex justify-center gap-4">
                {[currentPair.charA, currentPair.charB, currentPair.charC]
                  .filter(Boolean)
                  .map((char) => {
                    const isSelected = userChoice === char;
                    const isCorrect = isSelected && char === currentWord.targetChar;
                    const isWrong = isSelected && char !== currentWord.targetChar;

                    return (
                      <button
                        key={char}
                        onClick={() => handleSelectChar(char!)}
                        className={`w-20 h-20 rounded-2xl text-3xl font-extrabold font-hangul border transition-all ${
                          isCorrect
                            ? 'bg-emerald-500 text-white border-emerald-500 scale-105'
                            : isWrong
                            ? 'bg-rose-500 text-white border-rose-500 animate-shake'
                            : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 hover:border-rose-400'
                        }`}
                      >
                        {char}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Practice Pairs List */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Danh sách các cặp âm hay nhầm
            </h4>
            <div className="space-y-2">
              {CONFUSING_PAIRS.map((pair, idx) => (
                <button
                  key={pair.id}
                  onClick={() => {
                    setPairIndex(idx);
                    setTargetWordIndex(0);
                    setUserChoice(null);
                  }}
                  className={`w-full text-left p-3 rounded-2xl text-xs font-semibold border transition-all ${
                    idx === pairIndex % CONFUSING_PAIRS.length
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300'
                      : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {pair.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. DICTATION DRILL */}
      {subMode === 'dictation' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
          <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
            Nghe & Chép chính tả ({dictIndex + 1} / {dictationWords.length})
          </span>

          <div className="py-4">
            <button
              onClick={() => audioService.speak(dictationWords[dictIndex].hangul)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-3xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-xl shadow-indigo-200 dark:shadow-none hover:scale-105 active:scale-95 transition-all"
            >
              <Volume2 size={24} />
              <span>Nghe từ tiếng Hàn</span>
            </button>
            <div className="mt-2 text-xs text-slate-500">
              Nghĩa tiếng Việt: <strong>{dictationWords[dictIndex].vietnamese}</strong> (Gợi ý: {dictationWords[dictIndex].hint})
            </div>
          </div>

          <div className="max-w-md mx-auto space-y-3">
            <input
              type="text"
              value={dictInput}
              onChange={(e) => setDictInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCheckDictation()}
              placeholder="Gõ từ tiếng Hàn bạn vừa nghe..."
              className="w-full text-center text-2xl font-bold font-hangul py-3 px-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex gap-2">
              <button
                onClick={handleCheckDictation}
                className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Kiểm tra đáp án
              </button>
              <button
                onClick={() => setDictInput(dictationWords[dictIndex].hangul)}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold rounded-xl"
              >
                Hiện đáp án
              </button>
            </div>
          </div>

          {dictFeedback === 'correct' && (
            <div className="p-3 bg-emerald-50 text-emerald-700 font-bold text-sm rounded-xl animate-fade-in">
              🎉 Chính xác tuyệt đối! +10 XP
            </div>
          )}
          {dictFeedback === 'wrong' && (
            <div className="p-3 bg-rose-50 text-rose-700 font-bold text-sm rounded-xl animate-shake">
              ❌ Chưa đúng, thử nghe lại và gõ lại nhé!
            </div>
          )}
        </div>
      )}

      {/* 3. VOICE RECORDER */}
      {subMode === 'recorder' && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
          <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
            Luyện phát âm & So sánh giọng mẫu
          </span>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="text-4xl font-extrabold font-hangul text-slate-900 dark:text-white">
              안녕하세요
            </div>
            <div className="text-xs text-slate-500 mt-1">[an-nyeong-ha-se-yo] : Xin chào</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Play Native Sample */}
            <button
              onClick={() => audioService.speak('안녕하세요')}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-200 hover:bg-indigo-100 transition-colors"
            >
              <Volume2 size={18} />
              <span>Nghe giọng mẫu người Hàn</span>
            </button>

            {/* Record My Voice */}
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-200 dark:shadow-none transition-all hover:scale-105"
              >
                <Mic size={18} />
                <span>Bấm để ghi âm giọng bạn</span>
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs animate-pulse"
              >
                <Square size={18} />
                <span>Dừng ghi âm</span>
              </button>
            )}
          </div>

          {/* User Recorded Playback */}
          {recordedAudioUrl && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 max-w-sm mx-auto text-left space-y-2">
              <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                🎙️ Bản thu âm của bạn:
              </div>
              <audio src={recordedAudioUrl} controls className="w-full h-8" />
              <div className="text-[11px] text-slate-500">
                Hãy nghe lại và đối chiếu độ vang, ngữ điệu với âm thanh mẫu!
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
