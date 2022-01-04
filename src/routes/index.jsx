import { useRoutes } from 'react-router-dom';

import { Landing } from '../features/misc';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useFirebaseAuth } from '../lib/auth';

export const AppRoutes = () => {
  const { user, auth } = useFirebaseAuth();

  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return (
    <>
      {element}
      <pre>{JSON.stringify({ routes, user, auth }, null, 2)}</pre>
    </>
  );
};
