'use client';

import UserTokens from '@/components/UserTokens';
import { useMsal } from '@azure/msal-react';

export default function LoginPage() {
  const { instance } = useMsal();

  const handleLogin = () => {
    void instance.loginRedirect({
      scopes: ['openid', 'profile', 'email'],
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <UserTokens />
      <button onClick={handleLogin}>Sign in with Azure AD B2C</button>
    </div>
  );
}
