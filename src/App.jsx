import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import { usersLoader } from './loaders/users';
import { userLoader } from './loaders/user';

const PageHome = lazy(() => import('./routes/index.jsx'));
const EditorialIndex = lazy(() => import('./routes/editorial/index.jsx'));
const EditorialArticles = lazy(() => import('./routes/editorial/articles.jsx'));
const UserProfile = lazy(() => import('./routes/editorial/user.jsx'));

const router = createBrowserRouter([
  {
    index: true,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PageHome />
      </Suspense>
    ),
  },
  {
    path: 'editorial',
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <EditorialIndex />
          </Suspense>
        ),
      },
      {
        path: 'articles',
        children: [
          {
            index: true,
            loader: usersLoader,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <EditorialArticles />
              </Suspense>
            ),
          },
          {
            path: 'user/:id',
            loader: userLoader,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <UserProfile />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}