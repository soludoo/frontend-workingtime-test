import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const PhotoBackground = () => {
  return (
    <div className="relative w-full rounded-2xl h-[248px] flex flex-col border border-border pb-5">
      <Image
        src={"/images/bg-employee.jpg"}
        alt="Employee Background"
        width={1075}
        height={100}
        className="w-full h-[100px] object-cover rounded-t-2xl"
      />
      <Avatar className="size-[120px] absolute left-1/2 top-5 -translate-x-1/2">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      </Avatar>
      <div className="flex flex-col justify-end gap-3 items-center h-full w-fit mx-auto">
        <div className="relative w-fit">
          <h3 className="text-center text-2xl font-semibold">Jenny Wilson</h3>
          <Badge className="text-green bg-green/20 absolute -right-16 top-1 h-6">
            Active
          </Badge>
        </div>
        <p className="text-center textr-body ">Joined on 17 August 2024</p>
      </div>
    </div>
  );
};

export default PhotoBackground;
