import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useProfile } from '../context/ProfileContext';
import type { ExperienceLevel, Gender } from '../types';

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Erkek' },
  { value: 'female', label: 'Kadın' },
];

const EXPERIENCE_OPTIONS: { value: ExperienceLevel; label: string }[] = [
  { value: 'beginner', label: 'Yeni Başlayan' },
  { value: 'intermediate', label: 'Orta Seviye' },
  { value: 'advanced', label: 'İleri Seviye' },
];

const DAYS_OPTIONS = [2, 3, 4, 5, 6];

export default function OnboardingScreen() {
  const { saveProfile } = useProfile();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [experience, setExperience] = useState<ExperienceLevel>('beginner');
  const [days, setDays] = useState(3);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const heightNum = Number(height.replace(',', '.'));
    const weightNum = Number(weight.replace(',', '.'));
    if (!heightNum || !weightNum || heightNum < 100 || heightNum > 250 || weightNum < 30 || weightNum > 300) {
      Alert.alert('Eksik bilgi', 'Lütfen geçerli bir boy (cm) ve kilo (kg) gir.');
      return;
    }
    setSaving(true);
    const err = await saveProfile({
      height_cm: heightNum,
      weight_kg: weightNum,
      gender,
      experience_level: experience,
      days_per_week: days,
    });
    setSaving(false);
    if (err) Alert.alert('Hata', err);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24, paddingTop: 70, paddingBottom: 60 }}>
      <Text style={styles.title}>Profilini Oluştur</Text>
      <Text style={styles.subtitle}>
        Sana özel haftalık program ve başlangıç kiloları oluşturabilmemiz için birkaç bilgiye ihtiyacımız var.
      </Text>

      <Text style={styles.label}>Boy (cm)</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn. 175"
        placeholderTextColor="#64748b"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <Text style={styles.label}>Kilo (kg)</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn. 72"
        placeholderTextColor="#64748b"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <Text style={styles.label}>Cinsiyet</Text>
      <View style={styles.rowOptions}>
        {GENDER_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.chip, gender === opt.value && styles.chipActive]}
            onPress={() => setGender(opt.value)}
          >
            <Text style={[styles.chipText, gender === opt.value && styles.chipTextActive]}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Deneyim Seviyesi</Text>
      <View style={styles.rowOptions}>
        {EXPERIENCE_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            style={[styles.chip, experience === opt.value && styles.chipActive]}
            onPress={() => setExperience(opt.value)}
          >
            <Text style={[styles.chipText, experience === opt.value && styles.chipTextActive]}>{opt.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Haftada Kaç Gün Antrenman?</Text>
      <View style={styles.rowOptions}>
        {DAYS_OPTIONS.map((d) => (
          <TouchableOpacity
            key={d}
            style={[styles.chip, days === d && styles.chipActive]}
            onPress={() => setDays(d)}
          >
            <Text style={[styles.chipText, days === d && styles.chipTextActive]}>{d}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={saving}>
        {saving ? <ActivityIndicator color="#0f172a" /> : <Text style={styles.buttonText}>Programımı Oluştur</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a' },
  title: { fontSize: 24, fontWeight: '700', color: '#fff' },
  subtitle: { color: '#94a3b8', fontSize: 13, marginTop: 8, marginBottom: 28, lineHeight: 19 },
  label: { color: '#cbd5e1', fontSize: 13, fontWeight: '600', marginBottom: 8, marginTop: 18 },
  input: {
    backgroundColor: '#1e293b',
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
  },
  rowOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1e293b',
  },
  chipActive: { backgroundColor: '#22c55e' },
  chipText: { color: '#cbd5e1', fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#0f172a' },
  button: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 36,
  },
  buttonText: { color: '#0f172a', fontWeight: '700', fontSize: 16 },
});
