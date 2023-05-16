import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type Props = {
  handleAuthenticate: () => void;
};

const Authentication = ({ handleAuthenticate }: Props) => {
  useEffect(() => {
    handleAuthenticate();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleAuthenticate}>
        <Ionicons name="finger-print" size={48} color="black" />
      </TouchableOpacity>
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
