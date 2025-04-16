import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { trpc } from "../utils/trpc";
import { AuthContextType } from "@/types/authContext";
import { useRouter } from "next/router";

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const utils = trpc.useUtils();

  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data: user, isLoading: isUserLoading } = trpc.auth.me.useQuery(
    undefined,
    {
      // Only fetch if we have a token
      enabled: !!token,
    }
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken); 
    setIsLoading(false);
  }, []);
  


  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    utils.auth.me.invalidate();
    router.push("/signin");
  };

  const value = {
    user: user || null,
    isLoading: isLoading || isUserLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
