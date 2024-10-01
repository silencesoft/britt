import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { TabScreen, Tabs } from 'react-native-paper-tabs';

import { RootNavProps } from 'src/constants/RootNavProps';
import PaymentsScreen from 'src/screens/payments';

type Props = {};

const PaymentsNavigator = (props: Props) => {
  const navigation = useNavigation<RootNavProps>();

  return (
    <>
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Invoices" />
        </Appbar.Header>
      </View>
      <Tabs
      // defaultIndex={0} // default = 0
      // uppercase={false} // true/false | default=true | labels are uppercase
      // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
      // iconPosition // leading, top | default=leading
      // style={{ backgroundColor:'#fff' }} // works the same as AppBar in react-native-paper
      // dark={false} // works the same as AppBar in react-native-paper
      // theme={} // works the same as AppBar in react-native-paper
      // mode="scrollable" // fixed, scrollable | default=fixed
      // onChangeIndex={(newIndex) => {}} // react on index change
      // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
      // disableSwipe={false} // (default=false) disable swipe to left/right gestures
      >
        <TabScreen label="Incoming" icon="arrow-down">
          <PaymentsScreen type={0} />
        </TabScreen>
        <TabScreen label="Outgoing" icon="arrow-up">
          <PaymentsScreen type={1} />
        </TabScreen>
      </Tabs>
    </>
  );
};

export default PaymentsNavigator;
