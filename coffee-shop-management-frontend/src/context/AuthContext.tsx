import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  currentUserEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);  

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", { email, password });
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      setCurrentUserEmail(user.email);
      return true;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setCurrentUserEmail(null);  
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, currentUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
