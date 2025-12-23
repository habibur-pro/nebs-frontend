"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  Pencil,
  MoreVertical,
  Calendar,
  Plus,
  FileEdit,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "@/components/shared/Pagination";
import { useGetAllNoticeQuery } from "@/redux/api/noticeApi";
import { useDebounce } from "@/hooks/useDebounce";
import { useSort } from "@/hooks/useSort";
import Loading from "@/components/shared/Loading";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Notice {
  id: string;
  title: string;
  noticeType: string;
  department: string;
  departmentColor: string;
  publishedOn: string;
  status: "published" | "unpublished" | "draft";
}

const notices: Notice[] = [
  {
    id: "1",
    title: "Office closed on Friday for maintenance.",
    noticeType: "General / Company-Wide",
    department: "All Department",
    departmentColor: "text-blue-600",
    publishedOn: "15-Jun-2025",
    status: "published",
  },
  {
    id: "2",
    title: "Eid al-Fitr holiday schedule.",
    noticeType: "Holiday & Event",
    department: "Finance",
    departmentColor: "text-green-600",
    publishedOn: "15-Jun-2025",
    status: "published",
  },
  {
    id: "3",
    title: "Updated code of conduct policy",
    noticeType: "HR & Policy Update",
    department: "Sales Team",
    departmentColor: "text-orange-600",
    publishedOn: "15-Jun-2025",
    status: "published",
  },
  {
    id: "4",
    title: "Payroll for October will be processed on 28th",
    noticeType: "Finance & Payroll",
    department: "Web Team",
    departmentColor: "text-blue-500",
    publishedOn: "15-Jun-2025",
    status: "published",
  },
  {
    id: "5",
    title: "System update scheduled for 30 Oct (9:00-11:00 PM)",
    noticeType: "IT / System Maintenance",
    department: "Database Team",
    departmentColor: "text-gray-600",
    publishedOn: "15-Jun-2025",
    status: "published",
  },
  {
    id: "6",
    title: "Design team sprint review moved to Tuesday.",
    noticeType: "Department / Team",
    department: "Admin",
    departmentColor: "text-purple-600",
    publishedOn: "15-Jun-2025",
    status: "published",
  },
  {
    id: "7",
    title: "Unauthorized absence recorded on 18 Oct 2025",
    noticeType: "Warning / Disciplinary",
    department: "Individual",
    departmentColor: "text-blue-600",
    publishedOn: "15-Jun-2025",
    status: "unpublished",
  },
  {
    id: "8",
    title: "Office closed today due to severe weather",
    noticeType: "Emergency / Urgent",
    department: "HR",
    departmentColor: "text-red-600",
    publishedOn: "15-Jun-2025",
    status: "draft",
  },
];

