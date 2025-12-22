"use client";

import Logo from "@/assets/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { FileText, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";
import { UserRole } from "@/types";

const data = {
  admin: {
    navMain: [
      {
        title: "Dashboard",
        url: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "Notice board",
        url: "/notice-board",
        icon: FileText,
      },
    ],
  },
};

// add roles based on your requirements
interface AppSidebarProps {
  role: string;
}

export default function AppSidebar({
  role = UserRole.ADMIN,
  ...props
}: AppSidebarProps) {
  console.log("role", role);
  const sidebarData = data[role?.toLowerCase() as keyof typeof data];
  const { open } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="w-64 bg-white border-r border-blue-200"
      {...props}
    >
      <SidebarHeader className="h-20  flex items-center w-full justify-center">
        <Link href={"/"}>
          {open ? (
            // show full logo
            <div className="flex items-center  gap-2">
              <Image src={Logo} alt="Full Logo" width={147} height={48} />
              {/* <span className="text-2xl font-semibold pt-1">SANDLINK</span> */}
            </div>
          ) : (
            <Image src={Logo} alt="Logo Icon" width={73} height={40} />
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent className={`${open && "px-4 my-6"}`}>
        <NavMain items={sidebarData?.navMain} />
      </SidebarContent>
      <SidebarFooter className={`${open && "p-5"}`}>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
