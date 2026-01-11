const CardInformation = ({
  lists,
  title,
}: {
  lists: {
    title: string;
    value: string;
  }[];
  title: string;
}) => {
  return (
    <div className="flex flex-col gap-4 flex-1">
      <h3 className="font-semibold text-black">{title}</h3>
      <div className="border border-border rounded-2xl p-5 flex flex-col gap-4 flex-1">
        {lists.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between gap-10"
          >
            <p className="text-body text-sm">{item.title}</p>
            <p className="text-sm font-medium">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardInformation;
