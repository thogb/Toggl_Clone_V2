import React from "react";
import ReportsAppbar from "./ReportsAppbar";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import TimeBarGraph from "../../components/timeBarGraph/TimeBarGraph";
import { ResponsivePie } from '@nivo/pie'

const MyResponsivePie = ({ data /* see data tab */ }) => (
  <ResponsivePie
      data={data}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      sortByValue={true}
      innerRadius={0.6}
      borderColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  '0'
              ]
          ]
      }}
      arcLinkLabelsTextOffset={0}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsOffset={15}
      arcLinkLabelsDiagonalLength={0}
      arcLinkLabelsStraightLength={0}
      arcLinkLabelsThickness={0}
      arcLinkLabelsColor={{ from: 'color', modifiers: [] }}
      enableArcLabels={false}
      arcLabel="value"
      arcLabelsRadiusOffset={0.8}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
          from: 'color',
          modifiers: [
              [
                  'darker',
                  '1.8'
              ]
          ]
      }}
      tooltip={e=>{let{datum:t}=e;return n.createElement(l,{style:{color:t.color}},n.createElement(s,null,"id"),n.createElement(d,null,t.id),n.createElement(s,null,"value"),n.createElement(d,null,t.value),n.createElement(s,null,"formattedValue"),n.createElement(d,null,t.formattedValue),n.createElement(s,null,"color"),n.createElement(d,null,t.color))}}
      animate={false}
      legends={[]}
  />)

const pieData = {
  "groups": [
      {
          "id": 9280720,
          "subGroups": [
              {
                  "id": null,
                  "title": "reports page UI",
                  "seconds": 17501,
                  "ids": [
                      3071257430,
                      3071076704,
                      3071142524,
                      3072878415,
                      3069398510
                  ]
              },
              {
                  "id": null,
                  "seconds": 0,
                  "ids": [
                      3075686759
                  ]
              },
              {
                  "id": null,
                  "title": "dual n back",
                  "seconds": 927,
                  "ids": [
                      3071222106
                  ]
              },
              {
                  "id": null,
                  "title": "leetcode",
                  "seconds": 4740,
                  "ids": [
                      3067600245
                  ]
              },
              {
                  "id": null,
                  "title": "schulte table",
                  "seconds": 2828,
                  "ids": [
                      3071205044,
                      3067564275
                  ]
              }
          ]
      }
  ]
}

const ReportsSummaryPage = () => {
  const theme = useTheme();

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
      <Stack direction={"row"} bgcolor={"green"} mx={
        theme.spacing(theme.ttSpacings.page.px)
      }>
        <Box bgcolor={"grey"} flexGrow={1} flexShrink={0}>
asd
        </Box>
        <Stack flexShrink={0} direction={"column"} alignItems={"center"}>
          <Typography variant="subtitle2" textTransform={"uppercase"}>Total Hours</Typography>
          <Typography variant="h6">7:31:30</Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default ReportsSummaryPage;
