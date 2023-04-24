import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FAB, Portal } from 'react-native-paper';

import { RootStackParamList } from 'src/constants/RootStackParamList';

type Props = {};

const Menu = (props: Props) => {
  const [state, setState] = useState({ open: false });
  const navigation = useNavigation<RootStackParamList>();

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;
  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'bitcoin'}
        actions={[
          {
            icon: 'arrow-up',
            label: 'Send',
            onPress: () => navigation.navigate('Scan'),
          },
          {
            icon: 'arrow-down',
            label: 'Receive',
            onPress: () => navigation.navigate('Receive'),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
};

export default Menu;
