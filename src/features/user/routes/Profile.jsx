import { useFirebaseAuth } from '../../../lib/auth';
import { LogoutButton } from '../../auth/components/LogoutButton';

export const Profile = () => {
  const { user } = useFirebaseAuth();

  if (!user) return null;
  return (
    <>
      <h1>Welcome {user.displayName} </h1>
      <LogoutButton />
    </>
  );
};
