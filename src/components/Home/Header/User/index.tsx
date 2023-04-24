import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAtomValue } from 'jotai';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import { RootStackParamList } from 'src/constants/RootStackParamList';
import { useTheme } from 'src/providers/ThemeProvider';
import { profileAtom } from 'src/state/user';
import { save } from 'src/utils/store';

type Props = {};

const User = (props: Props) => {
  const navigation = useNavigation<RootStackParamList>();
  const profile = useAtomValue(profileAtom);
  const { theme } = useTheme();

  if (!profile) {
    save('code', '');
  }

  return (
    <View style={styles.container}>
      {profile?.name && <Text variant="bodyLarge">@{profile.name}</Text>}
      {profile?.lightning_address && (
        <TouchableOpacity onPress={() => navigation.navigate('Receive')}>
          <Ionicons name="qr-code" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      )}
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
