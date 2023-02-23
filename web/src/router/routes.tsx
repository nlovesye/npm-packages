import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

import NotFound from "@/views/404";

const Home = lazy(() => import("@/views/Home"));
const VideoPlayer = lazy(() => import("@/views/VideoPlayer"));
const Manage = lazy(() => import("@/views/Manage"));
const Login = lazy(() => import("@/views/Login"));

interface RouteObj {
  isAdmin?: boolean;
}
type RouteExtendObject = RouteObject & RouteObj;

export const ROUTES: RouteExtendObject[] = [
  {
    path: `/`,
    element: <Home />,
  },
  {
    path: `/video/:name`,
    element: <VideoPlayer />,
  },
  {
    path: `/login`,
    element: <Login />,
  },
  {
    path: `/manage`,
    element: <Manage />,
    isAdmin: true,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
