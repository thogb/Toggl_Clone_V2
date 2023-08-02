import { Route } from "react-router-dom";
import LogInPage from "../scenes/trackPage/LogInPage";
import SignUpPage from "../scenes/trackPage/SignUpPage";
import TrackPageWrapper from "./TrackPageWrapper";

const SIGNUP = "/track/signup";
const LOGIN = "/track/login";
const TIMER = "/timer";

export const trackRoute = {
  name: "track",
  path: "/track",
  component: TrackPageWrapper,
  routes: [
    {
      name: "login",
      path: "login",
      component: LogInPage,
    },
    {
      name: "Signup",
      path: "signup",
      component: SignUpPage,
    },
  ],
};

export const reportRoute = {
  name: "reports",
  path: "/reports",
  component: null,
  routes: [
    {
      name: "summary",
      path: "summary",
      component: null,
    },
    {
      name: "summary",
      path: "detailed",
      component: null,
    },
    {
      name: "summary",
      path: "weekly",
      component: null,
    },
    {
      name: "summary",
      path: "saved",
      component: null,
    },
  ],
};

export const analyseRoutes = [
  reportRoute,
  {
    name: "insights",
    path: "",
  },
];

export const manageRoutes = [
  {
    name: "projects",
    path: "",
  },
  {
    name: "clients",
    path: "",
  },
  {
    name: "teams",
    path: "",
  },
  {
    name: "tags",
    path: "tags",
  },
  {
    name: "integrations",
    path: "",
  },
];

const adminRoutes = [
  {
    name: "subscription",
    path: "",
  },
  {
    name: "organisation",
    path: "",
  },
  {
    name: "settings",
    path: "",
  },
];

export const anonRoutes = [trackRoute];

export const dashboardRoutes = [
  ...analyseRoutes,
  ...manageRoutes,
  ...adminRoutes,
];

export const ROUTES = {
  SIGNUP,
  LOGIN,
  TIMER,
};

export const generateRoutes = (routes) => {
  return routes.map((route) => {
    if (route.routes && route.routes.length > 0) {
      const inner = generateRoutes(route.routes);
      const first = route.routes[0];
      return (
        <Route path={route.path} element={<route.component />} key={route.name}>
          <Route index element={<first.component />} />
          {inner}
        </Route>
      );
    } else {
      return (
        <Route
          path={route.path}
          element={<route.component />}
          key={route.name}
        />
      );
    }
  });
};
