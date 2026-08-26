import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, SectionList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import type { ExerciseLogRow } from '../types';

export default function HistoryScreen() {
  const { session } = useAuth();
  const [logs, setLogs] = useState<ExerciseLogRow[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      const load = async () => {
        if (!session) return;
        setLoading(true);
        const { data } = await supabase
          .from('exercise_logs')
          .select('*')
          .eq('user_id', session.user.id)
          .order('log_date', { ascending: false })
          .limit(200);
        if (active) {
          setLogs((data as ExerciseLogRow[]) ?? []);
          setLoading(false);
        }
      };
      load();
      return () => {
        active = false;
      };
    }, [session])
  );

  const sections = useMemo(() => {
    const byExercise = new Map<string, ExerciseLogRow[]>();
    logs.forEach((log) => {
      const list = byExercise.get(log.exercise_name) ?? [];
      list.push(log);
      byExercise.set(log.exercise_name, list);
    });
    return Array.from(byExercise.entries()).map(([title, data]) => ({ title, data: data.slice(0, 6) }));
  }, [logs]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>İlerlemen</Text>
      {loading ? (
        <ActivityIndicator color="#22c55e" style={{ marginTop: 20 }} />
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20, paddingTop: 10 }}
          ListEmptyComponent={
            <Text style={styles.empty}>
              Henüz kayıtlı antrenman yok. Bir antrenman tamamladığında kaldırdığın kilolar burada listelenecek.
            </Text>
          }
          renderSectionHeader={({ section }) => <Text style={styles.sectionTitle}>{section.title}</Text>}
          renderItem={({ item, index, section }) => {
            const prev = section.data[index + 1];
            const diff = prev ? item.weight_kg - prev.weight_kg : 0;
            return (
              <View style={styles.row}>
                <Text style={styles.rowDate}>{new Date(item.log_date).toLocaleDateString('tr-TR')}</Text>
                <Text style={styles.rowWeight}>
                  {item.weight_kg} kg × {item.reps_completed}
                </Text>
                {diff !== 0 && (
                  <Text style={[styles.rowDiff, diff > 0 ? styles.diffUp : styles.diffDown]}>
                    {diff > 0 ? '▲' : '▼'} {Math.abs(diff)} kg
                  </Text>
                )}
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', paddingTop: 60 },
  header: { fontSize: 22, fontWeight: '700', color: '#fff', paddingHorizontal: 20 },
  sectionTitle: { color: '#22c55e', fontWeight: '700', fontSize: 14, marginTop: 18, marginBottom: 8 },
  row: {
    backgroundColor: '#1e293b',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowDate: { color: '#94a3b8', fontSize: 12 },
  rowWeight: { color: '#fff', fontSize: 14, fontWeight: '600' },
  rowDiff: { fontSize: 12, fontWeight: '700' },
  diffUp: { color: '#22c55e' },
  diffDown: { color: '#f87171' },
  empty: { color: '#64748b', fontSize: 14, marginTop: 20, textAlign: 'center', lineHeight: 20 },
});
