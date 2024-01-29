import {
  Card,
  CardContent,
} from "@/components/ui/card"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// import { Button } from "@/components/ui/button";

// @ts-ignore
export function PatientDetails({ patientDetails })
{

  return (
    <Card className="w-[fit-content]">
      {/* <CardHeader>
        <CardTitle>Patient Details</CardTitle>
      </CardHeader> */}
      <CardContent>
        {/* <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">  
          <div className="w-full flex justify-between">
            <p className="text-sm font-medium leading-none">Created At: </p>
            <p className="text-sm font-medium leading-none">{patientDetails.created_at}</p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <div className="w-full flex justify-between">
            <p className="text-sm font-medium leading-none">Blood Group: </p>
            <p className="text-sm font-medium leading-none">{patientDetails.BloodGroup}</p>
          </div>
        </div>
        <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-accent hover:text-accent-foreground">
          <div className="w-full flex justify-between">
            <p className="text-sm font-medium leading-none">Medication: </p>
            <p className="text-sm font-medium leading-none">{patientDetails.CurrentMedication}</p>
          </div>
        </div> */}
        <div className="flex justify-between my-[0.5rem]">
          <h4 className="text-md font-semibold">Patient Details</h4>
          <Popover>
            <PopoverTrigger>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">{ patientDetails.PatName }</h4>
                <p className="text-sm text-muted-foreground">
                  Patient ID - { patientDetails.PatID }
                </p>
              </div>
              <div className="flex ">

                <div className="grid gap-2 w-[18rem] mr-[1rem]">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      disabled={true}
                      id="age"
                      defaultValue={patientDetails.patAge}
                      className="col-span-2 h-8 opacity-1"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="bloodGrp">Blood Group</Label>
                    <Input
                      disabled={true}
                      id="bloodGrp"
                      defaultValue={patientDetails.BloodGroup}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="mobile">Mobile</Label>
                    <Input
                      disabled={true}
                      id="mobile"
                      defaultValue={patientDetails.PatMobile}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      disabled={true}
                      id="email"
                      defaultValue={patientDetails.PatEmail}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="emergencyNum">Emergency No.</Label>
                    <Input
                      disabled={true}
                      id="emergencyNum"
                      defaultValue={patientDetails.EmergencyContactNo}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="createdAt">Created At</Label>
                    <Input
                      disabled={true}
                      id="createdAt"
                      defaultValue={patientDetails.created_at}
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>

                <div className="grid gap-2 w-[18rem]">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="currMedication">Current Medication</Label>
                    <Textarea
                      disabled={true}
                      id="currMedication"
                      defaultValue={patientDetails.CurrentMedication}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      disabled={true}
                      id="address"
                      defaultValue={patientDetails.Address}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      disabled={true}
                      id="pincode"
                      defaultValue={`${patientDetails.Pincode}`}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="city">City</Label>
                    <Input
                      disabled={true}
                      id="city"
                      defaultValue={patientDetails.City}
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="state">State</Label>
                    <Input
                      disabled={true}
                      id="state"
                      defaultValue={`${patientDetails.State}, ${patientDetails.Country}`}
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </div>
            </PopoverContent>
          </Popover>
        </div>


        <p className="text-sm text-muted-foreground">
          <span className="font-[600]">Created At:</span> {patientDetails.created_at}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-[600]">Blood Group:</span> {patientDetails.BloodGroup}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-[600]">Medication:</span> {patientDetails.CurrentMedication}
        </p>
        
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  )
}