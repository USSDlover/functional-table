type Genders = 'female' | 'male' | 'others' | 'preferNotToSay';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: Genders;
  email: string;
  phone: string;
  birthDate: string;
  eyeColor: string;
}

// Filterable by the following

type GenderFilter = Array<Genders>;

type AgeFilter = {
  op: 'equal' | 'greater' | 'smaller';
  val: number;
};

type BirthDateFilter = {
  from: Date,
  to: Date,
}

export interface UserFilter {
  type: 'gender' | 'age' | 'eyeColor' | 'birthDate';
  gender?: GenderFilter;
  age?: AgeFilter;
  eyeColor?: string[];
  birthDate?: BirthDateFilter;
}