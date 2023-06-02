import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as LocalAuthentication from 'expo-local-authentication';
import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react';

import { RootStackParamList } from 'src/constants/RootStackParamList';
import { useSettings } from 'src/hooks/useSettings';
import Authentication from 'src/screens/authentication';
import LoginScreen from 'src/screens/login';
import PayScreen from 'src/screens/pay';
import ReceiveScreen from 'src/screens/receive';
import { userAtom } from 'src/state/user';
import ScreenNavigator from './ScreenNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = {};

const MainNavigator = (props: Props) => {
  const user = useAtomValue(userAtom);
  const { settings } = useSettings();
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
      const secure = await LocalAuthentication.getEnrolledLevelAsync();
      // const compatible = await LocalAuthentication.hasHardwareAsync();
      // const biometricRecords = await LocalAuthentication.isEnrolledAsync();
      setIsBiometricSupported(secure !== LocalAuthentication.SecurityLevel.NONE && settings?.biometric);
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
          <Stack.Screen name="Pay" component={PayScreen} initialParams={{ invoice: '' }} />
        </>
      )}
      {!user && <Stack.Screen name="Login" component={LoginScreen} />}
    </Stack.Navigator>
  );
};

export default MainNavigator;
