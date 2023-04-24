import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useSetAtom } from 'jotai';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { userAtom } from 'src/state/user';

WebBrowser.maybeCompleteAuthSession();

const useProxy = Platform.select({ web: false, default: true });

type Props = {};

const LoginScreen = (props: Props) => {
  const setUser = useSetAtom(userAtom);
  const serverUrl = process.env.API_URL;
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: process.env.CLIENT_ID || '',
      redirectUri: makeRedirectUri({
        scheme: 'britt.app',
        useProxy,
      }),
      usePKCE: true,
      scopes: [
        'account:read',
        'invoices:create',
        'invoices:read',
        'transactions:read',
        'balance:read',
        'payments:send',
      ],
    },
    {
      authorizationEndpoint: `${process.env.API_URL}/oauth`,
      tokenEndpoint: `${process.env.API_URL}/oauth/token`,
      revocationEndpoint: `${process.env.API_URL}/oauth/revoke`,
    }
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;

      setUser(code);
    }
  }, [response]);

  const handleLogin = async () => {
    promptAsync({ useProxy });
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Text>API:: {serverUrl}</Text>
      <Button mode="contained" onPress={handleLogin} disabled={!request}>
        Go
      </Button>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
