import { atom } from 'jotai';

export type TAllMatchesIdAtom = Record<number, string>;
export const AllMatchesIdAtom = atom<TAllMatchesIdAtom>({});

export type TCurrentMatchIdAtom = string;
export const currentMatchAtom = atom<TCurrentMatchIdAtom>('');
