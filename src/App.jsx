// React
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Context
import UserData from "./context/UserData";
import Authentication from "./context/Authentication";
// HeroUI
import { HeroUIProvider, ToastProvider } from "@heroui/react";
// Style
import "./App.css";
// Components
import Layout from "./layout/Layout";
import Guard from "./components/Guard";
import Home from "./components/home/Home";
import PostPage from "./components/home/post/PostPage";
import MyProfile from "./components/profile/MyProfile";
import UserProfile from "./components/profile/UserProfile";
import Settings from "./components/settings/Settings";
import Error from "./components/error/Error";
import Authorize from "./components/Authorize";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";

export default function App() {
  const client = new QueryClient();
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: (
            <Guard>
              <Home />
            </Guard>
          ),
        },
        {
          path: "post/:postId",
          element: (
            <Guard>
              <PostPage />
            </Guard>
          ),
        },
        {
          path: "profile",
          element: (
            <Guard>
              <MyProfile />
            </Guard>
          ),
        },
        {
          path: "user/:userId",
          element: (
            <Guard>
              <UserProfile />
            </Guard>
          ),
        },
        {
          path: "settings",
          element: (
            <Guard>
              <Settings />
            </Guard>
          ),
        },
      ],
      errorElement: <Error />,
    },
    {
      path: "signup",
      element: (
        <Authorize>
          <Signup />
        </Authorize>
      ),
    },
    {
      path: "login",
      element: (
        <Authorize>
          <Login />
        </Authorize>
      ),
    },
  ]);
  useEffect(() => {
    document.documentElement.classList =
      localStorage.getItem("theme") || "light";
  }, []);
  return (
    <QueryClientProvider client={client}>
      <HeroUIProvider>
        <Authentication>
          <UserData>
            <RouterProvider router={routes}></RouterProvider>
          </UserData>
        </Authentication>
      </HeroUIProvider>
      <ToastProvider placement="top-center" toastOffset={8} />
    </QueryClientProvider>
  );
}
