import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Play,
  RotateCw,
  Sparkles,
  BookOpen,
  Filter,
  Star,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FlashcardDeck, Flashcard } from '../../types';
import { FlashcardStudy } from './FlashcardStudy';

export const FlashcardHub: React.FC = () => {
  const {
    decks,
    flashcards,
    dueFlashcards,
    createCustomDeck,
    addFlashcardWord
  } = useApp();

  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);
  const [isStudying, setIsStudying] = useState<boolean>(false);
  const [cardsToStudy, setCardsToStudy] = useState<Flashcard[]>([]);

  // Modals
  const [showCreateDeckModal, setShowCreateDeckModal] = useState<boolean>(false);
  const [newDeckTitle, setNewDeckTitle] = useState('');
  const [newDeckDesc, setNewDeckDesc] = useState('');

  const [showAddCardModal, setShowAddCardModal] = useState<boolean>(false);
  const [newWordHangul, setNewWordHangul] = useState('');
  const [newWordMeaning, setNewWordMeaning] = useState('');
  const [newWordRomaji, setNewWordRomaji] = useState('');
  const [newWordExample, setNewWordExample] = useState('');

  // Start studying a specific deck
  const handleStudyDeck = (deckId: string) => {
    const deckCards = flashcards.filter((c) => c.deckId === deckId);
    setCardsToStudy(deckCards.length > 0 ? deckCards : flashcards.slice(0, 5));
    setIsStudying(true);
  };

  // Start studying all due cards
  const handleStudyAllDue = () => {
    setCardsToStudy(dueFlashcards.length > 0 ? dueFlashcards : flashcards.slice(0, 6));
    setIsStudying(true);
  };

  const handleCreateDeck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeckTitle.trim()) return;
    createCustomDeck(newDeckTitle, newDeckDesc);
    setNewDeckTitle('');
    setNewDeckDesc('');
    setShowCreateDeckModal(false);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWordHangul.trim() || !newWordMeaning.trim()) return;
    addFlashcardWord(newWordHangul, newWordMeaning, newWordRomaji, newWordExample);
    setNewWordHangul('');
    setNewWordMeaning('');
    setNewWordRomaji('');
    setNewWordExample('');
    setShowAddCardModal(false);
  };

  if (isStudying) {
    return <FlashcardStudy cards={cardsToStudy} onFinish={() => setIsStudying(false)} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
            <Sparkles size={14} />
            <span>HỆ THỐNG LẶP LẠI NGẮT QUÃNG (SRS)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Bộ Thẻ Flashcard & Ôn Tập
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Ghi nhớ từ vựng vĩnh viễn với thuật toán SRS khoa học: thẻ nhớ sẽ thưa dần, thẻ quên sẽ lặp lại sớm.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddCardModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
          >
            <Plus size={16} />
            <span>Thêm từ mới</span>
          </button>

          <button
            onClick={() => setShowCreateDeckModal(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 dark:shadow-none transition-all"
          >
            <Plus size={16} />
            <span>Tạo bộ thẻ riêng</span>
          </button>
        </div>
      </div>

      {/* Due Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-600 to-rose-500 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">
            Nhiệm vụ ôn tập hôm nay
          </span>
          <div className="text-2xl font-black">
            Bạn có {dueFlashcards.length} thẻ đến hạn cần ôn tập!
          </div>
          <p className="text-xs text-indigo-100">
            Chỉ mất khoảng 3–5 phút để củng cố toàn bộ từ vựng đã học.
          </p>
        </div>

        <button
          onClick={handleStudyAllDue}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-indigo-700 font-extrabold text-xs shadow-lg hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
        >
          <Play size={16} fill="currentColor" />
          <span>Bắt đầu ôn {dueFlashcards.length} thẻ ngay</span>
        </button>
      </div>

      {/* Decks Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers size={18} className="text-indigo-500" />
          <span>Danh sách các bộ thẻ</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {decks.map((deck) => {
            const count = flashcards.filter((c) => c.deckId === deck.id).length;
            const dueInDeck = dueFlashcards.filter((c) => c.deckId === deck.id).length;

            return (
              <div
                key={deck.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-indigo-300 dark:hover:border-indigo-700 transition-all space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                        deck.isSystem
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                          : 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400'
                      }`}
                    >
                      {deck.isSystem ? 'Bộ thẻ hệ thống' : 'Bộ thẻ riêng'}
                    </span>
                    {dueInDeck > 0 && (
                      <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-full">
                        Cần ôn: {dueInDeck}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {deck.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {deck.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {count} thẻ
                  </span>

                  <button
                    onClick={() => handleStudyDeck(deck.id)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                  >
                    <Play size={12} fill="currentColor" />
                    <span>Luyện thẻ</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CREATE DECK MODAL */}
      {showCreateDeckModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tạo Bộ Thẻ Riêng Mới</h3>
            <form onSubmit={handleCreateDeck} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Tên bộ thẻ</label>
                <input
                  type="text"
                  required
                  value={newDeckTitle}
                  onChange={(e) => setNewDeckTitle(e.target.value)}
                  placeholder="Ví dụ: Từ vựng ẩm thực K-food..."
                  className="mt-1 w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Mô tả ngắn</label>
                <input
                  type="text"
                  value={newDeckDesc}
                  onChange={(e) => setNewDeckDesc(e.target.value)}
                  placeholder="Ghi chú về chủ đề hoặc mục đích..."
                  className="mt-1 w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCreateDeckModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700"
                >
                  Tạo bộ thẻ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD CARD MODAL */}
      {showAddCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Thêm Từ Vựng Vào Flashcard</h3>
            <form onSubmit={handleAddCard} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Từ tiếng Hàn (Hangul) *</label>
                <input
                  type="text"
                  required
                  value={newWordHangul}
                  onChange={(e) => setNewWordHangul(e.target.value)}
                  placeholder="Ví dụ: 커피"
                  className="mt-1 w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-hangul text-base font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Nghĩa tiếng Việt *</label>
                <input
                  type="text"
                  required
                  value={newWordMeaning}
                  onChange={(e) => setNewWordMeaning(e.target.value)}
                  placeholder="Ví dụ: Cà phê"
                  className="mt-1 w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Phiên âm Latin (Tuỳ chọn)</label>
                <input
                  type="text"
                  value={newWordRomaji}
                  onChange={(e) => setNewWordRomaji(e.target.value)}
                  placeholder="Ví dụ: keo-pi"
                  className="mt-1 w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase">Câu ví dụ (Tuỳ chọn)</label>
                <input
                  type="text"
                  value={newWordExample}
                  onChange={(e) => setNewWordExample(e.target.value)}
                  placeholder="Ví dụ: 커피 한 잔 주세요."
                  className="mt-1 w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddCardModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-500"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-rose-500 text-white rounded-xl text-xs font-bold hover:bg-rose-600"
                >
                  Lưu từ vựng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
