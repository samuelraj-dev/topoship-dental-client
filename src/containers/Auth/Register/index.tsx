import axios from "axios";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  registration_number: z.string({
    required_error: "Passowrd is required"
  }),
  phone_number: z.coerce.number({
    required_error: "Phone Number is required"
  })
    .min(10, "Phone number should be 10 digits"),
  email: z.string({
    required_error: "Email is required"
  }).email(),
})

export default function Login() {

  const [registerError, setRegisterError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    try {
      await axios.post(`${import.meta.env.VITE_PUBLIC_SERVER_ENDPOINT}/api/auth/register`, values);
    } catch (e: any) {
      setRegisterError(e.message);
    }
  }

  return (
    <>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-end">
          <div className="grid gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

            {/* RegNo */}
            <FormField
              control={form.control}
              name="registration_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Register Number:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Registration Number..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Phone Number..." className="col-span-3" {...field} />
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
                  <FormLabel>Email:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Email..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

          </div>
          
          <Button type="submit">Submit</Button>

          <p>{registerError && registerError}</p>

        </form>
      </Form>
    </>
  )
}