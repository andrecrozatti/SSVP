export interface IAssisteds {
  id: number;
  name: string;
  age: number;
  whatsapp: string;
  profession: string;
  address: string;
  address_number: string;
  neighborhood: string;
  zip_code: string;
  address_complement: string;
  city: string;
  state: string;
  country: string;
  cpf: string;
  Case_report: string;
  family_income: string;
  explain: string;
  Spouse: string;
  maritalStatus: string;
  home: string;
  conference_id: number;
  dependents: Array<IDependents>;
}

interface IDependents {
  id: Number | null;
  assisted_id: Number;
  date: Number;
  name: string;
  relationship: string;
}