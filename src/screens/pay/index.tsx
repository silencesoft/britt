import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';

import Form from 'src/components/Scan/Form';
import { RootStackParamList } from 'src/constants/RootStackParamList';

interface Props extends NativeStackScreenProps<RootStackParamList, 'Pay'> {}

const PayScreen = ({ route }: Props) => {
  const navigation = useNavigation<RootStackParamList>();
  const invoice = route?.params?.invoice;

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Pay" />
      </Appbar.Header>
      <Form invoice={invoice} />
    </View>
  );
};

export default PayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
