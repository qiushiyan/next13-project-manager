"use client";
import { User, Settings, Calendar, Grid, Icon } from "react-feather";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const icons: { [key: string]: Icon } = { User, Settings, Calendar, Grid };

interface Props {
  link: { link: string; iconName: string };
}

const SidebarLink = ({ link }: Props) => {
  let linkActive = false;
  const path = usePathname();

  if (path === link.link) {
    linkActive = true;
  }
  const Icon = icons[link.iconName];

  return (
    <Link href={link.link} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out",
          linkActive && "stroke-violet-600"
        )}
      />
    </Link>
  );
};

export default SidebarLink;
