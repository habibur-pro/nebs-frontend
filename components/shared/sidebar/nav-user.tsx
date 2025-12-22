"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";
// impo from "@/assets/placeholders/image_placeholder.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetMeQuery } from "@/redux/api/authApi";
import { logout } from "@/redux/features/authSlice";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function NavUser() {
  const { open } = useSidebar();

  const dispatch = useAppDispatch();

  // const { data, error, isLoading } = useGetMeQuery({ skip: !token });

  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    dispatch(logout());
    router.push("/login?redirect=" + pathname);
  };

  // Loading state
  // if (isLoading) {
  //   return (
  //     <SidebarMenu>
  //       <SidebarMenuItem>
  //         <SidebarMenuButton size="lg" disabled>
  //           <Avatar className="h-8 w-8 rounded-lg">
  //             <AvatarFallback className="rounded-lg">...</AvatarFallback>
  //           </Avatar>
  //           <div className="grid flex-1 text-left text-sm leading-tight">
  //             <span className="truncate font-semibold">Loading...</span>
  //           </div>
  //         </SidebarMenuButton>
  //       </SidebarMenuItem>
  //     </SidebarMenu>
  //   );
  // }

  // Error state
  // if (error) {
  //   return (
  //     <SidebarMenu>
  //       <SidebarMenuItem>
  //         <SidebarMenuButton size="lg" disabled>
  //           <Avatar className="h-8 w-8 rounded-lg">
  //             <AvatarFallback className="rounded-lg">!</AvatarFallback>
  //           </Avatar>
  //           <div className="grid flex-1 text-left text-sm leading-tight">
  //             <span className="truncate font-semibold text-red-500">Error</span>
  //           </div>
  //         </SidebarMenuButton>
  //       </SidebarMenuItem>
  //     </SidebarMenu>
  //   );
  // }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          tooltip={"Logout"}
          className={
            " text-red-400 hover:bg-red-400/50 hover:text-red-600"
          }
        >
          <span onClick={() => handleLogout()}>
            <LogOut className="mr-2 h-5 w-5" />
            <span>Logout</span>
          </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
