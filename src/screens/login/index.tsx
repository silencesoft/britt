import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useSetAtom } from 'jotai';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { useAutoExchange } from 'src/hooks/useAutoExchange';
import { userAtom } from 'src/state/user';

WebBrowser.maybeCompleteAuthSession();

const useProxy = Platform.select({ web: false, default: true });

type Props = {};

const LoginScreen = (props: Props) => {
  const setUser = useSetAtom(userAtom);
  const serverUrl = process.env.LOGIN_URL;
  const clientId = process.env.CLIENT_ID || '';
  const discovery = {
    authorizationEndpoint: `${process.env.LOGIN_URL}/oauth`,
    tokenEndpoint: `${process.env.API_URL}/oauth/token`,
    revocationEndpoint: `${process.env.API_URL}/oauth/revoke`,
  };
  const redirectUri = makeRedirectUri({
    scheme: 'britt.app',
    useProxy,
  });
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri,
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
    discovery
  );
  console.log({ request, response, promptAsync });
  const {
    // The token will be auto exchanged after auth completes.
    token,
    exchangeError,
  } = useAutoExchange(
    clientId,
    redirectUri,
    discovery,
    request?.codeVerifier,
    response?.type === 'success' ? response.params.code : undefined
  );

  useEffect(() => {
    if (token?.accessToken) {
      setUser(token);
    }
  }, [token]);

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
