import { lazy } from "react";
import type { RouteProps } from "../Core/Components/Routes";
import {
  Bookmark,
  CreatePost,
  Dashboard,
  History,
  Profile,
  ViewPost,
} from "../Component";
import { NotFound } from "../Component/Error";
import { AdminDashBoard, AdminReport, AdminUserList } from "../Admin";

const comman: RouteProps[] = [
  {
    path: "/404",
    element: NotFound,
  },
];

const admin: RouteProps[] = [
  {
    path: "/",
    to: "dashboard",
    private: true,
  },
  {
    path: "/dashboard/*",
    element: AdminDashBoard,
    private: true
  },
  {
    path: "/reports/*",
    element: AdminReport,
    private: true
  },
  {
    path: "/allusers/*",
    element: AdminUserList,
    private: true
  },
  {
    path: "/post/:postId",
    element: ViewPost,
    private: true,
  },
]

const app: RouteProps[] = [
  {
    path: "/",
    to: "dashboard",
    private: true,
  },
  {
    path: "/login",
    element: lazy(() => import("../Component/Login/Login")),
    isAuthTo: "/",
  },

  //module routs

  {
    path: "/dashboard/*",
    element: Dashboard,
    private: true,
  },
  {
    path: "/newpost/",
    element: CreatePost,
    private: true,
  },
  {
    path: "/updatepost/:postId",
    element: CreatePost,
    private: true,
  },
  {
    path: "/post/:postId",
    element: ViewPost,
    private: true,
  },
  {
    path: "/post/",
    to: "dashboard",
    isAuthTo: "/",
  },
  {
    path: "/history",
    element: History,
    private: true,
  },
  {
    path: "/bookmark",
    element: Bookmark,
    private: true,
  },
  {
    path: "/user/:userId",
    element: Profile,
    private: true,
  },
];

const routes = { app, comman, admin };

export default routes;
