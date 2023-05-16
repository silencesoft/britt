import { AuthSessionResult, makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { useSetAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { useAutoExchange } from 'src/hooks/useAutoExchange';
import { externalInvoiceAtom } from 'src/state/invoice';
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

  console.log({ redirectUri, code });

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
  const setExternalInvoice = useSetAtom(externalInvoiceAtom);

  const [respo, setRespo] = useState<AuthSessionResult | null>(null);

  const handleLogin = async () => {
    promptAsync({ showInRecents: true }).then(async (response) => {
      setRespo(response);
    });
  };

  useEffect(() => {
    if (token?.accessToken) {
      setUser(token);
    }
  }, [token]);

  const [url, setUrl] = useState('');

  // Fix from https://github.com/expo/expo/issues/12044

  const [url, setUrl] = useState('');
  // https://github.com/expo/expo/issues/12044
  useEffect(() => {
    const handleDeepLinking = async (url: string | null): Promise<void> => {
      if (!url) return;
      setUrl(url);
      const correctUrl = url.includes('#') ? url.replace('#', '?') : url;
      const urlObject = new URL(correctUrl);
      const accessToken = urlObject.searchParams.get('code');
      const extPayment = correctUrl.startsWith('lightning');
      if (extPayment) {
        setExternalInvoice(correctUrl);
      }
      // const refreshToken = ''; // urlObject.searchParams.get('refresh_token');
      console.log({ url, correctUrl, accessToken });
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
      <Text>redirectUri:: {redirectUri}</Text>
      <Text>token:: {JSON.stringify(token)}</Text>
      <Text>response:: {JSON.stringify(response?.type)}</Text>
      <Text>response:: {JSON.stringify(response?.params)}</Text>
      <Text>code:: {code}</Text>
      <Text>response:: {JSON.stringify(respo?.type)}</Text>
      <Text>response:: {JSON.stringify(respo?.params)}</Text>
      <Text>url:: {url}</Text>
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
