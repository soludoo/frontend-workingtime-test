const RecentActivity = () => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      <h3 className="font-semibold text-black">Recent Activity</h3>
      <div className="border border-border rounded-2xl px-4 flex flex-col">
        <div className="flex justify-between gap-10 border-b border-border py-4">
          <div className="flex flex-col gap-1">
            <h4 className="font-medium text-sm">Clocked in</h4>
            <p className="text-sm text-body">Started shift at 08:12</p>
          </div>
          <p className="text-body text-sm">Today, 08:12</p>
        </div>
        <div className="flex justify-between gap-10 border-border py-4">
          <div className="flex flex-col gap-1">
            <h4 className="font-medium text-sm">Vacation request submitted</h4>
            <p className="text-sm text-body">Requested 2 days off (5-6 Nov)</p>
          </div>
          <p className="text-body text-sm">Today, 08:12</p>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
