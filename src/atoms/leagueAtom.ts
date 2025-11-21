import { League } from 'hustle-types';
import { atom } from 'jotai';

export const leagueAtom = atom<League | null>(null);

// Derived atom: checks if league has started based on status
export const hasLeagueStartedAtom = atom((get) => {
  const league = get(leagueAtom);
  if (!league) return false;
  return league.status === 'active' || league.status === 'complete';
});
