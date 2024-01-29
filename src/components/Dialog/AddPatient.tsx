import { useRef } from 'react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

import { Plus } from "lucide-react"

// shadcn ui
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription  } from '@/components/ui/dialog';

// form
import { useForm } from "react-hook-form";
import { editPatientSchema } from "@/utils/validator";

import { genderOptions, stateOptions, countryOptions, bloodGrpOptions } from "@/utils/optionsData";

import { useSetRecoilState } from "recoil";
import { patientsState } from "@/state/atoms"

const DialogForm = () => {

  const { toast } = useToast()
  const setPatients = useSetRecoilState(patientsState);
  const submitDialogFormRef = useRef(null);

  const form = useForm<z.infer<typeof editPatientSchema>>({
    resolver: zodResolver(editPatientSchema),
  })

  // Handling Dialog Form on Submit
  async function onSubmit (data: z.infer<typeof editPatientSchema>) {

    // updating button text to "Adding..."
    const element: any = submitDialogFormRef.current;
    if (element) {
      element.innerText = 'Adding...';
      element.disabled = true;
    }

    try {
      // updating database
      await fetch("https://api.topoship.com/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      
      // updating table
      const getPatientsResponse = await fetch("https://api.topoship.com/patients");
      setPatients(await getPatientsResponse.json())

      // updating button text to "done"
      element.innerText = 'Done';

      // informing user
      toast({
        description: `Added the details of ${data.name}`,
      })

      // closing dialog
      document.getElementById('closeDialog')?.click();

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-end">
          <div className="grid gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            {/* ID */}
            {/* <FormField
              control={form.control}
              name="id"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Patient ID:</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Patient ID..." className="col-span-3" {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            ></FormField> */}

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Name:</FormLabel>
                  <FormControl>
                  <Input placeholder="Enter Patient Name..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Mobile */}
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile:</FormLabel>
                  <FormControl>
                  <Input type="number" placeholder="Enter Mobile No..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Email:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Patient Email..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender:</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className={`w-[150px]`}>
                        <SelectValue placeholder="Select Gender..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Gender</SelectLabel>
                          {genderOptions && genderOptions.map(genderOption => (
                            <SelectItem key={genderOption.value} value={genderOption.value}>{genderOption.label}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* DOB */}
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DOB:</FormLabel>
                  <FormControl>
                    {/* @ts-ignore */}
                    <Input placeholder="YYYY-MM-DD" className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Emergency Number */}
            <FormField
              control={form.control}
              name="emergencyNum"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Number:</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter Emergency Number..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Address..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Country */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country:</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className={`w-[150px]`}>
                        <SelectValue placeholder="Select Country..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Country</SelectLabel>
                          {countryOptions && countryOptions.map(countryOption => (
                            <SelectItem key={countryOption.value} value={countryOption.value}>{countryOption.label}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* State */}
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State:</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className={`w-[150px]`}>
                        <SelectValue placeholder="Select State..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>States</SelectLabel>
                          <ScrollArea className="h-[200px]">
                            {stateOptions && stateOptions.map(stateOption => (
                              <SelectItem key={stateOption.value} value={stateOption.value}>{stateOption.label}</SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* City */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter City..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Pincode */}
            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pincode:</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter Pincode..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Blood Group */}
            <FormField
              control={form.control}
              name="bloodGrp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Group:</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className={`w-[180px]`}>
                        <SelectValue placeholder="Select Blood Group..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Blood Groups</SelectLabel>
                          {bloodGrpOptions && bloodGrpOptions.map(bloodGrpOption => (
                            <SelectItem key={bloodGrpOption.value} value={bloodGrpOption.value}>{bloodGrpOption.label}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Current Medication */}
            <FormField
              control={form.control}
              name="currMedication"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Medication:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Current Medication..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

          </div>
          
          <Button ref={submitDialogFormRef} type="submit">Save Changes</Button>

        </form>
      </Form>
    </>
  )
}

export default function AddPatientDialog() {
  return (
    <Dialog>

      <DialogTrigger asChild>              
      <Button
          variant="outline"
          size="sm"
          className="px-[0.4rem] ml-[0.2rem]"
        >
          <Plus height="15px" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Patient</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
        </DialogHeader>

        <DialogForm />
        
      </DialogContent>

    </Dialog>
  )
}