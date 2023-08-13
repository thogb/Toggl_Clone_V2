import React, { useMemo } from "react";
import ReportsAppbar from "./ReportsAppbar";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import TimeBarGraph from "../../components/timeBarGraph/TimeBarGraph";
import TTResponsivePie from "../../components/ttResponsivePie/TTResponsivePie";

const rawPieData = {
  groups: [
    {
      id: 9280720,
      subGroups: [
        {
          id: null,
          title: "reports page UI",
          seconds: 17501,
          ids: [3071257430, 3071076704, 3071142524, 3072878415, 3069398510],
        },
        {
          id: null,
          seconds: 0,
          ids: [3075686759],
        },
        {
          id: null,
          title: "dual n back",
          seconds: 927,
          ids: [3071222106],
        },
        {
          id: null,
          title: "leetcode",
          seconds: 4740,
          ids: [3067600245],
        },
        {
          id: null,
          title: "schulte table",
          seconds: 2828,
          ids: [3071205044, 3067564275],
        },
      ],
    },
  ],
};

const pieData = rawPieData.groups[0].subGroups.map((item, ind) => {
  return {
    id: ind,
    label: item.title ?? "",
    value: item.seconds,
  };
});

const ReportsSummaryPage = () => {
  const theme = useTheme();

  const usersPieData = useMemo(() => {
    return rawPieData.groups.map((item, ind) => {
      return {
        id: item.id,
        value: item.subGroups.reduce((acc, curr) => {
          return acc + curr.seconds;
        }, 0),
      };
    });
  }, []);

  const timeEntriesPieData = useMemo(() => {
    return rawPieData.groups[0].subGroups.map((item, ind) => {
      return {
        id: ind,
        label: item.title ?? "",
        value: item.seconds,
      };
    });
  }, []);

  return (
    <>
      <ReportsAppbar />
      <Box height={"60px"}>asd</Box>
      <TimeBarGraph
        data={{
          seconds: 25996,
          rates: null,
          graph: [
            {
              seconds: 6729,
              by_rate: null,
              barLabel: {
                main: "Mon",
                secondary: "7/31",
              },
            },
            {
              seconds: 2527,
              by_rate: null,
              barLabel: {
                main: "Mon",
                secondary: "7/31",
              },
            },
            {
              seconds: 10260,
              by_rate: null,
              barLabel: {
                main: "Mon",
                secondary: "7/31",
              },
            },
            {
              seconds: 6480,
              by_rate: null,
              barLabel: {
                main: "Mon",
                secondary: "7/31",
              },
            },
            {
              seconds: 0,
              by_rate: null,
              barLabel: {
                main: "Mon",
                secondary: "7/31",
              },
            },
            {
              seconds: 0,
              by_rate: null,
              barLabel: {
                main: "Mon",
                secondary: "7/31",
              },
            },
            {
              seconds: 0,
              by_rate: null,
              barLabel: {
                main: "Mon",
                secondary: "7/31",
              },
            },
          ],
          resolution: "day",
        }}
      />
      <Stack
        direction={"row"}
        // bgcolor={"green"}
        mx={theme.spacing(theme.ttSpacings.page.px)}
      >
        <Box bgcolor={"grey"} flexGrow={1} flexShrink={0}>
          asd
        </Box>
        <Stack
          flexShrink={0}
          direction={"column"}
          alignItems={"center"}
          pl={"20px"}
          pr={{ xs: 0, md: "120px" }}
        >
          <Typography
            textAlign={"start"}
            variant="subtitle2"
            textTransform={"uppercase"}
            width={"100%"}
            px={1}
          >
            Total Hours
          </Typography>
          <Typography textAlign={"start"} variant="h5" width={"100%"} px={1}>
            7:31:30
          </Typography>
          <Box my={3} width={"220px"} height={"220px"}>
            <TTResponsivePie data={usersPieData} centerText={"Users"} />
            <Box py={1} />
            <TTResponsivePie
              data={timeEntriesPieData}
              centerText={"Time Entries"}
            />
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default ReportsSummaryPage;
