const ACTIVITIES = [
  {
    date: "Today",
    values: [
      {
        id: 1,
        title: "Admin approved vacation request",
        description: "Jenny Wilson · Nov 12–14",
        date: "09:32",
        actor: "Jenny Wilson",
      },
      {
        id: 2,
        title: "System detected missing time entry",
        description: "Sarah Kim · No clock-in recorded today",
        date: "09:32",
        actor: "Sarah Kim",
      },
    ],
  },
  {
    date: "Yesterday",
    values: [
      {
        id: 1,
        title: "Admin approved vacation request",
        description: "Jenny Wilson · Nov 12–14",
        date: "09:32",
        actor: "Jenny Wilson",
      },
      {
        id: 2,
        title: "System detected missing time entry",
        description: "Sarah Kim · No clock-in recorded today",
        date: "09:32",
        actor: "Sarah Kim",
      },
    ],
  },
];

const Activity = () => {
  return (
    <div className="flex flex-col gap-6">
      {ACTIVITIES.map((item) => (
        <div className="flex flex-col gap-4" key={item.date}>
          <h3 className="font-semibold text-lg text-black">{item.date}</h3>
          {item.values.map((value) => (
            <div
              key={value.id}
              className="border-b last:border-0 border-border py-5 flex items-center justify-between gap-10"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5">
                  <h4 className="font-medium text-black">{value.title}</h4>
                </div>
                <p className="text-body text-sm">{value.description}</p>
              </div>
              <p className="text-body text-sm">{value.date}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Activity;
