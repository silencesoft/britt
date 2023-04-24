import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';

import { RootStackParamList } from 'src/constants/RootStackParamList';

type Props = {};

const DetailScreen = (props: Props) => {
  const navigation = useNavigation<RootStackParamList>();

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
        <Appbar.Content title="Title" />
      </Appbar.Header>
      <Text>Detail</Text>
    </View>
  );
};

export default DetailScreen;
