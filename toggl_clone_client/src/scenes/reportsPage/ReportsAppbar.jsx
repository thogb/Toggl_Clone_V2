import React from "react";
import TTAppbar, {
  TTAppbarActions,
  TTAppbarContent,
  TTAppbarLink,
  TTAppbarMain,
  TTAppbarStart,
  TTAppbarTitle,
  TTAppbarTool,
} from "../../components/ttAppbar/TTAppbar";
import { Button } from "@mui/material";
import { GetApp, Save } from "@mui/icons-material";
import { reportRoute } from "../../routes/Routes";
import { useLocation } from "react-router-dom";

const ReportsAppbar = () => {
  const { pathname } = useLocation();

  return (
    <TTAppbar>
      <TTAppbarMain>
        <TTAppbarStart>
          <TTAppbarTitle>Reports</TTAppbarTitle>
        </TTAppbarStart>
        <TTAppbarContent>
          {reportRoute.routes.map((route) => (
            <TTAppbarLink
              key={route.name}
              to={`${reportRoute.exactPath}/${route.path}`}
            >
              {route.name}
            </TTAppbarLink>
          ))}
        </TTAppbarContent>
        <TTAppbarActions>
          <Button
            startIcon={<Save />}
            disabled
            color="secondary"
            variant="contained"
          >
            Save & share
          </Button>
          <Button startIcon={<GetApp />} color="secondary" variant="contained">
            Export
          </Button>
        </TTAppbarActions>
      </TTAppbarMain>
      <TTAppbarTool>asd</TTAppbarTool>
    </TTAppbar>
  );
};

export default ReportsAppbar;
