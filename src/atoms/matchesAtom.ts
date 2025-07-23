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
