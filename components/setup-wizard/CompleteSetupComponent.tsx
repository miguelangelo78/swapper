'use server';

import { Contact, SwapperUser, Transition, mapSetupFormDataToUser } from '@/lib/models/SwapperUser.types';
import { SetupFormData } from './SetupFormWizardComponent';
import { createContact, createTransition, updateUser } from '@/lib/db/db';
import { redirect } from 'next/navigation';

export default async function CompleteSetupComponent(formData: SetupFormData, user: SwapperUser) {
  // Create origin, destination and contact objects:
  const origin: Transition = {
    areaOffice: formData.originAreaOffice,
    province: formData.originProvince,
    subprovince: formData.originSubprovince,
    major: formData.originMajor,
  };

  const destination: Transition = {
    areaOffice: formData.destinationAreaOffice,
    province: formData.destinationProvince,
    subprovince: formData.destinationSubprovince,
    major: formData.destinationMajor,
  };

  const contact: Contact = {
    email: formData.contactEmail,
    line: formData.contactLine,
    facebook: formData.contactFacebook,
    phone: formData.contactPhone,
  };

  const originId = await createTransition(origin);
  const destinationId = await createTransition(destination);
  const contactId = await createContact(contact);

  // Update user with new IDs:
  origin.id = originId;
  destination.id = destinationId;
  contact.id = contactId;
  
  user.origin = origin;
  user.destination = destination;
  user.contact = contact;

  // Update user with new data:
  const mappedUser = mapSetupFormDataToUser(formData, user);

  // Setup is now complete!
  mappedUser.setupComplete = true;

  // Save user to database:
  await updateUser(mappedUser);

  // Send the user to the /matcher page:
  redirect('/matcher');
}
