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
  phone_number: z.coerce.number({
    required_error: "Phone Number is required"
  })
    .min(10, "Phone number should be 10 digits"),
  password: z.string({
    required_error: "Passowrd is required"
  }).min(1, "Password too short - should be 8 chars minimun"),
})

export default function Login() {

  const [loginError, setLoginError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   phone_number,
    // },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // console.log(values)
      setLoginError(null);
      await axios.post(`${import.meta.env.VITE_PUBLIC_SERVER_ENDPOINT}/api/auth/login`, values);
    } catch (e: any) {
      // if (e.response.data.message) setLoginError(e.response.data.message);
      setLoginError(e.message);
    }
  }

  return (
    <>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-end">
          <div className="grid gap-4 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

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

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Password..." className="col-span-3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

          </div>
          
          <Button type="submit">Submit</Button>

          <p>{loginError && loginError}</p>

        </form>
      </Form>
    </>
  )
}