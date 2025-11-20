import React from 'react';
import SettingsRow from './SettingsRow';

type UpdateLeagueStartDateDemo = {
  startDate: Date;
  leagueId: string;
  disabled?: boolean;
};

export default function UpdateLeagueStartDateDemo({
  startDate,
  leagueId,
  disabled = false,
}: UpdateLeagueStartDateDemo) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <SettingsRow
      label="Start Date"
      value={formatDate(startDate)}
      disabled={disabled}
      style={{
        borderBottomWidth: 0,
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
      }}
    />
  );
}
