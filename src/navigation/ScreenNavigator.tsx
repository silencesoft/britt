import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';

import { RootStackParamList } from 'src/constants/RootStackParamList';
import HomeScreen from 'src/screens/home';
import ScanScreen from 'src/screens/scan';
import SettingsScreen from 'src/screens/settings';

const Tab = createMaterialTopTabNavigator<RootStackParamList>();

type Props = {};

const ScreenNavigator = (props: Props) => {
  return (
    <Tab.Navigator initialRouteName="Home" tabBar={() => <></>}>
      <Tab.Screen name="Scan" component={ScanScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default ScreenNavigator;
