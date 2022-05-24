import React from 'react';
import { useRoutes } from 'react-router-dom';

import BodyLayout from '@/components/layouts/BodyLayout';
import HomepageLayout from '@/components/layouts/HomepageLayout';
import NotFound from '@/pages/NotFound/NotFound';
import Loading from '@/components/ui/Loading';

const Login = React.lazy(() => import('@/pages/Login'));

const Homepage = React.lazy(() => import('@/pages/main/Homepage'));

const Routes = () => {
  const elements = useRoutes([
    {
      element: <BodyLayout />,
      path: '/',
      children: [
        {
          element: <HomepageLayout />,
          children: [
            {
              path: '/',
              element: <Homepage />,
            },
            {
              element: <NotFound />,
              path: '*',
            },
          ],
        },
      ],
    },
    {
      element: (
        <React.Suspense fallback={<Loading />}>
          <Login />
        </React.Suspense>
      ),
      path: '/login',
    },
  ]);

  return elements;
};

export default Routes;
