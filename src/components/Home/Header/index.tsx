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
    paddingTop: 40,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
  },
});
