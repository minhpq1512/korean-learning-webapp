import { Flashcard } from '../types';

export type SrsRating = 1 | 2 | 3 | 4; // 1: Quên, 2: Khó, 3: Được, 4: Dễ

export function calculateNextReview(card: Flashcard, rating: SrsRating): Flashcard {
  let { repetitions, intervalDays, easeFactor, status } = card;

  // Rating 1: Quên (Forgot)
  if (rating === 1) {
    repetitions = 0;
    intervalDays = 0; // Due today / 10 minutes
    status = 'learning';
    easeFactor = Math.max(1.3, easeFactor - 0.2);
  } else {
    // Correct response (2: Hard, 3: Good, 4: Easy)
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = rating === 2 ? 2 : (rating === 3 ? 3 : 5);
    } else {
      if (rating === 2) {
        intervalDays = Math.round(intervalDays * 1.2);
        easeFactor = Math.max(1.3, easeFactor - 0.15);
      } else if (rating === 3) {
        intervalDays = Math.round(intervalDays * easeFactor);
      } else if (rating === 4) {
        intervalDays = Math.round(intervalDays * easeFactor * 1.3);
        easeFactor += 0.15;
      }
    }

    repetitions += 1;

    // Determine status
    if (repetitions >= 5 && intervalDays >= 21) {
      status = 'mastered';
    } else if (repetitions >= 2) {
      status = 'review';
    } else {
      status = 'learning';
    }
  }

  // Calculate next date (YYYY-MM-DD)
  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + intervalDays);
  const nextReviewDate = nextDate.toISOString().split('T')[0];

  return {
    ...card,
    repetitions,
    intervalDays,
    easeFactor,
    status,
    nextReviewDate,
  };
}

export function isCardDue(card: Flashcard): boolean {
  const today = new Date().toISOString().split('T')[0];
  return !card.nextReviewDate || card.nextReviewDate <= today;
}
