import * as React from "react"
import { useRef } from 'react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


// shadcn ui
// import { Check, ChevronsUpDown } from "lucide-react"
// import { cn } from "@/lib/utils"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area"
// import {
//   Command,
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
//   CommandShortcut,
// } from "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"

// form
import { useForm } from "react-hook-form";
import { editAppointmentSchema } from "@/utils/validator";

import { DialogInputProps } from "./types";

import { useRecoilState, useSetRecoilState } from "recoil";
import { appointmentsState } from "@/state/atoms"
import { patientsState } from "@/state/atoms";


export const DialogForm: React.FC<DialogInputProps> = ({ appointmentDetails }) => {
  const { toast } = useToast()
  const setAppointments = useSetRecoilState(appointmentsState);
  // @ts-ignore
  const [ patients, setPatients ] = useRecoilState(patientsState)
  console.log(patients)
  const submitDialogFormRef = useRef(null);

  const form = useForm<z.infer<typeof editAppointmentSchema>>({
    resolver: zodResolver(editAppointmentSchema),
    defaultValues: {
      patId: appointmentDetails.PatID,
      doctor: appointmentDetails.Doctor,
      date: appointmentDetails.Date,
      time: appointmentDetails.Time,
      visitPurpose: appointmentDetails.VisitPurpose
    }
  })

  // Handling Dialog Form on Submit
  async function onSubmit (data: z.infer<typeof editAppointmentSchema>) {

    // updating button text to "saving"
    const element: any = submitDialogFormRef.current;
    if (element) {
      element.innerText = 'Saving...';
      element.disabled = true;
    }

    try {
      // updating database
      console.log(JSON.stringify(data))
      await fetch("https://api.topoship.com/appointments", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        mode: "cors",
      })

      // updating table
      const getPatientsResponse = await fetch("https://api.topoship.com/appointments");
      setAppointments(await getPatientsResponse.json())

      // updating button text to "done"
      element.innerText = 'Done';

      // informing user
      toast({
        description: `Updated the details of ${appointmentDetails.PatID}`,
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

          {/* <FormField
              control={form.control}
              name="patId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient:</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-[200px] justify-between"
                        >
                          {field.value
                            ? patients.find((patient) => patient.PatName === field.value)?.PatName
                            : "Select patient..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search patient..." />
                          <CommandEmpty>No Patient found.</CommandEmpty>
                          <CommandGroup>
                            {patients.map((patient) => (
                              <CommandItem
                                value={patient.PatID}
                                key={patient.PatID}
                                onSelect={() => {
                                  form.setValue("patient", patient.PatName)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    patient.PatMobile === field.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {patient.PatName}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            ></FormField> */}

            {/* Pat ID */}
            <FormField
              control={form.control}
              name="patId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient:</FormLabel>
                  <FormControl>
                  {/* @ts-ignore */}
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className={`w-[150px]`}>
                        <SelectValue placeholder="Select Patient..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Patient</SelectLabel>
                          <ScrollArea className="h-[200px]">
                            {/* @ts-ignore */}
                            {patients && patients.map(patient => (
                              // @ts-ignore
                              <SelectItem key={patient.PatID} value={patient.PatID}>{patient.PatName}</SelectItem>
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

            {/* Doctor */}
            <FormField
              control={form.control}
              name="doctor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Doctor:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Doctor..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Date..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Time */}
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Time..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Visit Purpose */}
            <FormField
              control={form.control}
              name="visitPurpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Visit Purpose:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Visit Purpose..." className="col-span-3" {...field} />
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