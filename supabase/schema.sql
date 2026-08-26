-- Fitness App - Supabase şeması
-- Supabase projenizde SQL Editor'e yapıştırıp çalıştırın.

-- Kullanıcı profili: haftalık program üretimi ve başlangıç kilosu hesaplaması için kullanılır.
create table if not exists user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  height_cm numeric not null,
  weight_kg numeric not null,
  gender text not null check (gender in ('male', 'female')),
  experience_level text not null check (experience_level in ('beginner', 'intermediate', 'advanced')),
  days_per_week int not null check (days_per_week between 1 and 6),
  updated_at timestamptz not null default now()
);

-- Her egzersiz tamamlandığında (kullanıcı "Hareketi Tamamladım" dediğinde) bir kayıt oluşur.
-- Bu tablo, bir sonraki sefer için ağırlık önerisi (progressive overload) hesaplamak amacıyla kullanılır.
create table if not exists exercise_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_id text not null,
  exercise_name text not null,
  body_part text not null,
  log_date date not null default current_date,
  weight_kg numeric not null default 0,
  reps_completed int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists exercise_logs_user_exercise_idx on exercise_logs (user_id, exercise_id, log_date desc);

alter table user_profiles enable row level security;
alter table exercise_logs enable row level security;

create policy "Users can manage their own profile"
  on user_profiles for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can manage their own exercise logs"
  on exercise_logs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
