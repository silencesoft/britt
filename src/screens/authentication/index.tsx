import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  handleAuthenticate: () => void;
};

const Authentication = ({ handleAuthenticate }: Props) => {
  handleAuthenticate();

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
};

export default Authentication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
