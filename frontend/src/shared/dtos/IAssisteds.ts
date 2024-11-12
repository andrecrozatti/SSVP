export interface IAssisteds {
  id: number;
  name: string;
  age: string;
  phone: string;
  profession: string;
  address: string;
  address_number: string;
  neighborhood: string;
  zip_code: string;
  address_complement?: string | undefined;
  city: string;
  state: string;
  country: string;
  cpf: string;
  Case_report: string;
  family_income: string;
  explain: string;
  maritalStatus: string;
  home: string;
  conference_id: number ;
  dependents: Array<IDependents>;
  status: string
}

interface IDependents {
  id?: Number | null;
  assisted_id: Number;
  birth_date: Date | null;
  name: string;
  relationship: string;
  CPF: string;
  
}
