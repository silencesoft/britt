import { atom } from 'jotai';
import { loadable } from 'jotai/utils';
import { Balance } from 'src/interfaces/user';
import { getBalance } from 'src/services/getBalance';
import { getValueFor, save } from 'src/utils/store';

export const userPromiseAtom = atom<Promise<string>>(async () => (await getValueFor('code')) as string);

export const loadUserAtom = loadable(userPromiseAtom);

const userWrittenAtom = atom(null);

export const userAtom = atom(
  (get) => get(userWrittenAtom) ?? get(loadUserAtom).data,
  (get, set, newValue) => {
    const nextValue = typeof newValue === 'function' ? newValue(get(loadUserAtom).data) : newValue;

    save('code', nextValue);
    set(userWrittenAtom, nextValue);
  }
);

export const balanceAtom = atom(async (get) => {
  const user = get(userAtom);

  const balance: Balance = await getBalance(user);

  return balance;
});
