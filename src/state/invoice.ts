import { TokenResponse } from 'expo-auth-session';
import { atom } from 'jotai';

import { Payment } from 'src/interfaces/payment';
import { getIncomingInvoices } from 'src/services/getIncomingInvoices';
import { getOutgoingInvoices } from 'src/services/getOutgingInvoices';
import { userAtom } from './user';

export const externalInvoiceAtom = atom('');

export const resetIncomingPaymentsAtom = atom(false);

export const incomingPaymentsAtom = atom<Promise<Payment[]>>(async (get) => {
  const resetIncomingPayments = get(resetIncomingPaymentsAtom);
  const user: TokenResponse = await get(userAtom);
  const payments = await getIncomingInvoices(user.accessToken);

  return payments;
});

export const resetOutgoingPaymentsAtom = atom(false);

export const outgoingPaymentsAtom = atom<Promise<Payment[]>>(async (get) => {
  const resetOutgoingPayments = get(resetOutgoingPaymentsAtom);
  const user: TokenResponse = await get(userAtom);
  const payments = await getOutgoingInvoices(user.accessToken);

  return payments;
});
