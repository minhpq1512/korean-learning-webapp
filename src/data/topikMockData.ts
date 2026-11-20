import { Question } from '../types';

export const TOPIK_MOCK_QUESTIONS: Question[] = [
  // PHẦN NGHE (LISTENING SECTION)
  {
    id: 'topik_l_1',
    type: 'listen_choose',
    prompt: '[Câu 1 - Nghe] Nghe và chọn câu đáp lại phù hợp nhất:',
    audioPrompt: '안녕히 계세요.',
    options: [
      '네, 안녕히 가세요.',
      '네, 반갑습니다.',
      '네, 죄송합니다.',
      '네, 괜찮습니다.'
    ],
    correctAnswer: '네, 안녕히 가세요.',
    explanation: 'Khi người rời đi chào người ở lại "안녕히 계세요" (Ở lại bình an nhé), người ở lại sẽ đáp "안녕히 가세요" (Đi về bình an nhé).',
    skill: 'listening',
    difficulty: 'easy'
  },
  {
    id: 'topik_l_2',
    type: 'listen_choose',
    prompt: '[Câu 2 - Nghe] Người nói đang ở đâu?',
    audioPrompt: '손님, 어떤 커피 드릴까요? 아메리카노 한 잔 주세요.',
    options: [
      '카페 (Quán cà phê)',
      '병원 (Bệnh viện)',
      '공항 (Sân bay)',
      '은행 (Ngân hàng)'
    ],
    correctAnswer: '카페 (Quán cà phê)',
    explanation: 'Từ khóa "커피 드릴까요" (uống cà phê gì) và "아메리카노" (Americano) cho thấy địa điểm là quán cà phê.',
    skill: 'listening',
    difficulty: 'medium'
  },
  {
    id: 'topik_l_3',
    type: 'listen_choose',
    prompt: '[Câu 3 - Nghe] Hai người đang nói về chủ đề gì?',
    audioPrompt: '오늘 날씨가 정말 덥네요. 네, 비도 많이 와요.',
    options: [
      '날씨 (Thời tiết)',
      '음식 (Món ăn)',
      '취미 (Sở thích)',
      '주말 (Cuối tuần)'
    ],
    correctAnswer: '날씨 (Thời tiết)',
    explanation: 'Từ khóa "날씨" (thời tiết), "덥네요" (nóng thế), "비" (mưa) nói về thời tiết.',
    skill: 'listening',
    difficulty: 'medium'
  },
  {
    id: 'topik_l_4',
    type: 'listen_choose',
    prompt: '[Câu 4 - Nghe] Hành động tiếp theo của người phụ nữ là gì?',
    audioPrompt: '회의 자료 다 준비했어요? 아니요, 지금 복사하러 가요.',
    options: [
      'Đi photo tài liệu (복사하러 가요)',
      'Bắt đầu cuộc họp (회의를 시작해요)',
      'Đi ăn trưa (점심을 먹어요)',
      'Về nhà (집에 가요)'
    ],
    correctAnswer: 'Đi photo tài liệu (복사하러 가요)',
    explanation: 'Người phụ nữ nói: "지금 복사하러 가요" (Bây giờ tôi đi photo tài liệu đây).',
    skill: 'listening',
    difficulty: 'medium'
  },
  {
    id: 'topik_l_5',
    type: 'listen_choose',
    prompt: '[Câu 5 - Nghe] Nghe và chọn nội dung ĐÚNG với đoạn hội thoại:',
    audioPrompt: '민수 씨, 이번 주말에 약속 있어요? 토요일에 친구 결혼식이 있어서 부산에 가요.',
    options: [
      'Min-soo đi Busan vào thứ Bảy dự đám cưới bạn.',
      'Min-soo ở nhà vào cuối tuần.',
      'Min-soo đi du lịch đảo Jeju.',
      'Min-soo kết hôn vào tuần này.'
    ],
    correctAnswer: 'Min-soo đi Busan vào thứ Bảy dự đám cưới bạn.',
    explanation: 'Min-soo nói: "토요일에 친구 결혼식이 있어서 부산에 가요" (Thứ Bảy có đám cưới bạn nên tôi đi Busan).',
    skill: 'listening',
    difficulty: 'hard'
  },

  // PHẦN ĐỌC (READING SECTION)
  {
    id: 'topik_r_1',
    type: 'multiple_choice',
    prompt: '[Câu 6 - Đọc] Chọn từ thích hợp điền vào chỗ trống:',
    passage: '저는 아침에 일찍 일어납니다. 그리고 물을 _____.',
    options: ['마십니다', '입습니다', '봅니다', '읽습니다'],
    correctAnswer: '마십니다',
    explanation: 'Danh từ là 물 (nước) nên động từ đi kèm là 마시다 (uống) → 마십니다.',
    skill: 'reading',
    difficulty: 'easy'
  },
  {
    id: 'topik_r_2',
    type: 'multiple_choice',
    prompt: '[Câu 7 - Đọc] Đoạn văn sau đây nói về cái gì?',
    passage: '이것은 아주 달콤합니다. 빨간색이고 봄에 많이 먹습니다.',
    options: [
      '딸기 (Quả dâu tây)',
      '오이 (Dưa chuột)',
      '우유 (Sữa tươi)',
      '바지 (Quần)'
    ],
    correctAnswer: '딸기 (Quả dâu tây)',
    explanation: 'Miêu tả: 달콤합니다 (ngọt ngào), 빨간색 (màu đỏ), 봄에 많이 먹습니다 (ăn nhiều vào mùa xuân) → 딸기 (dâu tây).',
    skill: 'reading',
    difficulty: 'medium'
  },
  {
    id: 'topik_r_3',
    type: 'fill_blank',
    prompt: '[Câu 8 - Đọc] Điền cặp tiểu từ chính xác vào câu:',
    passage: '어제 도서관_____ 책_____ 빌렸어요.',
    options: [
      '에서 / 을',
      '에 / 를',
      '에서 / 이',
      '으로 / 은'
    ],
    correctAnswer: '에서 / 을',
    explanation: 'Nơi diễn ra hành động mượn sách dùng "에서", và 책 (sách có patchim) là tân ngữ dùng "을".',
    skill: 'grammar',
    difficulty: 'medium'
  },
  {
    id: 'topik_r_4',
    type: 'reading_passage',
    passage: '한국의 겨울은 많이 춥습니다. 눈이 많이 오고 바람이 붑니다. 하지만 저는 겨울을 좋아합니다. 눈사람을 만들 수 있고 스키장에 갈 수 있기 때문입니다.',
    prompt: '[Câu 9 - Đọc] Tại sao tác giả thích mùa đông ở Hàn Quốc?',
    options: [
      'Vì có thể đắp người tuyết và đi trượt tuyết.',
      'Vì trời ấm áp nhiều nắng.',
      'Vì được ăn nhiều kem dâu.',
      'Vì không có tuyết rơi.'
    ],
    correctAnswer: 'Vì có thể đắp người tuyết và đi trượt tuyết.',
    explanation: 'Câu cuối: "눈사람을 만들 수 있고 스키장에 갈 수 있기 때문입니다" (Vì có thể làm người tuyết và đi sân trượt tuyết).',
    skill: 'reading',
    difficulty: 'medium'
  },
  {
    id: 'topik_r_5',
    type: 'reading_passage',
    passage: '【안내문】 도서관 이용 시간 안내\n평일: 오전 9시 ~ 오후 9시\n주말: 오전 10시 ~ 오후 6시\n* 매주 월요일은 쉽니다. 책은 1인당 5권까지 빌릴 수 있습니다.',
    prompt: '[Câu 10 - Đọc] Chọn thông tin ĐÚNG với thông báo trên:',
    options: [
      'Thư viện đóng cửa vào thứ Hai hàng tuần.',
      'Cuối tuần thư viện mở cửa lúc 9 giờ sáng.',
      'Mỗi người có thể mượn tối đa 10 quyển sách.',
      'Ngày thường thư viện đóng cửa lúc 6 giờ tối.'
    ],
    correctAnswer: 'Thư viện đóng cửa vào thứ Hai hàng tuần.',
    explanation: 'Thông báo ghi rõ: "매주 월요일은 쉽니다" (Mỗi thứ Hai hàng tuần nghỉ đóng cửa).',
    skill: 'reading',
    difficulty: 'hard'
  }
];
