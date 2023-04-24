import { useNavigation } from '@react-navigation/native';
import { useAtomValue } from 'jotai';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

import { RootStackParamList } from 'src/constants/RootStackParamList';
import { profileAtom } from 'src/state/user';

type Props = {};

const ReceiveScreen = (props: Props) => {
  const navigation = useNavigation<RootStackParamList>();
  const profile = useAtomValue(profileAtom);

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
        <Appbar.Content title="Receive" />
      </Appbar.Header>
      <Text>Detail</Text>
      {profile?.lightning_address && (
        <View style={styles.container}>
          <QRCode value={`lightning:${profile?.lightning_address}`} size={250} />
        </View>
      )}
    </View>
  );
};

export default ReceiveScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
