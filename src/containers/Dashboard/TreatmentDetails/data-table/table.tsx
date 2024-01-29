import { useState } from "react"

// table
import { ColumnDef, useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, SortingState, getFilteredRowModel, ColumnFiltersState, VisibilityState, RowSelectionState } from "@tanstack/react-table"

// ui
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"


import { DataTablePagination } from "./table-pagination"
import { DataTableToolbar } from "./table-toolbar"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function AppointmentDataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  // const [appointmentsDate, setAppointmentsDate] = useRecoilState(appointmentsDateState)
  // const appointmentsView = useRecoilValue(appointmentsViewState)
  
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

      <DataTableToolbar table={table} />
      
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
      <DataTablePagination table={table} />
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