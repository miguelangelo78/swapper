'use server';

import { Contact, SwapperUser, Transition, mapSetupFormDataToUser } from '@/lib/models/SwapperUser.types';
import { SetupFormData } from './SetupFormWizardComponent';
import { createContact, createTransition, updateContact, updateTransition, updateUser, upsertContact, upsertTransition } from '@/lib/db/db';
import { redirect } from 'next/navigation';

export default async function CompleteSetupComponent(formData: SetupFormData, user: SwapperUser) {
  // Upsert origin, destination and contact objects:
  const origin: Transition = {
    id: user.origin?.id,
    areaOffice: formData.originAreaOffice,
    province: formData.originProvince,
    subprovince: formData.originSubprovince,
    major: formData.originMajor,
  };

  const destination: Transition = {
    id: user.destination?.id,
    areaOffice: formData.destinationAreaOffice,
    province: formData.destinationProvince,
    subprovince: formData.destinationSubprovince,
    major: formData.destinationMajor,
  };

  const contact: Contact = {
    id: user.contact?.id,
    email: formData.contactEmail,
    line: formData.contactLine,
    facebook: formData.contactFacebook,
    phone: formData.contactPhone,
  };

  await upsertTransition(origin, user.origin?.id);
  await upsertTransition(destination, user.destination?.id);
  await upsertContact(contact, user.contact?.id);
  
  // Update user with new data:
  const mappedUser = mapSetupFormDataToUser(formData, user);

  // Setup is now complete!
  mappedUser.setupComplete = true;

  // Save user to database:
  await updateUser(mappedUser);

  // Send the user to the /matcher page:
  return redirect('/matcher');
}
