import { Question } from '../types';

export const QUESTION_BANK: Question[] = [
  // DIAGNOSTIC ONBOARDING QUESTIONS
  {
    id: 'diag_1',
    type: 'multiple_choice',
    prompt: 'Chữ cái nào sau đây là nguyên âm "ㅏ" (a)?',
    options: ['ㅏ', 'ㅓ', 'ㅗ', 'ㅜ'],
    correctAnswer: 'ㅏ',
    explanation: 'ㅏ là nguyên âm "a" có nét dọc và nét gạch sang phải.',
    skill: 'hangul',
    difficulty: 'easy'
  },
  {
    id: 'diag_2',
    type: 'multiple_choice',
    prompt: 'Ghép phụ âm "ㄱ" và nguyên âm "ㅏ" ta được âm tiết nào?',
    options: ['가', '나', '다', '라'],
    correctAnswer: '가',
    explanation: 'ㄱ (k/g) + ㅏ (a) = 가 (ga/ka).',
    skill: 'hangul',
    difficulty: 'easy'
  },
  {
    id: 'diag_3',
    type: 'listen_choose',
    prompt: 'Bấm nghe âm thanh và chọn chữ cái tương ứng:',
    audioPrompt: '오',
    options: ['아', '어', '오', '우'],
    correctAnswer: '오',
    explanation: 'Âm thanh phát ra là "o" (chu tròn môi) tương ứng với chữ 오.',
    skill: 'listening',
    difficulty: 'easy'
  },
  {
    id: 'diag_4',
    type: 'multiple_choice',
    prompt: 'Từ "우유" trong tiếng Hàn có nghĩa là gì?',
    options: ['Cái cây', 'Sữa tươi', 'Dưa chuột', 'Con mèo'],
    correctAnswer: 'Sữa tươi',
    explanation: '우유 (u-yu) có nghĩa là sữa tươi.',
    skill: 'vocab',
    difficulty: 'easy'
  },
  {
    id: 'diag_5',
    type: 'multiple_choice',
    prompt: 'Câu chào thông dụng "안녕하세요" có nghĩa là gì?',
    options: ['Tạm biệt', 'Cảm ơn', 'Xin chào', 'Xin lỗi'],
    correctAnswer: 'Xin chào',
    explanation: '안녕하세요 là lời chào chuẩn mực trong tiếng Hàn.',
    skill: 'vocab',
    difficulty: 'easy'
  },
  {
    id: 'diag_6',
    type: 'fill_blank',
    prompt: 'Điền tiểu từ chủ đề vào chỗ trống: "저____ 학생입니다." (Tôi là học sinh)',
    options: ['은', '는', '이', '가'],
    correctAnswer: '는',
    explanation: '저 (tôi) không có phụ âm cuối (patchim) nên dùng "는".',
    skill: 'grammar',
    difficulty: 'medium'
  },
  {
    id: 'diag_7',
    type: 'multiple_choice',
    prompt: 'Đuôi câu nào thể hiện sự lịch sự thân mật khi nói "Tôi là người Việt Nam"?',
    options: ['베트남 사람이에요', '베트남 사람예요', '베트남 사람입니까', '베트남 사람'],
    correctAnswer: '베트남 사람이에요',
    explanation: '사람 có patchim ㅁ nên kết hợp với 이에요.',
    skill: 'grammar',
    difficulty: 'medium'
  },
  {
    id: 'diag_8',
    type: 'multiple_choice',
    prompt: 'Khi muốn hỏi "Cái này bao nhiêu tiền?", bạn nói thế nào?',
    options: ['이거 어디예요?', '이거 얼마예요?', '이거 누구예요?', '이거 언제예요?'],
    correctAnswer: '이거 얼마예요?',
    explanation: '얼마예요? mang nghĩa "Bao nhiêu tiền?".',
    skill: 'vocab',
    difficulty: 'medium'
  },
  {
    id: 'diag_9',
    type: 'fill_blank',
    prompt: 'Điền tiểu từ tân ngữ: "밥____ 먹어요." (Ăn cơm)',
    options: ['은', '는', '을', '를'],
    correctAnswer: '을',
    explanation: '밥 có patchim ㅂ nên dùng tiểu từ tân ngữ "을".',
    skill: 'grammar',
    difficulty: 'medium'
  },
  {
    id: 'diag_10',
    type: 'multiple_choice',
    prompt: 'Chia động từ "가다" (đi) ở thì quá khứ thân mật lịch sự:',
    options: ['갔어요', '가았어요', '가었어요', '가했어요'],
    correctAnswer: '갔어요',
    explanation: '가다 có nguyên âm ㅏ + 았어요 rút gọn thành 갔어요.',
    skill: 'grammar',
    difficulty: 'hard'
  },

  // LESSON MINI TEST 1: HANGUL BASICS
  {
    id: 'q_h1_1',
    type: 'multiple_choice',
    prompt: 'Nguyên âm nào là nguyên âm dọc trong các chữ sau?',
    options: ['ㅗ', 'ㅜ', 'ㅡ', 'ㅣ'],
    correctAnswer: 'ㅣ',
    explanation: 'ㅣ là nguyên âm dọc, luôn đứng ở bên phải phụ âm đầu.',
    skill: 'hangul',
    difficulty: 'easy',
    lessonId: 'l_hangul_1'
  },
  {
    id: 'q_h1_2',
    type: 'listen_choose',
    prompt: 'Bấm loa nghe và chọn nguyên âm đúng:',
    audioPrompt: '어',
    options: ['아', '어', '오', '우'],
    correctAnswer: '어',
    explanation: 'Âm thanh đọc là "eo" (ơ) tương ứng với chữ 어.',
    skill: 'listening',
    difficulty: 'easy',
    lessonId: 'l_hangul_1'
  },
  {
    id: 'q_h1_3',
    type: 'multiple_choice',
    prompt: 'Từ "오이" có nghĩa là gì?',
    options: ['Đứa trẻ', 'Dưa chuột', 'Sữa tươi', 'Cái cây'],
    correctAnswer: 'Dưa chuột',
    explanation: '오이 nghĩa là quả dưa chuột.',
    skill: 'vocab',
    difficulty: 'easy',
    lessonId: 'l_hangul_1'
  },
  {
    id: 'q_h1_4',
    type: 'multiple_choice',
    prompt: 'Trong chữ "아", chữ cái "ㅇ" đóng vai trò gì?',
    options: ['Phụ âm câm', 'Phát âm là "ng"', 'Là nguyên âm', 'Phát âm là "m"'],
    correctAnswer: 'Phụ âm câm',
    explanation: 'Khi đứng đầu âm tiết, "ㅇ" là phụ âm câm không phát ra tiếng.',
    skill: 'hangul',
    difficulty: 'easy',
    lessonId: 'l_hangul_1'
  },
  {
    id: 'q_h1_5',
    type: 'listen_type',
    prompt: 'Bấm nghe và gõ lại từ tiếng Hàn đơn giản này:',
    audioPrompt: '아이',
    options: [],
    correctAnswer: '아이',
    explanation: 'Từ phát âm là [a-i], viết là 아이 (đứa trẻ).',
    skill: 'listening',
    difficulty: 'easy',
    lessonId: 'l_hangul_1'
  },

  // LESSON MINI TEST 2: 14 BASIC CONSONANTS
  {
    id: 'q_h2_1',
    type: 'multiple_choice',
    prompt: 'Phụ âm nào phát âm giống "n" trong tiếng Việt?',
    options: ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ'],
    correctAnswer: 'ㄴ',
    explanation: 'ㄴ (nieun) đọc giống chữ "n" tiếng Việt.',
    skill: 'hangul',
    difficulty: 'easy',
    lessonId: 'l_hangul_2'
  },
  {
    id: 'q_h2_2',
    type: 'multiple_choice',
    prompt: 'Từ "나무" (na-mu) có nghĩa là gì?',
    options: ['Biển cả', 'Cái cây', 'Cái mũ', 'Cái chân'],
    correctAnswer: 'Cái cây',
    explanation: '나무 có nghĩa là cái cây.',
    skill: 'vocab',
    difficulty: 'easy',
    lessonId: 'l_hangul_2'
  },
  {
    id: 'q_h2_3',
    type: 'listen_choose',
    prompt: 'Nghe và chọn từ phát âm đúng:',
    audioPrompt: '바다',
    options: ['바다', '모자', '구두', '치마'],
    correctAnswer: '바다',
    explanation: 'Âm thanh phát âm là 바다 (ba-da: biển cả).',
    skill: 'listening',
    difficulty: 'medium',
    lessonId: 'l_hangul_2'
  },
  {
    id: 'q_h2_4',
    type: 'fill_blank',
    prompt: 'Hoàn thành từ "Cái mũ": ____자 (gợi ý: âm đầu m)',
    options: ['모', '노', '도', '보'],
    correctAnswer: '모',
    explanation: '모자 (mo-ja) là cái mũ.',
    skill: 'vocab',
    difficulty: 'medium',
    lessonId: 'l_hangul_2'
  },
  {
    id: 'q_h2_5',
    type: 'scramble_sentence',
    prompt: 'Sắp xếp các chữ cái để tạo thành từ "Cái váy" (치 - 마):',
    options: ['마', '치'],
    correctAnswer: '치,마',
    explanation: '치 + 마 = 치마 (cái váy).',
    skill: 'hangul',
    difficulty: 'easy',
    lessonId: 'l_hangul_2'
  },

  // LESSON MINI TEST 4: GREETINGS & SELF-INTRODUCTION
  {
    id: 'q_e1_1',
    type: 'fill_blank',
    prompt: 'Chọn đuôi câu trang trọng: 저는 베트남 사람____.',
    options: ['입니다', '입니까', '이에요', '예요'],
    correctAnswer: '입니다',
    explanation: 'Câu trần thuật trang trọng dùng "입니다".',
    skill: 'grammar',
    difficulty: 'easy',
    lessonId: 'l_elem_1'
  },
  {
    id: 'q_e1_2',
    type: 'multiple_choice',
    prompt: 'Từ nào có nghĩa là "Xin lỗi" trong môi trường lịch sự trang trọng?',
    options: ['감사합니다', '안녕하세요', '죄송합니다', '반갑습니다'],
    correctAnswer: '죄송합니다',
    explanation: '죄송합니다 (joe-song-ham-ni-da) là lời xin lỗi trang trọng.',
    skill: 'vocab',
    difficulty: 'easy',
    lessonId: 'l_elem_1'
  },
  {
    id: 'q_e1_3',
    type: 'fill_blank',
    prompt: 'Chọn tiểu từ chủ đề: "선생님____ 한국 사람입니다."',
    options: ['은', '는', '이', '가'],
    correctAnswer: '은',
    explanation: '선생님 có patchim ㅁ ở cuối nên kết hợp với "은".',
    skill: 'grammar',
    difficulty: 'medium',
    lessonId: 'l_elem_1'
  },
  {
    id: 'q_e1_4',
    type: 'listen_choose',
    prompt: 'Nghe đoạn hội thoại ngắn và chọn nghề nghiệp của người nói:',
    audioPrompt: '저는 회사원입니다.',
    options: ['Học sinh (학생)', 'Bác sĩ (의사)', 'Nhân viên công ty (회사원)', 'Giáo viên (선생님)'],
    correctAnswer: 'Nhân viên công ty (회사원)',
    explanation: 'Người nói nói: "저는 회사원입니다" (Tôi là nhân viên công ty).',
    skill: 'listening',
    difficulty: 'medium',
    lessonId: 'l_elem_1'
  },
  {
    id: 'q_e1_5',
    type: 'scramble_sentence',
    prompt: 'Sắp xếp các từ thành câu hoàn chỉnh: "Tôi là học sinh."',
    options: ['학생입니다.', '저는'],
    correctAnswer: '저는,학생입니다.',
    explanation: 'Cấu trúc câu tiếng Hàn: Chủ ngữ (저는) + Vị ngữ (학생입니다).',
    skill: 'grammar',
    difficulty: 'easy',
    lessonId: 'l_elem_1'
  },

  // LESSON MINI TEST 5: SHOPPING & PRICES
  {
    id: 'q_e2_1',
    type: 'multiple_choice',
    prompt: 'Khi muốn nói "Làm ơn cho tôi 2 quả táo", câu nào đúng?',
    options: ['사과 두 개 주세요.', '사과 두 개 얼마예요?', '사과 두 개 마셔요.', '사과 두 개 있어요.'],
    correctAnswer: '사과 두 개 주세요.',
    explanation: 'N + 주세요 nghĩa là "Làm ơn cho tôi N".',
    skill: 'grammar',
    difficulty: 'medium',
    lessonId: 'l_elem_2'
  },
  {
    id: 'q_e2_2',
    type: 'fill_blank',
    prompt: 'Điền đuôi câu thân mật lịch sự: "이거 얼마____?"',
    options: ['이에요', '예요', '입니다', '입니까'],
    correctAnswer: '예요',
    explanation: '얼마 không có patchim nên kết hợp với "예요".',
    skill: 'grammar',
    difficulty: 'medium',
    lessonId: 'l_elem_2'
  },
  {
    id: 'q_e2_3',
    type: 'multiple_choice',
    prompt: '"천 원" tương đương bao nhiêu Won?',
    options: ['100 Won', '1.000 Won', '10.000 Won', '100.000 Won'],
    correctAnswer: '1.000 Won',
    explanation: '천 (cheon) là 1.000 trong số Hán-Hàn.',
    skill: 'vocab',
    difficulty: 'easy',
    lessonId: 'l_elem_2'
  },

  // LESSON MINI TEST 6: PAST TENSE & OBJECT PARTICLES
  {
    id: 'q_e3_1',
    type: 'fill_blank',
    prompt: 'Điền tiểu từ thích hợp: "저는 음악____ 들어요." (Tôi nghe nhạc)',
    options: ['을', '를', '은', '는'],
    correctAnswer: '을',
    explanation: '음악 có patchim ㄱ nên đi với tiểu từ tân ngữ "을".',
    skill: 'grammar',
    difficulty: 'medium',
    lessonId: 'l_elem_3'
  },
  {
    id: 'q_e3_2',
    type: 'multiple_choice',
    prompt: 'Chia động từ "먹다" (ăn) ở thì quá khứ thân mật:',
    options: ['먹었어요', '먹았어요', '먹했어요', '먹습니다'],
    correctAnswer: '먹었어요',
    explanation: '먹다 có nguyên âm ㅓ (khác ㅏ/ㅗ) nên cộng với 었어요 → 먹었어요.',
    skill: 'grammar',
    difficulty: 'medium',
    lessonId: 'l_elem_3'
  },
  {
    id: 'q_e3_3',
    type: 'reading_passage',
    passage: '저는 어제 백화점에 갔어요. 백화점에서 옷을 샀어요. 그리고 친구를 만나서 같이 영화를 봤어요.',
    prompt: 'Người viết đã mua gì ở trung tâm thương mại?',
    options: ['Mua táo (사과)', 'Mua quần áo (옷)', 'Mua sách (책)', 'Mua dưa chuột (오이)'],
    correctAnswer: 'Mua quần áo (옷)',
    explanation: 'Trong bài có câu: "백화점에서 옷을 샀어요" (Tôi đã mua quần áo ở trung tâm thương mại).',
    skill: 'reading',
    difficulty: 'hard',
    lessonId: 'l_elem_3'
  }
];
