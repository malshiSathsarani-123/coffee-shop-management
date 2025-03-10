import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  currentUserEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);  

  const users = [
    { email: "admin@example.com", password: "password" },
    { email: "user1@example.com", password: "user1pass" },
    { email: "user2@example.com", password: "user2pass" },
    { email: "user3@example.com", password: "user3pass" },
    { email: "user4@example.com", password: "user4pass" }
  ];
  
  const login = (email: string, password: string) => {
    const userExists = users.some(user => user.email === email && user.password === password);
    
    if (userExists) {
      setIsAuthenticated(true);
      setCurrentUserEmail(email);  
      return true;
    }
    return false;
  };
  

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUserEmail(null);  
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout ,currentUserEmail}}>
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
