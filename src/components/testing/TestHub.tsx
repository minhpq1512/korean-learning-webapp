import React, { useState } from 'react';
import {
  FileCheck2,
  Clock,
  Sparkles,
  Award,
  Play,
  RotateCcw,
  Sliders,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { QUESTION_BANK } from '../../data/questionBank';
import { TOPIK_MOCK_QUESTIONS } from '../../data/topikMockData';
import { TestRunner } from './TestRunner';
import { CustomTestBuilderModal } from './CustomTestBuilderModal';

export const TestHub: React.FC = () => {
  const { activeTestConfig, setActiveTestConfig, testAttempts } = useApp();
  const [showCustomModal, setShowCustomModal] = useState(false);

  // If a test is active, render TestRunner
  if (activeTestConfig) {
    return (
      <TestRunner
        title={activeTestConfig.title}
        type={activeTestConfig.type}
        questions={activeTestConfig.questions}
        mode={activeTestConfig.mode}
        lessonId={activeTestConfig.lessonId}
        onExit={() => setActiveTestConfig(null)}
      />
    );
  }

  const testTypes = [
    {
      id: 'mini',
      title: 'Mini Test Cuối Bài',
      desc: '5 câu kiểm tra nhanh kiến thức từng bài học để mở khoá bài tiếp theo (cần đạt ≥ 70%).',
      icon: '📝',
      duration: '5 phút',
      badge: 'Thường xuyên',
      color: 'from-rose-500 to-red-600',
      action: () => {
        setActiveTestConfig({
          type: 'mini_test',
          title: 'Mini Test: Kiểm Tra Nhanh Bài Học',
          questions: QUESTION_BANK.slice(0, 5),
          mode: 'practice'
        });
      }
    },
    {
      id: 'chapter',
      title: 'Bài Test Tổng Hợp Chương',
      desc: '10–20 câu kiểm tra toàn diện sau khi học xong một chương. Thời gian: 15 phút.',
      icon: '📚',
      duration: '15 phút',
      badge: 'Tổng hợp',
      color: 'from-indigo-600 to-purple-600',
      action: () => {
        setActiveTestConfig({
          type: 'chapter_test',
          title: 'Test Chương 1: Bảng Chữ Cái & Ngữ Âm Hangul',
          questions: QUESTION_BANK.slice(0, 10),
          mode: 'exam'
        });
      }
    },
    {
      id: 'custom',
      title: 'Đề Tự Tạo Theo Nhu Cầu',
      desc: 'Tự chọn kỹ năng (Nghe/Đọc/Ngữ pháp/Từ vựng), số câu và phạm vi (kể cả chỉ câu từng làm sai).',
      icon: '⚙️',
      duration: 'Tuỳ chọn',
      badge: 'Linh hoạt',
      color: 'from-amber-500 to-orange-600',
      action: () => setShowCustomModal(true)
    },
    {
      id: 'topik',
      title: 'Thi Thử TOPIK I Chuẩn Hóa',
      desc: 'Mô phỏng đề thi TOPIK I thực tế (Phần Nghe + Phần Đọc). Thang điểm 200, tự động ước tính Cấp 1 / Cấp 2.',
      icon: '🎓',
      duration: '40–100 phút',
      badge: 'Chứng chỉ',
      color: 'from-emerald-600 to-teal-700',
      action: () => {
        setActiveTestConfig({
          type: 'topik_mock',
          title: 'Đề Thi Thử TOPIK I (Nghe & Đọc)',
          questions: TOPIK_MOCK_QUESTIONS,
          mode: 'exam'
        });
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold mb-2">
            <Sparkles size={14} />
            <span>NGÂN HÀNG ĐỀ & CHẤM ĐIỂM TỰ ĐỘNG</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Kiểm Tra, Thi Thử & Đánh Giá
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            4 loại hình kiểm tra dùng chung ngân hàng câu hỏi, chấm điểm tức thì và giải thích bằng tiếng Việt.
          </p>
        </div>

        <button
          onClick={() => setShowCustomModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-200 dark:shadow-none transition-all"
        >
          <Sliders size={16} />
          <span>Tự tạo đề kiểm tra riêng</span>
        </button>
      </div>

      {/* 4 Test Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testTypes.map((test) => (
          <div
            key={test.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-rose-300 dark:hover:border-rose-700 transition-all space-y-6 group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl p-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  {test.icon}
                </span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase">
                  {test.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors">
                {test.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {test.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <Clock size={12} />
                <span>{test.duration}</span>
              </span>

              <button
                onClick={test.action}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-rose-500 dark:hover:bg-rose-500 dark:hover:text-white font-bold text-xs transition-colors shadow-sm"
              >
                <Play size={12} fill="currentColor" />
                <span>Bắt đầu thi</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Test History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <FileCheck2 size={18} className="text-rose-500" />
            <span>Lịch sử các bài kiểm tra đã làm gần đây</span>
          </h3>
          <span className="text-xs text-slate-400">{testAttempts.length} lượt thi</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-3 px-3">Tên đề thi</th>
                <th className="py-3 px-3">Ngày làm</th>
                <th className="py-3 px-3">Loại bài</th>
                <th className="py-3 px-3">Thời gian</th>
                <th className="py-3 px-3 text-right">Điểm số</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {testAttempts.map((att) => (
                <tr key={att.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="py-3.5 px-3 font-semibold text-slate-900 dark:text-white">
                    {att.title}
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 font-mono">{att.date}</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px]">
                      {att.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-500 font-mono">
                    {Math.round(att.timeSpentSeconds / 60)} phút
                  </td>
                  <td className="py-3.5 px-3 text-right font-bold">
                    <span className={att.score >= 70 ? 'text-emerald-500' : 'text-rose-500'}>
                      {att.score} điểm
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showCustomModal && (
        <CustomTestBuilderModal
          onClose={() => setShowCustomModal(false)}
          onStartTest={(config) => {
            setShowCustomModal(false);
            setActiveTestConfig(config as any);
          }}
        />
      )}
    </div>
  );
};
