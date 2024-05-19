import { Avatar, Card, CardHeader } from '@nextui-org/react';
import { SwapperButton } from './SwapperButton';
import { MatchRequest, MatchRequestStatus, MatchResult } from '@/lib/models/Match.types';
import { cancelRequestMatch, requestMatch } from '@/lib/services/client/matcher.service';
import { useEffect, useState } from 'react';
import { Subject } from 'rxjs';

export default function FindMatchChip({ match }: { match: MatchResult }) {
  const { swapperUser, matchRequest } = match;

  const [currentMatchRequest, setCurrentMatchRequest] = useState<MatchRequest | undefined>(matchRequest);
  const [matchLoadingState] = useState(new Subject<boolean>());

  let cardStyle = 'bg-secondary text-primary my-3 shadow-md border border-primary shadow-primary';
  let avatarStyle = 'transition-transform border-1 border-primary hover:scale-110';
  let matchButtonStyle = '';

  if (currentMatchRequest?.status === MatchRequestStatus.PENDING) {
    cardStyle = 'bg-tertiary text-primary my-3 shadow-md border border-yellow-600 shadow-yellow-500';
    avatarStyle = 'transition-transform border-1 border-yellow-600 hover:scale-110';
    matchButtonStyle = 'text-white bg-yellow-500 border-yellow-600';
  }

  const sendRequestMatch = async (otherUserId: number) => {
    requestMatch(otherUserId).then(
      () => setCurrentMatchRequest({ ...currentMatchRequest, status: MatchRequestStatus.PENDING } as MatchRequest));
  }

  const sendCancelRequestMatch = async (otherUserId: number) => {
    cancelRequestMatch(otherUserId).then(
      () => setCurrentMatchRequest(undefined));
  };

  useEffect(() => {
    matchLoadingState.next(false);
  }, [currentMatchRequest]);

  return (
    <Card key={swapperUser.id} className={cardStyle}>
      <CardHeader className='justify-between'>
        <div className='flex gap-3 items-center'>
          <Avatar
            size='lg'
            as="button"
            className={avatarStyle}
            src={swapperUser.picture}
          />
          <div className='flex flex-col h-full'>
            {swapperUser.nickname ? (
              <>
                <div className="text-lg font-black">{swapperUser.nickname}</div>
                <div className="text-base font-semibold">{swapperUser.firstName} {swapperUser.lastName}</div>
              </>
            ) : (
              <div className="text-lg font-black">{swapperUser.firstName} {swapperUser.lastName}</div>
            )}
            <div className="text-base font-light">{swapperUser.schoolName}</div>
          </div>
        </div>
        <div className='mr-3'>
        {
          currentMatchRequest?.status === MatchRequestStatus.PENDING ? (
            <SwapperButton text='Pending...' styleType='tertiary' className={matchButtonStyle} useSpinner={true} onClick={() => sendCancelRequestMatch(swapperUser.id!)} setLoading$={matchLoadingState} />
          ) : (
            <SwapperButton text='Match' styleType='tertiary' useSpinner={true} onClick={() => sendRequestMatch(swapperUser.id!)} setLoading$={matchLoadingState} />
          )
        }
        </div>
      </CardHeader>
    </Card>
  );
}
