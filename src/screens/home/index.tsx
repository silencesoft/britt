import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Home from 'src/components/Home';
import { RootStackParamList } from 'src/constants/RootStackParamList';

type Props = {};

const HomeScreen = (props: Props) => {
  const navigation = useNavigation<RootStackParamList>();

  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});
