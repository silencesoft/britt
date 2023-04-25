import { useIsFocused } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Scan from 'src/components/Scan';

type Props = {};

const ScanScreen = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') setHasPermission(true);
      setLoading(false);
    })();
  }, []);

  if (!isFocused) {
    return (
      <View style={styles.container}>
        <Text>&nbsp;</Text>
      </View>
    );
  }

  if (loading)
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );

  if (!hasPermission)
    return (
      <View style={styles.container}>
        <Text>No camera permission</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Scan />
    </View>
  );
};

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
