export type dbPatient = {
  Address?: string
  BloodGroup: string
  City?: string
  Country: string
  CurrentMedication?: string
  EmergencyContactNo: string
  PatEmail?: string
  PatID: number
  PatMobile: string
  PatName: string
  Pincode?: string
  State: string
  patAge?: number
  patDOB?: Date
  patGender: string
}

export type dbAppointment = {
  AppID: number
  Doctor: string
  PatID: number
  Date: string
  Time: string
  VisitPurpose?: string
}

// export type DialogInputProps = {
//   id: string;
//   show: string;
//   select?: {
//     width: string;
//     placeHolder: string;
//     label: string;
//     items: { value: string; show: string }[];
//   };
//   patientDetails: dbPatient;
// }

export type DialogInputProps = {
  appointmentDetails: dbAppointment;
}