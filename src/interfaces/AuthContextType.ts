export interface AuthContextType {
  username: string | null;
  login: (email: string, password: string) => Promise<string>;
  logout: () => void;
  token: string | null;
}