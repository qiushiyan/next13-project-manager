import Image from "next/image";
import React from "react";
import SidebarLink from "./SidebarLink";
import Card from "./ui/Card";

const links = [
  { label: "Home", iconName: "Grid", link: "/home" },
  {
    label: "Calendar",
    iconName: "Calendar",
    link: "/calendar",
  },
  { label: "Profile", iconName: "User", link: "/profile" },
  {
    label: "Settings",
    iconName: "Settings",
    link: "/settings",
  },
];

const Sidebar = () => {
  return (
    <Card className="h-full w-32 flex items-center justify-between flex-wrap">
      {links.map((link) => (
        <SidebarLink
          link={{ link: link.link, iconName: link.iconName }}
          key={link.label}
        />
      ))}
    </Card>
  );
};

export default Sidebar;
