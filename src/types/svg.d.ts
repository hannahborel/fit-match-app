declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
export type LeagueData = {
  leagueName: string;
  leagueSize: number;
  regularSeasonWeeks: number;
  playoffWeeks: number;
};
