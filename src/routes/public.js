// import { lazyImport } from '../utils/lazyImport';

// const { AuthRoutes } = lazyImport(
//   () => import('../features/auth'),
//   'AuthRoutes'
// );

import { AuthRoutes } from '../features/auth';

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
];
