import { useNavigation } from '@react-navigation/native';
import { useAtomValue } from 'jotai';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DataTable, IconButton, Text } from 'react-native-paper';
import ReactTimeAgo from 'react-time-ago';

import Time from 'src/components/common/Time';
import { RootNavProps } from 'src/constants/RootNavProps';
import { usePayments } from 'src/hooks/usePayments';
import { Payment } from 'src/interfaces/payment';
import { userAtom } from 'src/state/user';

type Props = {
  type: number;
};

const PaymentsScreen = ({ type }: Props) => {
  const navigation = useNavigation<RootNavProps>();
  const user = useAtomValue(userAtom);
  const { incomingPayments, outgoingPayments } = usePayments();
  const data = type === 0 ? incomingPayments : outgoingPayments;

  const handleClick = (invoice: Payment) => {
    navigation.navigate('Payment', { invoice: invoice });
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={false}>
        <DataTable>
          {!!data.length &&
            data.map((value: Payment) => (
              <DataTable.Row key={value.identifier} onPress={() => handleClick(value)}>
                <View style={{ width: '75%', justifyContent: 'center', paddingBottom: 10, paddingTop: 10 }}>
                  <Text variant="titleLarge">{value.amount}</Text>
                  {!!value.created_at && (
                    <ReactTimeAgo date={new Date(value.created_at)} locale="en-US" component={Time} />
                  )}
                </View>
                <View style={{ width: '25%', alignItems: 'flex-end', justifyContent: 'center' }}>
                  {value.state === 'SETTLED' && <IconButton icon="check-circle" />}
                </View>
              </DataTable.Row>
            ))}
        </DataTable>
      </ScrollView>
    </View>
  );
};

export default PaymentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
