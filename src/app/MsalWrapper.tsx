// components/MsalWrapper.js
'use client';

import { useEffect, useState } from 'react';
import { MsalProvider } from '@azure/msal-react';
import { initializeMsalInstance } from '../../msalConfig';

export default function MsalWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [msalInstance, setMsalInstance] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeMsal = async () => {
      const instance = await initializeMsalInstance();
      setMsalInstance(instance);
      setLoading(false);
    };
    void initializeMsal();
  }, []);

  if (loading) {
    return <></>;
  }

  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
}
