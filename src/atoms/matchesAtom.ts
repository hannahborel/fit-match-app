import {
  getCurrentWeekMatchIds,
  mapAllWeeksToMatchIds,
} from '@/helpers/matchesHelper';
import { atom, useAtomValue } from 'jotai';

import { leagueAtom } from './leaugeAtom';

export type TAllMatchesIdAtom = Record<number, string>;
export const AllMatchesIdAtom = atom<TAllMatchesIdAtom>({});

export type TCurrentMatchIdAtom = { week: number; id: string } | null;
export const currentMatchAtom = atom<TCurrentMatchIdAtom>(null);

export const matchesDataInitializerAtom = atom(null, (get, set) => {
  const league = useAtomValue(leagueAtom);
  if (!league) return;

  const allMatchIds = mapAllWeeksToMatchIds(league.matches);
  const currentMatch = getCurrentWeekMatchIds(league);

  set(AllMatchesIdAtom, allMatchIds);
  set(currentMatchAtom, currentMatch);
});
