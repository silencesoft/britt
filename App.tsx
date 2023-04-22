import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';

import MainProvider from 'src/providers/MainProvider';

export default function App() {
  return (
    <MainProvider>
      <>
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </>
    </MainProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
