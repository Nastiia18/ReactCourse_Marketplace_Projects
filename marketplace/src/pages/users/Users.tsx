import UsersTableContainer from './components/table/UserTableContainer';
import PageTitle from '../../components/layout/PageTitle';
const UsersPage: React.FC = () => {
  return (
    <div>
      <PageTitle title="Users" />
      <UsersTableContainer />
    </div>
  );
};

export default UsersPage;
