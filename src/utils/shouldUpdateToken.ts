import * as AuthSession from 'expo-auth-session';
import { RefreshTokenRequestConfig, TokenResponse } from 'expo-auth-session';

import { save } from './store';

export const shouldUpdateToken = async (tokenConfig: TokenResponse): Promise<TokenResponse> => {
  const tokenEndpoint = `${process.env.API_URL}/oauth/token`;
  let tokenResponse = new TokenResponse(tokenConfig);

  if (tokenResponse.shouldRefresh()) {
    // All we need here is the clientID and refreshToken because the function handles setting our grant type based on
    // the type of request configuration (refreshtokenrequestconfig in our example)
    const refreshConfig: RefreshTokenRequestConfig = {
      clientId: process.env.CLIENT_ID || '',
      refreshToken: tokenConfig.refreshToken,
      clientSecret: process.env.CLIENT_SECRET || '',
    };
    const endpointConfig: Pick<AuthSession.DiscoveryDocument, 'tokenEndpoint'> = { tokenEndpoint };

    // pass our refresh token and get a new access token and new refresh token
    tokenResponse = await tokenResponse.refreshAsync(refreshConfig, endpointConfig);
    save('code', JSON.stringify(tokenResponse));
  }

  return tokenResponse;
};
