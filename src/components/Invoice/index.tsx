import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button, IconButton, Snackbar, Text, TextInput } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

import { Invoice } from 'src/interfaces/invoice';
import { createInvoice } from 'src/services/createInvoice';
import { userAtom } from 'src/state/user';
import UserQR from './UserQR';

type Props = {};

const CreateInvoice = (props: Props) => {
  const navigation = useNavigation();
  const user = useAtomValue(userAtom);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [requestRunning, setRequestRunning] = useState(false);
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  const onToggleSnackBar = () => setError('');

  const onDismissSnackBar = () => setError('');

  const handleCopyToClipboard = async (value: string) => {
    await Clipboard.setStringAsync(value);
  };

  const handleSavePost = async () => {
    setRequestRunning(true);
    const response = await createInvoice(user.accessToken, amount, description);
    setRequestRunning(false);
    if (response?.payment_request) {
      setInvoice(response);
    }
  };

  if (requestRunning) {
    return (
      <View style={styles.uploadingContainer}>
        <ActivityIndicator color="red" size="large" />
      </View>
    );
  }

  if (invoice?.payment_request) {
    const value = invoice.payment_request;
    const url = `lightning:${value}`;

    return (
      <View style={styles.container}>
        <Text style={{ marginBottom: 20 }}>Amount: {amount} satoshis</Text>
        <Text>Description:</Text>
        <Text style={{ marginBottom: 20 }}> {description}</Text>
        <QRCode value={url} size={300} />
        <Text style={{ marginTop: 20, maxWidth: 300 }}>{value}</Text>
        <IconButton icon="content-copy" onPress={() => handleCopyToClipboard(value)} />
        <Text style={{ marginBottom: 20 }}> {invoice.expires_at}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <UserQR />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputText}
          maxLength={20}
          onChangeText={(text) => setAmount(text)}
          placeholder="Amount"
        />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.inputText}
          maxLength={150}
          multiline
          onChangeText={(text) => setDescription(text)}
          placeholder="Description"
        />
      </View>
      <View style={styles.spacer} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
          <Button icon="close" mode="outlined">
            Cancel
          </Button>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSavePost()} style={styles.button}>
          <Button icon="arrow-right" mode="contained">
            Create Invoice
          </Button>
        </TouchableOpacity>
      </View>
      {!!error && (
        <Snackbar
          visible={!!error}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}
        >
          {error}
        </Snackbar>
      )}
    </View>
  );
};

export default CreateInvoice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  uploadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    flex: 1,
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
