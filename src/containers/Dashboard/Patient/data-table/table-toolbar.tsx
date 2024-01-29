import React from "react";

import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// utils
import { downloadToExcel } from "@/utils/xlsx"

import { DataTableViewOptions } from "./table-view-options"
import AddPatientDialog from "../../../../components/Dialog/AddPatient";
import { Download } from "lucide-react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {

  // @ts-ignore
  const [filterValue, setFilterValue] = React.useState("");
  // @ts-ignore
  const setAllColumnsFilterValue = (value) => {
    setFilterValue(value);
    table.setGlobalFilter(value)
  };

  return (
    <div className="flex items-center justify-between py-[0.2rem]">
      <div className="flex items-center">
        
        {/* input */}
        <Input
          className="h-8 w-[150px] lg:w-[250px]"
          placeholder="Filter patients..."
          value={table.getColumn("PatName")?.getFilterValue() as string || ""}
          onChange={(e) => {
            table.getColumn("PatName")?.setFilterValue(e.target.value)
          }}
        />

        {/* add patient */}
        <AddPatientDialog />

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