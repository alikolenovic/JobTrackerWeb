// pages/api/auth/[auth0].js
import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
  login: handleLogin({
    authorizationParams: { audience: 'https://dev-stn4f7tikad3zjrr.us.auth0.com/api/v2/' },
  }),
});
