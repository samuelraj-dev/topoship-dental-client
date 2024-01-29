import { atom } from "recoil";

export const patientsState = atom({
  key: 'patientsState',
  default: [],
})

export const appointmentsState = atom({
  key: 'appointmentsState',
  default: [],
})

export const appointmentsDateState = atom({
  key: 'appointmentsDateState',
  default: new Date(),
})

export const appointmentsViewState = atom({
  key: 'appointmentsViewState',
  default: 'byDate'
})

export const appointmentsSortedState = atom({
  key: 'appointmentsSortedState',
  default: []
})

export const medicinesState = atom({
  key: 'medicinesState',
  default: [],
})