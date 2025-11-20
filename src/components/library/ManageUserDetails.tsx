import SettingsRow from './SettingsRow';

type ManageLeagueNameProps = {
  leagueName: string;
  disabled?: boolean;
};
const ManageLeagueName = ({ leagueName, disabled = false }: ManageLeagueNameProps) => {
  return (
    <>
      <SettingsRow
        label="League Name"
        value={leagueName}
        onPress={() => {
          console.log('League Name');
        }}
        disabled={disabled}
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      />
    </>
  );
};

export default ManageLeagueName;
