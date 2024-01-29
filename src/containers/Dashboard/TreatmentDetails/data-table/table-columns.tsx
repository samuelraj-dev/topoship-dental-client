// @ts-ignore
import { dbAppointment, dbPatient } from "./types";

// shadcn ui
import { Checkbox } from "@/components/ui/checkbox";

import { ColumnDef } from "@tanstack/react-table";
// @ts-ignore
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { DataTableColumnHeader } from './table-column-header';
import { AddTreatmentDetailsDialog } from '../AddTreatmentDetailsDialog';
import { ViewTreatmentHistoryDialog } from '../ViewTreatmentHistoryDialog';
import { TableActions } from './table-actions';

export const columns: ColumnDef<dbAppointment>[] = [
  // select
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) => {
            table.toggleAllPageRowsSelected(!!value)
          }}
        />
      )
    },
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean) => {
            row.toggleSelected(!!value)
          }}
        />
      )
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actionAdd",
    cell: ({ row }) => {
      // @ts-ignore
      const appointmentDetails = row.original
      return (
        // @ts-ignore
        <AddTreatmentDetailsDialog appointmentDetails={appointmentDetails}  />
      )
    }
  },
  {
    id: "actionHistory",
    cell: ({ row }) => {
      // @ts-ignore
      const appointmentDetails = row.original

      return (
        <ViewTreatmentHistoryDialog />
      )
    }
  },
  // App ID
  {
    accessorKey: "AppID",
    header: ({ column }) => {
      return (
        // <DataTableColumnHeader column={column} title="Title" />
        <DataTableColumnHeader column={column} title="App ID" />
        // <Button
        //   variant="ghost"
        //   onClick={() => {
        //     column.toggleSorting(column.getIsSorted() === "asc")
        //   }}
        // >
        //   Appointment ID <ArrowUpDown className="ml-2 h-4 w-4" />
        // </Button>
      )
    },
    cell: ({ row }) => <div className="w-[70px]">{row.getValue("AppID")}</div>,
  },
  // Name
  {
    accessorKey: "PatID",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Pat ID" />
      )
    },
    cell: ({ row }) => <div className="w-[70px]">{row.getValue("PatID")}</div>,
  },
  // Age
  {
    accessorKey: "Doctor",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Doctor" />
      )
    },
    cell: ({ row }) => <div className="w-[70px]">{row.getValue("Doctor")}</div>,
    
  },
  // Gender
  {
    accessorKey: "Date",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Date" />
      )
    },
    cell: ({ row }) => <div className="w-[90px]">{row.getValue("Date")}</div>,
  },
  // Mobile
  {
    accessorKey: "Time",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Time" />
      )
    },
    cell: ({ row }) => <div className="w-[70px]">{row.getValue("Time")}</div>,
  },
  // City
  {
    accessorKey: "VisitPurpose",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Visit Purpose" />
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const appointmentDetails = row.original

      return (
        <TableActions appointmentDetails={appointmentDetails} />
      )
    }
  }
]











































































































































































// import { Patient } from "@/types/Patient"

// import { ColumnDef, Visibility } from "@tanstack/react-table"

// // Imports for Shadcn
// import { Checkbox } from "@/components/ui/checkbox"

// // Imports for Icons
// import { ArrowUpDown } from "lucide-react"

// export const columns: ColumnDef<Patient>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={table.getIsAllPageRowsSelected()}
//         onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value: any) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           ID
//         </div>
//       )
//     },
//     accessorKey: 'id'
//   },
//   {
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Name
//         </div>
//       )
//     },
//     accessorKey: "name",
//     cell: ({ row }) => <div style={{ textTransform: 'capitalize' }}>{row.getValue("name")}</div>,
//   },
//   {
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Age
//         </div>
//       )
//     },
//     accessorKey: 'age'
//   },
//   {
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Gender
//         </div>
//       )
//     },
//     accessorKey: 'gender'
//   },
//   {
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Mobile
//         </div>
//       )
//     },
//     accessorKey: 'mobile'
//   },
//   {
//     header: ({ column }) => {
//       return (
//         <div
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           City
//         </div>
//       )
//     },
//     accessorKey: 'city'
//   },
// ]