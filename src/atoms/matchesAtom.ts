import { LeagueSchedule } from '@/helpers/matchesHelper';
import { atom } from 'jotai';

export type TAllMatchesIdAtom = Record<number, string>;
export const AllMatchesIdAtom = atom<TAllMatchesIdAtom>({});

export type TCurrentMatchIdAtom = { week: number; id: string } | null;

export const currentMatchAtom = atom<TCurrentMatchIdAtom>(null);

export const allMatchupsWithPointsAtom = atom<LeagueSchedule | undefined>(
  undefined,
);
