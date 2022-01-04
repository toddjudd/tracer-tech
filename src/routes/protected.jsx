import { Navigate, Outlet } from 'react-router-dom';

// import { lazyImport } from '../utils/lazyImport';

import { Profile } from '../features/user/routes/Profile';

const App = () => {
  return <Outlet />;
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '/app/profile', element: <Profile /> },
      { path: '*', element: <Navigate to='.' /> },
    ],
  },
];
