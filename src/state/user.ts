import { TokenResponse } from 'expo-auth-session';
import { atom } from 'jotai';
import { loadable } from 'jotai/utils';

import { Balance } from 'src/interfaces/user';
import { getBalance } from 'src/services/getBalance';
import { getProfile } from 'src/services/getProfile';
import { shouldUpdateToken } from 'src/utils/shouldUpdateToken';
import { getValueFor, save } from 'src/utils/store';

export const userPromiseAtom = atom<Promise<TokenResponse>>(
  async () => JSON.parse((await getValueFor('code')) || '') as TokenResponse
);

export const loadUserAtom = loadable(userPromiseAtom);

const userWrittenAtom = atom(null);

export const userAtom = atom(
  (get) => get(userWrittenAtom) ?? get(loadUserAtom).data,
  (get, set, newValue) => {
    const nextValue = typeof newValue === 'function' ? newValue(get(loadUserAtom).data) : newValue;

    save('code', JSON.stringify(nextValue));
    set(userWrittenAtom, nextValue);
  }
);

export const balanceAtom = atom(async (get) => {
  const user: TokenResponse = await get(userAtom);
  const token: TokenResponse = await shouldUpdateToken(user);
  const balance: Balance = await getBalance(token.accessToken);

  return balance;
});

export const profileAtom = atom(async (get) => {
  const user: TokenResponse = await get(userAtom);
  const token: TokenResponse = await shouldUpdateToken(user);
  const profile = await getProfile(token.accessToken);

  return profile;
});
