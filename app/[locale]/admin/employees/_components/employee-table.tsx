import { columns as baseColumns } from "./columns";
import Filter from "./filter";
import { DataTable } from "@/components/share/data-table";

const EmployeeTable = () => {
  const columns = baseColumns(() => {});
  const data = [
    {
      id: 1,
      name: "John Doe",
      role: "Employee",
      date: "12 - 14 Nov 2025",
      status: "Active",
      department: "IT",
      date_joined: "Today, 08:04",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Manager",
      date: "10 - 11 Nov 2025",
      status: "Inactive",
      department: "Design",
      date_joined: "Yesterday, 16:20",
    },
    {
      id: 3,
      name: "Michael Johnson",
      role: "Admin",
      date: "15 Nov 2025",
      status: "Active",
      department: "Engineer",
      date_joined: "Today, 09:15",
    },
  ];
  return (
    <div className="flex flex-col gap-5">
      <Filter />
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

export default EmployeeTable;
