import React from 'react';
import SettingsRow from './SettingsRow';

type StartDateProps = {
  startDate: Date;
  leagueId: string;
  disabled?: boolean;
};

export default function StartDate({
  startDate,
  leagueId,
  disabled = false,
}: StartDateProps) {
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
