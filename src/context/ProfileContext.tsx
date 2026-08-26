import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';
import type { UserProfile } from '../types';

type ProfileContextValue = {
  profile: UserProfile | null;
  loading: boolean;
  saveProfile: (profile: Omit<UserProfile, 'user_id'>) => Promise<string | null>;
  refresh: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!session) {
      setProfile(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .maybeSingle();
    setProfile((data as UserProfile) ?? null);
    setLoading(false);
  }, [session]);

  useEffect(() => {
    load();
  }, [load]);

  const value = useMemo<ProfileContextValue>(
    () => ({
      profile,
      loading,
      refresh: load,
      saveProfile: async (updates) => {
        if (!session) return 'Oturum bulunamadı.';
        const { data, error } = await supabase
          .from('user_profiles')
          .upsert({ user_id: session.user.id, ...updates })
          .select()
          .single();
        if (error) return error.message;
        setProfile(data as UserProfile);
        return null;
      },
    }),
    [profile, loading, session, load]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
