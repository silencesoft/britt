import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as LocalAuthentication from 'expo-local-authentication';
import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react';

import { RootStackParamList } from 'src/constants/RootStackParamList';
import Authentication from 'src/screens/authentication';
import LoginScreen from 'src/screens/login';
import ReceiveScreen from 'src/screens/receive';
import { userAtom } from 'src/state/user';
import ScreenNavigator from './ScreenNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {};

const MainNavigator = (props: Props) => {
  const user = useAtomValue(userAtom);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticate = () => {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate',
      fallbackLabel: 'Enter Password',
    });
    auth.then((result) => {
      setIsAuthenticated(result.success);
      console.log(result);
    });
  };

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  if (user && isBiometricSupported && !isAuthenticated) {
    return (
      <>
        <Authentication handleAuthenticate={handleAuthenticate} />
      </>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!!user && (
        <>
          <Stack.Screen name="Screen" component={ScreenNavigator} />
          <Stack.Screen name="Receive" component={ReceiveScreen} />
        </>
      )}
      {!user && <Stack.Screen name="Login" component={LoginScreen} />}
    </Stack.Navigator>
  );
};

export default MainNavigator;