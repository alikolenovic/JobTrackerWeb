'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { CustomJwtPayload } from '@/app/application-layout';
import Loader from '@/components/Loader';
import { useMsal } from '@azure/msal-react';
import { AuthContextType } from './AuthContext.types';

// Define types for the context value

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { instance, accounts } = useMsal();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<CustomJwtPayload | null | false>(
    null,
  );
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const initializeAuth = (): void => {
      if (accounts.length > 0) {
        try {
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Token acquisition failed:', error);
          setIsAuthenticated(false);
        }
        setLoading(false);
        setTimeout(() => setShowContent(true), 800);
      } else {
        setTimeout(() => setLoading(false), 400);
        setTimeout(() => setShowContent(true), 800);
        setUserInfo(false);
      }
    };
    if (instance) {
      void initializeAuth();
    }
  }, [instance, accounts]);

  const login = () => {
    localStorage.setItem('test', 'test');
  };

  const logout = () => {
    void instance.logoutRedirect();
    setIsAuthenticated(false);
    setUserInfo(null);
    setAccessToken(null);
  };

  if (!showContent) {
    return (
      <div
        className={`transition-opacity duration-500 ${
          loading ? 'opacity-100' : 'pointer-events-none opacity-0'
        } flex min-h-screen flex-col items-center justify-center`}
      >
        <Loader />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userInfo, login, logout, accessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
