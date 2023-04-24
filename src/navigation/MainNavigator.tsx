import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAtomValue } from 'jotai';
import React from 'react';

import { RootStackParamList } from 'src/constants/RootStackParamList';
import DetailScreen from 'src/screens/detail';
import LoginScreen from 'src/screens/login';
import { userAtom } from 'src/state/user';
import ScreenNavigator from './ScreenNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {};

const MainNavigator = (props: Props) => {
  const user = useAtomValue(userAtom);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!!user && (
        <>
          <Stack.Screen name="Screen" component={ScreenNavigator} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </>
      )}
      {!user && <Stack.Screen name="Login" component={LoginScreen} />}
    </Stack.Navigator>
  );
};

export default MainNavigator;
