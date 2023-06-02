import { useNavigation } from '@react-navigation/native';
import { useAtomValue } from 'jotai';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Home from 'src/components/Home';
import { RootStackParamList } from 'src/constants/RootStackParamList';
import { externalInvoiceAtom } from 'src/state/invoice';

type Props = {};

const HomeScreen = (props: Props) => {
  const navigation = useNavigation<RootStackParamList>();
  const externalInvoice = useAtomValue(externalInvoiceAtom);
  console.log({ externalInvoice });

  useEffect(() => {
    if (externalInvoice) {
      const invoice = externalInvoice.replace('lightning:', '');
      navigation.navigate('Pay', { invoice: invoice });
    }
  }, [externalInvoice]);

  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
