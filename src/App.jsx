// React
import { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Context
import UserData from "./context/UserData";
import Authentication from "./context/Authentication";
// HeroUI
import { HeroUIProvider, ToastProvider } from "@heroui/react";
// Components (eagerly loaded)
import Layout from "./layout/Layout";
import Guard from "./components/Guard";
import Authorize from "./components/Authorize";
import Error from "./components/error/Error";
// Pages (lazy loaded)
const Home = lazy(() => import("./components/home/Home")),
  PostPage = lazy(() => import("./components/home/post/PostPage")),
  MyProfile = lazy(() => import("./components/profile/MyProfile")),
  UserProfile = lazy(() => import("./components/profile/UserProfile")),
  Settings = lazy(() => import("./components/settings/Settings")),
  Login = lazy(() => import("./components/login/Login")),
  Signup = lazy(() => import("./components/signup/Signup"));

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <Guard>
            <Suspense>
              <Home />
            </Suspense>
          </Guard>
        ),
      },
      {
        path: "post/:postId",
        element: (
          <Guard>
            <Suspense>
              <PostPage />
            </Suspense>
          </Guard>
        ),
      },
      {
        path: "profile",
        element: (
          <Guard>
            <Suspense>
              <MyProfile />
            </Suspense>
          </Guard>
        ),
      },
      {
        path: "user/:userId",
        element: (
          <Guard>
            <Suspense>
              <UserProfile />
            </Suspense>
          </Guard>
        ),
      },
      {
        path: "settings",
        element: (
          <Guard>
            <Suspense>
              <Settings />
            </Suspense>
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
        <Suspense>
          <Signup />
        </Suspense>
      </Authorize>
    ),
    errorElement: <Error />,
  },
  {
    path: "login",
    element: (
      <Authorize>
        <Suspense>
          <Login />
        </Suspense>
      </Authorize>
    ),
    errorElement: <Error />,
  },
]);

export default function App() {
  const [placement, setPlacement] = useState(
    window.innerWidth < 768 ? "bottom-center" : "top-center",
  );

  useEffect(() => {
    document.documentElement.classList =
      localStorage.getItem("theme") || "light";

    const handleResize = () => {
      setPlacement(window.innerWidth < 640 ? "bottom" : "top-center");
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <HeroUIProvider>
        <Authentication>
          <UserData>
            <RouterProvider router={routes}></RouterProvider>
          </UserData>
        </Authentication>
      </HeroUIProvider>
      <ToastProvider
        placement={placement}
        toastOffset={8}
        toastProps={{
          className: "w-full! sm:max-w-xl",
          classNames: { icon: "size-5" },
          timeout: 1000 * 3,
        }}
      />
    </>
  );
}
