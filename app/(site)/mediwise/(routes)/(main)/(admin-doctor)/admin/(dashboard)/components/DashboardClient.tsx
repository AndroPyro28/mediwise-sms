"use client";
import React from "react";
import Widget from "./Widget";
import {
  LucideUserSquare2,
  LayoutDashboard,
  GraduationCap,
} from "lucide-react";
import AppointmentsTab from "./appointments/AppointmentsTab";

import { useQuery } from "@tanstack/react-query";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type DashboardClientProps = {
  tab: string;
};

const DashboardClient = ({ tab = "appointments" }: DashboardClientProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();


  const handleSelectedTab = (tab: string) => {
    if (searchParams) {
      let currentQueries = qs.parse(searchParams.toString());
      const newQueries = { ...currentQueries, tab: tab };

      const newParams = qs.stringify(newQueries, {
        skipEmptyString: true,
        skipNull: true,
      });
      replace(`${pathname}?${newParams}`);
    }
  };

  return (
    <div className="p-6">
     
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div onClick={() => handleSelectedTab("appointments")}>
            <Widget
              title="Appointments"
              total={100 || 0}
              icon={LucideUserSquare2}
            />
          </div>
          <div onClick={() => handleSelectedTab("items")}>
            <Widget
              title="Items"
              total={100 || 0}
              icon={GraduationCap}
            />
          </div>
          <div onClick={() => handleSelectedTab("patients")}>
            <Widget
              title="Patients"
              total={100 || 0}
              icon={LayoutDashboard}
            />
          </div>
        </div>

      <div className="flex flex-col mt-5">
        {
          (() => {
          
          if (tab === "appointments") return <AppointmentsTab />;
            // if (tab === "patients") return <JobTab />;
          })()
        }
      </div>
    </div>
  );
};

export default DashboardClient;
