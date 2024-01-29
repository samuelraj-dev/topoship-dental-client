// ui
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

import { MoreHorizontal } from "lucide-react";

import { DialogForm } from "./table-form"

import { useSetRecoilState } from "recoil";
import { appointmentsState, patientsState } from "@/state/atoms"

import { useRef } from 'react';

import { useToast } from "@/components/ui/use-toast";

// @ts-ignore
export function TableActions({ patientDetails })
{


  const { toast } = useToast()
    const setPatients = useSetRecoilState(patientsState);
    const deleteBtnRef = useRef(null);

    const deletePatient = async () => {

      try {
        // updating button text to "saving"
        const element: any = deleteBtnRef.current;
        if (element) {
          element.innerText = 'Deleting...';
          element.disabled = true;
        }
        
        // updating database
        await fetch(`https://api.topoship.com/patients`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: patientDetails.AppID
          })
        })
    
        // informing user
        toast({
          description: `Deleted the details of ${patientDetails.PatName}`,
        })

        // updating table
        const getPatientsResponse = await fetch("https://api.topoship.com/patients");
        setPatients(await getPatientsResponse.json())
    
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
              {/* <DropdownMenuItem>                 
                  Add Treatment Details
              </DropdownMenuItem> */}

            {/* Edit Trigger */}
            {/* <DialogTrigger asChild>
              <DropdownMenuItem>                 
                  View History
              </DropdownMenuItem>
            </DialogTrigger> */}

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
            <DialogTitle>Patient Name: {patientDetails.PatName}</DialogTitle>
            <DialogDescription>Patient ID: {patientDetails.PatID}</DialogDescription>
          </DialogHeader>
          <DialogForm patientDetails={patientDetails} />            
        </DialogContent>

        {/* Delete Dialog */}  
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                {`This action cannot be undone. This will permanently remove ${patientDetails.PatName} data from our servers.`}
              </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction ref={deleteBtnRef} onClick={deletePatient}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>

      </AlertDialog>
    </Dialog>
  )
}