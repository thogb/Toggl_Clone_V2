import LogInPage from "../scenes/trackPage/LogInPage";
import SignUpPage from "../scenes/trackPage/SignUpPage";

const SIGNUP = "/track/signup";
const LOGIN = "/track/login";
const TIMER = "/timer";

export const trackRoute = {
  name: "track",
  path: "track",
  component: null,
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
  path: "reports",
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

export const anonRoutes = [...trackRoute];

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
