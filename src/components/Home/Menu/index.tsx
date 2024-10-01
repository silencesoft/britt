import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FAB, Portal } from 'react-native-paper';

import { RootNavProps } from 'src/constants/RootNavProps';

type Props = {};

const Menu = (props: Props) => {
  const [state, setState] = useState({ open: false });
  const navigation = useNavigation<RootNavProps>();

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
          {
            icon: 'currency-usd',
            label: 'Invoices',
            onPress: () => navigation.navigate('Payments'),
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
