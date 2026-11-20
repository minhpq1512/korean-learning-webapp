import React, { useState } from 'react';
import {
  ArrowLeft,
  Volume2,
  Bookmark,
  CheckCircle2,
  FileCheck2,
  Sparkles,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Plus,
  StickyNote,
  Save,
  Check,
  Play
} from 'lucide-react';
import { Lesson, InteractiveDrill } from '../../types';
import { useApp } from '../../context/AppContext';
import { QUESTION_BANK } from '../../data/questionBank';
import { audioService } from '../../utils/audioHelper';

export const LessonStudyView: React.FC<{ lesson: Lesson; onBack: () => void }> = ({
  lesson,
  onBack
}) => {
  const {
    profile,
    finishLesson,
    addFlashcardWord,
    setActiveTestConfig,
    setActiveTab,
    showToast
  } = useApp();

  const [activeStep, setActiveStep] = useState<number>(1);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [personalNotes, setPersonalNotes] = useState<string>(() => {
    return localStorage.getItem(`notes_${lesson.id}`) || '';
  });
  const [drillAnswers, setDrillAnswers] = useState<Record<string, string>>({});
  const [drillFeedback, setDrillFeedback] = useState<Record<string, boolean>>({});
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const steps = [
    { id: 1, title: '1. Mục tiêu & Từ mới' },
    { id: 2, title: '2. Ngữ pháp & Mẫu câu' },
    { id: 3, title: '3. Hội thoại thực tế' },
    { id: 4, title: '4. Luyện tập nhanh' },
    { id: 5, title: '5. Mini Test & Tổng kết' },
  ];

  const handleSaveNotes = () => {
    localStorage.setItem(`notes_${lesson.id}`, personalNotes);
    showToast('Đã lưu ghi chú cá nhân của bạn!', 'success');
  };

  const handleAddAllVocabToFlashcards = () => {
    lesson.vocabularies.forEach((v) => {
      addFlashcardWord(v.hangul, v.meaning, v.romanization, v.exampleSentence);
    });
    showToast(`Đã thêm tất cả ${lesson.vocabularies.length} từ vào bộ thẻ ôn tập!`, 'success');
  };

  const handleCheckDrill = (drill: InteractiveDrill, selectedOption: string) => {
    setDrillAnswers((prev) => ({ ...prev, [drill.id]: selectedOption }));
    const isCorrect = selectedOption === drill.correctAnswer;
    setDrillFeedback((prev) => ({ ...prev, [drill.id]: isCorrect }));

    if (isCorrect) {
      audioService.playCorrectSound();
    } else {
      audioService.playWrongSound();
    }
  };

  const handleStartMiniTest = () => {
    const questions = QUESTION_BANK.filter((q) => q.lessonId === lesson.id);
    const questionsToRun = questions.length > 0 ? questions : QUESTION_BANK.slice(0, 5);

    setActiveTestConfig({
      type: 'mini_test',
      title: `Mini Test: ${lesson.title}`,
      questions: questionsToRun,
      mode: 'practice',
      lessonId: lesson.id
    });
    setActiveTab('testing');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6 animate-fade-in">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          <span>Quay lại danh sách bài</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            onClick={() => {
              setIsBookmarked(!isBookmarked);
              showToast(isBookmarked ? 'Đã bỏ lưu bài học' : 'Đã lưu bài học vào mục yêu thích! ⭐', 'info');
            }}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isBookmarked
                ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Bookmark size={15} className={isBookmarked ? 'fill-amber-400' : ''} />
            <span className="hidden sm:inline">{isBookmarked ? 'Đã lưu' : 'Lưu bài'}</span>
          </button>

          {/* Test out / Mark as known button */}
          <button
            onClick={handleStartMiniTest}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
            title="Làm mini test ngay để bỏ qua bài nếu đã biết"
          >
            Đánh dấu đã biết
          </button>
        </div>
      </div>

      {/* Lesson Heading & Steps Navigation */}
      <div>
        <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
          GIAI ĐOẠN {lesson.stage} · {lesson.title.split(':')[0]}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          {lesson.title.split(':').slice(1).join(':') || lesson.title}
        </h1>

        {/* Step Indicator Bar */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none border-b border-slate-100 dark:border-slate-800">
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveStep(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeStep === s.id
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-200 dark:shadow-none'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: OBJECTIVE & VOCABULARY */}
      {activeStep === 1 && (
        <div className="space-y-6">
          {/* 1. Objective */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-indigo-50 dark:from-rose-950/30 dark:to-indigo-950/30 border border-rose-100 dark:border-rose-900/40">
            <div className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              🎯 Mục tiêu bài học
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-1">
              {lesson.objective}
            </p>
          </div>

          {/* 2. Vocabulary List */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <BookOpen size={18} className="text-rose-500" />
                <span>Từ vựng mới ({lesson.vocabularies.length} từ)</span>
              </h3>
              <button
                onClick={handleAddAllVocabToFlashcards}
                className="flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:underline"
              >
                <Plus size={14} />
                <span>Thêm tất cả vào Flashcard</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lesson.vocabularies.map((v) => (
                <div
                  key={v.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-rose-300 dark:hover:border-rose-700 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-2xl font-bold font-hangul text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{v.hangul}</span>
                        <button
                          onClick={() => audioService.speak(v.hangul, profile.settings.audioSpeed)}
                          className="p-1 rounded-full text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-950 transition-colors"
                          title="Nghe phát âm"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                      {profile.settings.romanizationEnabled && (
                        <div className="text-xs text-slate-400 font-mono mt-0.5">
                          [{v.romanization}] · {v.partOfSpeech}
                        </div>
                      )}
                      <div className="text-sm font-semibold text-rose-600 dark:text-rose-400 mt-1">
                        {v.meaning}
                      </div>
                    </div>

                    <button
                      onClick={() => addFlashcardWord(v.hangul, v.meaning, v.romanization, v.exampleSentence)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                      title="Thêm vào flashcard cá nhân"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Example Sentence */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                    <div className="font-hangul font-medium text-slate-700 dark:text-slate-300">
                      "{v.exampleSentence}"
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                      {v.exampleMeaning}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setActiveStep(2)}
              className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all"
            >
              Sang phần Ngữ pháp →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: GRAMMAR & SENTENCE PATTERNS */}
      {activeStep === 2 && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Sparkles size={18} className="text-rose-500" />
              <span>Ngữ pháp & Mẫu câu trọng tâm</span>
            </h3>

            {lesson.grammars.map((g) => (
              <div key={g.id} className="space-y-4 pb-6 border-b border-slate-100 dark:border-slate-800 last:border-none">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">{g.title}</h4>
                  <div className="inline-block mt-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-mono text-xs font-bold rounded-lg border border-indigo-200 dark:border-indigo-800">
                    Công thức: {g.formula}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {g.explanation}
                </p>

                {/* Examples */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Ví dụ minh hoạ:
                  </span>
                  {g.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold font-hangul text-slate-900 dark:text-white text-sm">
                          {ex.hangul}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 mt-0.5">{ex.meaning}</div>
                      </div>
                      <button
                        onClick={() => audioService.speak(ex.hangul)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                        title="Nghe câu"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Common Vietnamese Learner Mistakes */}
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200">
                  ⚠️ <strong>Lỗi người Việt hay gặp:</strong> {g.commonMistakes}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setActiveStep(1)}
              className="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              ← Quay lại Từ vựng
            </button>
            <button
              onClick={() => setActiveStep(3)}
              className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all"
            >
              Sang Hội thoại thực tế →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SHORT DIALOGUE */}
      {activeStep === 3 && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <MessageSquare size={18} className="text-rose-500" />
                <span>Hội thoại đời sống</span>
              </h3>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {showSubtitles ? 'Ẩn phụ đề tiếng Việt' : 'Hiện phụ đề tiếng Việt'}
                </button>
                <button
                  onClick={() => {
                    const fullText = lesson.dialogue.map((d) => d.hangul).join('. ');
                    audioService.speak(fullText);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 shadow-sm"
                >
                  <Play size={12} fill="currentColor" />
                  <span>Nghe toàn bài</span>
                </button>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {lesson.dialogue.map((line, idx) => (
                <div
                  key={line.id}
                  onClick={() => audioService.speak(line.hangul)}
                  className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-rose-50/40 dark:hover:bg-rose-950/20 cursor-pointer transition-colors flex items-start justify-between group"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-rose-500 block">
                      {line.speaker}:
                    </span>
                    <div className="text-base font-bold font-hangul text-slate-900 dark:text-white">
                      {line.hangul}
                    </div>
                    {profile.settings.romanizationEnabled && (
                      <div className="text-xs text-slate-400 font-mono">
                        [{line.romanization}]
                      </div>
                    )}
                    {showSubtitles && (
                      <div className="text-xs text-slate-600 dark:text-slate-300">
                        {line.vietnamese}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      audioService.speak(line.hangul);
                    }}
                    className="p-2 rounded-xl text-slate-400 group-hover:text-rose-500 transition-colors"
                    title="Nghe câu này"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setActiveStep(2)}
              className="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              ← Quay lại Ngữ pháp
            </button>
            <button
              onClick={() => setActiveStep(4)}
              className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all"
            >
              Sang Luyện tập nhanh →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: QUICK INTERACTIVE PRACTICE */}
      {activeStep === 4 && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <HelpCircle size={18} className="text-rose-500" />
              <span>Luyện tập tương tác nhanh ({lesson.quickPractices.length} câu)</span>
            </h3>

            <div className="space-y-5">
              {lesson.quickPractices.map((drill, idx) => {
                const userAns = drillAnswers[drill.id];
                const feedback = drillFeedback[drill.id];

                return (
                  <div
                    key={drill.id}
                    className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
                  >
                    <div className="text-xs font-bold text-rose-500">CÂU HỎI {idx + 1}</div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {drill.prompt}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {drill.options?.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleCheckDrill(drill, opt)}
                          className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                            userAns === opt
                              ? feedback
                                ? 'bg-emerald-500 text-white border-emerald-500'
                                : 'bg-rose-500 text-white border-rose-500 animate-shake'
                              : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>

                    {userAns && (
                      <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
                        💡 <strong>Giải thích:</strong> {drill.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setActiveStep(3)}
              className="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              ← Quay lại Hội thoại
            </button>
            <button
              onClick={() => setActiveStep(5)}
              className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all"
            >
              Tổng kết & Mini Test →
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: SUMMARY & MINI TEST TRIGGER */}
      {activeStep === 5 && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center mx-auto text-2xl font-bold shadow-inner">
              🎉
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Chúc mừng bạn đã hoàn thành lý thuyết bài học!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-lg mx-auto">
                Bây giờ hãy làm Mini Test 5 câu (cần đạt ≥ 70% để mở khoá bài tiếp theo và nhận +10 XP).
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleStartMiniTest}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-xl shadow-rose-200 dark:shadow-none hover:scale-105 transition-all"
              >
                <FileCheck2 size={20} />
                <span>Bắt đầu Mini Test cuối bài ngay</span>
              </button>

              <button
                onClick={() => {
                  finishLesson(lesson.id, 100);
                  showToast('Đã đánh dấu hoàn thành bài học!', 'success');
                  onBack();
                }}
                className="px-6 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
              >
                Hoàn thành & Quay về lộ trình
              </button>
            </div>
          </div>

          {/* Personal Notes Section */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <StickyNote size={16} className="text-rose-500" />
                <span>Ghi chú cá nhân cho bài này</span>
              </h4>
              <button
                onClick={handleSaveNotes}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 transition-colors"
              >
                <Save size={14} />
                <span>Lưu ghi chú</span>
              </button>
            </div>
            <textarea
              value={personalNotes}
              onChange={(e) => setPersonalNotes(e.target.value)}
              placeholder="Ghi lại các từ mới cần nhớ, mẹo phát âm hoặc câu hỏi của bạn tại đây..."
              rows={4}
              className="w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        </div>
      )}
    </div>
  );
};
