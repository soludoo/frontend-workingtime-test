const NOTIF = [
  {
    id: 1,
    title: "Vacation request submitted",
    description: "Jenny Wilson requested vacation from 12–14 Nov 2025",
    isRead: false,
    date: "09:32",
    type: "Request",
  },
  {
    id: 2,
    title: "Time correction request",
    description: "Michael Kim requested a correction for 9 Nov 2025",
    isRead: false,
    date: "09:32",
    type: "Timesheets",
  },
  {
    id: 3,
    title: "Vacation request submitted",
    description: "You approved Sarah Anderson’s vacation request.",
    isRead: true,
    date: "09:32",
    type: "Employees",
  },
  {
    id: 4,
    title: "Late clock-in detected",
    description: "Kevin Hart clocked in later than scheduled time",
    isRead: true,
    date: "09:32",
    type: "System",
  },
  {
    id: 5,
    title: "Late clock-in detected",
    description: "Kevin Hart clocked in later than scheduled time",
    isRead: true,
    date: "09:32",
    type: "Request",
  },
];
const Notifications = () => {
  return (
    <div className="flex flex-col gap-2">
      {NOTIF.map((item) => (
        <div
          key={item.id}
          className="border-b last:border-0 border-border py-5 flex items-center justify-between gap-10"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <h4 className="font-medium text-black">{item.title}</h4>
              {!item.isRead && (
                <div className="rounded-full bg-primary-admin size-2" />
              )}
            </div>
            <p className="text-body text-sm">{item.description}</p>
          </div>
          <p className="text-body text-sm">{item.date}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
