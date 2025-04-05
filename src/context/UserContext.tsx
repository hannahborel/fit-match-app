import { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  leagueStatus: boolean;
  setLeagueStatus: (status: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [leagueStatus, setLeagueStatus] = useState(false);

  return (
    <UserContext.Provider value={{ leagueStatus, setLeagueStatus }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
