import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as LocalAuthentication from "expo-local-authentication";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";

import { RootNavProps } from "src/constants/RootNavProps";
import { useSettings } from "src/hooks/useSettings";
import { Payment as PaymentType } from "src/interfaces/payment";
import Authentication from "src/screens/authentication";
import LoginScreen from "src/screens/login";
import PayScreen from "src/screens/pay";
import Payment from "src/screens/payment";
import ReceiveScreen from "src/screens/receive";
import { userAtom } from "src/state/user";
import ScreenNavigator from "./ScreenNavigator";
import PaymentsNavigator from "./PaymentsNavigator";

const Stack = createNativeStackNavigator<RootNavProps>();

type Props = {};

const MainNavigator = (props: Props) => {
  const user = useAtomValue(userAtom);
  const { settings } = useSettings();
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticate = () => {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate",
      fallbackLabel: "Enter Password",
    });
    auth.then((result) => {
      setIsAuthenticated(result.success);
    });
  };

  useEffect(() => {
    (async () => {
      const secure = await LocalAuthentication.getEnrolledLevelAsync();
      // const compatible = await LocalAuthentication.hasHardwareAsync();
      // const biometricRecords = await LocalAuthentication.isEnrolledAsync();
      setIsBiometricSupported(
        secure !== LocalAuthentication.SecurityLevel.NONE && settings?.biometric
      );
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
          <Stack.Screen
            name="Pay"
            component={PayScreen}
            initialParams={{ invoice: "" }}
          />
          <Stack.Screen name="Payments" component={PaymentsNavigator} />
          <Stack.Screen
            name="Payment"
            component={Payment}
            initialParams={{ invoice: {} as PaymentType }}
          />
        </>
      )}
      {!user && <Stack.Screen name="Login" component={LoginScreen} />}
    </Stack.Navigator>
  );
};

export default MainNavigator;
