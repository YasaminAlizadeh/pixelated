import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";

interface User {
  id: number;
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: { username: string; token: string }) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("pixelated_token");
    const storedUser = localStorage.getItem("pixelated_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useCallback(
    (data: { username: string; token: string; id?: number }) => {
      setToken(data.token);
      const userInfo = { username: data.username, id: data.id || 0 };
      setUser(userInfo);

      localStorage.setItem("pixelated_token", data.token);
      localStorage.setItem("pixelated_user", JSON.stringify(userInfo));
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("pixelated_token");
    localStorage.removeItem("pixelated_user");
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
