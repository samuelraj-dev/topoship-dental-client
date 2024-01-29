import { useEffect } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { patientsState, appointmentsState, appointmentsSortedState } from "@/state/atoms"

import { AppointmentDataTable } from "./data-table/table"
import { columns } from "./data-table/table-columns"

let appointmentsData: any = [];

export default function TreatmentDetail() {
  
  const setAppointments = useSetRecoilState(appointmentsState)
  const appointmentsSorted = useRecoilValue(appointmentsSortedState)
  // @ts-ignore
  const [ patients, setPatients ] = useRecoilState(patientsState)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const responseAppointments = await fetch("https://api.topoship.com/appointments");
    const dataAppointments = await responseAppointments.json();
    setAppointments(dataAppointments);
    
    const responsePatients = await fetch("https://api.topoship.com/patients");
    const dataPatients = await responsePatients.json();
    setPatients(dataPatients);
  }

  return (
    <>
      <AppointmentDataTable columns={columns} data={appointmentsSorted} />
      {/* <h1>under construction</h1> */}
    </>
  )
}

export { appointmentsData }