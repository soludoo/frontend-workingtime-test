import CardList from "@/components/card/card-list";
import React from "react";

const RecentActivity = () => {
  return (
    <div className="col-span-6 flex flex-col gap-4">
      <h3 className="font-semibold text-black">Recent Activity</h3>
      <CardList
        content={[
          {
            icons: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="9.62362"
                  cy="11.3399"
                  r="7.27547"
                  stroke="black"
                  strokeWidth="1.3"
                />
                <path
                  d="M7.95801 1.38281H11.2887"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M15.689 3.3125L17.6516 5.27516"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M14.7739 6.18945L16.6706 4.29281"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M9.62354 11.3398V7.76351"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M9.62354 11.3398L12.1524 13.8687"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            ),
            title: "Clock-ins today",
            description: "Employees who have started their shift.",
            total: "38 employees",
          },
          {
            icons: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.62361 18.6154C13.6417 18.6154 16.8991 15.3581 16.8991 11.3399C16.8991 7.32179 13.6417 4.06445 9.62361 4.06445C5.60548 4.06445 2.34814 7.32179 2.34814 11.3399"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M7.95801 1.38281H11.2887"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M15.689 3.3125L17.6516 5.27516"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M14.7739 6.18945L16.6706 4.29281"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M9.62354 11.3398V7.76351"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M9.62354 11.3398L12.1524 13.8687"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M2.80317 14.4746L6.94541 18.6169"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M2.80326 18.6153L6.9455 14.473"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            ),
            title: "Not clocked in",
            description: "Employees who haven't started their day yet.",
            total: "4 employees",
          },
          {
            icons: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.17334 7.26964C1.17334 6.83703 1.52404 6.48633 1.95665 6.48633H13.9934C14.426 6.48633 14.7767 6.83703 14.7767 7.26964V10.9974C14.7767 14.7539 11.7315 17.7991 7.97502 17.7991V17.7991C4.21855 17.7991 1.17334 14.7539 1.17334 10.9974V7.26964Z"
                  stroke="black"
                  strokeWidth="1.3"
                />
                <path
                  d="M5.83337 6.48633V9.69275M5.83337 9.69275H4.81355L4.55371 12.1427H5.83337H7.11303L6.85319 9.69275H5.83337Z"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1.55029 18.3828H14.3995"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M14.6546 7.64453L15.5168 7.64453C17.3445 7.64453 18.8262 9.12618 18.8262 10.9539C18.8262 12.7816 17.3445 14.2633 15.5168 14.2633L13.9009 14.2633"
                  stroke="black"
                  strokeWidth="1.3"
                />
                <path
                  d="M4.79688 4.23057V1.61523"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.9751 4.23057V1.61523"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.1533 4.23057V1.61523"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            title: "On break",
            description: "Currently on break or paused.",
            total: "7 employees",
          },
          {
            icons: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="9.62362"
                  cy="11.3399"
                  r="7.27547"
                  stroke="black"
                  strokeWidth="1.3"
                />
                <path
                  d="M7.95801 1.38281H11.2887"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M15.689 3.3125L17.6516 5.27516"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M14.7739 6.18945L16.6706 4.29281"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M9.62354 11.3398V7.76351"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M9.62354 11.3398L12.1524 13.8687"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            ),
            title: "Clock-outs today",
            description: "Employees who have finished their shift.",
            total: "34 employees",
          },
          {
            icons: (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.2866 17.8618C14.8531 17.3938 17.6064 14.3427 17.6064 10.6485C17.6064 6.63039 14.349 3.37305 10.3309 3.37305C6.55816 3.37305 3.45612 6.24468 3.09131 9.92143"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <circle
                  cx="5.41528"
                  cy="15.5325"
                  r="3.77466"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M8.66553 0.691406H11.9963"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M16.3965 2.62109L18.3591 4.58375"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M15.481 5.49805L17.3776 3.60141"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M10.3306 10.6484V7.0721"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M10.3306 10.6484L12.8594 13.1773"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                <path
                  d="M5.41504 17.0938L5.41504 17.0592M5.41504 13.7411L5.41504 15.4672"
                  stroke="black"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            ),
            title: "Late arrivals",
            description: "Clocked in after the scheduled start time.",
            total: "3 employees",
          },
        ]}
      />
    </div>
  );
};

export default RecentActivity;
