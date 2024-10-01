import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigationState } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import PaginationDot from "react-native-animated-pagination-dot";

import { RootNavProps } from "src/constants/RootNavProps";
import { useTheme } from "src/providers/ThemeProvider";
import HomeScreen from "src/screens/home";
import ScanScreen from "src/screens/scan";
import SettingsScreen from "src/screens/settings";

const Tab = createMaterialTopTabNavigator<RootNavProps>();

type Props = {};

const ScreenNavigator = (props: Props) => {
  const curPage = useNavigationState((state) => state.routes[0].state?.index);
  const { theme } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator initialRouteName="Home" tabBar={() => null}>
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      <View
        style={{
          position: "absolute",
          bottom: 30,
          flex: 1,
          alignItems: "center",
          width: "100%",
        }}
      >
        <PaginationDot
          activeDotColor={theme.colors.primary}
          curPage={typeof curPage === "number" ? curPage : 1}
          maxPage={3}
        />
      </View>
    </View>
  );
};

export default ScreenNavigator;
