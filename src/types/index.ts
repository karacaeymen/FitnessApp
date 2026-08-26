import type { ImageSourcePropType } from 'react-native';

export type BodyPart = 'Göğüs' | 'Sırt' | 'Omuz' | 'Pazu' | 'Triceps' | 'Ön Kol' | 'Bacak' | 'Karın';

export type ExerciseKind = 'weighted' | 'bodyweight' | 'timed';

export type Exercise = {
  id: string;
  name: string;
  bodyPart: BodyPart;
  equipment: string;
  imageUrl: ImageSourcePropType;
  /** Optional second frame (end position) showing the completed movement, when available. */
  imageUrl2?: ImageSourcePropType;
  instructions: string;
  kind: ExerciseKind;
  targetSets: number;
  targetRepsMin: number;
  targetRepsMax: number;
  /** Estimated 1RM as a multiple of bodyweight, used to suggest a starting working weight. Only present for `weighted` exercises. */
  oneRmRatio?: { male: number; female: number };
  /** Rounding increment (kg) applied to the suggested weight. */
  roundingKg?: number;
};

export type Gender = 'male' | 'female';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';

export type UserProfile = {
  user_id: string;
  height_cm: number;
  weight_kg: number;
  gender: Gender;
  experience_level: ExperienceLevel;
  days_per_week: number;
  updated_at?: string;
};

export type ExerciseLogRow = {
  id: string;
  user_id: string;
  exercise_id: string;
  exercise_name: string;
  body_part: BodyPart;
  log_date: string;
  weight_kg: number;
  reps_completed: number;
  created_at: string;
};

export type DayPlan = {
  dayIndex: number; // 0 = Pazartesi ... 6 = Pazar
  dayName: string;
  bodyParts: BodyPart[];
  exercises: Exercise[];
};

export type WeeklyProgram = DayPlan[];
