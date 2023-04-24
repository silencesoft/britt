import { Ionicons } from '@expo/vector-icons';
import { useAtomValue } from 'jotai';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useTheme } from 'src/providers/ThemeProvider';
import { profileAtom, userAtom } from 'src/state/user';
import { save } from 'src/utils/store';

type Props = {};

const User = (props: Props) => {
  const user = useAtomValue(userAtom);
  const profile = useAtomValue(profileAtom);
  const { theme } = useTheme();

  if (!profile) {
    save('code', '');
  }

  return (
    <View style={styles.container}>
      {profile?.name && <Text variant="bodyLarge">@{profile.name}</Text>}
      {profile?.lightning_address && <Ionicons name="qr-code" size={24} color={theme.colors.primary} />}
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
});
