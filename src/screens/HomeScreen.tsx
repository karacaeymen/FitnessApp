import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../navigation/types';
import { useProfile } from '../context/ProfileContext';
import { generateWeeklyProgram, todayDayIndex } from '../lib/programGenerator';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<AppStackParamList, 'Tabs'>;

export default function HomeScreen({ navigation }: Props) {
  const { session } = useAuth();
  const { profile } = useProfile();
  const dayIndex = todayDayIndex();

  const today = useMemo(() => {
    if (!profile) return null;
    return generateWeeklyProgram(profile)[dayIndex];
  }, [profile, dayIndex]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.greeting}>
        Merhaba{session?.user.email ? `, ${session.user.email.split('@')[0]}` : ''}!
      </Text>
      <Text style={styles.subtitle}>{today?.dayName} — bugünün programı</Text>

      {!today || today.exercises.length === 0 ? (
        <View style={styles.restCard}>
          <Text style={styles.restTitle}>Bugün dinlenme günü 💤</Text>
          <Text style={styles.restText}>Kaslarının toparlanması için bugün antrenman yok.</Text>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardBodyParts}>{today.bodyParts.join(' + ')}</Text>
          {today.exercises.map((ex) => (
            <View key={ex.id} style={styles.exerciseRow}>
              <Image source={{ uri: ex.imageUrl }} style={styles.thumb} />
              <View style={{ flex: 1 }}>
                <Text style={styles.exerciseName}>{ex.name}</Text>
                <Text style={styles.exerciseMeta}>
                  {ex.targetSets} set × {ex.targetRepsMin}-{ex.targetRepsMax}{' '}
                  {ex.kind === 'timed' ? 'sn' : 'tekrar'}
                </Text>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate('GuidedWorkout', { dayIndex })}
          >
            <Text style={styles.startButtonText}>Antrenmanı Başlat</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  content: { padding: 20, paddingTop: 60, paddingBottom: 40 },
  greeting: { fontSize: 24, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 14, color: '#94a3b8', marginTop: 4, marginBottom: 20 },
  card: { backgroundColor: '#1e293b', borderRadius: 16, padding: 16 },
  cardBodyParts: { color: '#22c55e', fontWeight: '700', fontSize: 15, marginBottom: 12 },
  exerciseRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  thumb: { width: 48, height: 48, borderRadius: 8, backgroundColor: '#0f172a' },
  exerciseName: { color: '#fff', fontWeight: '600', fontSize: 14 },
  exerciseMeta: { color: '#94a3b8', fontSize: 12, marginTop: 2 },
  startButton: { backgroundColor: '#22c55e', borderRadius: 12, paddingVertical: 15, alignItems: 'center', marginTop: 8 },
  startButtonText: { color: '#0f172a', fontWeight: '700', fontSize: 16 },
  restCard: { backgroundColor: '#1e293b', borderRadius: 16, padding: 24, alignItems: 'center' },
  restTitle: { color: '#fff', fontWeight: '700', fontSize: 16, marginBottom: 8 },
  restText: { color: '#94a3b8', fontSize: 13, textAlign: 'center' },
});
