import GlassPane from "@components/GlassPane";
import Sidebar from "@components/Sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="candy-mesh h-screen w-screen p-6">
      <GlassPane className="w-full h-full flex items-center p-4 gap-4">
        <Sidebar />
        {children}
      </GlassPane>
    </main>
  );
};

export default DashboardLayout;
