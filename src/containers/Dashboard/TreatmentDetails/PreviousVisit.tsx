import { useState } from "react";

import {
  Card,
  CardContent,
  // CardFooter
} from "@/components/ui/card"

import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons"

//date, symptoms, bill amount, prescription,  orders
export function PreviousVisit()
{

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className="w-[fit-content] ml-[1rem]">
      {/* <CardHeader>
        <CardTitle>Previous Visits</CardTitle>
      </CardHeader> */}
      <CardContent>
      
      {/* <h4 className="text-md font-semibold my-[0.5rem]">Previous Visits:</h4> */}

      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>S.No.</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Symptoms</TableHead>
            <TableHead className="text-center">Bill Amount</TableHead>
            <TableHead className="text-center">Prescription</TableHead>
            <TableHead className="text-center">Orders</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>17/08/2023</TableCell>
              <TableCell>Tooth Ache</TableCell>
              <TableCell>₹500</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>23/06/2023</TableCell>
              <TableCell>Tooth Ache</TableCell>
              <TableCell>₹500</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>12/04/2022</TableCell>
              <TableCell>Tooth Ache</TableCell>
              <TableCell>₹500</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
            </TableRow>

            <>
            {isOpen ? (
              <>
              <TableRow>
                <TableCell>4</TableCell>
                <TableCell>17/08/2023</TableCell>
                <TableCell>Tooth Ache</TableCell>
                <TableCell>₹500</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>5</TableCell>
                <TableCell>23/06/2023</TableCell>
                <TableCell>Tooth Ache</TableCell>
                <TableCell>₹500</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>6</TableCell>
                <TableCell>12/04/2022</TableCell>
                <TableCell>Tooth Ache</TableCell>
                <TableCell>₹500</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
              </>
            ): (
              <div></div>
            )}


            </>

        </TableBody>
      </Table>
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(() => !isOpen)}>
        <span className="">Expand</span>
        <CaretSortIcon className="h-4 w-4" />
      </Button>

      </CardContent>
    </Card>
  )
}