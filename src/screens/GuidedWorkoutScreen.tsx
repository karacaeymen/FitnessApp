import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { Image } from 'expo-image';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../navigation/types';
import { useProfile } from '../context/ProfileContext';
import { useAuth } from '../context/AuthContext';
import { generateWeeklyProgram } from '../lib/programGenerator';
import { suggestedWeightFromHistory } from '../lib/weightSuggestion';
import { supabase } from '../lib/supabase';
import type { ExerciseLogRow } from '../types';

type Props = NativeStackScreenProps<AppStackParamList, 'GuidedWorkout'>;

export default function GuidedWorkoutScreen({ route, navigation }: Props) {
  const { profile } = useProfile();
  const { session } = useAuth();
  const day = useMemo(
    () => (profile ? generateWeeklyProgram(profile)[route.params.dayIndex] : null),
    [profile, route.params.dayIndex]
  );

  const [stepIndex, setStepIndex] = useState(0);
  const [lastLogs, setLastLogs] = useState<Record<string, ExerciseLogRow>>({});
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [weightInput, setWeightInput] = useState('');
  const [repsInput, setRepsInput] = useState('');
  const [saving, setSaving] = useState(false);

  const exercise = day?.exercises[stepIndex];

  useEffect(() => {
    const loadHistory = async () => {
      if (!session || !day) return;
      const exerciseIds = day.exercises.map((e) => e.id);
      const { data } = await supabase
        .from('exercise_logs')
        .select('*')
        .eq('user_id', session.user.id)
        .in('exercise_id', exerciseIds)
        .order('log_date', { ascending: false });

      const latestByExercise: Record<string, ExerciseLogRow> = {};
      (data as ExerciseLogRow[] | null)?.forEach((log) => {
        if (!latestByExercise[log.exercise_id]) latestByExercise[log.exercise_id] = log;
      });
      setLastLogs(latestByExercise);
      setLoadingHistory(false);
    };
    loadHistory();
  }, [session, day]);

  useEffect(() => {
    if (!exercise || !profile) return;
    if (exercise.kind === 'weighted') {
      const suggested = suggestedWeightFromHistory(exercise, lastLogs[exercise.id], profile);
      setWeightInput(String(suggested));
    } else {
      setWeightInput('0');
    }
    setRepsInput(String(exercise.targetRepsMax));
  }, [exercise, lastLogs, profile]);

  if (!day || !profile) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#22c55e" style={{ marginTop: 60 }} />
      </View>
    );
  }

  if (!exercise) {
    return (
      <View style={styles.container}>
        <Text style={styles.doneTitle}>Bugün için antrenman yok.</Text>
      </View>
    );
  }

  const handleComplete = async () => {
    if (!session) return;
    setSaving(true);
    const weight = Number(weightInput.replace(',', '.')) || 0;
    const reps = Number(repsInput) || exercise.targetRepsMax;

    const { error } = await supabase.from('exercise_logs').insert({
      user_id: session.user.id,
      exercise_id: exercise.id,
      exercise_name: exercise.name,
      body_part: exercise.bodyPart,
      log_date: new Date().toISOString().slice(0, 10),
      weight_kg: weight,
      reps_completed: reps,
    });
    setSaving(false);

    if (error) {
      Alert.alert('Hata', error.message);
      return;
    }

    if (stepIndex + 1 < day.exercises.length) {
      setStepIndex(stepIndex + 1);
    } else {
      Alert.alert('Tebrikler! 🎉', 'Bugünkü antrenmanı tamamladın.', [
        { text: 'Tamam', onPress: () => navigation.popToTop() },
      ]);
    }
  };

  const isLast = stepIndex + 1 === day.exercises.length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 60 }}>
      <Text style={styles.progress}>
        {stepIndex + 1} / {day.exercises.length} · {day.dayName}
      </Text>

      <View style={styles.imageRow}>
        <View style={styles.imageBlock}>
          <Image source={exercise.imageUrl} style={styles.image} contentFit="contain" />
          <Text style={styles.imageLabel}>{exercise.imageUrl2 ? 'Başlangıç' : 'Hareket'}</Text>
        </View>
        {exercise.imageUrl2 && (
          <View style={styles.imageBlock}>
            <Image source={exercise.imageUrl2} style={styles.image} contentFit="contain" />
            <Text style={styles.imageLabel}>Bitiş</Text>
          </View>
        )}
      </View>

      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <Text style={styles.equipment}>{exercise.equipment}</Text>
      <Text style={styles.instructions}>{exercise.instructions}</Text>

      <View style={styles.targetRow}>
        <View style={styles.targetBox}>
          <Text style={styles.targetValue}>{exercise.targetSets}</Text>
          <Text style={styles.targetLabel}>Set</Text>
        </View>
        <View style={styles.targetBox}>
          <Text style={styles.targetValue}>
            {exercise.targetRepsMin}-{exercise.targetRepsMax}
          </Text>
          <Text style={styles.targetLabel}>{exercise.kind === 'timed' ? 'Saniye' : 'Tekrar'}</Text>
        </View>
        {exercise.kind === 'weighted' && !loadingHistory && (
          <View style={styles.targetBox}>
            <Text style={styles.targetValue}>
              {suggestedWeightFromHistory(exercise, lastLogs[exercise.id], profile)}
            </Text>
            <Text style={styles.targetLabel}>Önerilen kg</Text>
          </View>
        )}
      </View>

      {exercise.kind === 'weighted' && (
        <>
          <Text style={styles.inputLabel}>Kaç kg kaldırdın?</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={weightInput}
            onChangeText={setWeightInput}
          />
        </>
      )}

      <Text style={styles.inputLabel}>
        {exercise.kind === 'timed' ? 'Kaç saniye tuttun?' : 'Kaç tekrar yaptın?'}
      </Text>
      <TextInput style={styles.input} keyboardType="numeric" value={repsInput} onChangeText={setRepsInput} />

      <TouchableOpacity style={styles.completeButton} onPress={handleComplete} disabled={saving}>
        {saving ? (
          <ActivityIndicator color="#0f172a" />
        ) : (
          <Text style={styles.completeButtonText}>
            {isLast ? 'Antrenmanı Bitir' : 'Hareketi Tamamladım →'}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  progress: { color: '#64748b', fontSize: 13, marginBottom: 16, fontWeight: '600' },
  imageRow: { flexDirection: 'row', gap: 10, marginBottom: 8 },
  imageBlock: { flex: 1 },
  image: { width: '100%', height: 180, backgroundColor: '#f1f5f9', borderRadius: 16 },
  imageLabel: { color: '#64748b', fontSize: 12, textAlign: 'center', marginTop: 6, marginBottom: 8, fontWeight: '600' },
  exerciseName: { color: '#fff', fontSize: 22, fontWeight: '700' },
  equipment: { color: '#22c55e', fontSize: 13, fontWeight: '600', marginTop: 4, marginBottom: 10 },
  instructions: { color: '#94a3b8', fontSize: 14, lineHeight: 21, marginBottom: 20 },
  targetRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  targetBox: { flex: 1, backgroundColor: '#1e293b', borderRadius: 12, padding: 14, alignItems: 'center' },
  targetValue: { color: '#fff', fontSize: 20, fontWeight: '700' },
  targetLabel: { color: '#94a3b8', fontSize: 11, marginTop: 4 },
  inputLabel: { color: '#cbd5e1', fontSize: 13, fontWeight: '600', marginBottom: 8, marginTop: 8 },
  input: {
    backgroundColor: '#1e293b',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 8,
  },
  completeButton: { backgroundColor: '#22c55e', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 24 },
  completeButtonText: { color: '#0f172a', fontWeight: '700', fontSize: 16 },
  doneTitle: { color: '#fff', fontSize: 18, padding: 20 },
});
