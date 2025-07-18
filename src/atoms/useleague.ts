import React from 'react';

import { useAtomValue } from 'jotai';
import { leagueAtom } from './leagueAtom';

export const useLeague = () => {
  return useAtomValue(leagueAtom);
};
