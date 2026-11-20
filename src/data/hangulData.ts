import { HangulLetter, ConfusingPair } from '../types';

export const HANGUL_LETTERS: HangulLetter[] = [
  // 14 Basic Consonants
  {
    id: 'g',
    char: 'ㄱ',
    name: '기역 (giyeok)',
    category: 'consonant_basic',
    ipa: 'k / g',
    vietnameseGuide: 'Phát âm nhẹ giữa "c/k" và "g". Đầu câu nghe như "k", giữa câu nghe như "g".',
    exampleWord: { hangul: '고양이', romanization: 'go-yang-i', vietnamese: 'Con mèo' },
    keyboardKey: 'r',
    strokes: [
      { id: 1, d: 'M 25 35 L 75 35 L 75 80', order: 1 }
    ]
  },
  {
    id: 'n',
    char: 'ㄴ',
    name: '니은 (nieun)',
    category: 'consonant_basic',
    ipa: 'n',
    vietnameseGuide: 'Giống chữ "n" trong tiếng Việt. Đầu lưỡi chạm vòm nướu trên.',
    exampleWord: { hangul: '나무', romanization: 'na-mu', vietnamese: 'Cái cây' },
    keyboardKey: 's',
    strokes: [
      { id: 1, d: 'M 30 25 L 30 75 L 75 75', order: 1 }
    ]
  },
  {
    id: 'd',
    char: 'ㄷ',
    name: '디귿 (digeut)',
    category: 'consonant_basic',
    ipa: 't / d',
    vietnameseGuide: 'Phát âm giữa "t" và "đ". Đầu câu hơi giống "t", giữa câu thành "đ".',
    exampleWord: { hangul: '다리', romanization: 'da-ri', vietnamese: 'Cái chân / Cây cầu' },
    keyboardKey: 'e',
    strokes: [
      { id: 1, d: 'M 30 30 L 75 30', order: 1 },
      { id: 2, d: 'M 30 30 L 30 75 L 75 75', order: 2 }
    ]
  },
  {
    id: 'r',
    char: 'ㄹ',
    name: '리을 (rieul)',
    category: 'consonant_basic',
    ipa: 'r / l',
    vietnameseGuide: 'Đầu âm tiết phát âm nhẹ như "r/l" rung nhẹ, ở phụ âm cuối (patchim) đọc uốn lưỡi "l".',
    exampleWord: { hangul: '라면', romanization: 'ra-myeon', vietnamese: 'Mì gói' },
    keyboardKey: 'f',
    strokes: [
      { id: 1, d: 'M 25 25 L 75 25 L 75 45 L 25 45', order: 1 },
      { id: 2, d: 'M 25 45 L 25 75 L 75 75', order: 2 }
    ]
  },
  {
    id: 'm',
    char: 'ㅁ',
    name: '미음 (mieum)',
    category: 'consonant_basic',
    ipa: 'm',
    vietnameseGuide: 'Giống chữ "m" tiếng Việt, hai môi khép lại.',
    exampleWord: { hangul: '물', romanization: 'mul', vietnamese: 'Nước' },
    keyboardKey: 'a',
    strokes: [
      { id: 1, d: 'M 25 25 L 25 75', order: 1 },
      { id: 2, d: 'M 25 25 L 75 25 L 75 75', order: 2 },
      { id: 3, d: 'M 25 75 L 75 75', order: 3 }
    ]
  },
  {
    id: 'b',
    char: 'ㅂ',
    name: '비읍 (bieup)',
    category: 'consonant_basic',
    ipa: 'p / b',
    vietnameseGuide: 'Phát âm giữa "p" và "b". Không bật hơi quá mạnh.',
    exampleWord: { hangul: '바다', romanization: 'ba-da', vietnamese: 'Biển' },
    keyboardKey: 'q',
    strokes: [
      { id: 1, d: 'M 30 25 L 30 75', order: 1 },
      { id: 2, d: 'M 70 25 L 70 75', order: 2 },
      { id: 3, d: 'M 30 50 L 70 50', order: 3 },
      { id: 4, d: 'M 30 75 L 70 75', order: 4 }
    ]
  },
  {
    id: 's',
    char: 'ㅅ',
    name: '시옷 (siot)',
    category: 'consonant_basic',
    ipa: 's / sh',
    vietnameseGuide: 'Giống chữ "s" nhẹ tiếng Việt. Khi gặp nguyên âm "ㅣ" hoặc "ㅑ,ㅕ,ㅛ,ㅠ" đọc thành "sh".',
    exampleWord: { hangul: '사과', romanization: 'sa-gwa', vietnamese: 'Quả táo' },
    keyboardKey: 't',
    strokes: [
      { id: 1, d: 'M 50 25 L 25 75', order: 1 },
      { id: 2, d: 'M 45 45 L 75 75', order: 2 }
    ]
  },
  {
    id: 'ng',
    char: 'ㅇ',
    name: '이응 (ieung)',
    category: 'consonant_basic',
    ipa: 'ng / silent',
    vietnameseGuide: 'Ở đầu âm tiết là phụ âm câm (không phát âm). Ở cuối âm tiết (patchim) đọc là "ng".',
    exampleWord: { hangul: '아기', romanization: 'a-gi', vietnamese: 'Em bé' },
    keyboardKey: 'd',
    strokes: [
      { id: 1, d: 'M 50 25 A 25 25 0 1 0 50 75 A 25 25 0 1 0 50 25', order: 1 }
    ]
  },
  {
    id: 'j',
    char: 'ㅈ',
    name: '지읒 (jieut)',
    category: 'consonant_basic',
    ipa: 'ch / j',
    vietnameseGuide: 'Phát âm giữa "ch" và "gi/d". Nhẹ nhàng không bật hơi.',
    exampleWord: { hangul: '지도', romanization: 'ji-do', vietnamese: 'Bản đồ' },
    keyboardKey: 'w',
    strokes: [
      { id: 1, d: 'M 25 30 L 75 30', order: 1 },
      { id: 2, d: 'M 50 30 L 30 75', order: 2 },
      { id: 3, d: 'M 50 30 L 70 75', order: 3 }
    ]
  },
  {
    id: 'ch',
    char: 'ㅊ',
    name: '치읓 (chieut)',
    category: 'consonant_aspirated',
    ipa: 'ch\'',
    vietnameseGuide: 'Âm bật hơi của ㅈ: phát âm "ch" đồng thời bật một luồng hơi mạnh ra miệng.',
    exampleWord: { hangul: '친구', romanization: 'chin-gu', vietnamese: 'Bạn bè' },
    keyboardKey: 'c',
    strokes: [
      { id: 1, d: 'M 40 20 L 60 20', order: 1 },
      { id: 2, d: 'M 25 35 L 75 35', order: 2 },
      { id: 3, d: 'M 50 35 L 30 75', order: 3 },
      { id: 4, d: 'M 50 35 L 70 75', order: 4 }
    ]
  },
  {
    id: 'k',
    char: 'ㅋ',
    name: '키읔 (kieuk)',
    category: 'consonant_aspirated',
    ipa: 'k\'',
    vietnameseGuide: 'Âm bật hơi của ㄱ: đọc như chữ "kh/k" bật luồng hơi mạnh từ cuống họng.',
    exampleWord: { hangul: '코', romanization: 'ko', vietnamese: 'Cái mũi' },
    keyboardKey: 'z',
    strokes: [
      { id: 1, d: 'M 25 25 L 75 25 L 75 75', order: 1 },
      { id: 2, d: 'M 25 50 L 75 50', order: 2 }
    ]
  },
  {
    id: 't',
    char: 'ㅌ',
    name: '티읕 (tieut)',
    category: 'consonant_aspirated',
    ipa: 't\'',
    vietnameseGuide: 'Âm bật hơi của ㄷ: đọc như chữ "th/t" bật luồng hơi mạnh.',
    exampleWord: { hangul: '토끼', romanization: 'to-kki', vietnamese: 'Con thỏ' },
    keyboardKey: 'x',
    strokes: [
      { id: 1, d: 'M 25 25 L 75 25', order: 1 },
      { id: 2, d: 'M 25 50 L 70 50', order: 2 },
      { id: 3, d: 'M 25 25 L 25 75 L 75 75', order: 3 }
    ]
  },
  {
    id: 'p',
    char: 'ㅍ',
    name: '피읖 (pieup)',
    category: 'consonant_aspirated',
    ipa: 'p\'',
    vietnameseGuide: 'Âm bật hơi của ㅂ: mím môi rồi bật luồng hơi mạnh ra như chữ "p" tiếng Pháp.',
    exampleWord: { hangul: '포도', romanization: 'po-do', vietnamese: 'Chùm nho' },
    keyboardKey: 'v',
    strokes: [
      { id: 1, d: 'M 25 30 L 75 30', order: 1 },
      { id: 2, d: 'M 40 30 L 40 70', order: 2 },
      { id: 3, d: 'M 60 30 L 60 70', order: 3 },
      { id: 4, d: 'M 25 70 L 75 70', order: 4 }
    ]
  },
  {
    id: 'h',
    char: 'ㅎ',
    name: '히읗 (hieut)',
    category: 'consonant_basic',
    ipa: 'h',
    vietnameseGuide: 'Giống chữ "h" trong tiếng Việt. Nhẹ nhàng thở ra từ cổ họng.',
    exampleWord: { hangul: '하늘', romanization: 'ha-neul', vietnamese: 'Bầu trời' },
    keyboardKey: 'g',
    strokes: [
      { id: 1, d: 'M 45 20 L 55 20', order: 1 },
      { id: 2, d: 'M 25 35 L 75 35', order: 2 },
      { id: 3, d: 'M 50 45 A 20 20 0 1 0 50 85 A 20 20 0 1 0 50 45', order: 3 }
    ]
  },

  // 5 Double Consonants
  {
    id: 'kk',
    char: 'ㄲ',
    name: '쌍기역 (ssang-giyeok)',
    category: 'consonant_double',
    ipa: 'k*',
    vietnameseGuide: 'Âm căng của ㄱ: gồng cơ hầu họng, không bật hơi, phát âm giòn đanh như "c/k" nặng.',
    exampleWord: { hangul: '꼬리', romanization: 'kko-ri', vietnamese: 'Cái đuôi' },
    keyboardKey: 'R',
    strokes: [
      { id: 1, d: 'M 20 35 L 45 35 L 45 75', order: 1 },
      { id: 2, d: 'M 55 35 L 80 35 L 80 75', order: 2 }
    ]
  },
  {
    id: 'tt',
    char: 'ㄸ',
    name: '쌍디귿 (ssang-digeut)',
    category: 'consonant_double',
    ipa: 't*',
    vietnameseGuide: 'Âm căng của ㄷ: nén hơi ở đầu lưỡi rồi phát âm dứt khoát như "t" cứng.',
    exampleWord: { hangul: '딸기', romanization: 'ttal-gi', vietnamese: 'Quả dâu tây' },
    keyboardKey: 'E',
    strokes: [
      { id: 1, d: 'M 15 30 L 45 30 M 15 30 L 15 75 L 45 75', order: 1 },
      { id: 2, d: 'M 55 30 L 85 30 M 55 30 L 55 75 L 85 75', order: 2 }
    ]
  },
  {
    id: 'pp',
    char: 'ㅃ',
    name: '쌍비읍 (ssang-bieup)',
    category: 'consonant_double',
    ipa: 'p*',
    vietnameseGuide: 'Âm căng của ㅂ: mím chặt môi, nén hơi rồi bật ra đanh gọn như "p" dứt khoát.',
    exampleWord: { hangul: '빵', romanization: 'ppang', vietnamese: 'Bánh mì' },
    keyboardKey: 'Q',
    strokes: [
      { id: 1, d: 'M 20 25 L 20 75 M 45 25 L 45 75', order: 1 },
      { id: 2, d: 'M 55 25 L 55 75 M 80 25 L 80 75', order: 2 }
    ]
  },
  {
    id: 'ss',
    char: 'ㅆ',
    name: '쌍시옷 (ssang-siot)',
    category: 'consonant_double',
    ipa: 's*',
    vietnameseGuide: 'Âm căng của ㅅ: nén hơi qua kẽ răng, phát âm như "x" mạnh dứt khoát.',
    exampleWord: { hangul: '싸다', romanization: 'ssa-da', vietnamese: 'Rẻ (giá)' },
    keyboardKey: 'T',
    strokes: [
      { id: 1, d: 'M 35 25 L 15 75 M 30 45 L 45 75', order: 1 },
      { id: 2, d: 'M 70 25 L 50 75 M 65 45 L 85 75', order: 2 }
    ]
  },
  {
    id: 'jj',
    char: 'ㅉ',
    name: '쌍지읒 (ssang-jieut)',
    category: 'consonant_double',
    ipa: 'ch*',
    vietnameseGuide: 'Âm căng của ㅈ: khép răng nén hơi rồi bật ra gọn như "ch" nặng dứt khoát.',
    exampleWord: { hangul: '짜다', romanization: 'jja-da', vietnamese: 'Mặn' },
    keyboardKey: 'W',
    strokes: [
      { id: 1, d: 'M 15 30 L 45 30 M 30 30 L 15 75 M 30 30 L 45 75', order: 1 },
      { id: 2, d: 'M 55 30 L 85 30 M 70 30 L 55 75 M 70 30 L 85 75', order: 2 }
    ]
  },

  // 10 Basic Vowels
  {
    id: 'a',
    char: 'ㅏ',
    name: '아 (a)',
    category: 'vowel_basic',
    ipa: 'a',
    vietnameseGuide: 'Đọc như "a" trong tiếng Việt. Nét dọc trước, nét ngang sang phải sau.',
    exampleWord: { hangul: '아이', romanization: 'a-i', vietnamese: 'Đứa trẻ' },
    keyboardKey: 'k',
    strokes: [
      { id: 1, d: 'M 40 20 L 40 80', order: 1 },
      { id: 2, d: 'M 40 50 L 70 50', order: 2 }
    ]
  },
  {
    id: 'ya',
    char: 'ㅑ',
    name: '야 (ya)',
    category: 'vowel_basic',
    ipa: 'ya',
    vietnameseGuide: 'Đọc lướt nhanh từ "i" sang "a" → "da/ya". 2 nét ngang chỉ hướng phải.',
    exampleWord: { hangul: '야구', romanization: 'ya-gu', vietnamese: 'Bóng chày' },
    keyboardKey: 'i',
    strokes: [
      { id: 1, d: 'M 40 20 L 40 80', order: 1 },
      { id: 2, d: 'M 40 40 L 70 40', order: 2 },
      { id: 3, d: 'M 40 60 L 70 60', order: 3 }
    ]
  },
  {
    id: 'eo',
    char: 'ㅓ',
    name: '어 (eo)',
    category: 'vowel_basic',
    ipa: 'ʌ / ɔ',
    vietnameseGuide: 'Mở miệng dọc tự nhiên, phát âm như "ơ" hoặc giữa "ơ" và "o".',
    exampleWord: { hangul: '어머니', romanization: 'eo-meo-ni', vietnamese: 'Mẹ' },
    keyboardKey: 'j',
    strokes: [
      { id: 1, d: 'M 30 50 L 60 50', order: 1 },
      { id: 2, d: 'M 60 20 L 60 80', order: 2 }
    ]
  },
  {
    id: 'yeo',
    char: 'ㅕ',
    name: '여 (yeo)',
    category: 'vowel_basic',
    ipa: 'jʌ',
    vietnameseGuide: 'Lướt nhanh từ "i" sang "ơ" → "dơ/yeo". 2 nét ngang sang trái.',
    exampleWord: { hangul: '여자', romanization: 'yeo-ja', vietnamese: 'Phụ nữ' },
    keyboardKey: 'u',
    strokes: [
      { id: 1, d: 'M 30 40 L 60 40', order: 1 },
      { id: 2, d: 'M 30 60 L 60 60', order: 2 },
      { id: 3, d: 'M 60 20 L 60 80', order: 3 }
    ]
  },
  {
    id: 'o',
    char: 'ㅗ',
    name: '오 (o)',
    category: 'vowel_basic',
    ipa: 'o',
    vietnameseGuide: 'Chu tròn môi, phát âm giống "ô" tiếng Việt. Nét dọc hướng lên trên.',
    exampleWord: { hangul: '오이', romanization: 'o-i', vietnamese: 'Dưa chuột' },
    keyboardKey: 'h',
    strokes: [
      { id: 1, d: 'M 50 25 L 50 55', order: 1 },
      { id: 2, d: 'M 20 55 L 80 55', order: 2 }
    ]
  },
  {
    id: 'yo',
    char: 'ㅛ',
    name: '요 (yo)',
    category: 'vowel_basic',
    ipa: 'jo',
    vietnameseGuide: 'Lướt nhanh từ "i" sang "ô" → "yo". Hai nét dọc hướng lên.',
    exampleWord: { hangul: '요리', romanization: 'yo-ri', vietnamese: 'Nấu ăn / Món ăn' },
    keyboardKey: 'y',
    strokes: [
      { id: 1, d: 'M 40 25 L 40 55', order: 1 },
      { id: 2, d: 'M 60 25 L 60 55', order: 2 },
      { id: 3, d: 'M 20 55 L 80 55', order: 3 }
    ]
  },
  {
    id: 'u',
    char: 'ㅜ',
    name: '우 (u)',
    category: 'vowel_basic',
    ipa: 'u',
    vietnameseGuide: 'Chu môi tròn hướng ra trước, đọc giống "u" tiếng Việt. Nét dọc chỉ xuống dưới.',
    exampleWord: { hangul: '우유', romanization: 'u-yu', vietnamese: 'Sữa tươi' },
    keyboardKey: 'n',
    strokes: [
      { id: 1, d: 'M 20 40 L 80 40', order: 1 },
      { id: 2, d: 'M 50 40 L 50 75', order: 2 }
    ]
  },
  {
    id: 'yu',
    char: 'ㅠ',
    name: '유 (yu)',
    category: 'vowel_basic',
    ipa: 'ju',
    vietnameseGuide: 'Lướt nhanh từ "i" sang "u" → "yu". Hai nét dọc chỉ xuống dưới.',
    exampleWord: { hangul: '유리', romanization: 'yu-ri', vietnamese: 'Thủy tinh / Kính' },
    keyboardKey: 'b',
    strokes: [
      { id: 1, d: 'M 20 40 L 80 40', order: 1 },
      { id: 2, d: 'M 40 40 L 40 75', order: 2 },
      { id: 3, d: 'M 60 40 L 60 75', order: 3 }
    ]
  },
  {
    id: 'eu',
    char: 'ㅡ',
    name: '으 (eu)',
    category: 'vowel_basic',
    ipa: 'ɯ',
    vietnameseGuide: 'Kéo nhẹ khóe miệng sang hai bên, phát âm như "ư" tiếng Việt.',
    exampleWord: { hangul: '은행', romanization: 'eun-haeng', vietnamese: 'Ngân hàng' },
    keyboardKey: 'm',
    strokes: [
      { id: 1, d: 'M 20 50 L 80 50', order: 1 }
    ]
  },
  {
    id: 'i',
    char: 'ㅣ',
    name: '이 (i)',
    category: 'vowel_basic',
    ipa: 'i',
    vietnameseGuide: 'Đọc giống "i" tiếng Việt. Một nét sổ dọc từ trên xuống dưới.',
    exampleWord: { hangul: '이름', romanization: 'i-reum', vietnamese: 'Tên' },
    keyboardKey: 'l',
    strokes: [
      { id: 1, d: 'M 50 20 L 50 80', order: 1 }
    ]
  },

  // 11 Compound Vowels
  {
    id: 'ae',
    char: 'ㅐ',
    name: '애 (ae)',
    category: 'vowel_compound',
    ipa: 'ɛ',
    vietnameseGuide: 'Ghép ㅏ + ㅣ. Phát âm giống "e/me" tiếng Việt, mở miệng vừa phải.',
    exampleWord: { hangul: '새', romanization: 'sae', vietnamese: 'Con chim' },
    keyboardKey: 'o',
    strokes: [
      { id: 1, d: 'M 35 25 L 35 75', order: 1 },
      { id: 2, d: 'M 35 50 L 65 50', order: 2 },
      { id: 3, d: 'M 65 25 L 65 75', order: 3 }
    ]
  },
  {
    id: 'yae',
    char: 'ㅒ',
    name: '얘 (yae)',
    category: 'vowel_compound',
    ipa: 'jɛ',
    vietnameseGuide: 'Ghép ㅑ + ㅣ. Đọc lướt nhanh từ "i" sang "e" → "ye".',
    exampleWord: { hangul: '얘기', romanization: 'yae-gi', vietnamese: 'Câu chuyện' },
    keyboardKey: 'O',
    strokes: [
      { id: 1, d: 'M 35 25 L 35 75', order: 1 },
      { id: 2, d: 'M 35 40 L 65 40', order: 2 },
      { id: 3, d: 'M 35 60 L 65 60', order: 3 },
      { id: 4, d: 'M 65 25 L 65 75', order: 4 }
    ]
  },
  {
    id: 'e',
    char: 'ㅔ',
    name: '에 (e)',
    category: 'vowel_compound',
    ipa: 'e',
    vietnameseGuide: 'Ghép ㅓ + ㅣ. Phát âm giống "ê" tiếng Việt (trong giao tiếp hiện đại ㅐ và ㅔ nghe gần như nhau).',
    exampleWord: { hangul: '베개', romanization: 'be-gae', vietnamese: 'Cái gối' },
    keyboardKey: 'p',
    strokes: [
      { id: 1, d: 'M 35 50 L 55 50', order: 1 },
      { id: 2, d: 'M 35 25 L 35 75', order: 2 },
      { id: 3, d: 'M 65 25 L 65 75', order: 3 }
    ]
  },
  {
    id: 'ye',
    char: 'ㅖ',
    name: '예 (ye)',
    category: 'vowel_compound',
    ipa: 'je',
    vietnameseGuide: 'Ghép ㅕ + ㅣ. Lướt từ "i" sang "ê" → "yê".',
    exampleWord: { hangul: '예술', romanization: 'ye-sul', vietnamese: 'Nghệ thuật' },
    keyboardKey: 'P',
    strokes: [
      { id: 1, d: 'M 35 40 L 55 40', order: 1 },
      { id: 2, d: 'M 35 60 L 55 60', order: 2 },
      { id: 3, d: 'M 35 25 L 35 75', order: 3 },
      { id: 4, d: 'M 65 25 L 65 75', order: 4 }
    ]
  },
  {
    id: 'wa',
    char: 'ㅘ',
    name: '와 (wa)',
    category: 'vowel_compound',
    ipa: 'wa',
    vietnameseGuide: 'Ghép ㅗ + ㅏ. Chu môi đọc nhanh "oa/wa".',
    exampleWord: { hangul: '과자', romanization: 'gwa-ja', vietnamese: 'Bánh kẹo' },
    keyboardKey: 'hk',
    strokes: [
      { id: 1, d: 'M 40 25 L 40 50 M 20 50 L 60 50', order: 1 },
      { id: 2, d: 'M 70 25 L 70 75 M 70 50 L 85 50', order: 2 }
    ]
  },
  {
    id: 'wae',
    char: 'ㅙ',
    name: '왜 (wae)',
    category: 'vowel_compound',
    ipa: 'wɛ',
    vietnameseGuide: 'Ghép ㅗ + ㅐ. Đọc lướt nhanh "oe/we" (nghĩa là "Tại sao?").',
    exampleWord: { hangul: '왜', romanization: 'wae', vietnamese: 'Tại sao' },
    keyboardKey: 'ho',
    strokes: [
      { id: 1, d: 'M 30 25 L 30 50 M 15 50 L 45 50', order: 1 },
      { id: 2, d: 'M 55 25 L 55 75 M 55 50 L 75 50 M 75 25 L 75 75', order: 2 }
    ]
  },
  {
    id: 'oe',
    char: 'ㅚ',
    name: '외 (oe)',
    category: 'vowel_compound',
    ipa: 'we / ø',
    vietnameseGuide: 'Ghép ㅗ + ㅣ. Người Hàn hiện đại phát âm giống "we" (uê).',
    exampleWord: { hangul: '외국', romanization: 'oe-guk', vietnamese: 'Nước ngoài' },
    keyboardKey: 'hl',
    strokes: [
      { id: 1, d: 'M 40 25 L 40 50 M 20 50 L 60 50', order: 1 },
      { id: 2, d: 'M 70 25 L 70 75', order: 2 }
    ]
  },
  {
    id: 'wo',
    char: 'ㅝ',
    name: '워 (wo)',
    category: 'vowel_compound',
    ipa: 'wʌ',
    vietnameseGuide: 'Ghép ㅜ + ㅓ. Chu môi rồi lướt sang "ơ" → "uơ/wo".',
    exampleWord: { hangul: '원', romanization: 'won', vietnamese: 'Đồng Won (tiền Hàn)' },
    keyboardKey: 'nj',
    strokes: [
      { id: 1, d: 'M 20 40 L 60 40 M 40 40 L 40 70', order: 1 },
      { id: 2, d: 'M 60 50 L 80 50 M 80 25 L 80 75', order: 2 }
    ]
  },
  {
    id: 'we',
    char: 'ㅞ',
    name: '웨 (we)',
    category: 'vowel_compound',
    ipa: 'we',
    vietnameseGuide: 'Ghép ㅜ + ㅔ. Đọc giống "uê/we".',
    exampleWord: { hangul: '웨딩', romanization: 'we-ding', vietnamese: 'Đám cưới' },
    keyboardKey: 'np',
    strokes: [
      { id: 1, d: 'M 20 40 L 60 40 M 40 40 L 40 70', order: 1 },
      { id: 2, d: 'M 60 50 L 75 50 M 60 25 L 60 75 M 85 25 L 85 75', order: 2 }
    ]
  },
  {
    id: 'wi',
    char: 'ㅟ',
    name: '위 (wi)',
    category: 'vowel_compound',
    ipa: 'wi / y',
    vietnameseGuide: 'Ghép ㅜ + ㅣ. Đọc lướt nhanh từ "u" sang "i" → "uy/wi".',
    exampleWord: { hangul: '위', romanization: 'wi', vietnamese: 'Phía trên / Dạ dày' },
    keyboardKey: 'nl',
    strokes: [
      { id: 1, d: 'M 20 40 L 60 40 M 40 40 L 40 70', order: 1 },
      { id: 2, d: 'M 75 25 L 75 75', order: 2 }
    ]
  },
  {
    id: 'ui',
    char: 'ㅢ',
    name: '의 (ui)',
    category: 'vowel_compound',
    ipa: 'ɰi',
    vietnameseGuide: 'Ghép ㅡ + ㅣ. Đọc lướt từ "ư" sang "i" → "ưi". Khi là trợ từ sở hữu đọc là "ê" (e).',
    exampleWord: { hangul: '의사', romanization: 'ui-sa', vietnamese: 'Bác sĩ' },
    keyboardKey: 'ml',
    strokes: [
      { id: 1, d: 'M 20 50 L 60 50', order: 1 },
      { id: 2, d: 'M 75 25 L 75 75', order: 2 }
    ]
  }
];

