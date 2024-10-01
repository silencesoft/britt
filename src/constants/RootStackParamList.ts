import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Payment } from 'src/interfaces/payment';

export type RootStackParamList = {
  Screen: undefined;
  Login: undefined;
  Home: undefined;
  Scan: undefined;
  Settings: undefined;
  Receive: undefined;
  Pay: { invoice: string };
  Payments: undefined;
  PaymentsIncoming: { type: number };
  PaymentsOutgoing: { type: number };
  Payment: { invoice: Payment };
};

export type RootNavProps = NativeStackNavigationProp<RootStackParamList>;
