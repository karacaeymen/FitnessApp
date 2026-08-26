import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { AppTabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import ProgramScreen from '../screens/ProgramScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<AppTabParamList>();

const ICONS: Record<keyof AppTabParamList, string> = {
  Home: '🏠',
  Program: '📋',
  History: '📈',
  Profile: '👤',
};

const LABELS: Record<keyof AppTabParamList, string> = {
  Home: 'Ana Sayfa',
  Program: 'Program',
  History: 'İlerleme',
  Profile: 'Profil',
};

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#22c55e',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: { backgroundColor: '#0f172a', borderTopColor: '#1e293b' },
        tabBarLabel: LABELS[route.name as keyof AppTabParamList],
        tabBarIcon: () => <Text>{ICONS[route.name as keyof AppTabParamList]}</Text>,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen as any} />
      <Tab.Screen name="Program" component={ProgramScreen as any} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
