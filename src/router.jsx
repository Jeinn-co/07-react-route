import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "./layouts/MainLayout.jsx";
import SuspenseWrapper from "./components/SuspenseWrapper.jsx";

// Loaders
import { usersLoader } from "./loaders/users.jsx";
import { userLoader } from "./loaders/user.jsx";
import { allPostsLoader } from "./loaders/allPosts.jsx";
import { postLoader } from "./loaders/post.jsx";

// Page Components (Lazy Loaded)
const PageHome = lazy(() => import("./pages/home/index.jsx"));
const PageDashboard = lazy(() => import("./pages/home/dashboard.jsx"));
const UserList = lazy(() => import("./pages/users/index.jsx"));
const UserProfile = lazy(() => import("./pages/users/user.jsx"));
const UserEditPage = lazy(() => import("./pages/users/edit.jsx"));
const UserCreatePage = lazy(() => import("./pages/users/create.jsx"));
const PostList = lazy(() => import("./pages/posts/index.jsx"));
const PostDetail = lazy(() => import("./pages/posts/post.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        handle: { crumb: "Home" },
        element: (
          <SuspenseWrapper>
            <PageHome />
          </SuspenseWrapper>
        ),
      },
      {
        path: "dashboard",
        handle: { crumb: "Dashboard" },
        element: (
          <SuspenseWrapper>
            <PageDashboard />
          </SuspenseWrapper>
        ),
      },
      {
        path: "users",
        handle: { crumb: "Users" },
        children: [
          {
            index: true,
            loader: usersLoader,
            element: (
              <SuspenseWrapper>
                <UserList />
              </SuspenseWrapper>
            ),
          },
          {
            path: "new",
            element: (
              <SuspenseWrapper>
                <UserCreatePage />
              </SuspenseWrapper>
            ),
          },
          {
            path: ":id",
            loader: userLoader,
            handle: { crumb: (data) => data?.name || "User Detail" },
            element: (
              <SuspenseWrapper>
                <UserProfile />
              </SuspenseWrapper>
            ),
          },
          {
            path: ":id/edit",
            loader: userLoader,
            handle: { crumb: (data) => `編輯 ${data?.name || ""}` },
            element: (
              <SuspenseWrapper>
                <UserEditPage />
              </SuspenseWrapper>
            ),
          },
        ],
      },
      {
        path: "posts",
        handle: { crumb: "Posts" },
        children: [
          {
            index: true,
            loader: allPostsLoader,
            element: (
              <SuspenseWrapper>
                <PostList />
              </SuspenseWrapper>
            ),
          },
          {
            path: ":id",
            loader: postLoader,
            handle: { crumb: (data) => data?.title || "Post Detail" },
            element: (
              <SuspenseWrapper>
                <PostDetail />
              </SuspenseWrapper>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
