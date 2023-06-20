import React from 'react';
import { Text } from 'react-native-paper';

type Props = {
  children: JSX.Element;
};

const Time = ({ children }: Props) => {
  return <Text>{children}</Text>;
};

export default Time;
