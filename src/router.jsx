import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import PageWrapper from './components/PageWrapper.jsx';

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
    index: true,
    element: (
      <PageWrapper>
        <PageHome />
      </PageWrapper>
    ),
  },
  {
    path: 'editorial',
    children: [
      {
        index: true,
        element: (
          <PageWrapper>
            <EditorialIndex />
          </PageWrapper>
        ),
      },
      {
        path: 'articles',
        children: [
          {
            index: true,
            loader: usersLoader,
            element: (
              <PageWrapper>
                <EditorialArticles />
              </PageWrapper>
            ),
          },
          {
            path: 'user/:id',
            loader: userLoader,
            element: (
              <PageWrapper>
                <UserProfile />
              </PageWrapper>
            ),
            children: [
              {
                path: 'posts',
                loader: postsLoader,
                element: (
                  <PageWrapper>
                    <UserPosts />
                  </PageWrapper>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router; 