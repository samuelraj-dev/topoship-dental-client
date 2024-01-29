import { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"

// table
import { ColumnDef, useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, SortingState, getFilteredRowModel, ColumnFiltersState, VisibilityState, RowSelectionState } from "@tanstack/react-table"

// ui
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronLeft, ChevronRight, Columns, Download } from "lucide-react"
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
import AddAppointmentDialog from "@/components/Dialog/AddAppointment"
import TableViewSelector from "./TableViewSelector"

import { appointmentsDateState, appointmentsViewState } from "@/state/atoms"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function AppointmentDataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
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
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
    },
  })

  return (
    <div className="width-[-webkit-fill-available]">
      <div className="flex items-center justify-between py-[0.2rem]">
        <div className="flex items-center">
          
          <TableViewSelector />

          <div className={`flex items-center ${appointmentsView === "byDate" ? "visible" : "hidden"}`}>
            <Button
              variant="outline"
              onClick={handleBackDate}
              className="px-[0.4rem] ml-[0.2rem]"
            >
              <ChevronLeft />
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
              onClick={handleFrontDate}
              className="px-[0.4rem] ml-[0.2rem]"
            >
              <ChevronRight />
            </Button>
          </div>

        </div>
        <div className="flex items-center">
          {/* input */}
          <Input
            className="outline-none w-[15rem]"
            placeholder="filter appointments"
            value={table.getColumn("VisitPurpose")?.getFilterValue() as string || ""}
            onChange={(e) => {
              table.getColumn("VisitPurpose")?.setFilterValue(e.target.value)
            }}
          />
          {/* add appointment */}
          <AddAppointmentDialog />
          {/* download to excel */}
          <Button
            variant="outline"
            onClick={() => downloadToExcel()}
            className="px-[0.4rem] ml-[0.2rem]"
          >
            <Download />
          </Button>
          {/* filter columns */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="outline"
                className="px-[0.4rem] ml-[0.2rem]"
              ><Columns /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table.getAllColumns().filter(column => column.getCanHide()).map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: boolean) => {
                      column.toggleVisibility(!!value)
                    }}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
      </div>
      {/* table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="py-[0.2rem]">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ): (
              <TableRow>
                <TableCell>No results</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* pagination */}
      <div className="flex justify-between items-center">
        <div className=" text-sm text-muted-foreground py-[0.2rem]">
          {table.getFilteredSelectedRowModel().rows.length} of {` `}
          {table.getFilteredRowModel().rows.length} rows selected
        </div>
        <div className="flex items-center justify-start space-x-2 py-[0.2rem]">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage()
            }}
            disabled={!table.getCanPreviousPage()}
          ><ChevronLeft /></Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage()
            }}
            disabled={!table.getCanNextPage()}
          ><ChevronRight /></Button>
        </div>
      </div>
    </div>
  )
}
















































// import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table";

// import { data } from "./data"
// import { columns } from "./columns"

// import "./styles.css"

// export function PatientTable() {

//   const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel(), getPaginationRowModel: getPaginationRowModel(), getSortedRowModel: getSortedRowModel(), })

//   return (
//     <div className="pt-tb">
//       <div className="tb-container">
//         <table>
//           <thead>
//             {table.getHeaderGroups().map(headerGroup => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map(header => (
//                     <th key={header.id}>
//                       {flexRender(header.column.columnDef.header, header.getContext())}
//                     </th>
//                   )
//                 )}
//               </tr>
//             ))}
//           </thead>

//           <tbody>
//             {table.getRowModel().rows.map(row => (
//               <tr key={row.id}>
//                 {row.getVisibleCells().map(cell => (
//                   <td key={cell.id}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="tb-info-container">
//           <div className="tb-info"></div>
//           <div className="tb-controller">
//             <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>prev</button>
//             <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>next</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }