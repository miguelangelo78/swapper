'use client';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Spinner } from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Key, useEffect, useState } from 'react';
import { useLayoutContext } from './layout/LayoutClient';
import { MatchRequest } from '@/lib/models/Match.types';
import { getUserById } from '@/lib/services/client/user.service';

export default function NavAvatar({ user }: { user: SwapperUser }) {
  const router = useRouter();
  
  const { matchContext } = useLayoutContext();

  const requestsReceived = matchContext.received.notifications;
  const notificationsCount = requestsReceived?.length || 0;
  const hasNews = notificationsCount > 0;

  let matches = [...matchContext.received.matchRequests, ...matchContext.sent.matchRequests];
  // Remove reverse duplicates
  matches = matches.filter((r) => {
    const reverseRequest = matches.find((rr) => rr.myUserId === r.otherUserId && rr.otherUserId === r.myUserId);
    return !reverseRequest || r.createdAt > reverseRequest.createdAt;
  });

  const matchCount = matches.filter((r) => r.status === 'ACCEPTED').length || 0;
  const myPendingMatchRequestsCount = matchContext.sent.pending?.length || 0;
  
  let matchRequestMenuStyle = 'h-14 data-[hover=true]:bg-primary data-[hover=true]:text-white';

  if (notificationsCount > 0) {
    matchRequestMenuStyle = 'bg-primary text-white transition-transform data-[hover=true]:bg-tertiary';
  }

  const [userRequests, setUserRequests] = useState<{ otherUser?: SwapperUser, request?: MatchRequest}[]>([]);

  useEffect(() => {
    if (notificationsCount > 0 && userRequests.length === 0) {
      const requests = requestsReceived || [];
      const getUsers = requests.map((r) => getUserById(r.myUserId).then((user) => ({ otherUser: user, request: r }))) as { otherUser?: SwapperUser, request?: MatchRequest}[];

      Promise.all(getUsers).then((users) => {
        // Set a maximum of 5 avatars
        const userAvatars = users.slice(0, 4);
        // If there are more, add a "..." avatar
        if (users.length > 4) {
          userAvatars.push({});
        }

        setUserRequests(userAvatars);
      });
    }
  });

  async function handleAction(key: Key) {
    switch (key) {
      case "viewMatchInvitations":
        router.push("/my-match-invitations");
        break;
      case "viewMatches":
        router.push("/my-matches");
        break;
      case "viewMyMatchRequests":
        router.push("/my-match-requests");
        break;
      case "matcher":
        router.push("/matcher");
        break;
      case "profile":
        router.push("/profile");
        break;
      case "restartSetup":
        router.push("/setup");
        break;
      case "logout":
        await signOut({ redirect: true, callbackUrl: '/login' });
        break;
      default:
        break;
    }
  }

  return (
    <Dropdown classNames={{
      content: "p-2 border-small border-divider bg-background",
    }}>
      <DropdownTrigger>
        <div>
          <Avatar
            size='lg'
            as="button"
            className="transition-transform border-2 border-secondary hover:scale-110"
            src={user.picture}
          />
          {notificationsCount > 0 && (
            <div className="absolute transform translate-x-9 -translate-y-4 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {notificationsCount}
            </div>
          )}
        </div>
      </DropdownTrigger>

      <DropdownMenu onAction={handleAction} disabledKeys={['_profile']}>
        <DropdownSection showDivider>
          <DropdownItem key="_profile" className="h-10 opacity-100" isReadOnly>
            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold text-center text-lg text-black">Hi {user.name}!</p>
              {hasNews && (
                <p className="font-light text-center text-sm text-black">You have some updates!</p>
              )}
            </div>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider>
          <DropdownItem key="viewMatchInvitations" className={matchRequestMenuStyle}>
            <>
              <p className="font-semibold text-center">{notificationsCount} {notificationsCount === 1 ? 'person wants' : 'people want'} to swap with you!</p>
              {notificationsCount > 0 && (
                <div className='flex gap-1 justify-center items-center py-2'>
                  {userRequests.length > 0 ?
                    userRequests.map((notification, index) => (
                      notification.otherUser ? (
                        <Avatar
                          key={index}
                          size='md'
                          src={notification.otherUser.picture}
                          className='border-2 border-secondary'
                        />
                      ) : (
                        <Avatar
                          key={index}
                          size='sm'
                          className='border-2 border-secondary'
                        >
                          ...
                        </Avatar>
                      )
                    )) : <Spinner size='sm' color='warning' /> }
                </div>
              )}
            </>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem key="viewMatches" color='primary' className='text-black'>
            <div className="flex justify-between">
              <span className='text-lg my-2 font-semibold flex'>My matches</span>
              <span className="ml-5 my-2 bg-tertiary text-primary border border-primary text-xs font-bold rounded-xl h-8 w-8 flex items-center justify-center">
                {matchCount}
              </span>
            </div>
          </DropdownItem>
          <DropdownItem key="viewMyMatchRequests" color='primary' className='text-black'>
            <div className="flex justify-between">
              <span className='text-lg my-2 font-semibold flex'>My match requests</span>
              <span className="ml-5 my-2 bg-tertiary text-primary border border-primary text-xs font-bold rounded-xl h-8 w-8 flex items-center justify-center">
                {myPendingMatchRequestsCount}
              </span>
            </div>
          </DropdownItem>
          <DropdownItem key="matcher" color='primary' className='text-black'><div className='text-lg my-2 font-semibold'>Matcher</div></DropdownItem>
          {/*<DropdownItem key="profile" color='primary' className='text-black'><div className='text-lg my-2 font-semibold'>Profile</div></DropdownItem>*/}
          <DropdownItem key="restartSetup" color='warning' className='text-primary'><div className='text-lg my-2 font-semibold'>Restart Setup</div></DropdownItem>
          <DropdownItem key="logout" color='danger' className='text-danger'><div className='text-lg my-2 font-semibold'>Logout</div></DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
