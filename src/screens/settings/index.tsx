import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, Menu, Text } from 'react-native-paper';
import { useSetAtom } from 'jotai';

import { userAtom } from 'src/state/user';

type Props = {};

const SettingsScreen = (props: Props) => {
  const setUser = useSetAtom(userAtom);

  const handleLogout = () => {
    setUser('');
  }

  return (
    <View style={styles.container}>
      <Divider />
      <Menu.Item onPress={handleLogout} title="Sign out"
        style={{ width: '100%' }} />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
