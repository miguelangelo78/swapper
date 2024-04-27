import { SetupFormData } from "@/components/setup-wizard/SetupFormWizardComponent";

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
  id?: number;
  areaOffice: string;
  province: string;
  subprovince: string;
  major: string;
}

export interface Contact {
  id?: number;
  email: string;
  line?: string;
  facebook?: string;
  phone?: string;
}

export function mapSetupFormDataToUser(formData: SetupFormData, user: SwapperUser): SwapperUser {
  return {
    ...user,
    firstName: formData.firstName,
    lastName: formData.lastName,
    nickname: formData.nickname,
    picture: formData.profileImage,
    origin: {
      id: user.origin.id,
      areaOffice: formData.originAreaOffice,
      province: formData.originProvince,
      subprovince: formData.originSubprovince,
      major: formData.originMajor,
    },
    destination: {
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
