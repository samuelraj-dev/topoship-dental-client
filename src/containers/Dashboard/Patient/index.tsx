import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { patientsState } from "@/state/atoms"

import { PatientDataTable } from "./data-table/table"
import { columns } from "./data-table/table-columns"

let patientsData: any = [];

export default function Patient() {
  
  const [ patients, setPatients ] = useRecoilState(patientsState)
  patientsData = patients;

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await fetch("https://api.topoship.com/patients");
    const data = await response.json();
    setPatients(data);
  }

  return (
    <>
      <PatientDataTable columns={columns} data={patients} />
    </>
  )
}

export { patientsData }