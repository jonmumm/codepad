"use client";

import { GripIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";

export const NavDropdown = () => {
  //   const session = useSession();
  //   session.data?.user?.name;
  return (
    <DropdownMenu>
      {/* <DropdownMenuTrigger>
        <Button size="icon" variant="secondary">
          <GripIcon />
        </Button>
      </DropdownMenuTrigger> */}
      <DropdownMenuContent>
        {/* <DropdownMenuLabel>
          {session.data?.user?.name || <a href="login">Login</a>}
        </DropdownMenuLabel> */}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Threads</DropdownMenuLabel>
        <DropdownMenuItem></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
