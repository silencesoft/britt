import { atom } from 'jotai';
import { loadable } from 'jotai/utils';

import { Settings } from 'src/interfaces/settings';
import { getValueFor, save } from 'src/utils/store';

const defaultaValues: Settings = {
  biometric: true,
  darkTheme: undefined,
};

export const settingsPromiseAtom = atom<Promise<Settings | null>>(async () => {
  const settings = JSON.parse((await getValueFor('settings')) || JSON.stringify(defaultaValues)) as Settings;

  return settings;
});

export const loadSettingsAtom = loadable(settingsPromiseAtom);

const settingsWrittenAtom = atom<Settings | null>(null);

export const settingsAtom = atom(
  (get) => get(settingsWrittenAtom) ?? get(loadSettingsAtom).data,
  (get, set, newValue) => {
    const nextValue = typeof newValue === 'function' ? newValue(get(loadSettingsAtom).data) : newValue;

    save('settings', JSON.stringify(nextValue));
    set(settingsWrittenAtom, nextValue);
  }
);
