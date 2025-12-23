"use client";

import type React from "react";
import uploadIcons from "@/assets/icons/upload.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ArrowLeft,
  Upload,
  FileText,
  X,
  CalendarIcon,
  Check,
  CloudUpload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Image from "next/image";

const noticeFormSchema = z.object({
  targetDepartment: z.string().min(1, "Target department is required"),
  noticeTitle: z.string().min(1, "Notice title is required"),
  employeeId: z.string().min(1, "Employee ID is required"),
  employeeName: z.string().min(1, "Employee name is required"),
  position: z.string().min(1, "Position is required"),
  noticeType: z.string().min(1, "Notice type is required"),
  publishDate: z.date().refine((date) => date instanceof Date, {
    message: "Publish date is required",
  }),
  noticeBody: z.string().optional(),
  attachments: z.array(z.instanceof(File)).optional(),
});

type NoticeFormValues = z.infer<typeof noticeFormSchema>;

const NoticeForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const form = useForm<NoticeFormValues>({
    resolver: zodResolver(noticeFormSchema),
    defaultValues: {
      targetDepartment: "individual",
      noticeTitle: "",
      employeeId: "",
      employeeName: "",
      position: "",
      noticeType: "",
      noticeBody: "",
      attachments: [],
    },
  });

  const onSubmit = (data: NoticeFormValues, isDraft = false) => {
    console.log("Form submitted:", { ...data, isDraft, files });
    // Handle form submission
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto ">
      <div className="mb-6 flex items-center gap-4">
        <Button className=" p-2 hover:bg-gray-100 bg-transparent shadow text-black border">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-semibold">Create a Notice</h2>
      </div>

      <Form {...form}>
        <form>
          <div className="rounded-2xl border shadow bg-white p-3">
            <div className="border-b border-gray-200 px-8 py-4">
              <p
                className="
               text-gray-600"
              >
                Please fill in the details below
              </p>
            </div>

            <div className="space-y-6 p-8">
              <FormField
                control={form.control}
                name="targetDepartment"
                render={({ field }) => (
                  <FormItem className="bg-[#F5F6FA] p-5 rounded">
                    <FormLabel className="font-medium text-gray-900">
                      <span className="text-red-500">* </span>
                      Target Department(s) or Individual
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full  text-md">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="hr">HR Department</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="noticeTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-900">
                      <span className="text-red-500">* </span>
                      Notice Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Write the Title of Notice"
                        {...field}
                        className=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="employeeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" font-medium text-gray-900">
                        <span className="text-red-500">* </span>
                        Select Employee ID
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select employee designation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="emp001">EMP001</SelectItem>
                          <SelectItem value="emp002">EMP002</SelectItem>
                          <SelectItem value="emp003">EMP003</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employeeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-900">
                        <span className="text-red-500">* </span>
                        Employee Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter employee full name"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-gray-900">
                        <span className="text-red-500">* </span>
                        Position
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select employee department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="developer">Developer</SelectItem>
                          <SelectItem value="designer">Designer</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="hr">HR</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="noticeType"
                  render={({ field }) => {
                    const noticeTypes = [
                      {
                        value: "warning_disciplinary",
                        label: "Warning / Disciplinary",
                      },
                      {
                        value: "performance_improvement",
                        label: "Performance Improvement",
                      },
                      {
                        value: "appreciation_recognition",
                        label: "Appreciation / Recognition",
                      },
                      {
                        value: "attendance_leave_issue",
                        label: "Attendance / Leave Issue",
                      },
                      {
                        value: "payroll_compensation",
                        label: "Payroll / Compensation",
                      },
                      {
                        value: "contract_role_update",
                        label: "Contract / Role Update",
                      },
                      {
                        value: "advisory_personal_reminder",
                        label: "Advisory / Personal Reminder",
                      },
                    ];

                    return (
                      <FormItem>
                        <FormLabel className="font-medium text-gray-900">
                          <span className="text-red-500">* </span>
                          Notice Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Notice Type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {noticeTypes.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="publishDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" font-medium text-gray-900">
                        <span className="text-red-500">* </span>
                        Publish Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger
                          asChild
                          className="w-full rounded-none h-10"
                        >
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-between  font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Select Publishing Date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="noticeBody"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium text-gray-900">
                      Notice Body
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write the details about notice"
                        className="min-h-[150px] resize-none rounded-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <label className="mb-2 block font-medium text-gray-800">
                  Upload Attachments (optional)
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                />
                <div
                  className={cn(
                    "block cursor-pointer rounded-lg border-2 border-dashed  p-12 text-center transition-colors",
                    isDragging
                      ? "border-cyan-500 bg-cyan-50"
                      : "border-green-400"
                  )}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-4 ">
                      <Image
                        src={uploadIcons}
                        alt="upload icons"
                        height={500}
                        width={500}
                        className="size-16"
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="cursor-pointer font-medium text-green-500 hover:text-green-600">
                        Upload
                      </span>{" "}
                      nominee profile image or drag and drop.
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Accepted File Type: jpg, png
                    </p>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-3"
                      >
                        <FileText className="h-5 w-5 text-gray-400" />
                        <span className="flex-1 text-sm text-gray-700">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-10 items-center">
            <Button
              type="button"
              variant="outline"
              className="px-10 py-5 bg-transparent rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              className="px-10 py-5 border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600 bg-transparent rounded-full"
              onClick={form.handleSubmit((data) => onSubmit(data, true))}
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              className=" px-10 py-5 bg-orange-500 hover:bg-orange-600 rounded-full"
              onClick={form.handleSubmit((data) => onSubmit(data, false))}
            >
              <span>
                <Check />
              </span>
              <span>Publish Notice</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NoticeForm;
