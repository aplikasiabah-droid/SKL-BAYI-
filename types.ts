
export enum Gender {
  EMPTY = '',
  MALE = 'Laki-laki',
  FEMALE = 'Perempuan'
}

export enum BirthType {
  EMPTY = '',
  SINGLE = 'Tunggal',
  TWINS_2 = 'Kembar 2',
  TWINS_3 = 'Kembar 3',
  OTHERS = 'Lainnya'
}

export interface BirthData {
  id?: string;
  certificateNo: string;
  day: string;
  date: string;
  time: string;
  gender: Gender;
  birthType: BirthType;
  birthOrder: string;
  gestationAge: string;
  weight: string;
  headCircumference: string;
  length: string;
  chestCircumference: string;
  babyName: string;
  
  motherName: string;
  motherKtp: string;
  motherJob: string;
  
  fatherName: string;
  fatherKtp: string;
  fatherJob: string;
  
  address: string;
  
  signingDate: string;
  assistantName: string;
  assistantNip: string;
}

export const createEmptyBirthData = (): BirthData => ({
  id: undefined,
  certificateNo: '',
  day: '',
  date: '',
  time: '',
  gender: Gender.EMPTY,
  birthType: BirthType.EMPTY,
  birthOrder: '',
  gestationAge: '',
  weight: '',
  headCircumference: '',
  length: '',
  chestCircumference: '',
  babyName: '',
  motherName: '',
  motherKtp: '',
  motherJob: '',
  fatherName: '',
  fatherKtp: '',
  fatherJob: '',
  address: '',
  signingDate: '',
  assistantName: '',
  assistantNip: '',
});

export const initialBirthData = createEmptyBirthData();
