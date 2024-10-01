import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import CreateInvoice from 'src/components/Invoice';

import { RootNavProps } from 'src/constants/RootNavProps';

type Props = {};

const ReceiveScreen = (props: Props) => {
  const navigation = useNavigation<RootNavProps>();

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Receive" />
      </Appbar.Header>
      <CreateInvoice />
    </View>
  );
};

export default ReceiveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
