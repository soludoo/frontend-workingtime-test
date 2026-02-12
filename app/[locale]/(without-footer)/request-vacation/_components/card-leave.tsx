import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/lib/helper";
import { cn } from "@/lib/utils";

const CardLeave = ({
  status,
  title,
  type,
  date,
  color,
}: {
  status: string;
  title: string;
  type: string;
  date: string;
  color: string;
}) => {
  return (
    <div className="border border-border rounded-[12px] p-4 flex justify-between gap-3">
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="font-medium text-black">{type}</h3>
        <p className="text-body text-sm">{title}</p>
        <p className="text-body text-sm">{date}</p>
      </div>
      <Badge
        className={cn(
          "font-medium text-xs",
          status === "pending" ? "text-black" : ""
        )}
        style={{ background: color }}
      >
        {capitalizeFirstLetter(status)}
      </Badge>
    </div>
  );
};

export default CardLeave;
