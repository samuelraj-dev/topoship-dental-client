import { useState, useEffect } from "react"

import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
//   CommandShortcut,
// } from "@/components/ui/command"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { Plus } from "lucide-react"

import { useRecoilState } from "recoil"
import { medicinesState } from "@/state/atoms"

export function AddPrescription()
{
  useEffect(() => {
    getMedicines()
  }, [])

  const [ medicineData, setMedicineData ] = useRecoilState(medicinesState)

  const getMedicines = async () => {
    const response = await fetch("https://api.topoship.com/medicines");
    const data = await response.json();
    setMedicineData(data);
  }

  const [ input, setInput ] = useState("")
  const [ medicineState, setMedicineState ] = useState<any>([])
  const [ addMedicineState, setAddMedicineState ] = useState<any>(null)
  const [ medicineColumns, setMedicineColumns ] = useState<any>([])
  const [ addMedicineInput, setAddMedicineInput ] = useState(true)

  const filterMedicine = (value: string) => {

    setInput(value)    
    let newMedicine = medicineData.filter((medicine) => {
      if (value == "" || value == null) return false
      // @ts-ignore
      const medName = medicine.Name;
      if ( medName.toLowerCase().includes(value.toLowerCase()) )
      {
        return true;
      }
    }) 
    setMedicineState(newMedicine)
  }

  const addMedicineUI = ({id}: {id: any}) => {
    setAddMedicineState(null);

    let newAddMedicine = medicineData.filter((medicine) => {
      // @ts-ignore
      const medID = medicine.ID;
      if ( medID === id )
      {
        return true;
      }
    })

    setAddMedicineState(newAddMedicine[0])
    console.log(newAddMedicine)
    setAddMedicineInput(false)
  }

  const addMedicine = (medicine: any) => {
    setAddMedicineInput(true)
    setMedicineColumns([ ...medicineColumns, medicine])
    setAddMedicineState(null)
    filterMedicine("")
  }

  return (
    <>
      <h1 className="mt-[1.5rem] mb-[1rem]"><b>Prescription</b></h1>

      <div className="flex">

        {addMedicineInput && <div className="flex items-center mb-[1rem]">
          {/* <Label htmlFor="selectMedicine" className="mr-[0.5rem] w-[7rem]">Add Medicine:</Label> */}
          <div className="relative z-10">
            <Input id="selectMedicine" className="w-[10rem]" type="text" placeholder="Add Medicine..." value={input} onChange={(e) => filterMedicine(e.target.value)}></Input>
            <div className="absolute bg-white mt-[0.5rem] w-[10rem] rounded drop-shadow-md">
              {
                medicineState.length >= 1 ? (
                  medicineState.map((medicine: any) => {
                    return (
                      // @ts-ignore
                      <div className="p-[0.2rem]" onClick={() => addMedicineUI({id: medicine?.ID})}>{medicine?.Name}</div>
                    )
                  })
                ): (
                  // <div>No result</div>
                  <></>
                )
              }
            </div>
          </div>
        </div>
        }
        

        {addMedicineState && <>
          
          <div className="flex mb-[1rem] items-center">
            <Badge variant="outline" className="h-[2rem]">{addMedicineState.Name}</Badge>

            <div className="flex items-center ml-[1rem]">
              <Label className="">M/A/N: </Label>
              <Input type="text" defaultValue={(addMedicineState.Time).substring(0,1)} className="mx-[0.25rem] h-[2rem] w-[2rem] text-center p-[0rem]"></Input>
              <Input type="text" defaultValue={(addMedicineState.Time).substring(2,3)} className="mx-[0.25rem] h-[2rem] w-[2rem] text-center p-[0rem]"></Input>
              <Input type="text" defaultValue={(addMedicineState.Time).substring(4,5)} className="mx-[0.25rem] h-[2rem] w-[2rem] text-center p-[0rem]"></Input>
            </div>

            <div className="flex items-center ml-[1rem]">
              <Label className="">Days: </Label>
              <Input type="text" defaultValue={addMedicineState.Days} className="mx-[0.25rem] h-[2rem] w-[5rem] text-center p-[0rem]"></Input>            
            </div>

            <Button className="ml-[1rem] h-[2rem] w-[3rem]" onClick={() => addMedicine(addMedicineState)}>
              <Plus className="text-white" />
            </Button>
            

          </div>
        </>}

      </div>


      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Medicine Name</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-center">Days</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>Dolo 650mg</TableCell>
            <TableCell>1-0-1</TableCell>
            <TableCell>10</TableCell>
            <TableCell>...</TableCell>
          </TableRow> */}
          {medicineColumns.length >=1 ? (
            medicineColumns.map((medicine: any) => {
              return (
                <TableRow>
                  <TableCell className="font-medium"></TableCell>
                  <TableCell>{medicine.Name}</TableCell>
                  <TableCell>{medicine.Time}</TableCell>
                  <TableCell>{medicine.Days}</TableCell>
                  <TableCell>...</TableCell>
                </TableRow>
              )
            })
          ): (
            <TableCell>No medicine</TableCell>
          )}
        </TableBody>
      </Table>
    </>
  )
}




















          {/* <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <span>Launch</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <span>Mail</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command> */}