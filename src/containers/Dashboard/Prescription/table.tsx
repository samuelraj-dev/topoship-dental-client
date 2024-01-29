import { ColumnDef, useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, SortingState, getFilteredRowModel, ColumnFiltersState, VisibilityState, RowSelectionState } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronLeft, ChevronRight, Columns, Download } from "lucide-react"
import { downloadToExcel } from "@/utils/xlsx"

import AddMedicineDialog from "@/components/Dialog/AddMedicineDialog";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function MedicineDataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  
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
      <div className="flex items-center justify-end py-[0.2rem]">
        {/* input */}
        <Input
          className="outline-none w-[15rem]"
          placeholder="filter medicines"
          value={table.getColumn("Name")?.getFilterValue() as string || ""}
          onChange={(e) => {
            table.getColumn("Name")?.setFilterValue(e.target.value)
          }}
        />
        {/* add medicine */}
        <AddMedicineDialog />
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