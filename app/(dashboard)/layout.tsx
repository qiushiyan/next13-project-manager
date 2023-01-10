import Sidebar from "@components/Sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Sidebar />
      {children}
    </main>
  );
};

export default DashboardLayout;
