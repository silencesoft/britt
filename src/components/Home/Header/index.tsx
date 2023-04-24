import React from 'react';
import { View } from 'react-native';

import Balance from './Balance';

type Props = {};

const Header = (props: Props) => {
  return (
    <View>
      <Balance />
    </View>
  );
};

export default Header;
