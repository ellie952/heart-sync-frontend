export interface AuthContextType {
  username: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
}