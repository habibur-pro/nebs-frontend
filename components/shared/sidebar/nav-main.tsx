"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      icon?: LucideIcon;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-3">
        {items?.map((item) => {
          const isActive = item.isActive || pathname === item.url;

          // If no sub-items, render as a simple link
          return (
            <SidebarMenuItem key={item.title} className="">
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`h-[40px]  ${
                  isActive
                    ? "bg-[#F5F6FA]  hover:bg-[#F5F6FA] border-r-2 border-r-primary"
                    : "hover:shadow hover:text-black hover:border-r-2 hover:border-r-primary"
                }`}
              >
                <Link href={item.url}>
                  {item.icon && <item.icon className="mr-2 h-5 w-5" />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
