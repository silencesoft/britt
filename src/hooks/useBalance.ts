import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';

import { balanceAtom, resetBalanceAtom, userAtom } from 'src/state/user';
import { shouldUpdateToken } from 'src/utils/shouldUpdateToken';

export const useBalance = () => {
  const balance = useAtomValue(balanceAtom);
  const [resetBalance, setResetBalance] = useAtom(resetBalanceAtom);
  const [user, setUser] = useAtom(userAtom);

  const reloadBalance = () => {
    setResetBalance(!resetBalance);
  };

  useEffect(() => {
    const reloadUser = async () => {
      const token = await shouldUpdateToken(user);

      setUser(token);
    };

    if (balance?.error) {
      reloadUser();
    }
  }, [balance]);

  return {
    balance,
    reloadBalance,
  };
};
