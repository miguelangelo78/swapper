import { getUserById } from '@/lib/db/user_db';
import { getSwapperUser } from '@/lib/services/server/user.service';
import Layout from '@/components/layout/LayoutServer';
import { getMatchRequestsForMe } from '@/lib/db/match_request_db';
import { redirect } from 'next/navigation';
import Separator from '@/components/SeparatorComponent';
import { SwapperButton } from '@/components/SwapperButton';
import { Avatar } from '@nextui-org/react';

export default async function ViewMatchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams) {
    redirect('/matcher');
  }

  const user = await getSwapperUser();

  const otherUserId = +(searchParams['otherUserId']?.toString()! ?? 0);

  const requestsForMe = await getMatchRequestsForMe(user!.id!);
  const requestFromOtherUser = requestsForMe.find((r) => r.myUserId === otherUserId);

  const amIMatchedWithOtherUser = requestFromOtherUser?.status === 'ACCEPTED';

  if (!amIMatchedWithOtherUser) {
    redirect('/matcher');
  }

  const otherUser = (await getUserById(otherUserId))!;

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-2 bg-primary">
        <Avatar
            size='lg'
            as="button"
            className="w-48 h-48 object-cover rounded-full border-4 border-tertiary shadow-2xl"
            src={otherUser.picture}
          />
        {otherUser.nickname && <p className="text-4xl text-center font-black text-tertiary">{otherUser.nickname}</p>}
        <h1 className={`text-center font-black ${otherUser.nickname ? 'text-xl font-semibold text-secondary' : 'text-4xl text-tertiary'}`}>{otherUser.firstName} {otherUser.lastName}</h1>
        <h2 className="text-xl text-center text-secondary">{otherUser.email}</h2>
        {otherUser.schoolName && <p className="text-lg text-center text-secondary">{otherUser.schoolName}</p>}
        <SwapperButton text='Send Message' styleType='tertiary' className='w-40' />
        <div className='mt-8'>
          <div className="text-lg text-primary bg-white p-2 my-4 rounded-lg shadow-md w-90">
            <h3 className="font-black text-primary text-xl">Contact:</h3>
            <Separator className='h-0.5' />
            <p><span className='font-bold'>Email:</span> {otherUser.contact.email}</p>
            {otherUser.contact.line && <p><span className='font-bold'>Line:</span> {otherUser.contact.line}</p>}
            {otherUser.contact.facebook && <p><span className='font-bold'>Facebook:</span> {otherUser.contact.facebook}</p>}
            {otherUser.contact.phone && <p><span className='font-bold'>Phone:</span> {otherUser.contact.phone}</p>}
          </div>
          <div>
            <div className="text-lg text-primary bg-white p-2 rounded-lg shadow-md w-90">
              <h3 className="font-black text-primary text-xl">Origin:</h3>
              <Separator className='h-0.5' />
              <p><span className='font-bold'>Area Office:</span> <span className='text-xs'>{otherUser.origin.areaOffice}</span></p>
              <p><span className='font-bold'>Province:</span> <span>{otherUser.origin.province}</span></p>
              {otherUser.origin.subprovince && <p><span className='font-bold'>Subprovince:</span> <span>{otherUser.origin.subprovince}</span></p>}
              {otherUser.origin.educationArea && <p><span className='font-bold'>Education Area:</span> <span>{otherUser.origin.educationArea}</span></p>}
              <p><span className='font-bold'>Major:</span> <span>{otherUser.origin.major}</span></p>
              {otherUser.schoolName && <p><span className='font-bold'>School:</span> <span>{otherUser.schoolName}</span></p>}
            </div>
            <div className="flex justify-center mb-2">
              <span className="text-6xl font-black text-tertiary">↓</span>
            </div>
            <div className="text-lg text-primary bg-white p-2 rounded-lg shadow-md w-90">
              <h3 className="font-black text-primary text-xl">Destination:</h3>
              <Separator className='h-0.5' />
              {
                otherUser.destination.areaOffice ? (
                  <p><span className='font-bold'>Area Office:</span> <span className='text-xs'>{otherUser.destination.areaOffice}</span></p>
                ) : (
                  <p><span className='font-bold'>Area Office:</span> <span className='text-xs'>{otherUser.origin.areaOffice}</span></p>
                )
              }
              <p><span className='font-bold'>Province:</span> <span>{otherUser.destination.province}</span></p>
              {otherUser.destination.subprovince && <p><span className='font-bold'>Subprovince:</span> <span>{otherUser.destination.subprovince}</span></p>}
              {otherUser.destination.educationArea && <p><span className='font-bold'>Education Area:</span> <span>{otherUser.destination.educationArea}</span></p>}
              {otherUser.destination.major && <p><span className='font-bold'>Major:</span> <span>{otherUser.destination.major}</span></p>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
