import { Chapter } from '../types';

export const COURSES_DATA: Chapter[] = [
  // STAGE 1: HANGUL
  {
    id: 'ch_hangul_1',
    stage: 1,
    stageName: 'Giai đoạn 1 – Nhập môn Hangul',
    title: 'Chương 1: Bảng Chữ Cái & Nguyên Tắc Ghép Âm',
    description: 'Nắm vững 14 phụ âm cơ bản, 10 nguyên âm cơ bản và cấu trúc một âm tiết trong 1 tuần.',
    testId: 'test_ch_1',
    lessons: [
      {
        id: 'l_hangul_1',
        chapterId: 'ch_hangul_1',
        stage: 1,
        order: 1,
        title: 'Bài 1: 10 Nguyên âm cơ bản (ㅏ, ㅓ, ㅗ, ㅜ, ㅡ, ㅣ...)',
        objective: 'Nhận diện mặt chữ, đọc đúng khẩu hình 10 nguyên âm cơ bản và viết đúng thứ tự nét.',
        topics: ['hangul_basics'],
        skills: ['hangul', 'reading', 'listening'],
        isUnlocked: true,
        isCompleted: true,
        miniTestId: 'mini_test_hangul_1',
        vocabularies: [
          { id: 'v_h1_1', hangul: '아이', romanization: 'a-i', meaning: 'Đứa trẻ', partOfSpeech: 'Danh từ', exampleSentence: '아이가 귀여워요.', exampleMeaning: 'Đứa trẻ thật dễ thương.' },
          { id: 'v_h1_2', hangul: '오이', romanization: 'o-i', meaning: 'Dưa chuột', partOfSpeech: 'Danh từ', exampleSentence: '오이를 먹어요.', exampleMeaning: 'Ăn dưa chuột.' },
          { id: 'v_h1_3', hangul: '우유', romanization: 'u-yu', meaning: 'Sữa tươi', partOfSpeech: 'Danh từ', exampleSentence: '우유를 마셔요.', exampleMeaning: 'Uống sữa.' },
          { id: 'v_h1_4', hangul: '여우', romanization: 'yeo-u', meaning: 'Con cáo', partOfSpeech: 'Danh từ', exampleSentence: '여우가 빨라요.', exampleMeaning: 'Con cáo chạy nhanh.' },
          { id: 'v_h1_5', hangul: '이유', romanization: 'i-yu', meaning: 'Lý do', partOfSpeech: 'Danh từ', exampleSentence: '이유가 뭐예요?', exampleMeaning: 'Lý do là gì thế?' }
        ],
        grammars: [
          {
            id: 'g_h1_1',
            title: 'Quy tắc nét viết nguyên âm',
            formula: 'Từ trên xuống dưới, từ trái sang phải',
            explanation: 'Nguyên âm dọc (ㅏ, ㅓ, ㅣ) đứng bên phải phụ âm câm ㅇ. Nguyên âm ngang (ㅗ, ㅜ, ㅡ) nằm bên dưới phụ âm câm ㅇ.',
            examples: [
              { hangul: 'ㅇ + ㅏ = 아', meaning: 'Đọc là [a]' },
              { hangul: 'ㅇ + ㅗ = 오', meaning: 'Đọc là [o]' }
            ],
            commonMistakes: 'Người Việt hay nhầm giữa ㅓ (mở miệng dọc như ơ) và ㅗ (chu tròn môi như ô).'
          }
        ],
        dialogue: [
          { id: 'd_h1_1', speaker: 'Minh', hangul: '이게 뭐예요?', romanization: 'I-ge mwo-ye-yo?', vietnamese: 'Cái này là cái gì?' },
          { id: 'd_h1_2', speaker: 'Ji-eun', hangul: '우유예요. 우유 드세요.', romanization: 'U-yu-ye-yo. U-yu deu-se-yo.', vietnamese: 'Là sữa tươi. Mời bạn uống sữa.' }
        ],
        quickPractices: [
          {
            id: 'qp_h1_1',
            type: 'choose_correct',
            prompt: 'Chữ nào dưới đây có cách phát âm là [o] (chu tròn môi)?',
            options: ['ㅏ', 'ㅓ', 'ㅗ', 'ㅜ'],
            correctAnswer: 'ㅗ',
            explanation: 'ㅗ phát âm là "o/ô" với khẩu hình môi chu tròn.'
          },
          {
            id: 'qp_h1_2',
            type: 'choose_correct',
            prompt: 'Từ "우유" (Sữa) gồm những nguyên âm nào kết hợp với phụ âm câm ㅇ?',
            options: ['ㅗ và ㅛ', 'ㅜ và ㅠ', 'ㅡ và ㅣ', 'ㅏ và ㅓ'],
            correctAnswer: 'ㅜ và ㅠ',
            explanation: '우 = ㅇ + ㅜ, 유 = ㅇ + ㅠ.'
          }
        ]
      },
      {
        id: 'l_hangul_2',
        chapterId: 'ch_hangul_1',
        stage: 1,
        order: 2,
        title: 'Bài 2: 14 Phụ âm cơ bản & Ghép âm tiết',
        objective: 'Thuộc 14 phụ âm cơ bản (ㄱ, ㄴ, ㄷ, ㄹ...) và tự ghép thành âm tiết hoàn chỉnh.',
        topics: ['hangul_basics'],
        skills: ['hangul', 'vocab', 'listening'],
        isUnlocked: true,
        isCompleted: false,
        miniTestId: 'mini_test_hangul_2',
        vocabularies: [
          { id: 'v_h2_1', hangul: '나무', romanization: 'na-mu', meaning: 'Cái cây', partOfSpeech: 'Danh từ', exampleSentence: '큰 나무가 있어요.', exampleMeaning: 'Có một cái cây to.' },
          { id: 'v_h2_2', hangul: '바다', romanization: 'ba-da', meaning: 'Biển cả', partOfSpeech: 'Danh từ', exampleSentence: '바다에 가고 싶어요.', exampleMeaning: 'Tôi muốn đi biển.' },
          { id: 'v_h2_3', hangul: '구두', romanization: 'gu-du', meaning: 'Giày tây', partOfSpeech: 'Danh từ', exampleSentence: '새 구두를 샀어요.', exampleMeaning: 'Tôi đã mua đôi giày mới.' },
          { id: 'v_h2_4', hangul: '모자', romanization: 'mo-ja', meaning: 'Cái mũ', partOfSpeech: 'Danh từ', exampleSentence: '모자가 예뻐요.', exampleMeaning: 'Cái mũ đẹp quá.' },
          { id: 'v_h2_5', hangul: '치마', romanization: 'chi-ma', meaning: 'Cái váy', partOfSpeech: 'Danh từ', exampleSentence: '치마를 입어요.', exampleMeaning: 'Mặc váy.' }
        ],
        grammars: [
          {
            id: 'g_h2_1',
            title: 'Quy tắc ghép phụ âm đầu + nguyên âm',
            formula: 'Phụ âm đầu (Chosung) + Nguyên âm (Jungsung)',
            explanation: 'Một âm tiết tiếng Hàn luôn bắt đầu bằng 1 phụ âm. Nếu không có âm phụ âm đầu thì bắt buộc phải viết phụ âm câm "ㅇ".',
            examples: [
              { hangul: 'ㄴ + ㅏ = 나', meaning: 'Tôi / ta (na)' },
              { hangul: 'ㅁ + ㅜ = 무', meaning: 'Củ cải (mu)' }
            ],
            commonMistakes: 'Viết thiếu phụ âm câm ㅇ khi âm tiết bắt đầu bằng nguyên âm (viết ㅏ thay vì 아 là sai chính tả).'
          }
        ],
        dialogue: [
          { id: 'd_h2_1', speaker: 'Linh', hangul: '어디에 가요?', romanization: 'Eo-di-e ga-yo?', vietnamese: 'Bạn đi đâu thế?' },
          { id: 'd_h2_2', speaker: 'Min-ho', hangul: '바다에 가요.', romanization: 'Ba-da-e ga-yo.', vietnamese: 'Tôi đi biển.' }
        ],
        quickPractices: [
          {
            id: 'qp_h2_1',
            type: 'choose_correct',
            prompt: 'Âm tiết nào được ghép từ phụ âm "ㅂ" và nguyên âm "ㅏ"?',
            options: ['나', '다', '바', '마'],
            correctAnswer: '바',
            explanation: 'ㅂ (b) + ㅏ (a) = 바 (ba).'
          }
        ]
      },
      {
        id: 'l_hangul_3',
        chapterId: 'ch_hangul_1',
        stage: 1,
        order: 3,
        title: 'Bài 3: Patchim (Phụ âm cuối) & Nối âm',
        objective: 'Nắm vững 7 cách đọc đại diện của phụ âm cuối (patchim) và quy tắc nối âm cơ bản.',
        topics: ['hangul_basics', 'topik_prep'],
        skills: ['hangul', 'listening', 'reading'],
        isUnlocked: false,
        isCompleted: false,
        miniTestId: 'mini_test_hangul_3',
        vocabularies: [
          { id: 'v_h3_1', hangul: '한국', romanization: 'han-guk', meaning: 'Hàn Quốc', partOfSpeech: 'Danh từ', exampleSentence: '한국에 살아요.', exampleMeaning: 'Tôi sống ở Hàn Quốc.' },
          { id: 'v_h3_2', hangul: '사람', romanization: 'sa-ram', meaning: 'Người', partOfSpeech: 'Danh từ', exampleSentence: '좋은 사람이에요.', exampleMeaning: 'Là một người tốt.' },
          { id: 'v_h3_3', hangul: '선생님', romanization: 'seon-saeng-nim', meaning: 'Thầy/Cô giáo', partOfSpeech: 'Danh từ', exampleSentence: '선생님, 안녕하세요!', exampleMeaning: 'Chào thầy cô!' },
          { id: 'v_h3_4', hangul: '밥', romanization: 'bap', meaning: 'Cơm / Bữa ăn', partOfSpeech: 'Danh từ', exampleSentence: '밥을 먹었어요?', exampleMeaning: 'Bạn đã ăn cơm chưa?' },
          { id: 'v_h3_5', hangul: '물', romanization: 'mul', meaning: 'Nước uống', partOfSpeech: 'Danh từ', exampleSentence: '물 좀 주세요.', exampleMeaning: 'Cho tôi xin chút nước.' }
        ],
        grammars: [
          {
            id: 'g_h3_1',
            title: '7 Âm đại diện của Patchim',
            formula: 'ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ',
            explanation: 'Dù tiếng Hàn có nhiều phụ âm cuối đơn và đôi, khi phát âm chỉ rút lại thành 7 âm chính.',
            examples: [
              { hangul: '옷 (áo) có patchim ㅅ', meaning: 'Đọc theo âm đại diện [ㄷ] → [옫]' },
              { hangul: '꽃 (hoa) có patchim ㅊ', meaning: 'Đọc theo âm đại diện [ㄷ] → [꼳]' }
            ],
            commonMistakes: 'Quên nối âm khi từ sau bắt đầu bằng ㅇ: 한국어 đọc là [한구거], không đọc tách rời [한-국-어].'
          }
        ],
        dialogue: [
          { id: 'd_h3_1', speaker: 'Mai', hangul: '한국어 공부해요?', romanization: 'Han-gu-geo gong-bu-hae-yo?', vietnamese: 'Bạn học tiếng Hàn à?' },
          { id: 'd_h3_2', speaker: 'Ji-hoon', hangul: '네, 한국어가 재미있어요.', romanization: 'Ne, han-gu-geo-ga jae-mi-i-sseo-yo.', vietnamese: 'Vâng, tiếng Hàn thú vị lắm.' }
        ],
        quickPractices: [
          {
            id: 'qp_h3_1',
            type: 'choose_correct',
            prompt: 'Từ "한국어" (Tiếng Hàn) khi phát âm theo quy tắc nối âm sẽ đọc thành gì?',
            options: ['[한국어]', '[한구거]', '[항국어]', '[한구어]'],
            correctAnswer: '[한구거]',
            explanation: 'Patchim ㄱ của 국 gặp nguyên âm 어 bắt đầu bằng ㅇ câm → nối thành [한구거].'
          }
        ]
      }
    ]
  },

  // STAGE 2: SƠ CẤP 1
  {
    id: 'ch_elementary_1',
    stage: 2,
    stageName: 'Giai đoạn 2 – Sơ cấp 1',
    title: 'Chương 2: Giao Tiếp Cơ Bản & Cuộc Sống Thường Ngày',
    description: 'Tự tin chào hỏi, giới thiệu bản thân, đếm số tiền, mua sắm đồ ăn bằng đuôi câu ครับ/어요.',
    testId: 'test_ch_2',
    lessons: [
      {
        id: 'l_elem_1',
        chapterId: 'ch_elementary_1',
        stage: 2,
        order: 1,
        title: 'Bài 4: Chào hỏi & Giới thiệu bản thân (입니다 / 입니까?)',
        objective: 'Tự giới thiệu tên, quốc tịch, nghề nghiệp bằng đuôi câu trang trọng 입니다.',
        topics: ['work', 'tourism', 'kpop'],
        skills: ['grammar', 'vocab', 'listening', 'reading'],
        isUnlocked: true,
        isCompleted: false,
        miniTestId: 'mini_test_elem_1',
        vocabularies: [
          { id: 'v_e1_1', hangul: '안녕하세요', romanization: 'an-nyeong-ha-se-yo', meaning: 'Xin chào', partOfSpeech: 'Câu chào', exampleSentence: '안녕하세요! 저는 마이입니다.', exampleMeaning: 'Xin chào! Tôi là Mai.' },
          { id: 'v_e1_2', hangul: '감사합니다', romanization: 'gam-sa-ham-ni-da', meaning: 'Xin cảm ơn', partOfSpeech: 'Thành ngữ', exampleSentence: '도와주셔서 감사합니다.', exampleMeaning: 'Cảm ơn bạn đã giúp đỡ.' },
          { id: 'v_e1_3', hangul: '죄송합니다', romanization: 'joe-song-ham-ni-da', meaning: 'Xin lỗi', partOfSpeech: 'Thành ngữ', exampleSentence: '늦어서 죄송합니다.', exampleMeaning: 'Tôi xin lỗi vì đến muộn.' },
          { id: 'v_e1_4', hangul: '베트남', romanization: 'be-teu-nam', meaning: 'Việt Nam', partOfSpeech: 'Danh từ', exampleSentence: '저는 베트남 사람입니다.', exampleMeaning: 'Tôi là người Việt Nam.' },
          { id: 'v_e1_5', hangul: '회사원', romanization: 'hoe-sa-won', meaning: 'Nhân viên công ty', partOfSpeech: 'Danh từ', exampleSentence: '저는 회사원입니다.', exampleMeaning: 'Tôi là nhân viên công ty.' },
          { id: 'v_e1_6', hangul: '학생', romanization: 'hak-saeng', meaning: 'Học sinh / sinh viên', partOfSpeech: 'Danh từ', exampleSentence: '동생은 학생입니다.', exampleMeaning: 'Em tôi là học sinh.' }
        ],
        grammars: [
          {
            id: 'g_e1_1',
            title: 'Đuôi câu khẳng định & nghi vấn trang trọng: N + 입니다 / 입니까?',
            formula: 'Danh từ (N) + 입니다 (là N) / 입니까? (là N phải không?)',
            explanation: 'Dùng trong môi trường trang trọng, gặp gỡ lần đầu, công sở, phỏng vấn xin việc.',
            examples: [
              { hangul: '저는 베트남 사람입니다.', meaning: 'Tôi là người Việt Nam.' },
              { hangul: '어느 나라 사람입니까?', meaning: 'Bạn là người nước nào?' }
            ],
            commonMistakes: 'Phát âm chữ 입니다 là [임니다] (quy tắc biến âm mũi ㅂ + ㄴ → ㅁ).'
          },
          {
            id: 'g_e1_2',
            title: 'Tiểu từ chủ đề: N + 은/는',
            formula: 'N có patchim + 은 | N không patchim + 는',
            explanation: 'Đánh dấu chủ đề muốn nói đến trong câu ("về phần...", "còn...").',
            examples: [
              { hangul: '저는 학생입니다.', meaning: 'Tôi là học sinh (저 không patchim + 는).' },
              { hangul: '선생님은 한국 사람입니다.', meaning: 'Thầy giáo là người Hàn Quốc (선생님 có patchim + 은).' }
            ],
            commonMistakes: 'Nhầm lẫn giữa 은 và 는 khi chọn theo patchim của danh từ đứng trước.'
          }
        ],
        dialogue: [
          { id: 'd_e1_1', speaker: 'Tuấn', hangul: '안녕하십니까? 저는 응우옌 민 뚜안입니다.', romanization: 'An-nyeong-ha-sim-ni-kka? Jeo-neun Nguyen Min Tuan-im-ni-da.', vietnamese: 'Kính chào bạn! Tôi là Nguyễn Minh Tuấn.' },
          { id: 'd_e1_2', speaker: 'Kim Jin-woo', hangul: '반갑습니다, 뚜안 씨. 저는 김진우입니다. 회사원입니까?', romanization: 'Ban-gap-seum-ni-da, Tuan ssi. Jeo-neun Kim Jin-woo-im-ni-da. Hoe-sa-won-im-ni-kka?', vietnamese: 'Rất vui được gặp anh Tuấn. Tôi là Kim Jin-woo. Anh là nhân viên công ty phải không?' },
          { id: 'd_e1_3', speaker: 'Tuấn', hangul: '네, 저는 회사원입니다.', romanization: 'Ne, jeo-neun hoe-sa-won-im-ni-da.', vietnamese: 'Vâng, tôi là nhân viên công ty.' }
        ],
        quickPractices: [
          {
            id: 'qp_e1_1',
            type: 'choose_correct',
            prompt: 'Điền tiểu từ đúng: "저____ 베트남 사람입니다."',
            options: ['은', '는', '이', '가'],
            correctAnswer: '는',
            explanation: 'Danh từ "저" (tôi) không có patchim nên kết hợp với "는".'
          },
          {
            id: 'qp_e1_2',
            type: 'choose_correct',
            prompt: 'Dạng câu hỏi tương ứng của "학생입니다" là gì?',
            options: ['학생이에요?', '학생입니까?', '학생입니다?', '학생인가요?'],
            correctAnswer: '학생입니까?',
            explanation: 'Đuôi nghi vấn trang trọng của 입니다 là 입니까?.'
          }
        ]
      },
      {
        id: 'l_elem_2',
        chapterId: 'ch_elementary_1',
        stage: 2,
        order: 2,
        title: 'Bài 5: Mua sắm & Hỏi giá tiền (얼마예요? · …주세요)',
        objective: 'Đếm tiền Won, hỏi giá cả khi đi du lịch và gọi món/đồ bằng mẫu câu 주세요.',
        topics: ['tourism', 'fun'],
        skills: ['vocab', 'speaking', 'listening'],
        isUnlocked: true,
        isCompleted: false,
        miniTestId: 'mini_test_elem_2',
        vocabularies: [
          { id: 'v_e2_1', hangul: '얼마예요?', romanization: 'eol-ma-ye-yo?', meaning: 'Bao nhiêu tiền thế?', partOfSpeech: 'Câu hỏi', exampleSentence: '이 사과 얼마예요?', exampleMeaning: 'Quả táo này bao nhiêu tiền ạ?' },
          { id: 'v_e2_2', hangul: '주세요', romanization: 'ju-se-yo', meaning: 'Làm ơn cho tôi...', partOfSpeech: 'Động từ', exampleSentence: '물 좀 주세요.', exampleMeaning: 'Cho tôi xin nước với.' },
          { id: 'v_e2_3', hangul: '이거 / 그거 / 저거', romanization: 'i-geo / geu-geo / jeo-geo', meaning: 'Cái này / Cái đó / Cái kia', partOfSpeech: 'Đại từ', exampleSentence: '이거 얼마예요?', exampleMeaning: 'Cái này bao nhiêu tiền?' },
          { id: 'v_e2_4', hangul: '원', romanization: 'won', meaning: 'Đồng Won (tiền Hàn)', partOfSpeech: 'Đơn vị', exampleSentence: '천 원이에요.', exampleMeaning: 'Là 1,000 Won.' },
          { id: 'v_e2_5', hangul: '비싸다 / 싸다', romanization: 'bi-ssa-da / ssa-da', meaning: 'Đắt / Rẻ', partOfSpeech: 'Tính từ', exampleSentence: '조금 비싸요.', exampleMeaning: 'Hơi đắt một chút.' },
          { id: 'v_e2_6', hangul: '깎아 주세요', romanization: 'kka-kka ju-se-yo', meaning: 'Bớt cho tôi một chút', partOfSpeech: 'Mẫu câu', exampleSentence: '너무 비싸요. 좀 깎아 주세요.', exampleMeaning: 'Đắt quá. Bớt cho tôi chút đi.' }
        ],
        grammars: [
          {
            id: 'g_e2_1',
            title: 'Đuôi câu thân mật lịch sự: N + 이에요 / 예요',
            formula: 'N có patchim + 이에요 | N không patchim + 예요',
            explanation: 'Dùng trong sinh hoạt đời thường, nói chuyện với bạn bè, người quen, khi đi mua sắm.',
            examples: [
              { hangul: '얼마예요? → 만 원이에요.', meaning: 'Bao nhiêu tiền? → Là 10.000 Won (원 có patchim + 이에요).' },
              { hangul: '사과예요.', meaning: 'Là quả táo (사과 không patchim + 예요).' }
            ],
            commonMistakes: 'Quên chia 이에요 khi danh từ có patchim (nói 만 원예요 là sai).'
          },
          {
            id: 'g_e2_2',
            title: 'Yêu cầu lịch sự: N + 주세요',
            formula: 'Danh từ + 주세요 (Cho tôi / bán cho tôi N)',
            explanation: 'Câu thần chú cứu cánh số 1 cho người đi du lịch Hàn Quốc khi gọi món hay mua hàng.',
            examples: [
              { hangul: '커피 한 잔 주세요.', meaning: 'Cho tôi một ly cà phê.' },
              { hangul: '이거 두 개 주세요.', meaning: 'Cho tôi 2 cái này.' }
            ],
            commonMistakes: 'Dùng sai từ chỉ đơn vị đếm (chén/ly là 잔, cái là 개).'
          }
        ],
        dialogue: [
          { id: 'd_e2_1', speaker: 'Hương', hangul: '사장님, 이 사과 얼마예요?', romanization: 'Sa-jang-nim, i sa-gwa eol-ma-ye-yo?', vietnamese: 'Bác ơi, quả táo này bao nhiêu tiền ạ?' },
          { id: 'd_e2_2', speaker: 'Người bán', hangul: '한 개에 천오백 원이에요.', romanization: 'Han gae-e cheon-o-baek won-i-e-yo.', vietnamese: '1.500 Won một quả cháu nhé.' },
          { id: 'd_e2_3', speaker: 'Hương', hangul: '세 개 주세요.', romanization: 'Se gae ju-se-yo.', vietnamese: 'Bán cho cháu ba quả ạ.' }
        ],
        quickPractices: [
          {
            id: 'qp_e2_1',
            type: 'choose_correct',
            prompt: 'Khi muốn nói "Cho tôi nước", bạn nói câu nào?',
            options: ['물이에요.', '물 얼마예요?', '물 주세요.', '물 마셔요.'],
            correctAnswer: '물 주세요.',
            explanation: '주세요 mang nghĩa "hãy cho tôi...".'
          }
        ]
      }
    ]
  },

  // STAGE 3: SƠ CẤP 2 & TOPIK I
  {
    id: 'ch_elementary_2',
    stage: 3,
    stageName: 'Giai đoạn 3 – Sơ cấp 2 & TOPIK I',
    title: 'Chương 3: Ngữ Pháp TOPIK I & Thì Thời',
    description: 'Nắm chắc các thì quá khứ/tương lai, các cặp tiểu từ quan trọng 은/는 vs 이/가, 을/를, 에 vs 에서.',
    testId: 'test_ch_3',
    lessons: [
      {
        id: 'l_elem_3',
        chapterId: 'ch_elementary_2',
        stage: 3,
        order: 1,
        title: 'Bài 6: Tiểu từ Tân ngữ (을/를) & Thì Quá khứ (았/었어요)',
        objective: 'Nói được câu hoàn chỉnh có tân ngữ hành động và kể về chuyện đã làm trong quá khứ.',
        topics: ['topik_prep', 'media'],
        skills: ['grammar', 'reading', 'writing'],
        isUnlocked: true,
        isCompleted: false,
        miniTestId: 'mini_test_elem_3',
        vocabularies: [
          { id: 'v_e3_1', hangul: '어제', romanization: 'eo-je', meaning: 'Hôm qua', partOfSpeech: 'Danh từ', exampleSentence: '어제 영화를 봤어요.', exampleMeaning: 'Hôm qua tôi đã xem phim.' },
          { id: 'v_e3_2', hangul: '영화', romanization: 'yeong-hwa', meaning: 'Bộ phim', partOfSpeech: 'Danh từ', exampleSentence: '한국 영화가 재미있어요.', exampleMeaning: 'Phim Hàn Quốc hay lắm.' },
          { id: 'v_e3_3', hangul: '친구', romanization: 'chin-gu', meaning: 'Bạn bè', partOfSpeech: 'Danh từ', exampleSentence: '친구를 만났어요.', exampleMeaning: 'Tôi đã gặp bạn.' },
          { id: 'v_e3_4', hangul: '음식', romanization: 'eum-sik', meaning: 'Món ăn / Đồ ăn', partOfSpeech: 'Danh từ', exampleSentence: '한국 음식을 좋아해요.', exampleMeaning: 'Tôi thích đồ ăn Hàn Quốc.' },
          { id: 'v_e3_5', hangul: '공부하다', romanization: 'gong-bu-ha-da', meaning: 'Học tập', partOfSpeech: 'Động từ', exampleSentence: '도서관에서 공부했어요.', exampleMeaning: 'Tôi đã học ở thư viện.' }
        ],
        grammars: [
          {
            id: 'g_e3_1',
            title: 'Tiểu từ tân ngữ: N + 을/를',
            formula: 'N có patchim + 을 | N không patchim + 를',
            explanation: 'Gắn sau danh từ chỉ đối tượng chịu tác động của hành động.',
            examples: [
              { hangul: '밥을 먹어요.', meaning: 'Ăn cơm (밥 có patchim + 을).' },
              { hangul: '영화를 봐요.', meaning: 'Xem phim (영화 không patchim + 를).' }
            ],
            commonMistakes: 'Bỏ quên tiểu từ tân ngữ trong bài thi viết TOPIK I.'
          },
          {
            id: 'g_e3_2',
            title: 'Thì Quá khứ: V/A + 았/었어요 / 했어요',
            formula: 'Nguyên âm cuối là ㅏ/ㅗ → + 았어요 | Các nguyên âm khác → + 었어요 | 하다 → 했어요',
            explanation: 'Diễn tả hành động hoặc trạng thái đã hoàn thành trong quá khứ.',
            examples: [
              { hangul: '만나다 → 만났어요', meaning: 'Đã gặp' },
              { hangul: '먹다 → 먹었어요', meaning: 'Đã ăn' },
              { hangul: '공부하다 → 공부했어요', meaning: 'Đã học' }
            ],
            commonMistakes: 'Nhầm lẫn khi chia động từ 하다 (phải chuyển thành 했어요, không nói 하었어요).'
          }
        ],
        dialogue: [
          { id: 'd_e3_1', speaker: 'Hà', hangul: '어제 뭐 했어요?', romanization: 'Eo-je mwo hae-sseo-yo?', vietnamese: 'Hôm qua bạn đã làm gì thế?' },
          { id: 'd_e3_2', speaker: 'Soo-jin', hangul: '친구를 만났어요. 그리고 같이 한국 음식을 먹었어요.', romanization: 'Chin-gu-reul man-na-sseo-yo. Geu-ri-go gat-i han-guk eum-sig-eul meo-geo-sseo-yo.', vietnamese: 'Mình đã gặp bạn. Và tụi mình cùng nhau ăn đồ ăn Hàn Quốc.' }
        ],
        quickPractices: [
          {
            id: 'qp_e3_1',
            type: 'choose_correct',
            prompt: 'Điền tiểu từ thích hợp: "저는 사과____ 좋아해요."',
            options: ['은', '는', '을', '를'],
            correctAnswer: '를',
            explanation: '사과 (quả táo) là tân ngữ chịu tác động của động từ thích (좋아해요) và không có patchim nên đi với 를.'
          },
          {
            id: 'qp_e3_2',
            type: 'choose_correct',
            prompt: 'Chia động từ "보다" (xem) sang thì quá khứ thân mật lịch sự:',
            options: ['보았어요 / 봤어요', '보었어요', '보했어요', '봅니다'],
            correctAnswer: '보았어요 / 봤어요',
            explanation: '보다 có nguyên âm ㅗ nên kết hợp với 았어요 → ghép tắt thành 봤어요.'
          }
        ]
      }
    ]
  }
];
