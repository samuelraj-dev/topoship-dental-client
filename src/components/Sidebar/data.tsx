import { TbLayoutDashboard } from "react-icons/tb";
import { MdOutlinePeopleOutline } from "react-icons/md"
import { BiNotepad } from "react-icons/bi"
import { FaUserDoctor } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi"
import { RiBillLine } from "react-icons/ri"
import { ImLab } from "react-icons/im"
import { BsFileBarGraph } from "react-icons/bs"

export const sbNavItems = [
  {
    name: "Dashboard",
    icon: <TbLayoutDashboard />,
    link: "/dashboard",
  },
  {
    name: "Patient",
    icon: <MdOutlinePeopleOutline />,
    link: "/dashboard/patient",
    master: true
  },
  {
    name: "Appointment",
    icon: <BiNotepad />,
    link: "/dashboard/appointment",
  },
  {
    name: "Treatment Details",
    icon: <FaUserDoctor />,
    link: "/dashboard/treatment-details",
  },
  {
    name: "Prescription",
    icon: <GiMedicines />,
    link: "/dashboard/prescription",
    master: true
  },
  {
    name: "Billing",
    icon: <RiBillLine />,
    link: "/dashboard/billing",
  },
  {
    name: "Lab Orders",
    icon: <ImLab />,
    link: "/dashboard/lab-orders",
  },
  {
    name: "Reports",
    icon: <BsFileBarGraph />,
    link: "/dashboard/reports",
  },
]