import { Navigate, Outlet } from 'react-router-dom';

import { lazyImport } from '../utils/lazyImport';

const { Profile } = lazyImport(() => import('../features/user'), 'Profile');

const App = () => {
  return <Outlet />;
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '/user', element: <Profile /> },
      { path: '*', element: <Navigate to='.' /> },
    ],
  },
];
