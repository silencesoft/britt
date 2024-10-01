import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, IconButton, Text } from 'react-native-paper';
import ReactTimeAgo from 'react-time-ago';

import Time from 'src/components/common/Time';
import { RootNavProps } from 'src/constants/RootNavProps';

interface Props extends NativeStackScreenProps<RootNavProps, 'Payment'> {}

const Payment = ({ route }: Props) => {
  const navigation = useNavigation<RootNavProps>();
  const invoice = route?.params?.invoice;

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Invoice" />
      </Appbar.Header>
      <View style={styles.informationContainer}>
        {invoice.state === 'SETTLED' && <IconButton icon="check-circle" size={48} />}

        <Text variant="displayLarge">{invoice.amount}</Text>
        {invoice.created_at && <ReactTimeAgo date={new Date(invoice.created_at)} locale="en-US" component={Time} />}
        <Text style={{ marginTop: 20 }}>{invoice.memo}</Text>
        <Text style={{ marginTop: 20 }}>{invoice.comment}</Text>
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  informationContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
