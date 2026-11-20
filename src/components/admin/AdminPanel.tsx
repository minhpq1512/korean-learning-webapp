import React, { useState } from 'react';
import {
  SlidersHorizontal,
  BookOpen,
  HelpCircle,
  Users,
  BarChart2,
  AlertOctagon,
  Plus,
  Trash2,
  Edit,
  FileSpreadsheet,
  CheckCircle,
  Search,
  Upload
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { COURSES_DATA } from '../../data/courseData';
import { QUESTION_BANK } from '../../data/questionBank';

export const AdminPanel: React.FC = () => {
  const { showToast } = useApp();
  const [adminTab, setAdminTab] = useState<'courses' | 'vocab' | 'questions' | 'users' | 'stats' | 'reports'>('courses');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Admin States
  const [courses, setCourses] = useState(COURSES_DATA);
  const [questions, setQuestions] = useState(QUESTION_BANK);

  const mockUsers = [
    { id: 'u_1', name: 'Nguyễn Văn Minh', email: 'minh.nguyen@example.com', role: 'Học viên', progress: '75%', streak: 12, status: 'Hoạt động' },
    { id: 'u_2', name: 'Trần Thị Mai', email: 'mai.tran@example.com', role: 'Học viên', progress: '40%', streak: 5, status: 'Hoạt động' },
    { id: 'u_3', name: 'Lê Hoàng Nam', email: 'nam.le@example.com', role: 'Học viên', progress: '15%', streak: 1, status: 'Tạm khóa' },
  ];

  const mockReports = [
    { id: 'rep_1', user: 'Mai Trần', questionId: 'q_diff_1', reason: 'Âm thanh nghe hơi rè trên Safari', status: 'Đang xử lý', date: '2026-11-19' },
    { id: 'rep_2', user: 'Hoàng Nam', questionId: 'q_e1_1', reason: 'Câu này nên chấp nhận thêm đáp án "예요"', status: 'Đã cập nhật', date: '2026-11-18' },
  ];

  const handleSimulateCsvImport = () => {
    showToast('Đã nhập thành công 25 từ vựng mới từ file CSV!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold mb-2">
            <SlidersHorizontal size={14} />
            <span>KHU VỰC QUẢN TRỊ VIÊN HỆ THỐNG</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Bảng Điều Khiển Quản Trị (Admin Panel)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Quản lý bài học, ngân hàng câu hỏi, dữ liệu từ vựng, tài khoản học viên và báo cáo nội dung.
          </p>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl text-xs font-semibold overflow-x-auto scrollbar-none gap-1">
        {[
          { id: 'courses', label: 'Quản lý Bài học', icon: BookOpen },
          { id: 'questions', label: 'Ngân hàng Câu hỏi', icon: HelpCircle },
          { id: 'vocab', label: 'Từ vựng & CSV', icon: FileSpreadsheet },
          { id: 'users', label: 'Người dùng', icon: Users },
          { id: 'stats', label: 'Thống kê & Tỉ lệ sai', icon: BarChart2 },
          { id: 'reports', label: 'Báo lỗi nội dung', icon: AlertOctagon },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                adminTab === tab.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: COURSES & CHAPTERS */}
      {adminTab === 'courses' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Danh sách các khoá & bài học</h3>
            <button
              onClick={() => showToast('Mở form tạo bài học mới', 'info')}
              className="flex items-center gap-1.5 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold shadow-sm"
            >
              <Plus size={16} />
              <span>Thêm bài học mới</span>
            </button>
          </div>

          <div className="space-y-4">
            {courses.map((ch) => (
              <div key={ch.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3">
                <div className="flex justify-between items-center">
                  <div className="font-bold text-sm text-slate-900 dark:text-white">
                    {ch.stageName} · {ch.title}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    Đã đăng (Published)
                  </span>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                  {ch.lessons.map((l) => (
                    <div key={l.id} className="p-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white">{l.title}</span>
                        <span className="ml-2 text-slate-400">({l.vocabularies.length} từ · {l.grammars.length} ngữ pháp)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-slate-400 hover:text-slate-600" title="Chỉnh sửa">
                          <Edit size={14} />
                        </button>
                        <button className="p-1 text-slate-400 hover:text-rose-500" title="Xóa">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: QUESTIONS BANK */}
      {adminTab === 'questions' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Ngân hàng câu hỏi ({questions.length} câu)
            </h3>
            <button
              onClick={() => showToast('Mở form thêm câu hỏi mới', 'info')}
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm self-start"
            >
              <Plus size={16} />
              <span>Tạo câu hỏi mới</span>
            </button>
          </div>

          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex justify-between items-start text-xs space-y-1">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-400">#{idx + 1}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 uppercase text-[10px] font-bold">
                      {q.type}
                    </span>
                    <span className="text-rose-500 font-bold uppercase text-[10px]">
                      {q.skill}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-white text-sm">
                    {q.prompt}
                  </div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-medium">
                    Đáp án đúng: {Array.isArray(q.correctAnswer) ? q.correctAnswer.join(', ') : q.correctAnswer}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="p-1.5 text-slate-400 hover:text-slate-600">
                    <Edit size={14} />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-rose-500">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VOCABULARY & CSV IMPORT */}
      {adminTab === 'vocab' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Quản lý từ vựng & Nhập hàng loạt
              </h3>
              <p className="text-xs text-slate-500">
                Hỗ trợ nhập danh sách từ file CSV hoặc Excel nhanh chóng
              </p>
            </div>

            <button
              onClick={handleSimulateCsvImport}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
            >
              <Upload size={16} />
              <span>Nhập từ vựng từ CSV / Excel</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-center space-y-3">
            <FileSpreadsheet size={36} className="mx-auto text-emerald-500" />
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Kéo thả file <code>.csv</code> hoặc <code>.xlsx</code> vào đây (cột: hangul, romanization, meaning, example)
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: USERS MANAGEMENT */}
      {adminTab === 'users' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Danh sách học viên ({mockUsers.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="py-3 px-3">Họ tên & Email</th>
                  <th className="py-3 px-3">Vai trò</th>
                  <th className="py-3 px-3">Tiến độ</th>
                  <th className="py-3 px-3">Streak</th>
                  <th className="py-3 px-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {mockUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-3">{u.role}</td>
                    <td className="py-3.5 px-3 font-semibold text-indigo-500">{u.progress}</td>
                    <td className="py-3.5 px-3 font-mono font-bold text-amber-500">🔥 {u.streak}</td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.status === 'Hoạt động' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: STATS & ABNORMAL ERROR RATES */}
      {adminTab === 'stats' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Thống kê học viên & Câu hỏi có tỉ lệ sai bất thường
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xs text-slate-400 uppercase font-bold">Người học hoạt động (24h)</span>
              <div className="text-3xl font-black text-rose-500 mt-1">1,248</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xs text-slate-400 uppercase font-bold">Bài học học nhiều nhất</span>
              <div className="text-base font-bold text-indigo-500 mt-2 truncate">Bài 1: Nguyên âm cơ bản</div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-xs text-slate-400 uppercase font-bold">Lượt thi thử TOPIK I</span>
              <div className="text-3xl font-black text-emerald-500 mt-1">456</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: ERROR REPORTS */}
      {adminTab === 'reports' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Báo cáo phản hồi từ học viên ({mockReports.length})
          </h3>

          <div className="space-y-3">
            {mockReports.map((rep) => (
              <div key={rep.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex justify-between items-center text-xs">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">
                    {rep.user} (Câu #{rep.questionId})
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 mt-0.5">{rep.reason}</div>
                  <div className="text-[10px] text-slate-400 mt-1">{rep.date}</div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  rep.status === 'Đã cập nhật' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {rep.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
