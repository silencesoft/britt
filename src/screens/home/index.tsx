import { useNavigation } from '@react-navigation/native';
import { useAtomValue } from 'jotai';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Home from 'src/components/Home';
import { RootStackParamList } from 'src/constants/RootStackParamList';
import { externalInvoiceAtom } from 'src/state/invoice';
import { sleep } from 'src/utils/sleep';

type Props = {};

const HomeScreen = (props: Props) => {
  const navigation = useNavigation<RootStackParamList>();
  const externalInvoice = useAtomValue(externalInvoiceAtom);
  console.log({ externalInvoice });

  useEffect(() => {
    const handleInvoice = async () => {
      if (externalInvoice) {
        console.log('Invoice');
        const invoice = externalInvoice.replace('lightning:', '');
        console.log({ invoice });
        await sleep(1000);
        navigation.navigate('Pay', { invoice: invoice });
      }
    };

    handleInvoice();
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
