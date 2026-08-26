# FitnessApp

iOS ve Android için React Native (Expo) fitness uygulaması. Antrenman takibi, hazır antrenman programları ve kullanıcı hesapları (Supabase Auth) içerir.

## Özellikler

- E-posta/şifre ile kayıt ve giriş (Supabase Auth)
- Hazır antrenman programları (Başlangıç / Orta / İleri seviye)
- Antrenman oturumu sırasında set, tekrar ve ağırlık takibi
- Antrenman geçmişi
- Profil ve çıkış yapma

## Kurulum

### 1. Bağımlılıklar

```bash
npm install
```

### 2. Supabase projesi oluşturma

1. [supabase.com](https://supabase.com) adresinden ücretsiz bir hesap açıp yeni bir proje oluşturun.
2. Proje panelinde **SQL Editor**'e girip [`supabase/schema.sql`](supabase/schema.sql) dosyasının içeriğini çalıştırın. Bu, `workout_sessions` ve `set_logs` tablolarını ve gerekli güvenlik (RLS) kurallarını oluşturur.
3. **Project Settings > API** sayfasından `Project URL` ve `anon public` anahtarını alın.
4. Proje kök dizinindeki `.env` dosyasını açın ve şu şekilde doldurun:

```
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxx
```

### 3. Uygulamayı çalıştırma

```bash
npm start
```

Açılan QR kodu telefonunuzda **Expo Go** uygulamasıyla okutarak iOS veya Android'de canlı olarak test edebilirsiniz. Emülatör/simülatör kullanmak isterseniz:

```bash
npm run android   # Android Studio emülatörü gerekir
npm run ios       # yalnızca macOS'ta çalışır
```

## Proje yapısı

```
src/
  context/AuthContext.tsx      # Supabase oturum yönetimi
  data/programs.ts             # Hazır antrenman programları (statik veri)
  lib/supabase.ts              # Supabase istemcisi
  navigation/                  # React Navigation yapılandırması
  screens/                     # Uygulama ekranları
  types/                       # Paylaşılan TypeScript tipleri
supabase/schema.sql            # Veritabanı şeması ve RLS kuralları
```

## Sırada ne var?

- Beslenme/kalori takibi
- İlerleme grafikleri (kilo, ölçüler)
- Push bildirimleri ile antrenman hatırlatıcıları
- Özel antrenman programı oluşturma
