import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AppStackParamList } from '../navigation/types';
import { useProfile } from '../context/ProfileContext';
import { generateWeeklyProgram, todayDayIndex } from '../lib/programGenerator';

type Props = NativeStackScreenProps<AppStackParamList, 'Tabs'>;

export default function ProgramScreen({ navigation }: Props) {
  const { profile } = useProfile();
  const program = useMemo(() => (profile ? generateWeeklyProgram(profile) : []), [profile]);
  const todayIdx = todayDayIndex();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Haftalık Programın</Text>
      <Text style={styles.subheader}>
        {profile ? `${profile.days_per_week} gün/hafta · ${profile.weight_kg} kg` : ''}
      </Text>
      <FlatList
        data={program}
        keyExtractor={(item) => String(item.dayIndex)}
        contentContainerStyle={{ padding: 20, paddingTop: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.dayCard, item.dayIndex === todayIdx && styles.dayCardToday]}
            onPress={() => navigation.navigate('DayDetail', { dayIndex: item.dayIndex })}
          >
            <View>
              <Text style={styles.dayName}>
                {item.dayName}
                {item.dayIndex === todayIdx ? ' · Bugün' : ''}
              </Text>
              <Text style={styles.dayBodyParts}>
                {item.bodyParts.length > 0 ? item.bodyParts.join(' + ') : 'Dinlenme'}
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', paddingTop: 60 },
  header: { fontSize: 22, fontWeight: '700', color: '#fff', paddingHorizontal: 20 },
  subheader: { fontSize: 13, color: '#94a3b8', paddingHorizontal: 20, marginTop: 4 },
  dayCard: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayCardToday: { borderWidth: 1, borderColor: '#22c55e' },
  dayName: { color: '#fff', fontWeight: '700', fontSize: 15 },
  dayBodyParts: { color: '#94a3b8', fontSize: 13, marginTop: 4 },
  chevron: { color: '#64748b', fontSize: 22 },
});
