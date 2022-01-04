import { useRoutes } from 'react-router-dom';

import { Landing } from '../features/misc/routes/Landing';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useFirebaseAuth } from '../lib/auth';

export const AppRoutes = () => {
  const auth = useFirebaseAuth();

  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
