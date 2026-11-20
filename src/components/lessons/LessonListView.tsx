import React, { useState } from 'react';
import {
  Lock,
  CheckCircle2,
  Play,
  Bookmark,
  Award,
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { COURSES_DATA } from '../../data/courseData';
import { Lesson } from '../../types';
import { useApp } from '../../context/AppContext';

export const LessonListView: React.FC = () => {
  const { completedLessons, setActiveLesson } = useApp();
  const [filterMode, setFilterMode] = useState<'roadmap' | 'topic' | 'skill'>('roadmap');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');

  const topics = [
    { id: 'all', label: 'Tất cả chủ đề' },
    { id: 'tourism', label: 'Du lịch' },
    { id: 'media', label: 'Phim & K-pop' },
    { id: 'work', label: 'Công việc' },
    { id: 'topik_prep', label: 'Luyện thi TOPIK I' },
  ];

  const skills = [
    { id: 'all', label: 'Tất cả kỹ năng' },
    { id: 'hangul', label: 'Bảng chữ Hangul' },
    { id: 'vocab', label: 'Từ vựng' },
    { id: 'grammar', label: 'Ngữ pháp' },
    { id: 'listening', label: 'Nghe' },
    { id: 'reading', label: 'Đọc' },
  ];

  // Check if lesson is unlocked (first lesson unlocked, or previous lesson completed >= 70%)
  const isLessonUnlocked = (lesson: Lesson, indexInCourse: number, allLessons: Lesson[]) => {
    if (indexInCourse === 0) return true;
    const prevLesson = allLessons[indexInCourse - 1];
    return completedLessons[prevLesson.id]?.completed;
  };

  const allLessonsFlat = COURSES_DATA.flatMap((c) => c.lessons);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Khoá Học Tiếng Hàn
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Nội dung chia thành Khoá → Chương → Bài học 5-10 phút kèm mini test mở khoá tuần tự.
          </p>
        </div>

        {/* 3 View Mode Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setFilterMode('roadmap')}
            className={`px-4 py-2 rounded-xl transition-all ${
              filterMode === 'roadmap'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Theo lộ trình
          </button>
          <button
            onClick={() => setFilterMode('topic')}
            className={`px-4 py-2 rounded-xl transition-all ${
              filterMode === 'topic'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Theo chủ đề
          </button>
          <button
            onClick={() => setFilterMode('skill')}
            className={`px-4 py-2 rounded-xl transition-all ${
              filterMode === 'skill'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Theo kỹ năng
          </button>
        </div>
      </div>

      {/* Filter Chips for Topic / Skill view */}
      {filterMode === 'topic' && (
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTopic(t.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedTopic === t.id
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {filterMode === 'skill' && (
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSkill(s.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedSkill === s.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Course Chapters & Lessons List */}
      <div className="space-y-8">
        {COURSES_DATA.map((chapter) => {
          // Filter lessons if needed
          const filteredLessons = chapter.lessons.filter((l) => {
            if (filterMode === 'topic' && selectedTopic !== 'all') {
              return l.topics.includes(selectedTopic);
            }
            if (filterMode === 'skill' && selectedSkill !== 'all') {
              return l.skills.includes(selectedSkill as any);
            }
            return true;
          });

          if (filteredLessons.length === 0) return null;

          return (
            <div
              key={chapter.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6"
            >
              {/* Chapter Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
                    {chapter.stageName}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                    {chapter.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {chapter.description}
                  </p>
                </div>
              </div>

              {/* Lessons Grid in this Chapter */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLessons.map((lesson) => {
                  const lessonIndex = allLessonsFlat.findIndex((x) => x.id === lesson.id);
                  const isUnlocked = isLessonUnlocked(lesson, lessonIndex, allLessonsFlat);
                  const completedStatus = completedLessons[lesson.id];

                  return (
                    <div
                      key={lesson.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                        completedStatus?.completed
                          ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/20'
                          : isUnlocked
                          ? 'border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-700 bg-white dark:bg-slate-900 shadow-sm'
                          : 'border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/40 opacity-70'
                      }`}
                    >
                      <div>
                        {/* Status Tag */}
                        <div className="flex items-center justify-between mb-3 text-xs">
                          <span className="text-[11px] font-bold text-slate-400">
                            {lesson.title.split(':')[0]}
                          </span>
                          {completedStatus?.completed ? (
                            <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 size={14} />
                              <span>{completedStatus.score}%</span>
                            </span>
                          ) : isUnlocked ? (
                            <span className="px-2 py-0.5 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-md font-semibold text-[10px]">
                              Sẵn sàng học
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-slate-400 font-semibold text-[10px]">
                              <Lock size={12} />
                              <span>Đạt ≥ 70% bài trước để mở</span>
                            </span>
                          )}
                        </div>

                        {/* Title & Objective */}
                        <h3 className="font-bold text-slate-900 dark:text-white text-base">
                          {lesson.title.split(':').slice(1).join(':') || lesson.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {lesson.objective}
                        </p>
                      </div>

                      {/* Bottom action */}
                      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400 font-mono">
                          {lesson.vocabularies.length} từ vựng · {lesson.grammars.length} ngữ pháp
                        </span>

                        <button
                          onClick={() => isUnlocked && setActiveLesson(lesson)}
                          disabled={!isUnlocked}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            isUnlocked
                              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-sm shadow-rose-200 dark:shadow-none hover:scale-105'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          {isUnlocked ? (
                            <>
                              <Play size={14} fill="currentColor" />
                              <span>{completedStatus?.completed ? 'Học lại' : 'Vào học'}</span>
                            </>
                          ) : (
                            <>
                              <Lock size={12} />
                              <span>Khoá</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
