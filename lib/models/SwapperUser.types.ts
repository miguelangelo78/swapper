import { SetupFormData } from "@/components/setup-wizard/SetupFormWizardComponent";

export enum AccountType {
  DEFAULT = 'DEFAULT',
  GOOGLE = 'GOOGLE',
}

export interface SwapperUserBase {
  id?: number,
  updatedAt?: Date,
  createdAt?: Date,
  email: string,
  password: string,
  name?: string,
  picture?: string,
  setupComplete: boolean,
  isAdmin: boolean,
  lastLogin?: Date,
  accountType?: AccountType,
}

export interface SwapperUser extends SwapperUserBase {
  firstName: string;
  lastName: string;
  nickname: string;
  schoolName: string;
  origin: Transition;
  destination: Transition;
  contact: Contact;
}

export interface Transition {
  id?: number;
  updatedAt?: Date,
  createdAt?: Date,
  areaOffice: string;
  province: string;
  subprovince: string;
  major: string;
  educationArea: string;
}

export interface Contact {
  id?: number;
  updatedAt?: Date,
  createdAt?: Date,
  email: string;
  line?: string;
  facebook?: string;
  phone?: string;
}

export function mapSetupFormDataToUser(formData: SetupFormData, user: SwapperUser): SwapperUser {
  return {
    ...user,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    firstName: formData.firstName,
    lastName: formData.lastName,
    nickname: formData.nickname,
    schoolName: formData.schoolName,
    picture: formData.profileImage,
    origin: {
      ...user.origin,
      id: user.origin.id,
      areaOffice: formData.originAreaOffice,
      province: formData.originProvince,
      subprovince: formData.originSubprovince,
      major: formData.originMajor,
    },
    destination: {
      ...user.destination,
      id: user.destination.id,
      areaOffice: formData.destinationAreaOffice,
      province: formData.destinationProvince,
      subprovince: formData.destinationSubprovince,
      major: formData.destinationMajor,
    },
    contact: {
      id: user.contact.id,
      email: formData.contactEmail,
      line: formData.contactLine,
      facebook: formData.contactFacebook,
      phone: formData.contactPhone,
    },
  };
}
