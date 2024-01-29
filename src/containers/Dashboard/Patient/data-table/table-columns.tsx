// types
import { dbPatient } from "../types";

// shadcn ui
import { Checkbox } from "@/components/ui/checkbox";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from './table-column-header';
import { TableActions } from './table-actions';

export const columns: ColumnDef<dbPatient>[] = [
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
  // ID
  {
    accessorKey: "PatID",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Patient ID" />
      )
    }
  },
  // Name
  {
    accessorKey: "PatName",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Name" />
      )
    },
  },
  // Age
  {
    accessorKey: "patAge",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Age" />
      )
    },
  },
  // Gender
  {
    accessorKey: "patGender",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Gender" />
      )
    },
  },
  // Mobile
  {
    accessorKey: "PatMobile",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Mobile" />
      )
    },
  },
  // City
  {
    accessorKey: "City",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="City" />
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const patientDetails = row.original

      return (
        <TableActions patientDetails={patientDetails} />
      )
    }
  }
]