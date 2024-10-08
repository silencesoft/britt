import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import React from 'react';
import 'react-native-get-random-values';
import * as encoding from 'text-encoding';

import MainNavigator from 'src/navigation/MainNavigator';
import MainProvider from 'src/providers/MainProvider';

global.Buffer = global.Buffer || require('safe-buffer').Buffer;

Object.assign(global, {
  TextEncoder: encoding.TextEncoder,
  TextDecoder: encoding.TextDecoder,
});

if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return Buffer.from(str, 'binary').toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return Buffer.from(b64Encoded, 'base64').toString('binary');
  };
}

TimeAgo.addDefaultLocale(en);

export default function App() {
  return (
    <MainProvider>
      <MainNavigator />
    </MainProvider>
  );
}
