import SettingsRow from './SettingsRow';

type ManageLeagueNameProps = {
  leagueName: string;
};
const ManageLeagueName = ({ leagueName }: ManageLeagueNameProps) => {
  console.log('leagueName', leagueName);
  return (
    <>
      <SettingsRow
        label="League Name"
        value={leagueName}
        onPress={() => {
          console.log('League Name');
        }}
        style={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      />
    </>
  );
};

export default ManageLeagueName;
