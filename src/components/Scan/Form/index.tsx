import { useNavigation } from '@react-navigation/native';
import { useSetAtom } from 'jotai';
import { decode } from 'light-bolt11-decoder';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';

import { RootStackParamList } from 'src/constants/RootStackParamList';
import { externalInvoiceAtom } from 'src/state/invoice';
import Pay from '../Pay';

type Props = {
  invoice: string;
};

const Form = ({ invoice }: Props) => {
  const [amount, setAmount] = useState('');
  const [value, setValue] = useState(invoice);
  const [payment, setPayment] = useState(false);
  const navigation = useNavigation<RootStackParamList>();
  const setExternalInvoice = useSetAtom(externalInvoiceAtom);

  const handleCancel = () => {
    navigation.goBack();
    setExternalInvoice('');
  };

  useEffect(() => {
    try {
      const currentInvoice = decode(value);
      const sections = currentInvoice.sections;
      const values = sections.filter((section: { name: string }) => section.name === 'amount');

      if (values.length) {
        const amount = parseInt(values[0].value) / 1000;
        setAmount(amount.toString());
      }
    } catch (e) {
      console.log({ e });
    }
  }, [invoice, value]);

  if (payment) {
    return <Pay invoice={value} amount={amount} />;
  }

  return (
    <View style={styles.container}>
      <Text>Invoice Amount</Text>
      <View style={styles.formContainer}>
        <TextInput
          disabled
          multiline={true}
          numberOfLines={3}
          style={styles.inputText}
          maxLength={500}
          value={value}
          onChangeText={(text) => setValue(text)}
          placeholder="Invoice"
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          disabled
          style={styles.inputText}
          maxLength={20}
          value={amount}
          onChangeText={(text) => setAmount(text)}
          placeholder="Amount"
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleCancel} style={styles.button}>
          <Button icon="close" mode="outlined">
            Cancel
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setPayment(true)} style={styles.button}>
          <Button icon="arrow-right" mode="contained">
            Do Payment
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  formContainer: {
    margin: 20,
    flexDirection: 'row',
  },
  inputText: {
    marginRight: 20,
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 1,
    width: '100%',
  },
});
