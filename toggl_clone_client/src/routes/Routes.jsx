import { Route } from "react-router-dom";
import LogInPage from "../scenes/trackPage/LogInPage";
import SignUpPage from "../scenes/trackPage/SignUpPage";
import TrackPageWrapper from "./TrackPageWrapper";
import TimerPage from "../scenes/timerPage/TimerPage";
import ReportsPage from "../scenes/reportsPage/ReportsPage";
import ReportsSummaryPage from "../scenes/reportsPage/ReportsSummaryPage";

// const SIGNUP = "/track/signup";
// const LOGIN = "/track/login";
// const TIMER = "/timer";

export const loginRoute = {
  name: "login",
  path: "/track/login",
  component: LogInPage,
};

export const singupRoute = {
  name: "signup",
  path: "/track/signup",
  component: SignUpPage,
};

export const trackRoute = {
  name: "track",
  path: "/track",
  component: TrackPageWrapper,
  routes: [loginRoute, singupRoute],
};

export const timerRoute = {
  name: "timer",
  path: "/timer",
  component: TimerPage,
};

export const reportRoute = {
  name: "reports",
  path: "/reports",
  component: ReportsPage,
  routes: [
    {
      name: "summary",
      path: "summary",
      component: ReportsSummaryPage,
    },
    {
      name: "summary",
      path: "detailed",
      component: ReportsSummaryPage,
    },
    {
      name: "summary",
      path: "weekly",
      component: ReportsSummaryPage,
    },
    {
      name: "summary",
      path: "saved",
      component: ReportsSummaryPage,
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
  timerRoute,
  ...analyseRoutes,
  ...manageRoutes,
  ...adminRoutes,
];

// export const ROUTES = {
//   SIGNUP,
//   LOGIN,
//   TIMER,
// };

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
