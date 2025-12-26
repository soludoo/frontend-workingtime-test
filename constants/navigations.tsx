import {
  Bell,
  Building,
  Building2,
  ClipboardClock,
  Clock10,
  Cog,
  FileBox,
  House,
  MonitorCheck,
  SquarePen,
  TriangleAlert,
  User,
} from "lucide-react";

export const ADMINNAVIGATIONS = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icons: <House className="size-5" />,
  },
  {
    name: "Employees",
    href: "/admin/employees",
    icons: <User className="size-5" />,
  },
  {
    name: "Timesheets",
    href: "/admin/timesheets",
    icons: <ClipboardClock className="size-5" />,
  },
  {
    name: "Requests",
    href: "/admin/requests",
    icons: <FileBox className="size-5" />,
    children: [
      {
        name: "Vacation Requests",
        href: "/admin/requests/vacation",
        icons: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current"
          >
            <path
              d="M17.9216 18.4801C17.9216 16.2407 16.1063 14.4219 13.8669 14.4219H5.03741C2.79804 14.4219 0.982676 16.2407 0.982676 18.4801H17.9216Z"
              stroke=""
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M13.9885 6.55012L19.0171 6.55011C19.0171 5.21644 18.4873 3.93739 17.5442 2.99434C16.6012 2.05128 15.3221 1.52148 13.9885 1.52148C12.6548 1.52148 11.3757 2.05129 10.4327 2.99434C9.48963 3.93739 8.95983 5.21644 8.95983 6.55012H13.9885ZM13.9885 6.55012L13.9885 14.3264"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M12.2703 6.55012C12.2703 5.21644 12.4513 3.93739 12.7736 2.99434C13.0958 2.05129 13.5328 1.52148 13.9885 1.52148C14.4442 1.52148 14.8813 2.05128 15.2035 2.99434C15.5258 3.93739 15.7068 5.21644 15.7068 6.55011L13.9885 6.55012H12.2703Z"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d="M11.6753 8.52539L10.6874 10.0622C10.4986 10.3558 10.2291 10.5807 9.91825 10.7153M4.98001 11.1711L2.92833 12.6073M4.98001 11.1711C5.27125 10.9673 5.61815 10.8579 5.97366 10.8579H9.22984C9.47034 10.8579 9.7041 10.808 9.91825 10.7153M4.98001 11.1711V14.4404M9.91825 10.7153V14.4404"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        name: "Correction Requests",
        href: "/admin/requests/correction",
        icons: <SquarePen className="size-5" />,
      },
    ],
  },
  {
    name: "Company Settings",
    href: "/admin/company-settings",
    icons: <Building2 className="size-5" />,
    children: [
      {
        name: "Profile",
        href: "/admin/company-settings/profile",
        icons: <Building className="size-5" />,
      },
      {
        name: "Working Hours",
        href: "/admin/company-settings/working-hours",
        icons: <Clock10 className="size-5" />,
      },
      {
        name: "Preferences",
        href: "/admin/company-settings/preferences",
        icons: <Cog className="size-5" />,
      },
      {
        name: "Danger Zone",
        href: "/admin/company-settings/danger-zone",
        icons: <TriangleAlert className="size-5" />,
      },
    ],
  },
  {
    name: "Notifications",
    href: "/admin/notifications",
    icons: <Bell className="size-5" />,
  },
  {
    name: "Activity Log",
    href: "/admin/activity-log",
    icons: <MonitorCheck className="size-5" />,
  },
];
