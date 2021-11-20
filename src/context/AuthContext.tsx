import { createContext } from 'react';

const AuthContext = createContext({});

export async function AuthProvider({ children }) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
