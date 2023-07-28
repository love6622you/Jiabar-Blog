import { signOut, useSession } from "next-auth/react";
import { LuLogOut, LuUser, LuPencil } from "react-icons/lu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UserInfoDropdownMenuType = {
  openNewPostModal: () => void;
};

export function UserInfoDropdownMenu({ openNewPostModal }: UserInfoDropdownMenuType) {
  const { data } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-7 w-7 cursor-pointer md:h-10 md:w-10">
          <AvatarImage src={data?.user?.image || ""} alt={"You"} />
          <AvatarFallback>{data?.user?.name?.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 " forceMount={true}>
        <DropdownMenuGroup className="gap-y-4 md:hidden">
          <DropdownMenuItem className="cursor-pointer" onClick={openNewPostModal}>
            <LuPencil className="mr-2 h-4 w-4" />
            <span>Write Post</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuGroup>

        <DropdownMenuGroup className="gap-y-4">
          <DropdownMenuItem className="cursor-pointer">
            <LuUser className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuGroup>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            signOut();
          }}
        >
          <LuLogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
