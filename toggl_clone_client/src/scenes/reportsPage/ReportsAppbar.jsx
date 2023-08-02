import React from "react";
import TTAppbar, {
  TTAppbarActions,
  TTAppbarContent,
  TTAppbarMain,
  TTAppbarStart,
  TTAppbarTitle,
  TTAppbarTool,
} from "../../components/ttAppbar/TTAppbar";
import { Button } from "@mui/material";
import { GetApp, Save } from "@mui/icons-material";

const ReportsAppbar = () => {
  return (
    <TTAppbar>
      <TTAppbarMain>
        <TTAppbarStart>
          <TTAppbarTitle>Reports</TTAppbarTitle>
        </TTAppbarStart>
        <TTAppbarContent>asd</TTAppbarContent>
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
