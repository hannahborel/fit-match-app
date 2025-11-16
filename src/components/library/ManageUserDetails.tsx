import SettingsRow from './SettingsRow';

type ManageLeagueNameProps = {
  leagueName: string;
};
const ManageLeagueName = ({ leagueName }: ManageLeagueNameProps) => {
  return (
    <>
      <SettingsRow
        label="League Name"
        value={leagueName}
        onPress={() => {
          console.log('First Name');
        }}
      />
    </>
  );
};

export default ManageLeagueName;
