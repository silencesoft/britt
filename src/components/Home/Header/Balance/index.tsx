import { useAtomValue } from 'jotai';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { balanceAtom } from 'src/state/user';

type Props = {};

const Balance = (props: Props) => {
  const balance = useAtomValue(balanceAtom);

  return (
    <View>
      <Text variant="displayLarge">
        {balance.balance} {balance.unit}
      </Text>
    </View>
  );
};

export default Balance;
