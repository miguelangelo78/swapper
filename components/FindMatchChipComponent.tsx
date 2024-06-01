import { Avatar, Card, CardBody, CardHeader } from '@nextui-org/react';
import { SwapperButton } from './SwapperButton';
import { MatchRequest, MatchRequestStatus, MatchResult } from '@/lib/models/Match.types';
import { acceptRequestMatch, cancelRequestMatch, requestMatch } from '@/lib/services/client/matcher.service';
import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import { useLayoutContext } from './layout/LayoutClient';
import Separator from './SeparatorComponent';
import { useRouter } from 'next/navigation';
import { isUserOnline } from '@/lib/utils';

export default function FindMatchChip({ match, user }: { match: MatchResult, user: SwapperUser }) {
  const router = useRouter();

  const { matchContext } = useLayoutContext();
  const { otherSwapperUser, matchRequest } = match;

  const isOnline = isUserOnline(otherSwapperUser);

  const [currentMatchRequest, setCurrentMatchRequest] = useState<MatchRequest | undefined>(matchRequest);
  const [matchLoadingState] = useState(new Subject<boolean>());

  const requestForMe = matchContext.received.matchRequests.find((mr) => mr.otherUserId === user.id && mr.myUserId === match.otherSwapperUser.id);
  const matchedWithMe = currentMatchRequest?.status === MatchRequestStatus.ACCEPTED || requestForMe?.status === MatchRequestStatus.ACCEPTED;

  let cardStyle = 'bg-secondary text-primary my-3 shadow-md border border-primary shadow-primary';
  let avatarStyle = 'transition-transform border-1 border-primary hover:scale-110';
  let matchButtonStyle = '';

  if (requestForMe?.status === MatchRequestStatus.PENDING) {
    // This request is for me!
    cardStyle = 'bg-indigo-100 text-primary my-3 shadow-md border border-indigo-600 shadow-indigo-500';
    avatarStyle = 'transition-transform border-1 border-indigo-600 hover:scale-110';
  } else if(matchedWithMe) {
    cardStyle = 'bg-green-200 text-primary my-3 shadow-md border border-green-600 shadow-green-500';
    avatarStyle = 'transition-transform border-1 border-green-600 hover:scale-110';
  } else {
    if (currentMatchRequest?.status === MatchRequestStatus.PENDING) {
      cardStyle = 'bg-tertiary text-primary my-3 shadow-md border border-yellow-600 shadow-yellow-500';
      avatarStyle = 'transition-transform border-1 border-yellow-600 hover:scale-110';
      matchButtonStyle = 'text-white bg-yellow-500 border-yellow-600';
    }
  }

  const sendRequestMatch = async (otherUserId: number) => {
    requestMatch(otherUserId).then(
      (result) => {
        const { status } = (result as { id: number, status: string });
        setCurrentMatchRequest({ ...currentMatchRequest, status } as MatchRequest)
      });
  }

  const sendCancelRequestMatch = async (otherUserId: number) => {
    cancelRequestMatch(otherUserId).then(
      () => {
        if (requestForMe) {
          requestForMe.status = MatchRequestStatus.CANCELLED;
        }
        setCurrentMatchRequest(undefined);
      });
  };

  const sendAcceptRequestMatch = async (otherUserId: number) => {
    acceptRequestMatch(otherUserId).then(
      () => {
        if (requestForMe) {
          requestForMe.status = MatchRequestStatus.ACCEPTED;
        }
        setCurrentMatchRequest({ ...currentMatchRequest, status: MatchRequestStatus.ACCEPTED } as MatchRequest);
      });
  };

  const viewMatch = async (otherUserId: number) => {
    router.push(`/view-match?otherUserId=${otherUserId}`);
  }

  useEffect(() => {
    matchLoadingState.next(false);
  }, [currentMatchRequest]);

  return (
    <Card key={otherSwapperUser.id} className={cardStyle}>
      <CardHeader className='justify-between w-96'>
        <div className='flex gap-3 items-center w-full'>
          <div>
            <Avatar
              size='lg'
              as="button"
              className={avatarStyle}
              src={otherSwapperUser.picture}
            />
            {isOnline && (
              <div className="absolute transform translate-x-9 -translate-y-4 bg-green-500 border border-green-600 rounded-full h-4 w-4 flex">
              </div>
            )}
          </div>
          <div className='flex flex-col h-full'>
            {otherSwapperUser.nickname ? (
              <>
                <div className="text-lg font-black">{otherSwapperUser.nickname}</div>
                <div className="text-base font-semibold">{otherSwapperUser.firstName} {otherSwapperUser.lastName}</div>
              </>
            ) : (
              <div className="text-lg font-black">{otherSwapperUser.firstName} {otherSwapperUser.lastName}</div>
            )}
            <div className="text-base font-light">{otherSwapperUser.schoolName}</div>
          </div>
        </div>
        <div className='mr-3 text-right'>
        {
          requestForMe?.status !== MatchRequestStatus.PENDING ? (
            matchedWithMe ? (
              <>
                <SwapperButton text='View' styleType='tertiary' className={matchButtonStyle} useSpinner={true} onClick={() => viewMatch(otherSwapperUser.id!)} setLoading$={matchLoadingState} />
                <SwapperButton text='Remove' styleType='tertiary' className={'text-red-500 border-red-500 mt-1 w-10'} useSpinner={true} onClick={() => sendCancelRequestMatch(otherSwapperUser.id!)} setLoading$={matchLoadingState} />
              </>
            ) :
            currentMatchRequest?.status === MatchRequestStatus.PENDING ? (
              <SwapperButton text='Pending...' styleType='tertiary' className={matchButtonStyle} useSpinner={true} onClick={() => sendCancelRequestMatch(otherSwapperUser.id!)} setLoading$={matchLoadingState} />
            ) : (
              <SwapperButton text='Match' styleType='tertiary' useSpinner={true} onClick={() => sendRequestMatch(otherSwapperUser.id!)} setLoading$={matchLoadingState} />
            )
            ) : (<></>) 
        }
        </div>
      </CardHeader>
      <CardBody className='p-0 bg-indigo-500'>
      {requestForMe?.status === MatchRequestStatus.PENDING ? (
          <div className='text-center pb-4 px-0'>
            <Separator className='h-px bg-primary mb-4' />
            <div className='text-white font-semibold mb-2'>{match.otherSwapperUser.nickname || match.otherSwapperUser.firstName} wants to swap with you!</div>
            <div>
              <SwapperButton text='Accept' styleType='tertiary' className={matchButtonStyle} useSpinner={true} onClick={() => sendAcceptRequestMatch(otherSwapperUser.id!)} setLoading$={matchLoadingState} />
              <SwapperButton text='Ignore' styleType='tertiary' className={'ml-5 text-yellow-700 border-yellow-700'} useSpinner={true} onClick={() => sendCancelRequestMatch(otherSwapperUser.id!)} setLoading$={matchLoadingState} />
            </div>
          </div>
        ) : (<></>)
        }
      </CardBody>
    </Card>
  );
}
