import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Appbar, Text } from 'react-native-paper';

import { RootStackParamList } from 'src/constants/RootStackParamList';
import { doPayment } from 'src/services/doPayment';
import { userAtom } from 'src/state/user';

type Props = {
  invoice: string;
};

const Pay = ({ invoice }: Props) => {
  const [isValid, setIsValid] = useState(invoice.startsWith('lnbc'));
  // const isEmail = /\b[a-z0-9-_.]+@[a-z0-9-_.]+(\.[a-z0-9]+)+/i.test(invoice);
  const [success, setSuccess] = useState(false);
  const user = useAtomValue(userAtom);
  const navigation = useNavigation<RootStackParamList>();

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
      <View style={{ flex: 1, width: '100%' }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.navigate('Scan')} />
          <Appbar.Content title="Receive" />
        </Appbar.Header>
        <View style={styles.container}>
          <Text>Invalid invoice.</Text>
          <Text>Only bolt11 invoices supported.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Scan')} />
        <Appbar.Content title="Receive" />
      </Appbar.Header>
      <View style={styles.container}>
        {success && (
          <>
            <Feather name="check-circle" size={48} />
            <Text style={{ marginTop: 40 }}>Payment done.</Text>
          </>
        )}
        {!success && <ActivityIndicator />}
      </View>
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
