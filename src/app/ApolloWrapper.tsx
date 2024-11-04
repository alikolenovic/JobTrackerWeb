'use client';
import React, { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext/AuthContext';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../../apolloClient';

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  const { accessToken } = useAuth();
  const client = React.useMemo(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    () => createApolloClient(accessToken),
    [accessToken],
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
