import { useAtomValue } from 'jotai';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { balanceAtom, userAtom } from 'src/state/user';

type Props = {};

const Balance = (props: Props) => {
  const user = useAtomValue(userAtom);
  const balance = useAtomValue(balanceAtom);

  console.log({ user, balance });

  return (
    <View>
      <Text variant="displayLarge">
        {balance.balance} {balance.unit}
      </Text>
    </View>
  );
};

export default Balance;
