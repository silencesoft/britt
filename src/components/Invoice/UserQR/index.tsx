import { useAtomValue } from 'jotai';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { profileAtom } from 'src/state/user';

type Props = {};

const UserQR = (props: Props) => {
  const profile = useAtomValue(profileAtom);

  return (
    <>
      {profile?.lightning_address && (
        <View style={styles.container}>
          <QRCode value={`lightning:${profile?.lightning_address}`} size={300} />
        </View>
      )}
    </>
  );
};

export default UserQR;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
