import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"



import { PenSquare } from 'lucide-react';
import { PatientDetails } from "./PatientDetails";
import { PreviousVisit } from "./PreviousVisit";
// import { PendingOrders } from "./PendingOrders";
import { AddTreatmentDetails } from "./AddTreatmentDetails";

import { useRecoilValue } from "recoil";
import { patientsState } from "@/state/atoms";

// @ts-ignore
export function AddTreatmentDetailsDialog({ appointmentDetails })
{

  const patients = useRecoilValue(patientsState)
  console.log(patients)
  let patientDetails = patients.filter((patient) => {
    // @ts-ignore
    if ( patient.PatID === appointmentDetails.PatID ) {
      return true
    }
  })
  patientDetails = patientDetails[0]
  console.log(patientDetails)
  // const patientDetailsResponse = await fetch(`https://api.topoship.com/patients/${appointmentDetails.PatID}`);
  // const patientDetails = await patientDetailsResponse.json();
  // console.log(patientDetails)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <PenSquare height={"15px"} width={"15px"} className='cursor-pointer' />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          {/* @ts-ignore */}
          <SheetTitle>{patientDetails.PatName} - {appointmentDetails.PatID} | <span className="text-sm font-[400] text-muted-foreground"> <b>mobile:</b> {patientDetails.PatMobile} | <b>address:</b> {patientDetails.Address} </span></SheetTitle>
          {/* <SheetDescription>
            <span className="text-sm text-muted-foreground"> <b>mobile:</b> {patientDetails.PatMobile} | <b>address:</b> {patientDetails.Address} </span>
          </SheetDescription> */}
        </SheetHeader>
        <div className="flex justify-center flex-col mt-[2rem]">
          <div className="flex  ">
            <div>

              <PatientDetails patientDetails={patientDetails} />

            </div>
            <div>

              <PreviousVisit />

            </div>
          </div>
          <div>
            <AddTreatmentDetails />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}