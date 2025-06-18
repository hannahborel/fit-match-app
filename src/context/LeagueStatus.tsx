import { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  leagueStatus: boolean;
  setLeagueStatus: (status: boolean) => void;
}

const LeagueStatusContext = createContext<UserContextType | undefined>(undefined);

export function LeagueStatusProvider({ children }: { children: ReactNode }) {
  const [leagueStatus, setLeagueStatus] = useState(false);

  return (
    <LeagueStatusContext.Provider value={{ leagueStatus, setLeagueStatus }}>
      {children}
    </LeagueStatusContext.Provider>
  );
}

export function useLeagueStatus() {
  const context = useContext(LeagueStatusContext);
  if (context === undefined) {
    throw new Error('useLeagueStatus must be used within a LeagueStatusProvider');
  }
  return context;
}
