import Constants from 'expo-constants';
import * as Linking from 'expo-linking';
import * as LocalAuthentication from 'expo-local-authentication';
import { useSetAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, List, Switch, Text } from 'react-native-paper';

import { useSettings } from 'src/hooks/useSettings';
import { useTheme } from 'src/providers/ThemeProvider';
import { userAtom } from 'src/state/user';

type Props = {};

const SettingsScreen = (props: Props) => {
  const setUser = useSetAtom(userAtom);
  const { settings, setValue } = useSettings();
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const { isDarkTheme, setThemeType } = useTheme();
  console.log({ settings });
  const handleLogout = () => {
    setUser('');
  };

  const handleUseBiometric = () => {
    setValue('biometric', !settings.biometric);
  };

  const handleUseDarkTheme = () => {
    setThemeType(settings.darkTheme === true ? 'light' : 'dark');
    setValue('darkTheme', !settings.darkTheme);
  };

  const handleDonate = () => {
    Linking.openURL('https://lncoffee.me/silencesoft');
  };

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const biometricRecords = await LocalAuthentication.isEnrolledAsync();
      setIsBiometricSupported(compatible && biometricRecords);
    })();
  });

  return (
    <View style={styles.container}>
      <View>
        <List.Item
          disabled={!isBiometricSupported}
          onPress={handleUseBiometric}
          title="Use Biometric"
          right={() => <Switch disabled={!isBiometricSupported} value={isBiometricSupported && settings.biometric} />}
        />
        <List.Item
          onPress={handleUseDarkTheme}
          title="Use Dark Theme"
          right={() => (
            <Switch
              value={settings.darkTheme !== undefined ? settings.darkTheme : isDarkTheme}
              onChange={handleUseDarkTheme}
            />
          )}
        />
        <Divider />
        <List.Item onPress={handleLogout} title="Sign out" style={{ width: '100%' }} />
        <Divider />
        <List.Item onPress={handleDonate} title="Buy me a ⚡ Coffee" />
      </View>
      <View style={styles.versionContainer}>
        <Text>Britt v. {Constants?.manifest?.version}</Text>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 40,
  },
  versionContainer: {
    padding: 20,
    alignItems: 'flex-end',
  },
});
