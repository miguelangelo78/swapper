import { auth } from '@/app/auth';
import { SetupFormData } from '@/components/setup-wizard/SetupFormWizardComponent';
import { getUserByEmail, updateUser, upsertContact, upsertTransition } from '@/lib/db/user_db';
import { Contact, Transition, mapSetupFormDataToUser } from '@/lib/models/SwapperUser.types';
import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, res: NextApiResponse) {
  const session = await auth();
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = await getUserByEmail(session.user!.email as string);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const formData = await req.json() as SetupFormData;

  // Upsert origin, destination and contact objects:
  let origin: Transition = {
    id: user.origin?.id,
    createdAt: user.origin.createdAt,
    areaOffice: formData.originAreaOffice,
    province: formData.originProvince,
    subprovince: formData.originSubprovince,
    major: formData.originMajor,
    educationArea: formData.originEducationArea,
  };

  let destination: Transition = {
    id: user.destination?.id,
    createdAt: user.destination.createdAt,
    areaOffice: formData.destinationAreaOffice,
    province: formData.destinationProvince,
    subprovince: formData.destinationSubprovince,
    major: formData.destinationMajor,
    educationArea: formData.destinationEducationArea,
  };

  let contact: Contact = {
    id: user.contact?.id,
    createdAt: user.contact?.createdAt ?? new Date(),
    email: formData.contactEmail,
    line: formData.contactLine,
    facebook: formData.contactFacebook,
    phone: formData.contactPhone,
  };

  const originId = await upsertTransition(origin, user.origin?.id);
  const destinationId = await upsertTransition(destination, user.destination?.id);
  const contactId = await upsertContact(contact, user.contact?.id);

  origin = { ...origin, id: originId };
  destination = { ...destination, id: destinationId };
  contact = { ...contact, id: contactId };

  user.origin = origin;
  user.destination = destination;
  user.contact = contact;

  // Update user with new data:
  const mappedUser = mapSetupFormDataToUser(formData, user);

  // Setup is now complete!
  mappedUser.setupComplete = true;

  if (!mappedUser.name) {
    mappedUser.name = `${mappedUser.firstName} ${mappedUser.lastName}`;
  }

  // Save user to database:
  await updateUser(mappedUser);
  
  return Response.json({ success: true });
}