import { useEffect } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { patientsState, appointmentsState, appointmentsSortedState } from "@/state/atoms"

import { AppointmentDataTable } from "./table"
import { columns } from "./table-columns"

let appointmentsData: any = [];

export default function Patient() {
  
  const setAppointments = useSetRecoilState(appointmentsState)
  const appointmentsSorted = useRecoilValue(appointmentsSortedState)
  // @ts-ignore
  const [ patients, setPatients ] = useRecoilState(patientsState)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const responseAppointments = await fetch("https://api.topoship.com/appointments");
    const responsePatients = await fetch("https://api.topoship.com/patients");
    const dataAppointments = await responseAppointments.json();
    const dataPatients = await responsePatients.json();
    setAppointments(dataAppointments);
    setPatients(dataPatients);
  }

  return (
    <>
      <AppointmentDataTable columns={columns} data={appointmentsSorted} />
    </>
  )
}

export { appointmentsData }