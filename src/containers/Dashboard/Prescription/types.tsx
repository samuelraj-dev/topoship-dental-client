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

export type dbMedicine = {
  ID: string
  Name: string
  Time: string
  BeforeFood: string
  Days: number
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
  medicineDetails: dbMedicine;
}