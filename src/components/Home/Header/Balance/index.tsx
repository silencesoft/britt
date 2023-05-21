import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useSetAtom } from 'jotai';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import { useBalance } from 'src/hooks/useBalance';
import { useTheme } from 'src/providers/ThemeProvider';
import { userAtom } from 'src/state/user';

type Props = {};

const Balance = (props: Props) => {
  const { balance, reloadBalance } = useBalance();
  const { theme } = useTheme();
  const setUser = useSetAtom(userAtom);

  const handleLogout = () => {
    setUser('');
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {!balance.error && (
        <>
          <Text variant="displayLarge">
            {balance.balance} {balance.unit}{' '}
          </Text>
          <Ionicons name="refresh-circle-outline" size={24} color={theme.colors.primary} onPress={reloadBalance} />
        </>
      )}
      {balance.error && (
        <>
          <TouchableOpacity onPress={handleLogout} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons name="error" size={24} color={theme.colors.primary} />
            <Text>Error. Please login again.</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Balance;
