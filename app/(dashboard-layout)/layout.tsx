"use client";
import AppSidebar from "@/components/shared/sidebar/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useDecodedToken } from "@/hooks/useDecodedToken";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useAppSelector } from "@/redux/hooks";
import { TUser, UserRole } from "@/types";
import { User } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAppSelector((state) => state.auth.accessToken);
  const decodedToken = useDecodedToken(token);
  const role = decodedToken?.role || UserRole.ADMIN;
  const { data, isLoading } = useGetMeQuery(undefined);
  const user: TUser = data?.data || {};

  return (
    <SidebarProvider>
      {/* Pass the user role dynamically to AppSidebar */}
      <AppSidebar role={role} />
      <SidebarInset>
        <div className="sticky top-0  bg-white border-b px-7">
          <header className="flex items-center justify-between h-20 ">
            {/* Left Section */}

            <SidebarTrigger className="-ml-2" />

            {/* Right Section */}
            {isLoading ? (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-10 w-10  rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 rounded-full overflow-hidden border border-gray-300 flex items-center justify-center">
                  <AvatarImage src={user?.photo as string} alt="User" />
                  <AvatarFallback>
                    <User className="text-gray-600" />
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-lg capitalize">{`${user?.firstName} ${user?.lastName}`}</h1>
              </div>
            )}
          </header>
        </div>
        <div className="p-7  bg-[#F5F6FA] min-h-screen">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
