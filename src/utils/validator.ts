import { z } from "zod";

const optionalField = (type: any) => {
  return type.transform((value: any) => (value === '' ? null : value)).optional().nullable();
}

export const editAppointmentSchema = z.object({
  patId: z.string(),
  doctor: z.string().min(3),
  date: z.string().min(2),
  time: z.string().min(2),
  // dob: z.coerce.date(),
  visitPurpose: optionalField(z.string()),
})

export const editPatientSchema = z.object({
  address: optionalField(z.string()),
  bloodGrp: z.string().min(4).max(5),
  city: optionalField(z.string()),
  country: z.string().min(5).max(5),
  currMedication: optionalField(z.string()),
  emergencyNum: z.string().min(10),
  email: optionalField(z.string()),
  mobile: z.string().min(10),
  name: z.string().min(2),
  pincode: optionalField(z.string()),
  state: z.string(),
  dob: z.coerce.date(),
  gender: z.string().min(4).max(6),
})

export const editMedicineSchema = z.object({
  id: optionalField(z.string()),
  name: z.string().min(2),
  time: optionalField(z.string()),
  beforeFood: optionalField(z.string()),
  days: z.coerce.number(),
})