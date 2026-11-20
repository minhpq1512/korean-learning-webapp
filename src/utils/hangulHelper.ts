// 2-Beolsik Layout and Hangul Unicode Utilities

export const CHOSUNG = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

export const JUNGSUNG = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
  'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
];

export const JONGSUNG = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
  'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

// QWERTY to 2-Beolsik Mapping
export const KEYBOARD_MAP: Record<string, string> = {
  q: 'ㅂ', Q: 'ㅃ',
  w: 'ㅈ', W: 'ㅉ',
  e: 'ㄷ', E: 'ㄸ',
  r: 'ㄱ', R: 'ㄲ',
  t: 'ㅅ', T: 'ㅆ',
  y: 'ㅛ', Y: 'ㅛ',
  u: 'ㅕ', U: 'ㅕ',
  i: 'ㅑ', I: 'ㅑ',
  o: 'ㅐ', O: 'ㅒ',
  p: 'ㅔ', P: 'ㅖ',
  a: 'ㅁ', A: 'ㅁ',
  s: 'ㄴ', S: 'ㄴ',
  d: 'ㅇ', D: 'ㅇ',
  f: 'ㄹ', F: 'ㄹ',
  g: 'ㅎ', G: 'ㅎ',
  h: 'ㅗ', H: 'ㅗ',
  j: 'ㅓ', J: 'ㅓ',
  k: 'ㅏ', K: 'ㅏ',
  l: 'ㅣ', L: 'ㅣ',
  z: 'ㅋ', Z: 'ㅋ',
  x: 'ㅌ', X: 'ㅌ',
  c: 'ㅊ', C: 'ㅊ',
  v: 'ㅍ', V: 'ㅍ',
  b: 'ㅠ', B: 'ㅠ',
  n: 'ㅜ', N: 'ㅜ',
  m: 'ㅡ', M: 'ㅡ',
};

// Check if character is a Hangul syllable
export function isHangulSyllable(char: string): boolean {
  if (!char || char.length === 0) return false;
  const code = char.charCodeAt(0);
  return code >= 0xAC00 && code <= 0xD7A3;
}

// Decompose Hangul syllable
export function decomposeHangul(char: string): { initial: string; vowel: string; final: string } | null {
  if (!isHangulSyllable(char)) return null;
  const code = char.charCodeAt(0) - 0xAC00;
  const jongIdx = code % 28;
  const jungIdx = Math.floor((code - jongIdx) / 28) % 21;
  const choIdx = Math.floor(Math.floor((code - jongIdx) / 28) / 21);

  return {
    initial: CHOSUNG[choIdx] || '',
    vowel: JUNGSUNG[jungIdx] || '',
    final: JONGSUNG[jongIdx] || '',
  };
}

// Compose Chosung, Jungsung, and Jongsung
export function composeHangul(initial: string, vowel: string, final = ''): string {
  const choIdx = CHOSUNG.indexOf(initial);
  const jungIdx = JUNGSUNG.indexOf(vowel);
  const jongIdx = JONGSUNG.indexOf(final);

  if (choIdx === -1 || jungIdx === -1) {
    return initial + vowel + final;
  }

  const code = 0xAC00 + (choIdx * 21 + jungIdx) * 28 + (jongIdx >= 0 ? jongIdx : 0);
  return String.fromCharCode(code);
}

// Check vowel orientation for syllable block layout
export function getVowelLayout(vowel: string): 'vertical' | 'horizontal' | 'mixed' {
  if (['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅣ', 'ㅐ', 'ㅒ', 'ㅔ', 'ㅖ'].includes(vowel)) {
    return 'vertical'; // Side by side
  }
  if (['ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ'].includes(vowel)) {
    return 'horizontal'; // Top and bottom
  }
  return 'mixed'; // Both (e.g. ㅘ, ㅙ, ㅚ, ㅝ, ㅞ, ㅟ, ㅢ)
}

// Simple simulator for typing buffer
export function assembleJamoSequence(jamos: string[]): string {
  let result = '';
  let cho = '';
  let jung = '';
  let jong = '';

  for (const j of jamos) {
    if (CHOSUNG.includes(j) && !jung) {
      if (cho) {
        result += cho;
      }
      cho = j;
    } else if (JUNGSUNG.includes(j)) {
      if (cho && !jong) {
        jung = j;
      } else if (jong) {
        // Vowel after patchim: patchim moves to next syllable!
        const prevSyllable = composeHangul(cho, jung);
        result += prevSyllable;
        cho = jong;
        jung = j;
        jong = '';
      } else {
        result += (cho || '') + j;
        cho = '';
        jung = '';
      }
    } else if (JONGSUNG.includes(j) && cho && jung) {
      if (!jong) {
        jong = j;
      } else {
        // Double patchim or start new syllable
        result += composeHangul(cho, jung, jong);
        cho = j;
        jung = '';
        jong = '';
      }
    } else {
      if (cho && jung) {
        result += composeHangul(cho, jung, jong);
      } else if (cho) {
        result += cho;
      }
      result += j;
      cho = '';
      jung = '';
      jong = '';
    }
  }

  if (cho && jung) {
    result += composeHangul(cho, jung, jong);
  } else if (cho) {
    result += cho;
  }

  return result;
}

// Pronunciation rules explanation database
export const PHONETIC_RULES = [
  {
    name: 'Quy tắc nối âm (연음법칙 - Liaison)',
    description: 'Khi âm tiết trước có patchim gặp âm tiết sau bắt đầu bằng phụ âm câm "ㅇ", phụ âm cuối sẽ nối sang đọc cùng nguyên âm sau.',
    example: '한국어 (Hanguk-eo) → đọc là [한구거 / Hangug-eo], 음악 (Eum-ak) → đọc là [으막 / Eu-mak].'
  },
  {
    name: 'Quy tắc biến âm mũi (Nasalization)',
    description: 'Khi patchim ㄱ, ㄷ, ㅂ gặp phụ âm ㄴ, ㅁ đứng sau, chúng sẽ biến âm thành ㅇ, ㄴ, ㅁ để phát âm nhẹ nhàng hơn.',
    example: '입니다 (Ib-ni-da) → đọc là [임니다 / Im-ni-da], 한국말 (Hanguk-mal) → đọc là [한궁말 / Hangung-mal].'
  },
  {
    name: 'Quy tắc bật hơi hóa (Aspiration)',
    description: 'Khi các phụ âm ㄱ, ㄷ, ㅂ, ㅈ đứng trước hoặc sau ㅎ, chúng sẽ kết hợp lại thành âm bật hơi tương ứng ㅋ, ㅌ, ㅍ, ㅊ.',
    example: '좋다 (Joh-da) → đọc là [조타 / Jo-ta], 축하 (Chuk-ha) → đọc là [추카 / Chu-ka].'
  },
  {
    name: 'Quy tắc căng hóa (Tensification)',
    description: 'Sau các phụ âm tắc ㄱ, ㄷ, ㅂ, các phụ âm đứng sau ㄱ, ㄷ, ㅂ, ㅅ, ㅈ sẽ bị đọc căng thành ㄲ, ㄸ, ㅃ, ㅆ, ㅉ.',
    example: '학교 (Hak-gyo) → đọc là [학꾜 / Hak-kkyo], 식당 (Sik-dang) → đọc là [식땅 / Sik-ttang].'
  }
];
