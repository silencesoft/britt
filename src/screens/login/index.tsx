import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { useSetAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Image, Linking, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { useAutoExchange } from 'src/hooks/useAutoExchange';
import { externalInvoiceAtom } from 'src/state/invoice';
import { userAtom } from 'src/state/user';

WebBrowser.maybeCompleteAuthSession();

type Props = {};

const IMAGE_SIZE = 200;

const LoginScreen = (props: Props) => {
  const setUser = useSetAtom(userAtom);
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
  const setExternalInvoice = useSetAtom(externalInvoiceAtom);
  const size = useSharedValue(2);
  const opacity = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    width: size.value * IMAGE_SIZE,
  }));
  const buttonStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  const [imageWidth, setImageWidth] = useState(IMAGE_SIZE);

  const handleLogin = async () => {
    await promptAsync({ showInRecents: true });
  };

  useEffect(() => {
    size.value = withDelay(700, withTiming(1, { duration: 700 }));
    opacity.value = withDelay(1000, withTiming(1, { duration: 700 }));
  }, []);

  useAnimatedReaction(
    () => size.value,
    (currentValue) => {
      runOnJS(setImageWidth)(currentValue * IMAGE_SIZE);
    }
  );

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
      const extPayment = correctUrl.startsWith('lightning');
      if (extPayment) {
        setExternalInvoice(correctUrl);
      }
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
      <Animated.View style={style}>
        <Image
          source={require('../../../assets/adaptive-icon.png')}
          style={{ width: imageWidth, height: imageWidth, marginBottom: 20 }}
        />
      </Animated.View>
      <Animated.View style={buttonStyle}>
        <Button mode="contained" onPress={handleLogin} disabled={!request}>
          Continue with Alby
        </Button>
      </Animated.View>
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
