import { useRoutes } from 'react-router-dom';

import { Landing } from '@/features/misc';
import { Tearoff } from '@/features/Tearoff';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const auth = { user: false };

  const commonRoutes = [
    { path: '/', element: <Landing /> },
    { path: '/fantasy-calendar', element: <Tearoff /> },
  ];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
