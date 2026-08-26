import type { Exercise } from '../types';
import { wikiImageSource } from '../lib/wikiImage';

/**
 * Görseller Wikimedia Commons'tan alınmıştır (CC-BY-SA 3.0 / kamu malı).
 * Çoğu görsel `assets/exercises/` altına indirilip uygulamaya yerel varlık olarak
 * gömülmüştür (Wikimedia, uygulama içi ağ isteklerini User-Agent kontrolüyle
 * engelleyebiliyor). Henüz indirilememiş birkaç görsel geçici olarak uzaktan
 * (`wikiImageSource`) yükleniyor.
 */
const wiki = (file: string, raster = false) =>
  wikiImageSource(`https://commons.wikimedia.org/wiki/Special:FilePath/${file}${raster ? '' : '?width=600'}`);

// 1RM oranları strengthlevel.com "beginner" (5. persentil, ~1 aylık deneyim) verilerine dayanır.
// Doğrudan veri bulunmayan izole hareketlerde muhafazakar tahminler kullanılmıştır (işaretli).
export const EXERCISES: Exercise[] = [
  // ---- GÖĞÜS ----
  {
    id: 'bench-press',
    name: 'Barbell Bench Press',
    bodyPart: 'Göğüs',
    equipment: 'Barbell + Düz Bank',
    imageUrl: require('../../assets/exercises/bench-press-1.png'),
    imageUrl2: require('../../assets/exercises/bench-press-2.png'),
    instructions:
      'Sırt üstü düz bankta uzan, ayaklar yerde sabit. Barı omuzdan biraz geniş kavra, göğsün alt kısmına kadar kontrollü indir, sonra dirsekleri kilitlemeden yukarı it.',
    kind: 'weighted',
    targetSets: 4,
    targetRepsMin: 6,
    targetRepsMax: 10,
    oneRmRatio: { male: 0.5, female: 0.3 },
    roundingKg: 2.5,
  },
  {
    id: 'dumbbell-bench-press',
    name: 'Dumbbell Bench Press',
    bodyPart: 'Göğüs',
    equipment: 'Dumbbell + Düz Bank',
    imageUrl: require('../../assets/exercises/dumbbell-bench-press-1.png'),
    imageUrl2: require('../../assets/exercises/dumbbell-bench-press-2.png'),
    instructions:
      'Her iki elde dumbbell ile düz bankta uzan. Dumbbellları göğüs hizasına indir, ardından dirsekleri hafif bükük bırakarak yukarı it ve tepe noktada sıkıştır.',
    kind: 'weighted',
    targetSets: 3,
    targetRepsMin: 8,
    targetRepsMax: 12,
    oneRmRatio: { male: 0.2, female: 0.12 }, // tahmini (tek dumbbell)
    roundingKg: 2,
  },
  {
    id: 'decline-bench-press',
    name: 'Decline Barbell Bench Press',
    bodyPart: 'Göğüs',
    equipment: 'Decline Bank + Barbell',
    imageUrl: require('../../assets/exercises/decline-bench-press-1.png'),
    imageUrl2: require('../../assets/exercises/decline-bench-press-2.png'),
    instructions:
      'Ayaklarını decline bankın kilit yastıklarına sabitle. Barı göğsün alt kısmına indir, kontrollü şekilde yukarı it.',
    kind: 'weighted',
    targetSets: 3,
    targetRepsMin: 8,
    targetRepsMax: 12,
    oneRmRatio: { male: 0.45, female: 0.27 }, // tahmini
    roundingKg: 2.5,
  },
  {
    id: 'chest-dips',
    name: 'Paralel Barda Dips',
    bodyPart: 'Göğüs',
    equipment: 'Dip Bar',
    imageUrl: require('../../assets/exercises/chest-dips-1.png'),
    imageUrl2: require('../../assets/exercises/chest-dips-2.png'),
    instructions:
      'Paralel barları kavrayıp vücudunu yukarı kaldır. Gövdeni hafif öne eğerek dirsekleri 90 dereceye kadar bük, sonra göğsü sıkarak yukarı it.',
    kind: 'bodyweight',
    targetSets: 3,
    targetRepsMin: 6,
    targetRepsMax: 12,
  },

  // ---- SIRT ----
  {
    id: 'barbell-row',
    name: 'Barbell Row',
    bodyPart: 'Sırt',
    equipment: 'Barbell',
    imageUrl: wiki('Barbell-rear-delt-row-1.png', true),
    imageUrl2: require('../../assets/exercises/barbell-row-2.png'),
    instructions:
      'Belden öne eğil, sırtı düz tut. Barı karın hizasına doğru çekip sırt kaslarını sıkıştır, kontrollü şekilde geri indir.',
    kind: 'weighted',
    targetSets: 4,
    targetRepsMin: 6,
    targetRepsMax: 10,
    oneRmRatio: { male: 0.5, female: 0.3 },
    roundingKg: 2.5,
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    bodyPart: 'Sırt',
    equipment: 'Kablo Makinesi',
    imageUrl: require('../../assets/exercises/lat-pulldown-1.gif'),
    imageUrl2: require('../../assets/exercises/lat-pulldown-2.gif'),
    instructions:
      'Geniş tutuşla barı kavra, gövdeni hafif geriye yasla. Barı göğsün üst kısmına doğru çekip sırt kaslarını sıkıştır, kontrollü şekilde yukarı bırak.',
    kind: 'weighted',
    targetSets: 3,
    targetRepsMin: 8,
    targetRepsMax: 12,
    oneRmRatio: { male: 0.5, female: 0.35 },
    roundingKg: 2.5,
  },
  {
    id: 'seated-cable-row',
    name: 'Oturarak Kablo Çekiş',
    bodyPart: 'Sırt',
    equipment: 'Kablo Makinesi',
    imageUrl: wiki('Cable-seated-rows-1.png', true),
    imageUrl2: wiki('Cable-seated-rows-2.png', true),
    instructions:
      'Ayaklarını platforma yerleştirip dizleri hafif bük. Sapı karın hizana çek, kürek kemiklerini sıkıştır, kontrollü şekilde geri bırak.',
    kind: 'weighted',
    targetSets: 3,
    targetRepsMin: 8,
    targetRepsMax: 12,
    oneRmRatio: { male: 0.5, female: 0.35 },
    roundingKg: 2.5,
  },
  {
    id: 'pull-up',
    name: 'Barfiks',
    bodyPart: 'Sırt',
    equipment: 'Barfiks Barı',
    imageUrl: require('../../assets/exercises/pull-up-1.png'),
    imageUrl2: require('../../assets/exercises/pull-up-2.png'),
    instructions:
      'Barı omuz genişliğinde veya biraz geniş kavra. Çenen barın üzerine çıkana kadar kendini çek, kontrollü şekilde in.',
    kind: 'bodyweight',
    targetSets: 3,
    targetRepsMin: 4,
    targetRepsMax: 10,
  },

  // ---- OMUZ ----
  {
    id: 'overhead-press',
    name: 'Ayakta Barbell Omuz Presi',
    bodyPart: 'Omuz',
    equipment: 'Barbell',
    imageUrl: require('../../assets/exercises/overhead-press-1.png'),
    imageUrl2: require('../../assets/exercises/overhead-press-2.png'),
    instructions:
      'Barı omuz hizasında tut, karnını sık. Dirsekleri kilitlemeden barı başının üzerine it, kontrollü şekilde indir.',
    kind: 'weighted',
    targetSets: 4,
    targetRepsMin: 6,
    targetRepsMax: 10,
    oneRmRatio: { male: 0.35, female: 0.2 },
    roundingKg: 2.5,
  },
  {
    id: 'arnold-press',
    name: 'Dumbbell Arnold Press',
    bodyPart: 'Omuz',
    equipment: 'Dumbbell',
    imageUrl: require('../../assets/exercises/arnold-press-1.png'),
    imageUrl2: require('../../assets/exercises/arnold-press-2.png'),
    instructions:
      'Dumbbellları avuçlar sana bakacak şekilde omuz hizasında tut. Yukarı iterken bileklerini dışa çevir, tepede avuçlar öne baksın.',
    kind: 'weighted',
    targetSets: 3,
    targetRepsMin: 8,
    targetRepsMax: 12,
    oneRmRatio: { male: 0.15, female: 0.1 }, // tek dumbbell
    roundingKg: 2,
  },
  {
    id: 'lateral-raise',
    name: 'Dumbbell Lateral Raise',
    bodyPart: 'Omuz',
    equipment: 'Dumbbell',
    imageUrl: wiki('Dumbbell-lateral-raises-1.png', true),
    imageUrl2: wiki('Dumbbell-lateral-raises-2.png', true),
    instructions:
      'Dumbbellları yanlarda tut, dirsekleri hafif bük. Kollarını omuz hizasına gelene kadar yana kaldır, kontrollü şekilde indir.',
    kind: 'weighted',
    targetSets: 3,
    targetRepsMin: 12,
    targetRepsMax: 15,
    oneRmRatio: { male: 0.06, female: 0.04 }, // tahmini, tek dumbbell
    roundingKg: 1,
  },

  // ---- PAZU (BİCEPS) ----
  {
    id: 'dumbbell-curl',
    name: 'Dumbbell Curl',
    bodyPart: 'Pazu',
    equipment: 'Dumbbell',
    imageUrl: require('../../assets/exercises/dumbbell-curl-1.png'),
    imageUrl2: require('../../assets/exercises/dumbbell-curl-2.png'),
    instructions:
      'Dumbbellları yanlarda tut, dirsekleri sabit. Ön kolu kaldırarak dumbbell ağırlığını omuza doğru getir, kontrollü şekilde indir.',
    kind: 'weighted',
    targetSets: 3,
    targetRepsMin: 8,
    targetRepsMax: 12,
    oneRmRatio: { male: 0.1, female: 0.05 },
    roundingKg: 1,
  },
  {
    id: 'hammer-curl',
    name: 'Hammer Curl',
    bodyPart: 'Pazu',
    equipment: 'Dumbbell',
    imageUrl: require('../../assets/exercises/hammer-curl-1.png'),
    imageUrl2: require('../../assets/exercises/hammer-curl-2.png'),
    instructions:
      'Dumbbellları başparmak yukarı bakacak şekilde (çekiç tutuşu) kaldır. Dirsekleri sabit tutarak kontrollü şekilde indir.',
    kind: 'weighted',
    targetSets: 3,
    targetRepsMin: 8,
    targetRepsMax: 12,
    oneRmRatio: { male: 0.09, female: 0.045 }, // tahmini
    roundingKg: 1,
  },
  {
    id: 'machine-bicep-curl',
    name: 'Makine Biceps Curl',
    bodyPart: 'Pazu',
    equipment: 'Biceps Curl Makinesi',
    imageUrl: require('../../assets/exercises/machine-bicep-curl-1.png'),
    imageUrl2: require('../../assets/exercises/machine-bicep-curl-2.png'),
    instructions:
      'Kollarını makinenin pedine yerleştir. Tutamağı omuza doğru çek, tepe noktada sıkıştır, kontrollü şekilde geri bırak.',
    kind: 'weighted',
    targetSets: 3,
    targetRepsMin: 8,
    targetRepsMax: 12,
    oneRmRatio: { male: 0.2, female: 0.12 }, // tahmini
    roundingKg: 2.5,
  },

  // ---- TRICEPS ----
  {
    id: 'triceps-pushdown',
    name: 'İp ile Triceps Pushdown',
    bodyPart: 'Triceps',
    equipment: 'Kablo Makinesi',
    imageUrl: wiki('Triceps-pushdown-with-rope-1.gif', true),
    imageUrl2: wiki('Triceps-pushdown-with-rope-2.gif', true),
    instructions:
      'İpi kavra, dirsekleri gövdene yapışık tut. İpi aşağı ittirip tam açılmada sıkıştır, kontrollü şekilde yukarı bırak.',
    kind: 'weighted',
    targetSets: 3,
    targetRepsMin: 10,
    targetRepsMax: 15,
    oneRmRatio: { male: 0.25, female: 0.15 },
    roundingKg: 2.5,
  },
  {
    id: 'close-grip-bench-press',
    name: 'Dar Tutuş Bench Press',
    bodyPart: 'Triceps',
    equipment: 'Barbell + Düz Bank',
    imageUrl: require('../../assets/exercises/close-grip-bench-press-1.png'),
    imageUrl2: require('../../assets/exercises/close-grip-bench-press-2.png'),
    instructions:
      'Barı omuz genişliğinden dar kavra. Dirsekleri gövdeye yakın tutarak göğsüne indir, triceps kasını sıkarak yukarı it.',
    kind: 'weighted',
    targetSets: 3,
    targetRepsMin: 6,
    targetRepsMax: 10,
    oneRmRatio: { male: 0.4, female: 0.24 }, // tahmini
    roundingKg: 2.5,
  },
  {
    id: 'bench-dips',
    name: 'Bench Dips',
    bodyPart: 'Triceps',
    equipment: 'Sandalye / Bank',
    imageUrl: require('../../assets/exercises/bench-dips-1.png'),
    imageUrl2: require('../../assets/exercises/bench-dips-2.png'),
    instructions:
      'Ellerini arkanda banka yasla, topukların önde. Dirsekleri bükerek kalçanı indir, triceps kasını kullanarak yukarı it.',
    kind: 'bodyweight',
    targetSets: 3,
    targetRepsMin: 8,
    targetRepsMax: 15,
  },

  // ---- ÖN KOL ----
  {
    id: 'reverse-curl',
    name: 'Ters Curl (Reverse Curl)',
    bodyPart: 'Ön Kol',
    equipment: 'Dumbbell',
    imageUrl: require('../../assets/exercises/reverse-curl-1.png'),
    imageUrl2: require('../../assets/exercises/reverse-curl-2.png'),
    instructions:
      'Dumbbellları avuçlar aşağı bakacak şekilde (pronе tutuş) tut. Ön kolu kullanarak kaldır, kontrollü şekilde indir.',
    kind: 'weighted',
    targetSets: 3,
    targetRepsMin: 10,
    targetRepsMax: 15,
    oneRmRatio: { male: 0.08, female: 0.05 }, // tahmini
    roundingKg: 1,
  },
  {
    id: 'wrist-curl',
    name: 'Bilek Curl (Wrist Curl)',
    bodyPart: 'Ön Kol',
    equipment: 'Dumbbell',
    imageUrl: require('../../assets/exercises/wrist-curl-1.jpg'),
    instructions:
      'Ön kolunu bacağına veya banka yasla, bilek dışarıda kalsın. Dumbbell ağırlığını yalnızca bileği kullanarak yukarı kıvır, kontrollü indir.',
    kind: 'weighted',
    targetSets: 3,
    targetRepsMin: 12,
    targetRepsMax: 20,
    oneRmRatio: { male: 0.06, female: 0.04 }, // tahmini
    roundingKg: 1,
  },

  // ---- BACAK ----
  {
    id: 'squat',
    name: 'Barbell Back Squat',
    bodyPart: 'Bacak',
    equipment: 'Squat Rack',
    imageUrl: require('../../assets/exercises/squat-1.png'),
    imageUrl2: require('../../assets/exercises/squat-2.png'),
    instructions:
      'Barı üst sırtına yerleştir, ayaklar omuz genişliğinde. Kalçanı geriye iterek dizlerini bükerek çök, uyluklar yere paralel olunca yukarı kalk.',
    kind: 'weighted',
    targetSets: 4,
    targetRepsMin: 6,
    targetRepsMax: 10,
    oneRmRatio: { male: 0.75, female: 0.5 },
    roundingKg: 2.5,
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    bodyPart: 'Bacak',
    equipment: 'Leg Press Makinesi',
    imageUrl: require('../../assets/exercises/leg-press-1.jpg'),
    instructions:
      'Ayaklarını platforma omuz genişliğinde yerleştir. Platformu dizlerin 90 dereceye gelene kadar indir, topuklarla iterek yukarı geri getir.',
    kind: 'weighted',
    targetSets: 4,
    targetRepsMin: 8,
    targetRepsMax: 12,
    oneRmRatio: { male: 1.2, female: 0.78 },
    roundingKg: 5,
  },
  {
    id: 'leg-extension',
    name: 'Leg Extension',
    bodyPart: 'Bacak',
    equipment: 'Leg Extension Makinesi',
    imageUrl: require('../../assets/exercises/leg-extension-1.jpg'),
    instructions:
      'Bilek pedini bileklerinin üzerine yerleştir. Bacaklarını düz olana kadar kaldır, tepe noktada sıkıştır, kontrollü şekilde indir.',
    kind: 'weighted',
    targetSets: 3,
    targetRepsMin: 10,
    targetRepsMax: 15,
    oneRmRatio: { male: 0.5, female: 0.25 },
    roundingKg: 2.5,
  },
  {
    id: 'lying-leg-curl',
    name: 'Lying Leg Curl',
    bodyPart: 'Bacak',
    equipment: 'Leg Curl Makinesi',
    imageUrl: require('../../assets/exercises/lying-leg-curl-1.png'),
    imageUrl2: require('../../assets/exercises/lying-leg-curl-2.png'),
    instructions:
      'Yüzükoyun uzan, bilek pedini topuklarının arkasına yerleştir. Bacaklarını kalçaya doğru bükerek kaldır, kontrollü şekilde indir.',
    kind: 'weighted',
    targetSets: 3,
    targetRepsMin: 10,
    targetRepsMax: 15,
    oneRmRatio: { male: 0.25, female: 0.25 },
    roundingKg: 2.5,
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    bodyPart: 'Bacak',
    equipment: 'Barbell',
    imageUrl: require('../../assets/exercises/romanian-deadlift-1.png'),
    imageUrl2: require('../../assets/exercises/romanian-deadlift-2.png'),
    instructions:
      'Barı kalça hizasında tut, dizler hafif bükük. Kalçanı geriye iterek barı bacaklarına yakın şekilde dizlerinin altına kadar indir, kalça iterek yukarı kalk.',
    kind: 'weighted',
    targetSets: 3,
    targetRepsMin: 8,
    targetRepsMax: 12,
    oneRmRatio: { male: 0.85, female: 0.6 }, // tahmini
    roundingKg: 2.5,
  },
  {
    id: 'standing-calf-raise',
    name: 'Ayakta Calf Raise',
    bodyPart: 'Bacak',
    equipment: 'Calf Raise Makinesi',
    imageUrl: wiki('Standing-calf-raises-1.gif', true),
    imageUrl2: wiki('Standing-calf-raises-2.gif', true),
    instructions:
      'Ayak uçlarını platformda sabitle, topuklar boşta. Topuklarını yukarı kaldırarak baldırları sıkıştır, kontrollü şekilde indir.',
    kind: 'weighted',
    targetSets: 4,
    targetRepsMin: 12,
    targetRepsMax: 20,
    oneRmRatio: { male: 0.6, female: 0.4 }, // tahmini
    roundingKg: 2.5,
  },

  // ---- KARIN ----
  {
    id: 'plank',
    name: 'Plank',
    bodyPart: 'Karın',
    equipment: 'Vücut Ağırlığı',
    imageUrl: require('../../assets/exercises/plank-1.png'),
    instructions:
      'Dirsekler omuz altında, vücut baştan topuğa düz bir çizgi oluştursun. Karnını sıkarak pozisyonu süre boyunca koru.',
    kind: 'timed',
    targetSets: 3,
    targetRepsMin: 30,
    targetRepsMax: 60,
  },
  {
    id: 'crunch',
    name: 'Mekik (Crunch)',
    bodyPart: 'Karın',
    equipment: 'Vücut Ağırlığı',
    imageUrl: wiki('Crunches-1.png', true),
    instructions:
      'Sırt üstü uzan, dizler bükük, ayaklar yerde. Omuzlarını yerden kaldırarak karnını sıkıştır, kontrollü şekilde indir.',
    kind: 'bodyweight',
    targetSets: 3,
    targetRepsMin: 15,
    targetRepsMax: 25,
  },
  {
    id: 'leg-raise',
    name: 'Bacak Kaldırma (Leg Raise)',
    bodyPart: 'Karın',
    equipment: 'Vücut Ağırlığı',
    imageUrl: require('../../assets/exercises/leg-raise-1.png'),
    instructions:
      'Sırt üstü uzan, bacaklar düz. Alt karnını kullanarak bacaklarını yukarı kaldır, kontrollü şekilde indir, yere değdirmeden tekrar başlat.',
    kind: 'bodyweight',
    targetSets: 3,
    targetRepsMin: 10,
    targetRepsMax: 15,
  },
];

export function exercisesForBodyPart(bodyPart: Exercise['bodyPart']) {
  return EXERCISES.filter((e) => e.bodyPart === bodyPart);
}

export function exerciseById(id: string) {
  return EXERCISES.find((e) => e.id === id);
}
