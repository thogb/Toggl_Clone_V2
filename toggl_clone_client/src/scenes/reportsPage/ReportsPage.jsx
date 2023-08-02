import React from "react";
import { Outlet } from "react-router-dom";
import PageContainer from "../../components/pageContainer/PageContainer";

const ReportsPage = () => {
  return (
    <PageContainer>
      <Outlet />
    </PageContainer>
  );
};

export default ReportsPage;
