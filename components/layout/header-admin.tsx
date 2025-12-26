import { ChevronDown, Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const HeaderAdmin = () => {
  return (
    <header className="flex items-center justify-between h-19 px-8 border-b border-border">
      <h1 className="text-lg font-semibold">Logo</h1>
      <InputGroup className="border-border shadow-none h-10">
        <InputGroupInput placeholder="Search..." className="w-[400px]" />
        <InputGroupAddon>
          <Search className="size-5" />
        </InputGroupAddon>
      </InputGroup>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-black">
                Emily Jackson
              </span>
              <span className="text-xs text-body text-start">
                Administrator
              </span>
            </div>
            <ChevronDown className="text-body" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Print...</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </header>
  );
};

export default HeaderAdmin;
