import { useTheme } from "@emotion/react";
import { Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const TrackCopyright = ({ showTerms = true }) => {
  const theme = useTheme();

  return (
    <Stack
      height={"50px"}
      direction={"row"}
      bgcolor={"secondary.light"}
      paddingX={theme.ttSpacings.page.px * 2}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Typography color={"black"}>
        © 2023 Toggl. All rights reserved.
      </Typography>
      {showTerms && (
        <Link>
          <Typography
            sx={{
              "&:hover": {
                color: "white",
              },
            }}
          >
            Legal Terms
          </Typography>
        </Link>
      )}
    </Stack>
  );
};

export default TrackCopyright;
