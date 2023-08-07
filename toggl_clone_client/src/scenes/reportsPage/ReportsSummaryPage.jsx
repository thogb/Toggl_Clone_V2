import React from "react";
import ReportsAppbar from "./ReportsAppbar";
import { Box } from "@mui/material";
import TimeBarGraph from "../../components/timeBarGraph/TimeBarGraph";

const ReportsSummaryPage = () => {
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
    </>
  );
};

export default ReportsSummaryPage;
