import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';

const EXPERIENCE_LABEL: Record<string, string> = {
  beginner: 'Yeni Başlayan',
  intermediate: 'Orta Seviye',
  advanced: 'İleri Seviye',
};

export default function ProfileScreen() {
  const { session, signOut } = useAuth();
  const { profile } = useProfile();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24, paddingTop: 80, alignItems: 'center' }}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{session?.user.email?.[0]?.toUpperCase() ?? '?'}</Text>
      </View>
      <Text style={styles.email}>{session?.user.email}</Text>

      {profile && (
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{profile.height_cm} cm</Text>
            <Text style={styles.statLabel}>Boy</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{profile.weight_kg} kg</Text>
            <Text style={styles.statLabel}>Kilo</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{EXPERIENCE_LABEL[profile.experience_level]}</Text>
            <Text style={styles.statLabel}>Seviye</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{profile.days_per_week}</Text>
            <Text style={styles.statLabel}>Gün/Hafta</Text>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.signOutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: { fontSize: 32, fontWeight: '700', color: '#0f172a' },
  email: { color: '#fff', fontSize: 16, fontWeight: '600', marginBottom: 28 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 36, width: '100%' },
  statBox: {
    width: '46%',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statValue: { color: '#fff', fontSize: 16, fontWeight: '700' },
  statLabel: { color: '#94a3b8', fontSize: 12, marginTop: 4 },
  signOutButton: {
    borderColor: '#f87171',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  signOutText: { color: '#f87171', fontWeight: '700' },
});
