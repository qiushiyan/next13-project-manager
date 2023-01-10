import GlassPane from "@components/GlassPane";
import React from "react";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen p-6 rainbow-mesh">
      <GlassPane className="w-full h-full flex items-center justify-center ">
        {children}
      </GlassPane>
    </div>
  );
};

export default AuthLayout;
