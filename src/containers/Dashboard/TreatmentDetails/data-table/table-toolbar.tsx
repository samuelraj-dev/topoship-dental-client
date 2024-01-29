import React from "react";

import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { BsFillCalendarMinusFill } from "react-icons/bs"

// utils
import { downloadToExcel } from "@/utils/xlsx"
import dispDate from "@/utils/dispDate"

// components
import TableViewSelector from "../TableViewSelector"

import { DataTableViewOptions } from "./table-view-options"

import { useRecoilState, useRecoilValue } from "recoil"
import { appointmentsState, appointmentsDateState, appointmentsViewState } from "@/state/atoms"
import { AddTreatmentDetailsDialog } from "../AddTreatmentDetailsDialog";
import AddAppointmentDialog from "@/components/Dialog/AddAppointment";

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {

  const [appointmentsDate, setAppointmentsDate] = useRecoilState(appointmentsDateState)
  const appointmentsView = useRecoilValue(appointmentsViewState)

  const handleBackDate = () => {
    let yestarday = new Date(appointmentsDate)
    yestarday.setDate(appointmentsDate.getDate() - 1);
    setAppointmentsDate(yestarday)
  }

  const handleFrontDate = () => {
    let tmrw = new Date(appointmentsDate)
    tmrw.setDate(appointmentsDate.getDate() + 1);
    setAppointmentsDate(tmrw)
  }

  const [filterValue, setFilterValue] = React.useState("");
  // @ts-ignore
  const setAllColumnsFilterValue = (value) => {
    setFilterValue(value);
    table.setGlobalFilter(value)
  };

  return (
    <div className="flex items-center justify-between py-[0.2rem]">
      <div className="flex items-center">
        
        <TableViewSelector />

        <div className={`flex items-center ${appointmentsView === "byDate" ? "visible" : "hidden"}`}>
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackDate}
            className="px-[0.4rem] ml-[0.2rem]"
          >
            <ChevronLeft height="15px" />
          </Button>

          <Popover>
            <PopoverTrigger>
              <Button
                variant="outline"
                className="px-[0.4rem] ml-[0.2rem]"
              >
                <div className="nb-calendar-icon"><BsFillCalendarMinusFill /></div>
                <div className="nb-calendar-date">
                  {dispDate()}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
            <Calendar
              mode="single"
              selected={appointmentsDate}
              // @ts-ignore
              onSelect={setAppointmentsDate}
              className="rounded-md"
            />
            </PopoverContent>
          </Popover>

          <Button
            variant="outline"
            size="sm"
            onClick={handleFrontDate}
            className="px-[0.4rem] ml-[0.2rem]"
          >
            <ChevronRight height="15px" />
          </Button>
        </div>

      </div>
      <div className="flex items-center">
        {/* input */}
        <Input
          placeholder="Filter tasks..."
          value={filterValue}
          onChange={(event) =>
            setAllColumnsFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        
        {/* add appointment */}
        <AddAppointmentDialog />

        {/* download to excel */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadToExcel()}
          className="px-[0.4rem] ml-[0.2rem]"
        >
          <Download height="15px" />
        </Button>
        {/* filter columns */}
        <DataTableViewOptions table={table} />
      </div>
      
    </div>
  )
}