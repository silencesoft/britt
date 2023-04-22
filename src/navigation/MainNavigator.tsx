import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { RootStackParamList } from 'src/constants/RootStackParamList';
import ScreenNavigator from './ScreenNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {};

const MainNavigator = (props: Props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Screen" component={ScreenNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
