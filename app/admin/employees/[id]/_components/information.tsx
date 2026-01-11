import CardInformation from "./card-information";

const Information = () => {
  return (
    <div className="flex gap-5">
      <CardInformation
        title="Personal Information"
        lists={[
          {
            title: "First Name",
            value: "Jenny",
          },
          {
            title: "Last name",
            value: "Wilson",
          },
          {
            title: "Email address",
            value: "Jennywilson@email.com",
          },
          {
            title: "Phone number",
            value: "+1 234 567 890",
          },
          {
            title: "Address",
            value: "42 Sunset Road, Westfield, NY",
          },
          {
            title: "Date of birth",
            value: "October 2, 1990",
          },
        ]}
      />
      <CardInformation
        title="Work Information"
        lists={[
          {
            title: "Role",
            value: "Employee",
          },
          {
            title: "Department",
            value: "Design",
          },
          {
            title: "Working hours",
            value: "09:00 - 17:00",
          },
          {
            title: "Work model",
            value: "Hybrid",
          },
          {
            title: "Manager",
            value: "Mark Evans",
          },
          {
            title: "Employee ID",
            value: "EMP - 0232",
          },
        ]}
      />
    </div>
  );
};

export default Information;
