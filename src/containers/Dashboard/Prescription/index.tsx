import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { medicinesState } from "@/state/atoms"

import { MedicineDataTable } from "./table"
import { columns } from "./table-columns"

let medicinesData: any = [];

export default function Patient() {
  
  const [ medicines, setMedicines ] = useRecoilState(medicinesState)
  medicinesData = medicines;

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await fetch("https://api.topoship.com/medicines");
    const data = await response.json();
    setMedicines(data);
  }

  return (
    <>
      <MedicineDataTable columns={columns} data={medicines} />
    </>
  )
}

export { medicinesData }