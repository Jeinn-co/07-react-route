import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from './layouts/MainLayout.jsx';

// Loaders
import { usersLoader } from './loaders/users.jsx';
import { userLoader } from './loaders/user.jsx';
import { allPostsLoader } from './loaders/allPosts.jsx';
import { postLoader } from './loaders/post.jsx';

// Page Components (Lazy Loaded)
const PageHome = lazy(() => import('./routes/home/index.jsx'));
const PageDashboard = lazy(() => import('./routes/home/dashboard.jsx'));
const UserList = lazy(() => import('./routes/users/index.jsx'));
const UserProfile = lazy(() => import('./routes/users/user.jsx'));
const PostList = lazy(() => import('./routes/posts/index.jsx'));
const PostDetail = lazy(() => import('./routes/posts/post.jsx'));

// Helper for Suspense
const SuspenseWrapper = ({ children }) => <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        handle: { crumb: 'Home' },
        element: <SuspenseWrapper><PageHome /></SuspenseWrapper>,
      },
      {
        path: 'dashboard',
        handle: { crumb: 'Dashboard' },
        element: <SuspenseWrapper><PageDashboard /></SuspenseWrapper>,
      },
      {
        path: 'users',
        handle: { crumb: 'Users' },
        children: [
          {
            index: true,
            loader: usersLoader,
            element: <SuspenseWrapper><UserList /></SuspenseWrapper>,
          },
          {
            path: ':id',
            loader: userLoader,
            handle: { crumb: (data) => data?.name || 'User Detail' },
            element: <SuspenseWrapper><UserProfile /></SuspenseWrapper>,
          },
        ],
      },
      {
        path: 'posts',
        handle: { crumb: 'Posts' },
        children: [
          {
            index: true,
            loader: allPostsLoader,
            element: <SuspenseWrapper><PostList /></SuspenseWrapper>,
          },
          {
            path: ':id',
            loader: postLoader,
            handle: { crumb: (data) => data?.title || 'Post Detail' },
            element: <SuspenseWrapper><PostDetail /></SuspenseWrapper>,
          },
        ],
      },
    ],
  },
]);

export default router; 