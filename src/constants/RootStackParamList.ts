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
