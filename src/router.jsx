import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import PageLayout from "./layouts/PageLayout.jsx";
import MainLayout from "./layouts/MainLayout.jsx";

// Loaders
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
    element: <PageLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            handle: { crumb: "Home" },
            element: <PageHome />,
          },
          {
            path: "dashboard",
            handle: { crumb: "Dashboard" },
            element: <PageDashboard />,
          },
          {
            path: "users",
            handle: { crumb: "Users" },
            children: [
              {
                index: true,
                element: <UserList />,
              },
              {
                path: "new",
                element: <UserCreatePage />,
              },
              {
                path: ":id",
                handle: { crumb: "User Detail" },
                element: <UserProfile />,
              },
              {
                path: ":id/edit",
                handle: { crumb: "Edit User" },
                element: <UserEditPage />,
              },
            ],
          },
          {
            path: "posts",
            handle: { crumb: "Posts" },
            children: [
              {
                index: true,
                element: <PostList />,
              },
              {
                path: ":id",
                loader: postLoader,
                handle: { crumb: (data) => data?.title || "Post Detail" },
                element: <PostDetail />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
