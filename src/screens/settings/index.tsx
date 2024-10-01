import Constants from "expo-constants";
import * as Linking from "expo-linking";
import * as LocalAuthentication from "expo-local-authentication";
import { useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Divider,
  List,
  SegmentedButtons,
  Switch,
  Text,
} from "react-native-paper";

import { useSettings } from "src/hooks/useSettings";
import { useTheme } from "src/providers/ThemeProvider";
import { userAtom } from "src/state/user";

type Props = {};

const SettingsScreen = (props: Props) => {
  const setUser = useSetAtom(userAtom);
  const { settings, setValue } = useSettings();
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const handleLogout = () => {
    setUser("");
  };

  const handleUseBiometric = () => {
    setValue("biometric", !settings.biometric);
  };

  const handleDonate = () => {
    Linking.openURL("https://lncoffee.me/silencesoft");
  };

  const handleChangeTheme = (value: string) => {
    if (value === "system") {
      setValue("darkTheme", undefined);
      return;
    }

    setValue("darkTheme", value === "dark");
  };

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const biometricRecords = await LocalAuthentication.isEnrolledAsync();
      setIsBiometricSupported(compatible && biometricRecords);
    })();
  });

  const themeValue =
    settings.darkTheme !== undefined
      ? settings?.darkTheme
        ? "dark"
        : "light"
      : "system";

  return (
    <View style={styles.container}>
      <View>
        <List.Item
          disabled={!isBiometricSupported}
          onPress={handleUseBiometric}
          title="Use Biometric"
          right={() => (
            <Switch
              disabled={!isBiometricSupported}
              value={isBiometricSupported && settings.biometric}
            />
          )}
        />
        <View style={{ paddingLeft: 16, paddingRight: 16 }}>
          <Text style={{ marginBottom: 10, fontSize: 16 }}>
            Theme
          </Text>
          <SegmentedButtons
            value={themeValue}
            onValueChange={handleChangeTheme}
            buttons={[
              {
                value: "light",
                label: "Light",
              },
              {
                value: "dark",
                label: "Dark",
              },
              { value: "system", label: "System" },
            ]}
            style={{ marginBottom: 16 }}
          />
        </View>

        <Divider />
        <List.Item
          onPress={handleLogout}
          title="Sign out"
          style={{ width: "100%" }}
        />
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
    justifyContent: "space-between",
    paddingTop: 40,
  },
  versionContainer: {
    padding: 20,
    alignItems: "flex-end",
  },
});
