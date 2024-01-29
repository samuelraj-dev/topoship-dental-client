import {
  Card,
  CardContent,
  // CardDescription,
  // CardHeader,
  // CardTitle,
  // CardFooter
} from "@/components/ui/card"




// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AddPrescription } from "./AddPrescription";

export function AddTreatmentDetails()
{

  return (
    <Card className="w-[100%] mt-[2rem]">
      {/* <CardHeader>
        <CardTitle>Treatment Details</CardTitle>
      </CardHeader> */}
      <CardContent>

      <div className="flex justify-between">
        <div className="w-[40%] mr-[1rem]">
            <h1 className="mt-[1.5rem] mb-[1rem]"><b>Treatment Details</b></h1>
            <div className="grid w-full items-center gap-4">
              <div className="flex items-center">
                <Label htmlFor="symptoms" className="mr-[0.5rem] w-[7rem]">Symptoms:</Label>
                <Input id="symptoms" placeholder="Symptoms..." />
              </div>
              <div className="flex items-center">
                <Label htmlFor="fullDetails" className="mr-[0.5rem] w-[7rem]">Full Details:</Label>
                <Textarea id="fullDetails" className="h-[7rem]" placeholder="Enter Full Details..." />
              </div>
            </div>
        </div>
        {/* removed -  overflow-y-scroll h-[15rem] */}
        <div className="w-[60%]">
            <AddPrescription />
        </div>
      </div>
      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter> */}
    </Card>
  )
}