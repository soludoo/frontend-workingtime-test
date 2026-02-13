import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter, formatLeaveDateRange } from "@/lib/helper";
import { cn } from "@/lib/utils";

const CardLeave = ({
  status,
  title,
  type,
  startDate,
  endDate,
}: {
  status: string;
  title: string;
  type: string;
  startDate: string;
  endDate: string;
}) => {
  return (
    <div className="border border-border rounded-[12px] p-4 flex justify-between gap-3">
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="font-medium text-black">{type}</h3>
        <p className="text-body text-sm">{title}</p>
        <p className="text-body text-sm">
          {formatLeaveDateRange(startDate, endDate)}
        </p>
      </div>
      <Badge
        className={cn(
          "font-medium text-xs px-2.5 py-[3px]",
          status === "pending" && "text-black bg-yellow",
          status === "approve" && "text-white bg-green",
          status === "rejected" && "text-white bg-red",
        )}
      >
        {capitalizeFirstLetter(status)}
      </Badge>
    </div>
  );
};

export default CardLeave;
