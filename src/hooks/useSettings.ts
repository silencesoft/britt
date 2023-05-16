import { useAtom } from 'jotai';

import { Settings } from 'src/interfaces/settings';
import { settingsAtom } from 'src/state/settings';

export const useSettings = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  const setValue = <Key extends keyof Settings>(key: Key, value: Settings[Key]) => {
    const newSettings: Settings = { ...settings, ...{ [key]: value } };

    setSettings(newSettings);
  };

  return {
    settings,
    setValue,
  };
};
