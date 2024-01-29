import { useRef } from 'react';

// types
// @ts-ignore
import { dbAppointment, dbPatient } from "./types";

// shadcn ui
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { DialogForm } from "./table-form"

import { useSetRecoilState } from "recoil";
import { appointmentsState } from "@/state/atoms"

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
  // App ID
  {
    accessorKey: "AppID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc")
          }}
        >
          Appointment ID <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  // Name
  {
    accessorKey: "PatID",
    header: "Patient ID"
  },
  // Age
  {
    accessorKey: "Doctor",
    header: "Doctor"
  },
  // Gender
  {
    accessorKey: "Date",
    header: "Date"
  },
  // Mobile
  {
    accessorKey: "Time",
    header: "Time"
  },
  // City
  {
    accessorKey: "VisitPurpose",
    header: "Visit Purpose"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const appointmentDetails = row.original
      const { toast } = useToast()
      const setAppointments = useSetRecoilState(appointmentsState);
      const deleteBtnRef = useRef(null);

      const deleteAppointment = async () => {

        try {
          // updating button text to "saving"
          const element: any = deleteBtnRef.current;
          if (element) {
            element.innerText = 'Deleting...';
            element.disabled = true;
          }
          
          // updating database
          await fetch(`https://api.topoship.com/appointments`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id: appointmentDetails.AppID
            })
          })
      
          // informing user
          toast({
            description: `Deleted the details of appointment ${appointmentDetails.AppID}`,
          })

          // updating table
          const getPatientsResponse = await fetch("https://api.topoship.com/appointments");
          setAppointments(await getPatientsResponse.json())
      
          // updating button text to "done"
          element.innerText = 'Done';
      
        } catch (error) {
          console.log(error);
        }
      }

      return (
        <Dialog>
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              {/* Edit Trigger */}
              <DialogTrigger asChild>
                <DropdownMenuItem>                 
                    Edit
                </DropdownMenuItem>
              </DialogTrigger>

              {/* Delete Trigger */}
              <AlertDialogTrigger asChild>
                <DropdownMenuItem>                 
                  <span className="text-[#dc2626] hover:text-[#dc2626]">Delete</span>
                </DropdownMenuItem>
              </AlertDialogTrigger>

            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Edit Dialog */}          
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Appointment - {appointmentDetails.AppID}</DialogTitle>
              <DialogDescription>Make changes to appointment here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <DialogForm appointmentDetails={appointmentDetails} />            
          </DialogContent>

          {/* Delete Dialog */}  
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                {`This action cannot be undone. This will permanently remove appointment ${appointmentDetails.AppID} data from our servers.`}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction ref={deleteBtnRef} onClick={deleteAppointment}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>

        </AlertDialog>
        </Dialog>
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