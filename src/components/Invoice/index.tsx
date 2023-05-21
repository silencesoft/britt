import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button, IconButton, Snackbar, Text, TextInput } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

import { Invoice } from 'src/interfaces/invoice';
import { useTheme } from 'src/providers/ThemeProvider';
import { createInvoice } from 'src/services/createInvoice';
import { getPayment } from 'src/services/getPayment';
import { userAtom } from 'src/state/user';
import UserQR from './UserQR';

type Props = {};

const TIMEOUT_MS = 10000;

const CreateInvoice = (props: Props) => {
  const navigation = useNavigation();
  const user = useAtomValue(userAtom);
  const { theme } = useTheme();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [requestRunning, setRequestRunning] = useState(false);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [finish, setFinish] = useState<boolean | null>(null);

  const onToggleSnackBar = () => setError('');

  const onDismissSnackBar = () => setError('');

  const handleCopyToClipboard = async (value: string) => {
    await Clipboard.setStringAsync(value);
  };

  const handleSavePost = async () => {
    setRequestRunning(true);
    const response = await createInvoice(user.accessToken, amount, description);
    if (response?.payment_request) {
      setInvoice(response);
    }
    setRequestRunning(false);
  };

  useEffect(() => {
    const abortController = new AbortController();

    const waitForPayment = async (invoiceId: string) => {
      if (finish !== null || !invoiceId) {
        return;
      }

      const expire = new Date(invoice?.expires_at || '');
      const now = new Date();

      if (expire < now) {
        setFinish(false);
      }

      const payment = await getPayment(user.accessToken, invoiceId, abortController);

      if (payment.payment_hash) {
        setFinish(true);
      }
    };

    const interval = setInterval(() => {
      waitForPayment(invoice?.payment_hash || '');
    }, TIMEOUT_MS);

    return () => {
      clearInterval(interval);
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice]);

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

    const handleClick = () => {
      Linking.openURL(url);
    };

    return (
      <View style={styles.container}>
        <Text>Amount:</Text>
        <Text style={{ marginBottom: 20 }}> {amount} satoshis</Text>
        {!!description && (
          <>
            <Text>Description:</Text>
            <Text style={{ marginBottom: 20 }}> {description}</Text>
          </>
        )}
        {finish && (
          <>
            <Feather name="check-circle" size={48} color={theme.colors.primary} style={{ marginBottom: 20 }} />
            <Text>Payment Received</Text>
          </>
        )}
        {finish === false && (
          <>
            <Feather name="x-circle" size={48} color={theme.colors.primary} style={{ marginBottom: 20 }} />
            <Text>Invoice Expired</Text>
          </>
        )}
        {finish === null && (
          <>
            <View style={{ backgroundColor: '#ffffff', width: 350, height: 350, padding: 25 }}>
              <QRCode value={url} size={300} />
            </View>
            <MaterialCommunityIcons
              name="hand-coin-outline"
              size={24}
              onPress={handleClick}
              color={theme.colors.primary}
              style={{ marginTop: 20 }}
            />
            <Text style={{ marginTop: 20, maxWidth: 300 }} onPress={handleClick}>
              {value}
            </Text>
            <IconButton icon="content-copy" onPress={() => handleCopyToClipboard(value)} />
            <Text style={{ marginBottom: 20 }}> {invoice.expires_at}</Text>
          </>
        )}
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
