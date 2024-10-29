import {
  IconArticle,
  IconBolt,
  IconBriefcase2,
  IconMessage2,
} from "@tabler/icons-react";
import { DashboardIcon } from "@radix-ui/react-icons";

export const navlinks = [
  {
    href: "/",
    label: "Dashboard",
    icon: DashboardIcon,
  },
  {
    href: "/task",
    label: "Task Tracker",
    icon: IconBolt,
  },
  {
    href: "/about",
    label: "Progress",
    icon: IconMessage2,
  },
  {
    href: "/projects",
    label: "Team Members",
    icon: IconBriefcase2,
  },
  {
    href: "/blog",
    label: "Messages",
    icon: IconArticle,
  },
];
