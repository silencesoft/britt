import { Feather } from '@expo/vector-icons';
import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { doPayment } from 'src/services/doPayment';
import { userAtom } from 'src/state/user';

type Props = {
  invoice: string;
};

const Pay = ({ invoice }: Props) => {
  const [isValid, setIsValid] = useState(invoice.startsWith('lnbc'));
  const [success, setSuccess] = useState(false);
  const user = useAtomValue(userAtom);

  useEffect(() => {
    const tryPayment = async () => {
      const response = await doPayment(user?.accessToken, invoice);
      console.log(response);

      if (!response?.destination) {
        setIsValid(false);
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
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {success && (
        <>
          <Feather name="check-circle" size={48} />
          <Text style={{ marginTop: 40 }}>Payment done.</Text>
        </>
      )}
      {!success && <ActivityIndicator />}
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