export const CONFUSING_PAIRS: ConfusingPair[] = [
  {
    id: 'pair_g_kk_k',
    title: 'Bộ ba âm vòm họng: ㄱ - ㄲ - ㅋ',
    charA: 'ㄱ',
    charB: 'ㄲ',
    charC: 'ㅋ',
    explanation: 'ㄱ là âm thường (nhẹ, hơi xì nhẹ), ㄲ là âm căng (nén cơ họng, giòn đanh không thoát khí), ㅋ là âm bật hơi (thổi luồng khí mạnh từ họng).',
    practiceWords: [
      { hangul: '가다', meaning: 'Đi', targetChar: 'ㄱ' },
      { hangul: '까다', meaning: 'Bóc vỏ', targetChar: 'ㄲ' },
      { hangul: '카메라', meaning: 'Máy ảnh', targetChar: 'ㅋ' }
    ]
  },
  {
    id: 'pair_d_tt_t',
    title: 'Bộ ba âm đầu lưỡi: ㄷ - ㄸ - ㅌ',
    charA: 'ㄷ',
    charB: 'ㄸ',
    charC: 'ㅌ',
    explanation: 'ㄷ là âm thường (t/đ nhẹ), ㄸ là âm căng (chặn hơi đầu lưỡi nén lại dứt khoát), ㅌ là âm bật hơi (bật luồng gió mạnh).',
    practiceWords: [
      { hangul: '달다', meaning: 'Ngọt', targetChar: 'ㄷ' },
      { hangul: '딸기', meaning: 'Dâu tây', targetChar: 'ㄸ' },
      { hangul: '탈', meaning: 'Mặt nạ', targetChar: 'ㅌ' }
    ]
  },
  {
    id: 'pair_b_pp_p',
    title: 'Bộ ba âm môi: ㅂ - ㅃ - ㅍ',
    charA: 'ㅂ',
    charB: 'ㅃ',
    charC: 'ㅍ',
    explanation: 'ㅂ là âm thường (b/p), ㅃ là âm căng (mím chặt môi nén hơi giòn tan), ㅍ là âm bật hơi (bật tung luồng khí qua hai môi).',
    practiceWords: [
      { hangul: '방', meaning: 'Căn phòng', targetChar: 'ㅂ' },
      { hangul: '빵', meaning: 'Bánh mì', targetChar: 'ㅃ' },
      { hangul: '파', meaning: 'Hành lá', targetChar: 'ㅍ' }
    ]
  },
  {
    id: 'pair_eo_o',
    title: 'Cặp nguyên âm dễ nhầm: ㅓ (eo) vs ㅗ (o)',
    charA: 'ㅓ',
    charB: 'ㅗ',
    explanation: 'ㅓ mở rộng miệng theo chiều dọc tự nhiên (như "ơ"), còn ㅗ phải chu tròn môi lại như huýt sáo (như "ô").',
    practiceWords: [
      { hangul: '어머니', meaning: 'Mẹ (ㅓ)', targetChar: 'ㅓ' },
      { hangul: '오빠', meaning: 'Anh trai (ㅗ)', targetChar: 'ㅗ' }
    ]
  },
  {
    id: 'pair_ae_e',
    title: 'Cặp nguyên âm tương đồng: ㅐ (ae) vs ㅔ (e)',
    charA: 'ㅐ',
    charB: 'ㅔ',
    explanation: 'Trong tiếng Hàn hiện đại, hai âm này phát âm gần như tương đương (e/ê). Chú ý chính tả từ vựng để viết chính xác!',
    practiceWords: [
      { hangul: '개', meaning: 'Con chó (ㅐ)', targetChar: 'ㅐ' },
      { hangul: '게', meaning: 'Con cua (ㅔ)', targetChar: 'ㅔ' }
    ]
  },
  {
    id: 'pair_eu_u',
    title: 'Cặp nguyên âm căng miệng: ㅡ (eu) vs ㅜ (u)',
    charA: 'ㅡ',
    charB: 'ㅜ',
    explanation: 'ㅡ kéo dẹt môi sang hai bên (ư), trong khi ㅜ phải chu tròn môi đẩy ra ngoài (u).',
    practiceWords: [
      { hangul: '음식', meaning: 'Món ăn (ㅡ)', targetChar: 'ㅡ' },
      { hangul: '우산', meaning: 'Cái ô (ㅜ)', targetChar: 'ㅜ' }
    ]
  }
];
