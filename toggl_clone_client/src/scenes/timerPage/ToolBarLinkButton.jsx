import React from "react";
import SubButton from "../../components/subButton/SubButton";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";

const TitleTypography = styled(Typography)(({ theme }) => ({
  color: grey[700],
  fontSize: "0.7rem",
  textTransform: "uppercase",
}));
const ContentTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "0.9rem",
}));

const ToolBarLinkButton = ({ title, content, to }) => {
  return (
    <SubButton to={to} style={{ paddingTop: 0, paddingBottom: 0 }}>
      <TitleTypography>{title}</TitleTypography>
      <ContentTypography ml={1}>{content}</ContentTypography>
    </SubButton>
  );
};

export default ToolBarLinkButton;
