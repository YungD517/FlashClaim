import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const DEMO_USERS = {
  'user@flashclaim.com': { id: '1', name: 'Alex Johnson', email: 'user@flashclaim.com', role: 'policyholder', avatar: 'AJ' },
  'admin@flashclaim.com': { id: '2', name: 'Sarah Chen', email: 'admin@flashclaim.com', role: 'admin', avatar: 'SC' },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, _password) => {
    const found = DEMO_USERS[email.toLowerCase()];
    if (found) {
      setUser(found);
      return { success: true, user: found };
    }
    return { success: false, error: 'Invalid credentials. Try user@flashclaim.com or admin@flashclaim.com' };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
