export class Product {
  image: string;
  title: string;
  description: string;
  price: number;
  favorite: boolean;
  solt: number;
  createdAt:string;
  updatedAt:string;
}

export class User {
  email: string;
  password: string;
}

export class currentUser {
  createdAt: Date;
  email: string;
  id: number;
  permission: string;
  role: string;
  cmp: string;
  room: string;
  status: string;
}

export class Provider {
  connection: boolean;
  createdAt: Date;
  email: string;
  cmp: string;
  firstName: string;
  image: string;
  lastName: string;
  password: string;
  permission: string;
  phoneNumber: string;
  role: string;
  room: string;
  status: string;
  updatedAt: Date;
  _id: string;
  socketId: string;
  peerId: string;
}

export class Patient {
  connection: boolean;
  dni: string;
  birthdate: string;
  email: string;
  phoneNumber: string;
  providerId: string;
  record: string;
  room: string;
  fullName: string;
  calling: boolean;
  _id: string;;
  socketId: string;
  peerId: string;
}

export class Consult {  
  patientId: String;
  providerId : String;
  dni: String;
  birthDate: number;
  allergy: String;
  complain: String;
  timeOfDisease: String;
  wayOfStart: String;
  symptom: Array<string>;
  historyId: String;
  subjective: String;
  objective: String;
  assessment: String;
  plan: String;
  status: String;
  typeAttetion: String;
  reason: String;
  payment: String;
  payAmount: Number;
  providerFiles: Array<string>;
  patientFiles: Array<string>;
  patient: Object;
  createdAt: Date;
  _id: String;
}

export class Chart {
  dni: String;
  disease:Array<string>;
  medication:Array<string>;
  surgery:Array<string>;
  family:Array<string>;
  toxic:Array<string>;
  _id: String;
}