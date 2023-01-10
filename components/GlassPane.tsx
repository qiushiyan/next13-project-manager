import React from "react";
import clsx from "clsx";
const GlassPane = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div
      className={clsx(
        "glass rounded-2xl border-solid border-2 border-gray-200 shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassPane;
