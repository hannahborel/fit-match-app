import React from 'react';
import SettingsRow from './SettingsRow';

type LeagueDurationProps = {
  leagueId: string;
  weeks: number;
  onValueChange?: (newWeeks: number) => void;
  disabled?: boolean;
};

const LeagueDuration = ({ leagueId, weeks, onValueChange, disabled = false }: LeagueDurationProps) => {
  return (
    <SettingsRow
      label="League Duration"
      value={`${weeks} weeks`}
      disabled={disabled}
    />
  );
};

export default LeagueDuration;
