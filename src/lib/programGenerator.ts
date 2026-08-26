import type { BodyPart, DayPlan, UserProfile, WeeklyProgram } from '../types';
import { exercisesForBodyPart } from '../data/exercises';

const DAY_NAMES = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

// Her antrenman frekansı için gün başına çalışılacak vücut bölgeleri.
// Kaynak: yaygın "body part split" pratiği — göğüs/triceps, sırt/pazu ve bacak/omuz
// eşleştirmeleri, kas gruplarının haftada bir kez yeniden çalıştırılmasına izin verir.
const SPLIT_TEMPLATES: Record<number, BodyPart[][]> = {
  1: [['Bacak', 'Göğüs', 'Sırt', 'Omuz']],
  2: [
    ['Göğüs', 'Sırt', 'Omuz'],
    ['Bacak', 'Pazu', 'Triceps', 'Karın'],
  ],
  3: [
    ['Göğüs', 'Triceps'],
    ['Sırt', 'Pazu'],
    ['Bacak', 'Omuz', 'Karın'],
  ],
  4: [
    ['Göğüs', 'Triceps'],
    ['Sırt', 'Pazu'],
    ['Bacak'],
    ['Omuz', 'Ön Kol', 'Karın'],
  ],
  5: [
    ['Göğüs'],
    ['Sırt'],
    ['Bacak'],
    ['Omuz', 'Karın'],
    ['Pazu', 'Triceps', 'Ön Kol'],
  ],
  6: [
    ['Göğüs', 'Triceps'],
    ['Sırt', 'Pazu'],
    ['Bacak'],
    ['Omuz', 'Karın'],
    ['Göğüs', 'Sırt'],
    ['Bacak', 'Ön Kol'],
  ],
};

// Her vücut bölgesinden bir antrenman gününde kaç egzersiz seçileceği.
function exerciseCountFor(bodyPart: BodyPart, bodyPartsInDay: number): number {
  if (bodyPartsInDay >= 3) return 2;
  if (bodyPart === 'Bacak' || bodyPart === 'Karın') return 3;
  return bodyPart === 'Göğüs' || bodyPart === 'Sırt' || bodyPart === 'Omuz' ? 3 : 2;
}

/**
 * Kullanıcının haftalık antrenman gün sayısına göre 7 günlük bir program üretir.
 * Antrenman günü olmayan günler boş egzersiz listesiyle "dinlenme günü" olarak döner.
 */
export function generateWeeklyProgram(profile: Pick<UserProfile, 'days_per_week'>): WeeklyProgram {
  const days = Math.min(6, Math.max(1, profile.days_per_week));
  const template = SPLIT_TEMPLATES[days] ?? SPLIT_TEMPLATES[3];

  // Antrenman günlerini haftaya yayıyoruz (ör. 3 gün -> Pzt/Çrş/Cuma, 4 gün -> Pzt/Sal/Prş/Cuma).
  const spreadIndexes = spreadAcrossWeek(template.length);

  const plan: DayPlan[] = DAY_NAMES.map((dayName, dayIndex) => ({
    dayIndex,
    dayName,
    bodyParts: [],
    exercises: [],
  }));

  template.forEach((bodyParts, templateIdx) => {
    const dayIndex = spreadIndexes[templateIdx];
    const exercises = bodyParts.flatMap((bp) =>
      exercisesForBodyPart(bp).slice(0, exerciseCountFor(bp, bodyParts.length))
    );
    plan[dayIndex] = { dayIndex, dayName: DAY_NAMES[dayIndex], bodyParts, exercises };
  });

  return plan;
}

function spreadAcrossWeek(count: number): number[] {
  if (count === 1) return [0];
  if (count === 2) return [0, 3];
  if (count === 3) return [0, 2, 4];
  if (count === 4) return [0, 1, 3, 4];
  if (count === 5) return [0, 1, 2, 4, 5];
  return [0, 1, 2, 3, 4, 5];
}

export function todayDayIndex(): number {
  const jsDay = new Date().getDay(); // 0 = Pazar
  return jsDay === 0 ? 6 : jsDay - 1;
}
