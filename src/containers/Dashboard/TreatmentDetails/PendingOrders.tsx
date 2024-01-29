import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  // CardFooter
} from "@/components/ui/card"

// import { Button } from "@/components/ui/button";

export function PendingOrders()
{

  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>Pending Orders</CardTitle>
        <CardDescription>No pending orders.</CardDescription>
      </CardHeader>
      <CardContent>

      </CardContent>
      {/* <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter> */}
    </Card>
  )
}
