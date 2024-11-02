import {
  IconArticle,
} from "@tabler/icons-react";
import { RxDashboard } from "react-icons/rx";
import { SiTask } from "react-icons/si";
import { RiProgress2Line } from "react-icons/ri";
import { RiTeamLine } from "react-icons/ri";
export const navlinks = [
  {
    href: "/",
    label: "Dashboard",
    icon: RxDashboard,
  },
  {
    href: "/task-tracker",
    label: "Task Tracker",
    icon: SiTask,
  },
  {
    href: "/progress",
    label: "Progress",
    icon: RiProgress2Line,
  },
  {
    href: "/team-members",
    label: "Team Members",
    icon: RiTeamLine,
  },
  {
    href: "/blog",
    label: "Messages",
    icon: IconArticle,
  },
];
