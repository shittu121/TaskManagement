import {
  IconArticle,
} from "@tabler/icons-react";
import { RxDashboard } from "react-icons/rx";
import { SiTask } from "react-icons/si";
import { RiProgress2Line } from "react-icons/ri";
import { RiTeamLine } from "react-icons/ri";
export const navlinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: RxDashboard,
  },
  {
    href: "/tasks",
    label: "Task Tracker",
    icon: SiTask,
  },
  {
    href: "/progress",
    label: "Progress",
    icon: RiProgress2Line,
  },
  {
    href: "/task-tracker",
    label: "Assign Task",
    icon: RiTeamLine,
  },
  {
    href: "/blog",
    label: "Messages",
    icon: IconArticle,
  },
];
