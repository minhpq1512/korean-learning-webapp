import React, { useState } from 'react';
import {
  X,
  Compass,
  CheckCircle2,
  Clock,
  Target,
  GraduationCap,
  Sparkles,
  Volume2,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GoalOption, LevelOption } from '../../types';
import { QUESTION_BANK } from '../../data/questionBank';
import { audioService } from '../../utils/audioHelper';

export const OnboardingModal: React.FC = () => {
  const { profile, updateSettings, showOnboarding, setShowOnboarding, finishLesson, showToast } = useApp();
  const [step, setStep] = useState<number>(1);

  // Form states
  const [selectedGoals, setSelectedGoals] = useState<GoalOption[]>(profile.settings.goals || ['tourism', 'fun']);
  const [selectedLevel, setSelectedLevel] = useState<LevelOption>(profile.settings.currentLevel || 'none');
  const [dailyMinutes, setDailyMinutes] = useState<number>(profile.settings.dailyMinutes || 15);
  const [romanization, setRomanization] = useState<boolean>(profile.settings.romanizationEnabled);

  // Diagnostic Test States
  const [takeTest, setTakeTest] = useState<boolean>(false);
  const [testCurrentIndex, setTestCurrentIndex] = useState<number>(0);
  const [testScore, setTestScore] = useState<number>(0);
  const [diagnosticDone, setDiagnosticDone] = useState<boolean>(false);

  if (!showOnboarding) return null;

  const goalsList: { id: GoalOption; label: string; icon: string; desc: string }[] = [
    { id: 'tourism', label: 'Du lịch Hàn Quốc', icon: '✈️', desc: 'Hỏi đường, mua sắm, gọi món, đi tàu điện ngầm' },
    { id: 'media', label: 'Xem phim & K-pop', icon: '🎬', desc: 'Hiểu lời bài hát, câu thoại của idol, từ lóng' },
    { id: 'work', label: 'Đi làm công ty Hàn', icon: '💼', desc: 'Chào hỏi công sở, email, kính ngữ, phỏng vấn' },
    { id: 'study', label: 'Du học Hàn Quốc', icon: '🎓', desc: 'Chuẩn bị phỏng vấn visa, giao tiếp học đường' },
    { id: 'topik', label: 'Thi lấy bằng TOPIK I', icon: '📝', desc: 'Luyện đề, ngữ pháp thi, từ vựng theo khung cấp 1-2' },
    { id: 'fun', label: 'Học cho vui / Sở thích', icon: '🌟', desc: 'Thử thách bản thân với một ngôn ngữ mới lạ' },
  ];

  const levelsList: { id: LevelOption; label: string; desc: string; startLesson: string }[] = [
    { id: 'none', label: 'Chưa biết gì', desc: 'Bắt đầu từ con số 0 với bảng chữ cái Hangul', startLesson: 'Giai đoạn 1: Bảng chữ cái' },
    { id: 'hangul', label: 'Đã đọc được Hangul', desc: 'Biết mặt chữ nhưng chưa ghép được câu, thiếu từ vựng', startLesson: 'Giai đoạn 2: Sơ cấp 1 - Chào hỏi' },
    { id: 'basic_phrases', label: 'Biết vài câu giao tiếp', desc: 'Có thể nói câu ngắn, cần học ngữ pháp bài bản', startLesson: 'Giai đoạn 2: Sơ cấp 1 - Mua sắm & Ngữ pháp' },
    { id: 'elementary', label: 'Đã học qua sơ cấp', desc: 'Muốn củng cố ngữ pháp TOPIK I và luyện thi', startLesson: 'Giai đoạn 3: Sơ cấp 2 & Luyện đề' },
  ];

  const timeOptions = [
    { minutes: 5, xp: 15, label: '5 phút / ngày', sub: 'Thảnh thơi, duy trì streak nhẹ nhàng' },
    { minutes: 10, xp: 25, label: '10 phút / ngày', sub: 'Phù hợp người bận rộn' },
    { minutes: 15, xp: 40, label: '15 phút / ngày (Gợi ý)', sub: 'Tốc độ vàng: Đọc viết Hangul sau 10 ngày' },
    { minutes: 30, xp: 75, label: '30 phút / ngày', sub: 'Cấp tốc: Mục tiêu đạt TOPIK I sớm' },
  ];

  const diagnosticQuestions = QUESTION_BANK.filter(q => q.id.startsWith('diag_')).slice(0, 5);

  const toggleGoal = (id: GoalOption) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter(g => g !== id) : prev) : [...prev, id]
    );
  };

  const handleDiagnosticAnswer = (selectedAns: string) => {
    const currentQ = diagnosticQuestions[testCurrentIndex];
    const isCorrect = selectedAns === currentQ.correctAnswer;
    if (isCorrect) {
      setTestScore(prev => prev + 1);
      audioService.playCorrectSound();
    } else {
      audioService.playWrongSound();
    }

    if (testCurrentIndex + 1 < diagnosticQuestions.length) {
      setTestCurrentIndex(prev => prev + 1);
    } else {
      setDiagnosticDone(true);
      const totalCorrect = testScore + (isCorrect ? 1 : 0);
      if (totalCorrect >= 4) {
        setSelectedLevel('hangul');
        finishLesson('l_hangul_1', 100);
        finishLesson('l_hangul_2', 90);
        showToast('Xuất sắc! Bạn đã mở khoá thẳng tới Sơ cấp 1 🎉', 'success');
      } else {
        setSelectedLevel('none');
      }
    }
  };

  const handleComplete = () => {
    const dailyXp = timeOptions.find(t => t.minutes === dailyMinutes)?.xp || 40;
    updateSettings({
      goals: selectedGoals,
      currentLevel: selectedLevel,
      dailyMinutes,
      dailyXpGoal: dailyXp,
      romanizationEnabled: romanization,
    });
    setShowOnboarding(false);
    showToast('Lộ trình cá nhân hoá của bạn đã sẵn sàng! Chúc bạn học tốt 🚀', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={() => setShowOnboarding(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-rose-600 dark:text-rose-400 mb-2">
            <span>BƯỚC {step} / 4</span>
            <span>{step === 1 ? 'Mục tiêu' : step === 2 ? 'Trình độ & Khảo sát' : step === 3 ? 'Thời gian' : 'Xác nhận lộ trình'}</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-rose-500 to-indigo-600 h-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: GOALS */}
        {step === 1 && (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-rose-50 dark:bg-rose-950/40 rounded-2xl text-rose-500 mb-2">
                <Target size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Mục tiêu học tiếng Hàn của bạn là gì?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Chọn một hoặc nhiều mục tiêu để chúng tôi ưu tiên bài học phù hợp nhất cho bạn.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {goalsList.map(g => {
                const isSelected = selectedGoals.includes(g.id);
                return (
                  <button
                    key={g.id}
                    onClick={() => toggleGoal(g.id)}
                    className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <span className="text-2xl">{g.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                        <span>{g.label}</span>
                        {isSelected && <CheckCircle2 size={16} className="text-rose-500" />}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{g.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold transition-all shadow-md shadow-rose-200 dark:shadow-none"
              >
                <span>Tiếp tục</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: LEVEL & DIAGNOSTIC TEST */}
        {step === 2 && (
          <div>
            {!takeTest ? (
              <div>
                <div className="text-center mb-6">
                  <div className="inline-flex p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl text-indigo-500 mb-2">
                    <GraduationCap size={28} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Trình độ hiện tại của bạn?
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Chọn trình độ hoặc làm nhanh bài test 5 câu (3 phút) để tự động nhảy cóc bài đã biết.
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {levelsList.map(lvl => {
                    const isSelected = selectedLevel === lvl.id;
                    return (
                      <button
                        key={lvl.id}
                        onClick={() => setSelectedLevel(lvl.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20'
                            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>{lvl.label}</span>
                            <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                              {lvl.startLesson}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{lvl.desc}</div>
                        </div>
                        {isSelected && <CheckCircle2 size={18} className="text-indigo-500 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Optional Placement Test Banner */}
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="text-amber-500 flex-shrink-0" size={24} />
                    <div>
                      <div className="text-sm font-bold text-amber-900 dark:text-amber-200">
                        Chưa chắc chắn trình độ của mình?
                      </div>
                      <div className="text-xs text-amber-700 dark:text-amber-400">
                        Làm bài kiểm tra đầu vào 5 câu để hệ thống tự xếp lớp chuẩn xác.
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setTakeTest(true);
                      setTestCurrentIndex(0);
                      setTestScore(0);
                      setDiagnosticDone(false);
                    }}
                    className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
                  >
                    Làm bài test
                  </button>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold transition-all shadow-md shadow-rose-200 dark:shadow-none"
                  >
                    <span>Tiếp tục</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ) : (
              /* Diagnostic Mini Quiz */
              <div>
                {!diagnosticDone ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        CÂU HỎI {testCurrentIndex + 1} / {diagnosticQuestions.length}
                      </span>
                      <button
                        onClick={() => setTakeTest(false)}
                        className="text-xs text-slate-400 hover:underline"
                      >
                        Bỏ qua bài test
                      </button>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl mb-4">
                      <p className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                        {diagnosticQuestions[testCurrentIndex].prompt}
                      </p>
                      {diagnosticQuestions[testCurrentIndex].audioPrompt && (
                        <div className="my-3">
                          <button
                            onClick={() => audioService.speak(diagnosticQuestions[testCurrentIndex].audioPrompt!)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-xl text-sm font-semibold hover:bg-indigo-600 transition-colors shadow-sm"
                          >
                            <Volume2 size={18} />
                            <span>Bấm để nghe phát âm</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {diagnosticQuestions[testCurrentIndex].options?.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleDiagnosticAnswer(opt)}
                          className="p-3.5 text-left rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 text-slate-800 dark:text-slate-200 font-medium transition-all"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-4xl mb-3">🎉</div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Hoàn thành bài kiểm tra!
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      Bạn trả lời đúng <strong className="text-rose-500">{testScore} / {diagnosticQuestions.length}</strong> câu.
                    </p>
                    <div className="mt-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 text-left">
                      💡 <strong>Kết luận xếp lớp:</strong> Bạn đã được xếp vào lộ trình: <strong>{levelsList.find(l => l.id === selectedLevel)?.label}</strong>.
                    </div>
                    <button
                      onClick={() => {
                        setTakeTest(false);
                        setStep(3);
                      }}
                      className="mt-6 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700"
                    >
                      Tiếp tục bước tiếp theo
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* STEP 3: DAILY TIME COMMITMENT */}
        {step === 3 && (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl text-emerald-500 mb-2">
                <Clock size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Bạn muốn dành bao nhiêu phút mỗi ngày?
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Dùng để tính mục tiêu XP hằng ngày và thông báo nhắc nhở số thẻ cần ôn.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {timeOptions.map(t => {
                const isSelected = dailyMinutes === t.minutes;
                return (
                  <button
                    key={t.minutes}
                    onClick={() => setDailyMinutes(t.minutes)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{t.label}</span>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                          +{t.xp} XP / ngày
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.sub}</div>
                    </div>
                    {isSelected && <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Quay lại
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold transition-all shadow-md shadow-rose-200 dark:shadow-none"
              >
                <span>Xem tổng quan lộ trình</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SUMMARY & CONFIRMATION */}
        {step === 4 && (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-purple-50 dark:bg-purple-950/40 rounded-2xl text-purple-500 mb-2">
                <Compass size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Lộ trình học cá nhân hoá của bạn
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Tất cả thiết lập đã được tính toán tối ưu dựa trên câu trả lời của bạn.
              </p>
            </div>

            {/* Overview Card */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-4 mb-6">
              <div className="flex justify-between items-center text-sm border-b border-slate-200 dark:border-slate-700 pb-3">
                <span className="text-slate-500 dark:text-slate-400">Điểm bắt đầu gợi ý:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {levelsList.find(l => l.id === selectedLevel)?.startLesson}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-200 dark:border-slate-700 pb-3">
                <span className="text-slate-500 dark:text-slate-400">Mục tiêu ưu tiên:</span>
                <span className="font-bold text-rose-600 dark:text-rose-400">
                  {selectedGoals.map(g => goalsList.find(item => item.id === g)?.label).join(' · ')}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-200 dark:border-slate-700 pb-3">
                <span className="text-slate-500 dark:text-slate-400">Lịch học tuần gợi ý:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  5 ngày bài mới + 2 ngày ôn tập SRS
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">Mục tiêu hằng ngày:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  {dailyMinutes} phút (~{timeOptions.find(t => t.minutes === dailyMinutes)?.xp} XP / ngày)
                </span>
              </div>
            </div>

            {/* Display Option: Romanization toggle */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between mb-8">
              <div>
                <div className="font-semibold text-slate-900 dark:text-white text-sm">
                  Hiển thị phiên âm Latin (Romanization)
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Bật phiên âm giúp người mới dễ đọc; bạn có thể tắt bất cứ lúc nào trên thanh điều hướng.
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={romanization}
                  onChange={(e) => setRomanization(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
              </label>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Quay lại
              </button>
              <button
                onClick={handleComplete}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-kr-red hover:from-rose-600 hover:to-red-700 text-white font-bold transition-all shadow-lg shadow-rose-200 dark:shadow-none"
              >
                Bắt đầu học ngay 🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
