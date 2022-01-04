import { useFirebaseAuth } from '../../../lib/auth';

export const Profile = () => {
  const { user } = useFirebaseAuth();

  if (!user) return null;
  return (
    <h1>
      Welcome{' '}
      {user.firstName || 'something broke user.firstname is not avaliable'}
    </h1>
  );
};
