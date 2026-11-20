# Hanguora (한구어라) - Web App Học Tiếng Hàn Cho Người Mới Bắt Đầu

Web app hỗ trợ người Việt học tiếng Hàn từ con số 0: đọc, viết bảng chữ cái Hangul thành thạo trong 1–2 tuần đầu, sau đó tiếp tục nâng cao trình độ sơ cấp (tương đương TOPIK I, cấp 1–2).

## 🌟 Tính Năng Nổi Bật

1. **Khảo Sát Onboarding & Cá Nhân Hóa (4 Bước):**
   - Đặt mục tiêu học (Du lịch, Phim/K-pop, Đi làm, Du học, Thi TOPIK I, Học sở thích).
   - Đánh giá trình độ với bài kiểm tra đầu vào (Diagnostic Test) xếp lớp tự động.
   - Thiết lập thời gian học mỗi ngày (5, 10, 15, 30 phút) để tính mục tiêu XP và số thẻ SRS.
   - Gợi ý lịch học tuần và tuỳ chỉnh phiên âm Latin, tốc độ âm thanh (0.75x / 1.0x).

2. **Module Luyện Chữ Hangul Toàn Diện (6 Chế Độ):**
   - **Bảng chữ cái tương tác (40 chữ):** Phụ âm cơ bản, phụ âm đôi, phụ âm bật hơi, nguyên âm cơ bản, nguyên âm ghép kèm phát âm bản xứ (Web Speech API) và từ vựng ví dụ.
   - **Thứ tự nét viết (Stroke Order):** Animation vẽ nét chuẩn SVG, kiểm soát tốc độ, từng nét một và quy tắc viết chuẩn.
   - **Viết tay trên Canvas:** Chế độ Tô theo & Tự viết với thuật toán chấm điểm 1–3 sao, nhận diện nét và phản hồi âm thanh.
   - **Gõ bàn phím 2-Beolsik:** Bàn phím ảo phát sáng phím tiếp theo, hỗ trợ gõ phím Latin thường tự chuyển sang Hangul (r -> ㄱ, k -> ㅏ), visualizer quá trình ghép âm theo thời gian thực, đo tốc độ gõ (WPM) và độ chính xác.
   - **Ghép âm tiết (Syllable Builder):** Kéo/chọn phụ âm đầu, nguyên âm, patchim với khung tự động đổi bố cục (dọc, ngang, có patchim) và giải thích quy tắc biến âm.
   - **Luyện nghe & Phát âm:** Luyện cặp âm dễ nhầm (ㄱ/ㄲ/ㅋ, ㄷ/ㄸ/ㅌ, ㅓ/ㅗ...), chép chính tả (Dictation) và ghi âm giọng nói đối chiếu với mẫu.

3. **Khoá Học Theo Nhu Cầu (Khoá $\rightarrow$ Chương $\rightarrow$ Bài học):**
   - Giai đoạn 1: Bảng chữ cái Hangul & Patchim.
   - Giai đoạn 2 (Sơ cấp 1): Chào hỏi, số đếm, mua sắm (`얼마예요?`), đồ ăn, đuôi câu `입니다/이에요/예요`.
   - Giai đoạn 3 (Sơ cấp 2): Quá khứ `았/었어요`, tiểu từ `은/는`, `이/가`, `을/를`, `에/에서`.
   - 3 cách học: Lộ trình tuần tự (mở khóa khi mini test $\ge 70\%$), theo chủ đề, theo kỹ năng.
   - Cấu trúc bài 7 bước chuẩn sư phạm: Mục tiêu, Từ vựng, Ngữ pháp, Hội thoại, Luyện tập nhanh, Mini test cuối bài, Tổng kết nhận XP & lưu vào flashcard.

4. **Flashcard & Hệ Thống Ôn Tập Ngắt Quãng (SRS):**
   - Thuật toán SM-2 (Quên, Khó, Được, Dễ) với lịch ôn khoa học.
   - 5 chế độ luyện: Lật thẻ, Trắc nghiệm, Gõ đáp án, Nghe, Ghép cặp 6x6 tính giờ.

5. **Kiểm Tra, Thi Thử & Sổ Tay Lỗi Sai:**
   - 4 loại đề: Mini test cuối bài, Test chương, Đề tự tạo theo nhu cầu, Thi thử TOPIK I (thang 200 điểm, dự đoán Cấp 1 / Cấp 2).
   - Xem lại bài làm: Đáp án đúng/sai, giải thích chi tiết bằng tiếng Việt, làm lại các câu sai, thêm vào flashcard.
   - Sổ tay lỗi sai (Mistake Notebook): Tự động gom lỗi, giải quyết sau 3 lần đúng liên tiếp, hỗ trợ in/xuất PDF.

6. **Gamification & Quản Trị (Admin):**
   - Điểm XP, Chuỗi ngày học (Streak) kèm Streak Freeze bảo vệ chuỗi, Bảng xếp hạng tuần, Từ vựng của ngày.
   - Admin Panel: Quản lý khoá học, từ vựng, ngân hàng câu hỏi, nhập CSV hàng loạt, thống kê học viên.

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** React 18, TypeScript, Tailwind CSS, Vite.
- **Biểu tượng & Giao diện:** Lucide React, Canvas Confetti.
- **Audio & TTS:** Web Speech API (`ko-KR`), Web Audio API Synthesizer (hiệu ứng âm thanh).
- **Phông chữ:** Noto Sans KR, Inter.

## 🚀 Cài Đặt & Chạy Ứng Dụng

```bash
# Cài đặt dependencies
npm install

# Khởi chạy môi trường phát triển (Dev Server)
npm run dev

# Đóng gói sản phẩm (Build Production)
npm run build

# Xem thử bản đóng gói
npm run preview
```
