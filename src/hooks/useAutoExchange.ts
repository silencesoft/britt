import { exchangeCodeAsync, TokenResponse } from 'expo-auth-session';
import * as React from 'react';

type State = {
  token: TokenResponse | null;
  exchangeError: Error | null;
};

// A hook to automatically exchange the auth token for an access token.
// this should be performed in a server and not here in the application.
// For educational purposes only:
export const useAutoExchange = (
  clientId: string,
  redirectUri: string,
  discovery: object,
  codeVerifier?: string,
  code?: string
): State => {
  const [state, setState] = React.useReducer((state: State, action: Partial<State>) => ({ ...state, ...action }), {
    token: null,
    exchangeError: null,
  });
  const isMounted = useMounted();

  React.useEffect(() => {
    if (!code) {
      setState({ token: null, exchangeError: null });
      return;
    }

    exchangeCodeAsync(
      {
        clientId,
        clientSecret: process.env.CLIENT_SECRET,
        code,
        redirectUri,
        extraParams: {
          code_verifier: codeVerifier || '',
        },
      },
      discovery
    )
      .then((token) => {
        if (isMounted.current) {
          setState({ token, exchangeError: null });
        }
      })
      .catch((exchangeError) => {
        if (isMounted.current) {
          setState({ exchangeError, token: null });
        }
      });
  }, [code]);

  return state;
};

function useMounted() {
  const isMounted = React.useRef(true);
  React.useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
}
