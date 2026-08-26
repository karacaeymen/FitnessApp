import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AppStackParamList } from './types';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import AuthNavigator from './AuthNavigator';
import AppTabs from './AppTabs';
import OnboardingScreen from '../screens/OnboardingScreen';
import DayDetailScreen from '../screens/DayDetailScreen';
import GuidedWorkoutScreen from '../screens/GuidedWorkoutScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();

const headerOptions = {
  headerShown: true,
  headerStyle: { backgroundColor: '#0f172a' },
  headerTintColor: '#fff',
} as const;

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={AppTabs} />
      <Stack.Screen name="DayDetail" component={DayDetailScreen} options={{ ...headerOptions, title: 'Gün Detayı' }} />
      <Stack.Screen
        name="GuidedWorkout"
        component={GuidedWorkoutScreen}
        options={{ ...headerOptions, title: 'Antrenman' }}
      />
    </Stack.Navigator>
  );
}

function LoadingScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0f172a', alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color="#22c55e" size="large" />
    </View>
  );
}

export default function RootNavigator() {
  const { session, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();

  let content: React.ReactNode;
  if (authLoading) {
    content = <LoadingScreen />;
  } else if (!session) {
    content = <AuthNavigator />;
  } else if (profileLoading) {
    content = <LoadingScreen />;
  } else if (!profile) {
    content = <OnboardingScreen />;
  } else {
    content = <AppNavigator />;
  }

  return <NavigationContainer>{content}</NavigationContainer>;
}
