import React from 'react';
import { StyleSheet, View } from 'react-native';

import Content from './Content';
import Header from './Header';
import Menu from './Menu';

type Props = {};

const Home = (props: Props) => {
  return (
    <View style={styles.container}>
      <Header />
      <Content />
      <Menu />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
