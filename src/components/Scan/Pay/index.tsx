import { Feather } from '@expo/vector-icons';
import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { useTheme } from 'src/providers/ThemeProvider';
import { doPayment } from 'src/services/doPayment';
import { userAtom } from 'src/state/user';

type Props = {
  invoice: string;
  amount: string;
};

const Pay = ({ invoice, amount }: Props) => {
  const [isValid, setIsValid] = useState(invoice.toLowerCase().startsWith('lnbc'));
  // const isEmail = /\b[a-z0-9-_.]+@[a-z0-9-_.]+(\.[a-z0-9]+)+/i.test(invoice);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const user = useAtomValue(userAtom);
  const {theme} = useTheme();

  useEffect(() => {
    const tryPayment = async () => {
      const response = await doPayment(user?.accessToken, invoice, amount);
      console.log(response);

      if (!response?.destination) {
        setError(response.message);
      } else {
        setSuccess(true);
      }
    };

    if (isValid) {
      tryPayment();
    }
  }, [isValid]);

  if (!isValid) {
    return (
      <View style={styles.container}>
        <Text>Invalid invoice.</Text>
        <Text>Only bolt11 invoices supported.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {success && (
        <>
          <Feather name="check-circle" size={48} color={theme.colors.primary} />
          <Text style={{ marginTop: 40 }}>Payment done.</Text>
        </>
      )}
      {!success && !error && <ActivityIndicator />}
      {!!error && (
        <>
          <Feather name="x-circle" size={48} color={theme.colors.primary} />
          <Text style={{ marginTop: 40 }}>{error}</Text>
        </>
      )}
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