const NoticeBoard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Array<string>>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [publishedDate, setPublishedDate] = useState("");
  const [publishedStates, setPublishedStates] = useState<
    Record<number, boolean>
  >(
    notices.reduce(
      (acc, notice) => ({ ...acc, [notice.id]: notice.status === "published" }),
      {}
    )
  );

  const togglePublished = (id: string) => {
    setPublishedStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const debounceValue = useDebounce(searchValue, 1000);
  // Use the custom sort hook
  const { sortBy, handleSortChange, getSortIcon } = useSort("-createdAt");

  const { data, isLoading, isFetching, refetch } = useGetAllNoticeQuery({
    searchTerm: debounceValue,
    page: currentPage,
    sort: sortBy,
    department: selectedDepartment === "all" ? undefined : selectedDepartment,
    status: selectedStatus === "all" ? undefined : selectedStatus,
    publishedDate: publishedDate || undefined,
  });

  const handleSelectAll = (checked: boolean) => {
    const allIds = notices.map((item) => item.id);
    if (checked) {
      setSelectedIds(allIds); // select all
    } else {
      setSelectedIds([]); // deselect all
    }
  };

  const clearAllFilter = async () => {
    console.log("all clear");
    setSearchValue("");
    setSelectedDepartment("all");
    setSelectedStatus("all");
    setPublishedDate("");
  };

  return (
    <div className="flex h-screen ">
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-auto">
          <div className="flex justify-between items-center mb-7">
            <div className="mb-6">
              <h1 className="mb-2 text-2xl font-semibold text-gray-900">
                Notice Management
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-green-500">
                  <span className="text-sm ">Active Notices:</span>
                  <span className="text-sm font-semibold ">8</span>
                </div>
                <div className="h-4 w-px bg-gray-300" />
                <div className="flex items-center gap-2 text-orange-500">
                  <span className="text-sm ">Draft Notice:</span>
                  <span className="text-sm font-semibold ">04</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button className="gap-2 bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4" />
                Create Notice
              </Button>
              <Button
                variant="outline"
                className="gap-2 border-orange-500 text-orange-500 hover:bg-orange-50 bg-transparent"
              >
                <FileEdit className="h-4 w-4" />
                All Draft Notice
              </Button>
            </div>
          </div>

          <div className="mb-6 flex justify-end">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 text-nowrap">
                Filter by:
              </span>
              <Select defaultValue="departments">
                <SelectTrigger className="bg-transparent rounded-none">
                  <SelectValue placeholder="Departments or individuals" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="departments">
                    Departments or individuals
                  </SelectItem>
                  <SelectItem value="all">All Department</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="sales">Sales Team</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Employee Id or Name"
                className=" bg-transparent rounded-none"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && setSearchValue((prev) => prev)
                }
              />
              <Select defaultValue="status">
                <SelectTrigger className="bg-transparent rounded-none">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="unpublished">Unpublished</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <div className="w-fit ">
                <Input
                  type="date"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                  className="bg-transparent rounded-none font-light pl-3 pr-10 cursor-pointer"
                />
              </div>

              <Button
                variant="outline"
                className="gap-2 bg-transparent rounded-none font-light border-blue-400 text-blue-400"
                onClick={clearAllFilter}
              >
                Reset Filters
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border shadow bg-white p-3">
            <div className="overflow-x-auto">
              <Table className="">
                <TableHeader>
                  <TableRow className="h-14">
                    <TableHead className="w-12">
                      <Checkbox
                        onCheckedChange={(checked) =>
                          handleSelectAll(checked === true)
                        }
                        className="size-6"
                      />
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Notice Type</TableHead>
                    <TableHead>Departments / Individual</TableHead>
                    <TableHead>Published On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {isLoading || isFetching ? (
                    <TableRow>
                      <TableCell colSpan={6} className="py-10 text-center">
                        <Loading />
                      </TableCell>
                    </TableRow>
                  ) : (
                    notices.map((notice) => (
                      <TableRow
                        key={notice.id}
                        className="hover:bg-gray-50 min-h-14 "
                      >
                        <TableCell>
                          <Checkbox
                            className="size-6"
                            checked={selectedIds.includes(notice.id)} // Check if current notice is selected
                            onCheckedChange={(checked) => {
                              if (checked) {
                                // Add ID if checked
                                setSelectedIds((prev) => [...prev, notice.id]);
                              } else {
                                // Remove ID if unchecked
                                setSelectedIds((prev) =>
                                  prev.filter((id) => id !== notice.id)
                                );
                              }
                            }}
                          />
                        </TableCell>

                        <TableCell className="text-sm ">
                          {notice.title}
                        </TableCell>

                        <TableCell className="text-sm text-gray-600">
                          {notice.noticeType}
                        </TableCell>

                        <TableCell>
                          <span
                            className={`text-sm font-medium ${notice.departmentColor}`}
                          >
                            {notice.department}
                          </span>
                        </TableCell>

                        <TableCell className="text-sm text-gray-600">
                          {notice.publishedOn}
                        </TableCell>

                        <TableCell>
                          <Popover>
                            <PopoverTrigger asChild>
                              <div className="flex cursor-pointer items-center gap-2">
                                {notice.status === "published" && (
                                  <Badge className="bg-green-100 text-green-700">
                                    Published
                                  </Badge>
                                )}

                                {notice.status === "unpublished" && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-gray-100 text-gray-700"
                                  >
                                    Unpublished
                                  </Badge>
                                )}

                                {notice.status === "draft" && (
                                  <Badge className="bg-orange-100 text-orange-700">
                                    Draft
                                  </Badge>
                                )}
                              </div>
                            </PopoverTrigger>

                            <PopoverContent
                              align="start"
                              className="w-56 space-y-3"
                            >
                              <div className="text-sm font-medium">
                                Notice Status
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                  {notice.status === "published"
                                    ? "Published"
                                    : "Unpublished"}
                                </span>

                                <Switch
                                  checked={notice.status === "published"}
                                  onCheckedChange={(checked) => {
                                    togglePublished(notice.id);
                                  }}
                                />
                              </div>
                            </PopoverContent>
                          </Popover>
                        </TableCell>

                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Eye className="h-4 w-4 text-gray-600" />
                            </Button>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Pencil className="h-4 w-4 text-gray-600" />
                            </Button>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreVertical className="h-4 w-4 text-gray-600" />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={1}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NoticeBoard;
