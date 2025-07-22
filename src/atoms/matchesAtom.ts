import {
  getCurrentWeekMatchIds,
  mapAllWeeksToMatchIds,
} from '@/helpers/matchesHelper';
import { atom } from 'jotai';
import { leagueQueryAtom } from './leagueQueryAtom';

export type TAllMatchesIdAtom = Record<number, string>;
export const AllMatchesIdAtom = atom<TAllMatchesIdAtom>({});

export type TCurrentMatchIdAtom = { week: number; id: string } | null;
export const currentMatchAtom = atom<TCurrentMatchIdAtom>(null);

export const matchesDataInitializerAtom = atom(null, (get, set) => {
  const { data: league } = get(leagueQueryAtom);
  if (!league) return;

  const allMatchIds = mapAllWeeksToMatchIds(league.matches);
  const currentMatch = getCurrentWeekMatchIds(league);

  set(AllMatchesIdAtom, allMatchIds);
  set(currentMatchAtom, currentMatch);
});
