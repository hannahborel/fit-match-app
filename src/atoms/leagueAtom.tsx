import { League } from 'hustle-types';
import { atom } from 'jotai';

export const leagueAtom = atom<null | {
  hasLeague: boolean;
  leagueInfo: League;
}>;
