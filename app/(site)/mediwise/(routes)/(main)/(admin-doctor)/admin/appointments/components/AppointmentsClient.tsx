"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search, UserPlus } from "lucide-react";
import React, { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./Columns";
import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { TUser } from "@/schema/user";
import { Appointment, Profile, WorkSchedule } from "@prisma/client";

type AppointmentsClientProps = {
  currentUser: TUser;
};
const AppointmentsClient: React.FC<AppointmentsClientProps> = ({
  currentUser,
}) => {
  const appointments = useQueryProcessor<(Appointment & { doctor: TUser & { profile: Profile }, patient: TUser & { profile: Profile } })[]>({
    url: "/appointments",
    queryParams: {
      barangayId: currentUser.barangayId
    },
    key: ['admin-doctor', currentUser.barangayId]
  });

  // const appointments = [
  //   {
  //     id: "asdcnmmysd54ngbcfddad23231",
  //     title: "General Checkup",
  //     doctor: "Francis Magpayo",
  //     patient: "Andrea Munoz",
  //     date: new Date(),
  //     status: "PENDING",
  //     createdAt: new Date(),
  //   },

  //   {
  //     id: "asdcnmmysd54ngbcfddad23231",
  //     title: "General Checkup",
  //     doctor: "Francis Magpayo",
  //     patient: "Andrea Munoz",
  //     date: new Date(),
  //     status: "PENDING",
  //     createdAt: new Date(),
  //   },

  //   {
  //     id: "asdc1nmmysd54ngbcfddad23231",
  //     title: "Follow up Checkup",
  //     doctor: "andrew belgar",
  //     patient: "minet dosme",
  //     date: new Date(),
  //     status: "ACCEPTED",
  //     createdAt: new Date(),
  //   },

  //   {
  //     id: "asdcnm2mysd54ngbcfddad23231",
  //     title: "General Checkup",
  //     doctor: "Brenan Delikaze",
  //     patient: "Joshua Vellidad",
  //     date: new Date(),
  //     status: "ACCEPTED",
  //     createdAt: new Date(),
  //   },

  //   {
  //     id: "asdcnm3mysd54ngbcfddad23231",
  //     title: "Follow up Checkup",
  //     doctor: "Collin Inbatera",
  //     patient: "John Doe",
  //     date: new Date(),
  //     status: "REJECTED",
  //     createdAt: new Date(),
  //   },
  // ];
  const [globalFilter, setGlobalFilter] = useState("");

  const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  return (
    <div className="flex flex-col p-10">
      <div className="flex items-center gap-5 my-10">
        <div className="border flex items-center rounded-md px-2 w-full flex-1">
          <Search className="w-5 h-5 font-semibold text-zinc-500 dark:text-white" />
          <Input
            className="inset-0 outline-none border-none active:outline-none hover:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
            onChange={onFilter}
            type="text"
            value={globalFilter}
            placeholder="Search for Doctor, Patient or something..."
          />
        </div>
        {/* <Select>
          <SelectTrigger className="w-full flex-[0.3]  font-semibold text-zinc-500 dark:text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="w-full flex-[0.3] font-semibold text-zinc-500 dark:text-white">
            <SelectItem value={"All"} key={"All"} className="cursor-pointer">
              {capitalizeWords("All")}
            </SelectItem>
            {roles?.map((value) => (
              <SelectItem value={value} key={value} className="cursor-pointer">
                {capitalizeWords(value).replaceAll("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}

        {/* <Select value={department} onValueChange={(value) => setDepartment(value)}>
          <SelectTrigger className="w-full flex-[0.3]  font-semibold text-zinc-500 dark:text-white">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent className="w-full flex-[0.3] font-semibold text-zinc-500 dark:text-white">
            <SelectItem value={"All"} key={"All"} className="cursor-pointer">
              {capitalizeWords("All")}
            </SelectItem>

            {departments?.data?.map((value) => (
              <SelectItem value={value} key={value} className="cursor-pointer">
                {capitalizeWords(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}

        <Button
          variant="outline"
          className="text-zinc-500 dark:text-white"
          onClick={() => {
            // setRole("All");
            // setDepartment("All");
            setGlobalFilter((prev) => "");
          }}
        >
          <Filter className="w-5 h-5 text-zinc-500" /> Clear Filters
        </Button>
      </div>

      {(() => {
        return (
          <DataTable
            columns={columns}
            data={appointments.data || []}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        );
      })()}
    </div>
  );
};

export default AppointmentsClient;
