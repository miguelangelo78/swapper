export interface SwapperUserBase {
  id?: number,
  email: string,
  name?: string,
  picture?: string,
  setupComplete: boolean,
  password: string,
}

export interface SwapperUser extends SwapperUserBase {
  firstName: string;
  lastName: string;
  nickname: string;
  origin: Transition;
  destination: Transition;
  contact: Contact;
}

export interface Transition {
  id: number;
  areaOffice: string;
  province: string;
  subprovince: string;
  major: string;
}

export interface Contact {
  id: number;
  email: string;
  line?: string;
  facebook?: string;
  phone?: string;
}
