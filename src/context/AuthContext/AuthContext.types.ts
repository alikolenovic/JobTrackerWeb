export interface AuthContextType {
  isAuthenticated: boolean;
  userInfo: any;
  login: () => void;
  logout: () => void;
  accessToken: string | null;
}

interface UserInfo {
  test: any;
}
