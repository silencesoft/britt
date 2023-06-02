import { Ionicons } from '@expo/vector-icons';
import { useSetAtom } from 'jotai';
import React, { useEffect } from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';

import { externalInvoiceAtom } from 'src/state/invoice';

type Props = {
  handleAuthenticate: () => void;
};

const Authentication = ({ handleAuthenticate }: Props) => {
  const setExternalInvoice = useSetAtom(externalInvoiceAtom);

  useEffect(() => {
    const handleDeepLinking = async (url: string | null): Promise<void> => {
      console.log({ url });
      if (!url) return;
      const correctUrl = url.includes('#') ? url.replace('#', '?') : url;
      const extPayment = correctUrl.startsWith('lightning');
      console.log({ url, correctUrl, extPayment });
      if (extPayment) {
        setExternalInvoice(correctUrl);
      }
    };

    const listener = (event: { url: string }) => {
      void handleDeepLinking(event.url);
    };

    const subscription = Linking.addEventListener('url', listener);

    void Linking.getInitialURL().then((url) => handleDeepLinking(url));

    handleAuthenticate();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleAuthenticate}>
        <Ionicons name="finger-print" size={48} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
