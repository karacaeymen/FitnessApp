export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppTabParamList = {
  Home: undefined;
  Program: undefined;
  History: undefined;
  Profile: undefined;
};

export type AppStackParamList = {
  Tabs: undefined;
  DayDetail: { dayIndex: number };
  GuidedWorkout: { dayIndex: number };
};
