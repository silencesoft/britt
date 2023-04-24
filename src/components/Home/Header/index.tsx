import React from 'react';
import { StyleSheet, View } from 'react-native';

import Balance from './Balance';
import User from './User';

type Props = {};

const Header = (props: Props) => {
  return (
    <View style={styles.container}>
      <User />
      <Balance />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
});
