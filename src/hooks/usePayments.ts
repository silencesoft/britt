import { useAtom, useAtomValue } from 'jotai';
import {
  incomingPaymentsAtom,
  outgoingPaymentsAtom,
  resetIncomingPaymentsAtom,
  resetOutgoingPaymentsAtom,
} from 'src/state/invoice';

export const usePayments = () => {
  const incomingPayments = useAtomValue(incomingPaymentsAtom);
  const outgoingPayments = useAtomValue(outgoingPaymentsAtom);
  const [resetIncoming, setResetIncoming] = useAtom(resetIncomingPaymentsAtom);
  const [resetOutgoing, setResetOutgoing] = useAtom(resetOutgoingPaymentsAtom);

  const reloadIncoming = () => {
    setResetIncoming(!resetIncoming);
  };

  const reloadOutgoing = () => {
    setResetOutgoing(!resetOutgoing);
  };

  return {
    incomingPayments,
    outgoingPayments,
    reloadIncoming,
    reloadOutgoing,
  };
};
