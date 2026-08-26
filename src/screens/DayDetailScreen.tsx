import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../navigation/types';
import { useProfile } from '../context/ProfileContext';
import { generateWeeklyProgram } from '../lib/programGenerator';
import { baselineSuggestedWeight } from '../lib/weightSuggestion';

type Props = NativeStackScreenProps<AppStackParamList, 'DayDetail'>;

export default function DayDetailScreen({ route, navigation }: Props) {
  const { profile } = useProfile();
  const day = useMemo(() => {
    if (!profile) return null;
    return generateWeeklyProgram(profile)[route.params.dayIndex];
  }, [profile, route.params.dayIndex]);

  if (!day || !profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={day.exercises}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <Text style={styles.title}>{day.dayName}</Text>
            <Text style={styles.bodyParts}>{day.bodyParts.join(' + ')}</Text>
          </View>
        }
        ListEmptyComponent={<Text style={styles.empty}>Bugün dinlenme günü.</Text>}
        contentContainerStyle={{ padding: 20, paddingTop: 60, paddingBottom: 110 }}
        renderItem={({ item }) => {
          const weight = baselineSuggestedWeight(item, profile);
          return (
            <View style={styles.exerciseCard}>
              <Image source={{ uri: item.imageUrl }} style={styles.thumb} />
              <View style={{ flex: 1 }}>
                <Text style={styles.exerciseName}>{item.name}</Text>
                <Text style={styles.exerciseMeta}>
                  {item.targetSets} set × {item.targetRepsMin}-{item.targetRepsMax}{' '}
                  {item.kind === 'timed' ? 'sn' : 'tekrar'}
                </Text>
                {weight !== null && <Text style={styles.exerciseWeight}>Önerilen: {weight} kg</Text>}
              </View>
            </View>
          );
        }}
      />
      {day.exercises.length > 0 && (
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('GuidedWorkout', { dayIndex: day.dayIndex })}
        >
          <Text style={styles.startButtonText}>Antrenmanı Başlat</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  headerBlock: { marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#fff' },
  bodyParts: { color: '#22c55e', fontSize: 14, fontWeight: '600', marginTop: 6 },
  exerciseCard: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  thumb: { width: 56, height: 56, borderRadius: 10, backgroundColor: '#0f172a' },
  exerciseName: { color: '#fff', fontWeight: '700', fontSize: 15 },
  exerciseMeta: { color: '#94a3b8', fontSize: 12, marginTop: 4 },
  exerciseWeight: { color: '#22c55e', fontSize: 12, marginTop: 4, fontWeight: '600' },
  startButton: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  startButtonText: { color: '#0f172a', fontWeight: '700', fontSize: 16 },
  empty: { color: '#94a3b8', padding: 20 },
});
