import { DataTable } from "@/components/share/data-table";
import { columns as baseColumns } from "./columns";
import Filter from "./filter";

const RecentTable = () => {
  const columns = baseColumns(() => {});
  const data = [
    {
      id: 1,
      name: "John Doe",
      type: "Vacation",
      date: "12 - 14 Nov 2025",
      status: "Pending",
      submitted: "Today, 08:04",
    },
    {
      id: 2,
      name: "Jane Smith",
      type: "Sick Leave",
      date: "10 - 11 Nov 2025",
      status: "Approved",
      submitted: "Yesterday, 16:20",
    },
    {
      id: 3,
      name: "Michael Johnson",
      type: "Work From Home",
      date: "15 Nov 2025",
      status: "Rejected",
      submitted: "Today, 09:15",
    },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-10">
        <h3 className="text-black font-semibold">Recent Request</h3>
        <Filter />
      </div>
      <DataTable
        data={data}
        columns={columns}
        totalData={100}
        size={10}
        page={1}
        // onChangeSize={(size) => {
        //   setPage(1);
        //   setLimit(size);
        // }}
        // onChangePage={(page) => setPage(page)}
      />
    </div>
  );
};

export default RecentTable;
