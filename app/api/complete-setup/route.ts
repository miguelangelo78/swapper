import { auth } from '@/app/auth';
import { SetupFormData } from '@/components/setup-wizard/SetupFormWizardComponent';
import { getUser, updateUser, upsertContact, upsertTransition } from '@/lib/db/db';
import { Contact, Transition, mapSetupFormDataToUser } from '@/lib/models/SwapperUser.types';
import { NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest, res: NextApiResponse) {
  const session = await auth();
  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = await getUser(session.user!.email as string);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const formData = await req.json() as SetupFormData;

  // Upsert origin, destination and contact objects:
  const origin: Transition = {
    id: user.origin?.id,
    createdAt: user.origin.createdAt,
    areaOffice: formData.originAreaOffice,
    province: formData.originProvince,
    subprovince: formData.originSubprovince,
    major: formData.originMajor,
    educationArea: formData.originEducationArea,
  };

  const destination: Transition = {
    id: user.destination?.id,
    createdAt: user.destination.createdAt,
    areaOffice: formData.destinationAreaOffice,
    province: formData.destinationProvince,
    subprovince: formData.destinationSubprovince,
    major: formData.destinationMajor,
    educationArea: formData.destinationEducationArea,
  };

  const contact: Contact = {
    id: user.contact?.id,
    createdAt: user.contact.createdAt,
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
  
  return Response.json({ success: true });
}