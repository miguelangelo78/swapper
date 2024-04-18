export interface SwapperUserBase {
  id?: number,
  email: string,
  name?: string,
  picture?: string,
  setup_complete: boolean,
}

export interface SwapperUser extends SwapperUserBase {
  firstName: string;
  lastName: string;
  nickname: string;
  age: number;
  origin: string;
  destination: string;
  major: string;
  province: string;
  subprovince: string;
  contact: string;
};
