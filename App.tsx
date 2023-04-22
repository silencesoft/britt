import React from 'react';

import MainNavigator from 'src/navigation/MainNavigator';
import MainProvider from 'src/providers/MainProvider';

export default function App() {
  return (
    <MainProvider>
      <MainNavigator />
    </MainProvider>
  );
}
