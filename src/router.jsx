import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './layouts/MainLayout.jsx';

import { usersLoader } from './loaders/users';
import { userLoader } from './loaders/user';
import { postsLoader } from './loaders/posts.jsx';

const PageHome = lazy(() => import('./routes/index.jsx'));
const EditorialIndex = lazy(() => import('./routes/editorial/index.jsx'));
const EditorialArticles = lazy(() => import('./routes/editorial/articles.jsx'));
const UserProfile = lazy(() => import('./routes/editorial/user.jsx'));
const UserPosts = lazy(() => import('./routes/editorial/posts.jsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        handle: { crumb: 'Home' },
        element: <Suspense fallback={<div>Loading...</div>}><PageHome /></Suspense>,
      },
      {
        path: 'editorial',
        handle: { crumb: 'Editorial' },
        children: [
          {
            index: true,
            element: <Suspense fallback={<div>Loading...</div>}><EditorialIndex /></Suspense>,
          },
          {
            path: 'articles',
            handle: { crumb: 'Articles' },
            children: [
              {
                index: true,
                loader: usersLoader,
                element: <Suspense fallback={<div>Loading...</div>}><EditorialArticles /></Suspense>,
              },
              {
                path: 'user/:id',
                loader: userLoader,
                handle: { crumb: (data) => `User: ${data.name}` },
                element: <Suspense fallback={<div>Loading...</div>}><UserProfile /></Suspense>,
                children: [
                  {
                    path: 'posts',
                    loader: postsLoader,
                    handle: { crumb: 'Posts' },
                    element: <Suspense fallback={<div>Loading...</div>}><UserPosts /></Suspense>,
                  },
                ],
              },
            ],
          },
        ],
      },
    ]
  }
]);

export default router; 