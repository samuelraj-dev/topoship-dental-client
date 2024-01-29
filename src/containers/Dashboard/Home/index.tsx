import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {

  const [name, setName] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.topoship.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      })

      if(response.ok) {
        console.log(response)
      } else {
        console.log("failed!")
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <Button
        type="submit"
      >Submit</Button>
    </form>
  )
}