import { Badge, Box, Stack, Typography, alpha } from "@mui/material";
import React from "react";
import {
  formatDateHMA,
  formatSecondHMMSS,
  getDaysBetween,
} from "../../utils/TTDateUtil";
import SubButton from "../subButton/SubButton";
import { useTheme } from "@emotion/react";

const TimeEntryDateInfo = ({
  duration,
  startDate,
  stopDate,

  durationButtonStyle,

  onDateButtonClick,
  onDurationButtonClick,
  displayBadge = true,
}) => {
  const durationComponent = (
    <SubButton
      className="TimeEntryDurationBtn"
      style={{
        paddingTop: "2px",
        paddingBottom: "2px",
        ...durationButtonStyle,
      }}
      onClick={onDurationButtonClick}
    >
      <Typography variant="body2" fontWeight={"fontWeightMedium"} noWrap>
        {formatSecondHMMSS(duration)}
      </Typography>
    </SubButton>
  );

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"end"}
      fontSize={"body2.fontSize"}
      width={"28ch"}
    >
      <SubButton
        className="TimeEntryDateBtn"
        style={{ paddingTop: "2px", paddingBottom: "2px" }}
        onClick={onDateButtonClick}
      >
        <Typography
          variant="body2"
          color={(theme) => alpha(theme.palette.primary.main, 0.7)}
          fontWeight={"fontWeightMedium"}
          noWrap
        >
          {`${formatDateHMA(startDate)} - ${formatDateHMA(stopDate)}`}
        </Typography>
      </SubButton>
      <Box
        fontSize={"body2.fontSize"}
        width={"10ch"}
        display={"flex"}
        flexShrink={0}
        flexDirection={"row"}
        justifyContent={"end"}
      >
        {displayBadge ? (
          <Badge
            color="primary"
            badgeContent={getDaysBetween(startDate, stopDate)}
          >
            {durationComponent}
          </Badge>
        ) : (
          durationComponent
        )}
      </Box>
    </Stack>
  );
};

export default TimeEntryDateInfo;
