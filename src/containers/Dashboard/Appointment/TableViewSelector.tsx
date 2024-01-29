
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { appointmentsState, appointmentsDateState, appointmentsViewState, appointmentsSortedState } from "@/state/atoms"
import { useEffect } from "react"

export default function TableViewSelector()
{

  const appointments = useRecoilValue(appointmentsState)
  // console.log("from TableViewSelector", appointments)
  const appointmentsDate = useRecoilValue(appointmentsDateState)
  const [ appointmentsView, setAppointentsView ] = useRecoilState(appointmentsViewState)
  const setAppointmentsSorted = useSetRecoilState(appointmentsSortedState)

  useEffect(() => {
    if (appointmentsView === "byDate") {
      const appointmentsToday = appointments.filter(appointment => {    
        // @ts-ignore
        if (appointment.Date === appointmentsDate.toISOString().slice(0, 10)) {
          return true
        }
      });
      setAppointmentsSorted(appointmentsToday)      
    }
    else if (appointmentsView === "byLast30Days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      // console.log(thirtyDaysAgo)

      const appointmentsLast30Days = appointments.filter(appointment => {
        // @ts-ignore        
        const appointmentDate = new Date(appointment.Date);
        return appointmentDate >= thirtyDaysAgo && appointmentDate <= new Date();
      });
      setAppointmentsSorted(appointmentsLast30Days)
    }
    else if (appointmentsView === "byFuture") {
      // @ts-ignore
      const futureAppointments = appointments.filter(appointment => {
        // @ts-ignore
        const appointmentDate = new Date(appointment.Date);
        return appointmentDate > new Date();
      });
      // console.log(futureAppointments)
      setAppointmentsSorted(futureAppointments)
    }
    else {
      console.log('j')
    }

  }, [appointments, appointmentsDate, appointmentsView])

  
  return (
    // @ts-ignore
    <Select onValueChange={(e) => setAppointentsView(e)} defaultValue={appointmentsView}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="byDate">By Date</SelectItem>
        <SelectItem value="byLast30Days">Last Month</SelectItem>
        <SelectItem value="byFuture">Future</SelectItem>
      </SelectContent>
    </Select>
  )
}