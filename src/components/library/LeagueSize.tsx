import React from 'react';
import SettingsRow from './SettingsRow';

type LeagueSizeProps = {
  leagueId: string;
  leagueSize: number;
  onValueChange?: (newSize: number) => void;
  disabled?: boolean;
};

const LeagueSize = ({ leagueId, leagueSize, onValueChange, disabled = false }: LeagueSizeProps) => {
  return (
    <SettingsRow
      label="League Size"
      value={leagueSize}
      disabled={disabled}
    />
  );
};

export default LeagueSize;
