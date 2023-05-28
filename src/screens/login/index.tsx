import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { useSetAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { useAutoExchange } from 'src/hooks/useAutoExchange';
import { userAtom } from 'src/state/user';

WebBrowser.maybeCompleteAuthSession();

type Props = {};

const LoginScreen = (props: Props) => {
  const setUser = useSetAtom(userAtom);
  const serverUrl = process.env.LOGIN_URL;
  const clientId = process.env.CLIENT_ID || '';
  const EXPO_REDIRECT_PARAMS = { useProxy: true };
  const NATIVE_REDIRECT_PARAMS = {};
  const REDIRECT_PARAMS = Constants.appOwnership === 'expo' ? EXPO_REDIRECT_PARAMS : NATIVE_REDIRECT_PARAMS;
  const redirectUri = makeRedirectUri(REDIRECT_PARAMS);
  const [code, setCode] = useState<string | undefined>(undefined);
  const discovery = {
    authorizationEndpoint: `${process.env.LOGIN_URL}/oauth`,
    tokenEndpoint: `${process.env.API_URL}/oauth/token`,
    revocationEndpoint: `${process.env.API_URL}/oauth/revoke`,
  };
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
  const {
    // The token will be auto exchanged after auth completes.
    token,
    exchangeError,
  } = useAutoExchange(
    clientId,
    redirectUri,
    discovery,
    request?.codeVerifier,
    code // response?.type === 'success' ? response.params.code : undefined
  );

  const handleLogin = async () => {
    await promptAsync({ showInRecents: true });
  };

  useEffect(() => {
    if (token?.accessToken) {
      setUser(token);
    }
  }, [token]);

  // Fix from https://github.com/expo/expo/issues/12044
  useEffect(() => {
    const handleDeepLinking = async (url: string | null): Promise<void> => {
      if (!url) return;
      const correctUrl = url.includes('#') ? url.replace('#', '?') : url;
      const urlObject = new URL(correctUrl);
      const accessToken = urlObject.searchParams.get('code');
      // const refreshToken = ''; // urlObject.searchParams.get('refresh_token');
      if (!accessToken) return;
      setCode(accessToken);
    };

    const listener = (event: { url: string }) => {
      void handleDeepLinking(event.url);
    };

    const subscription = Linking.addEventListener('url', listener);

    void Linking.getInitialURL().then((url) => handleDeepLinking(url));

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Text>API:: {serverUrl}</Text>
      <Button mode="contained" onPress={handleLogin} disabled={!request}>
        <Text variant="headlineSmall">Go</Text>
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
