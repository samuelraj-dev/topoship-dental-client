import React from "react"
import { useRef } from 'react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"


// shadcn ui
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
// import { ScrollArea } from "@/components/ui/scroll-area"


// form
import { useForm } from "react-hook-form";
import { editMedicineSchema } from "@/utils/validator";

import { beforeOrAfterFoodOptions } from "@/utils/optionsData"
import { DialogInputProps } from "./types";

import { useSetRecoilState } from "recoil";
import { medicinesState } from "@/state/atoms"


export const DialogForm: React.FC<DialogInputProps> = ({ medicineDetails }) => {
  const { toast } = useToast()
  const setMedicines = useSetRecoilState(medicinesState);
  const submitDialogFormRef = useRef(null);

  const form = useForm<z.infer<typeof editMedicineSchema>>({
    resolver: zodResolver(editMedicineSchema),
    defaultValues: {
      name: medicineDetails.Name, time: medicineDetails.Time,
      beforeFood: medicineDetails.BeforeFood, days: medicineDetails.Days
    }
  })

  // Handling Dialog Form on Submit
  async function onSubmit (data: z.infer<typeof editMedicineSchema>) {

    // updating button text to "saving"
    const element: any = submitDialogFormRef.current;
    if (element) {
      element.innerText = 'Saving...';
      element.disabled = true;
    }

    try {
      // updating database
      console.log(JSON.stringify(data))
      await fetch("https://api.topoship.com/medicines", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        mode: "cors",
      })

      // updating table
      const getMedicinesResponse = await fetch("https://api.topoship.com/medicines");
      setMedicines(await getMedicinesResponse.json())

      // updating button text to "done"
      element.innerText = 'Done';

      // informing user
      toast({
        description: `Updated the details of ${medicineDetails.Name}`,
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

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medicine Name:</FormLabel>
                  <FormControl>
                  <Input placeholder="Enter Medicine Name..." className="col-span-3" {...field} />
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

            {/* beforeFood */}
            <FormField
              control={form.control}
              name="beforeFood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Before/After Food:</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className={`w-[150px]`}>
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {beforeOrAfterFoodOptions && beforeOrAfterFoodOptions.map(beforeOrAfterFoodOption => (
                            <SelectItem key={beforeOrAfterFoodOption.value} value={beforeOrAfterFoodOption.value}>{beforeOrAfterFoodOption.label}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Days */}
            <FormField
              control={form.control}
              name="days"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Days:</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter No. of Days..." className="col-span-3" {...field} />
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