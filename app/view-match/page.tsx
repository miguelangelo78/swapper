import { getUserById } from '@/lib/db/user_db';
import { getSwapperUser } from '@/lib/services/server/user.service';
import Layout from '@/components/layout/LayoutServer';
import { getMatchRequestsForMe, getMatchRequestsFromMe } from '@/lib/db/match_request_db';
import { redirect } from 'next/navigation';
import Separator from '@/components/SeparatorComponent';
import { SwapperButton } from '@/components/SwapperButton';
import { Avatar } from '@nextui-org/react';
import { isUserOnline } from '@/lib/utils';
import Info from '@/components/InfoComponent';

export default async function ViewMatchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (!searchParams) {
    redirect('/matcher');
  }

  const user = await getSwapperUser();

  const applyBlur = !user?.isAdmin ? 'blur-sm select-none' : '';
  
  const otherUserId = +(searchParams['otherUserId']?.toString()! ?? 0);

  const requestsForMe = await getMatchRequestsForMe(user!.id!);
  const requestFromOtherUser = requestsForMe.find((r) => r.myUserId === otherUserId);
  const requestFromMe = (await getMatchRequestsFromMe(user!.id!)).find((r) => r.otherUserId === otherUserId);

  const amIMatchedWithOtherUser = (requestFromOtherUser?.status === 'ACCEPTED' || requestFromMe?.status === 'ACCEPTED') &&
    (requestFromOtherUser?.status !== 'REJECTED' && requestFromMe?.status !== 'REJECTED') &&
    (requestFromOtherUser?.status !== 'CANCELLED' && requestFromMe?.status !== 'CANCELLED') &&
    (requestFromOtherUser?.status !== 'EXPIRED' && requestFromMe?.status !== 'EXPIRED');

  if (!amIMatchedWithOtherUser) {
    redirect('/matcher');
  }

  const otherUser = (await getUserById(otherUserId))!;

  const isOnline = isUserOnline(otherUser);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center space-y-2 bg-primary">
        {applyBlur && 
          <Info header='NOTE:' message='personal information will be hidden during early versions' />
        }
        <div>
          <Avatar
              size='lg'
              as="button"
              className="w-48 h-48 object-cover rounded-full border-4 border-tertiary shadow-2xl"
              src={otherUser.picture}
            />
            {isOnline && (
              <div className="absolute transform translate-x-36 -translate-y-8 bg-green-500 border border-green-600 rounded-full h-7 w-7 flex">
              </div>
            )}
        </div>
        {otherUser.nickname && <p className="text-4xl text-center font-black text-tertiary">{otherUser.nickname}</p>}
        <h1 className={`text-center font-black ${applyBlur} ${otherUser.nickname ? 'text-xl font-semibold text-secondary' : 'text-4xl text-tertiary'}`}>{otherUser.firstName} {otherUser.lastName}</h1>
        {isOnline &&
          <h2 className="text-sm text-center bg-green-500 text-white p-1 px-3 text-thin rounded-lg shadow-md">
            <span className="font-semibold">Online</span>
          </h2>
        }
        <h2 className={`text-xl text-center text-secondary ${applyBlur}`}>{otherUser.email}</h2>
        {otherUser.schoolName && <p className={`text-lg text-center text-secondary ${applyBlur}`}>{otherUser.schoolName}</p>}

        <section className='pt-4 text-center'>
          {!isOnline &&
            <h2 className="text-lg text-center text-secondary pb-2">Last online: {otherUser.lastLogin?.toDateString() ?? 'never'}</h2>
          }
          <SwapperButton text='Send Message' styleType='tertiary' className='w-40' />
        </section>

        <div className='mt-8'>
          <div className="text-lg text-primary bg-white p-2 my-4 rounded-lg shadow-md w-90">
            <h3 className="font-black text-primary text-xl">Contact:</h3>
            <Separator className='h-0.5' />
            <p><span className='font-bold'>Email:</span> <span className={`${applyBlur}`}>{otherUser.contact.email}</span></p>
            {otherUser.contact.line && <p><span className='font-bold'>Line:</span> <span className={`${applyBlur}`}>{otherUser.contact.line}</span></p>}
            {otherUser.contact.facebook && <p><span className='font-bold'>Facebook:</span> <span className={`${applyBlur}`}>{otherUser.contact.facebook}</span></p>}
            {otherUser.contact.phone && <p><span className='font-bold'>Phone:</span> <span className={`${applyBlur}`}>{otherUser.contact.phone}</span></p>}
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
              {otherUser.schoolName && <p><span className='font-bold'>School:</span> <span className={`${applyBlur}`}>{otherUser.schoolName}</span></p>}
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
