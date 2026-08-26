import type { Exercise, ExperienceLevel, ExerciseLogRow, UserProfile } from '../types';

// Beginner -> intermediate -> advanced çarpanları, strengthlevel.com'daki kademeler
// arası tipik artışın (yaklaşık %30-50) muhafazakar bir yaklaşımıdır.
const EXPERIENCE_MULTIPLIER: Record<ExperienceLevel, number> = {
  beginner: 1,
  intermediate: 1.4,
  advanced: 1.9,
};

// Bir 1RM'i ~8-12 tekrarlık bir çalışma seti ağırlığına çeviren katsayı
// (Epley formülüne göre 10 tekrar için 1RM'in ~%75'i; güvenlik payı için %70 kullanılır).
const WORKING_SET_FACTOR = 0.7;

function roundToIncrement(value: number, increment: number) {
  return Math.max(increment, Math.round(value / increment) * increment);
}

/**
 * Kullanıcının vücut ağırlığı, cinsiyeti ve deneyim seviyesine göre bir egzersiz için
 * makul bir başlangıç çalışma ağırlığı hesaplar. Bu yalnızca bir başlangıç noktasıdır,
 * kullanıcı gerçek kaldırdığı ağırlığı girdikçe geçmiş verilerle iyileştirilir.
 */
export function baselineSuggestedWeight(exercise: Exercise, profile: UserProfile): number | null {
  if (exercise.kind !== 'weighted' || !exercise.oneRmRatio) return null;

  const ratio = profile.gender === 'female' ? exercise.oneRmRatio.female : exercise.oneRmRatio.male;
  const oneRm = ratio * profile.weight_kg * EXPERIENCE_MULTIPLIER[profile.experience_level];
  const workingWeight = oneRm * WORKING_SET_FACTOR;

  return roundToIncrement(workingWeight, exercise.roundingKg ?? 2.5);
}

/**
 * Önceki antrenman kayıtları varsa, çift ilerleme (double progression) mantığıyla
 * bir sonraki ağırlığı önerir: hedef tekrarın üst sınırına ulaşıldıysa ağırlığı artır,
 * ulaşılamadıysa aynı ağırlıkla devam et.
 */
export function suggestedWeightFromHistory(
  exercise: Exercise,
  lastLog: ExerciseLogRow | undefined,
  profile: UserProfile
): number {
  const baseline = baselineSuggestedWeight(exercise, profile) ?? 0;
  if (!lastLog) return baseline;

  const increment = exercise.roundingKg ?? 2.5;
  if (lastLog.reps_completed >= exercise.targetRepsMax) {
    return roundToIncrement(lastLog.weight_kg + increment, increment);
  }
  return lastLog.weight_kg;
}
