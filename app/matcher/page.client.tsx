'use client';
import { SwapperUser } from '@/lib/models/SwapperUser.types';
import { findMatchesForUser } from '@/lib/services/client/user.service';
import { Avatar, Button, Card, CardBody, CardHeader, Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export type MatcherPageClientProps = {
  user: SwapperUser;
}

export default function MatcherPageClient(
  { user }: MatcherPageClientProps,
) {
  // Load matches from API using useState:
  const [matches, setMatches] = useState<SwapperUser[] | undefined>(undefined);

  useEffect(() => {
    findMatchesForUser().then(setMatches);
  }, []);

  return (
    <div className="flex flex-col items-center mt-5">
      <div className='justify-center'>
        <div className="text-2xl font-bold text-center">Your matches for:</div>
        <div className="text-3xl font-black text-primary text-center drop-shadow underline">{user.destination.province}</div>
        {user.destination.subprovince && (
          <div className="text-xl font-medium text-primary text-center drop-shadow">{user.destination.subprovince}</div>
        )}
        {user.destination.educationArea && (
          <div className="text-xl font-medium text-primary text-center drop-shadow">Area {user.destination.educationArea}</div>
        )}
        <section className='mb-10 justify-center items-center'>
          {matches === undefined && (
            <>
              <Spinner className='w-full mt-5' size='lg' />
            </>
          )}
          {matches?.length === 0 && (
            <div className="text-center text-2xl font-bold">No matches found</div>
          )}
          {matches && matches?.length > 0 && (
            <>
              <div className="w-96 mt-5">
                {matches!.map((match) => (
                  <Card key={match.id} className='bg-primary w-96 text-white my-5 shadow-md shadow-primary'>
                    <CardHeader className='justify-between border-b'>
                      <div className='flex gap-3'>
                        <Avatar
                          size='lg'
                          as="button"
                          className="transition-transform border-2 border-secondary hover:scale-110"
                          src={match.picture}
                        />
                        <div className='flex flex-col'>
                          <div className="text-lg font-black">{match.nickname}</div>
                          <div className="text-lg font-strong">{match.firstName}&nbsp;{match.lastName}</div>
                        </div>
                      </div>
                      <Button className='bg-tertiary text-primary font-semibold'>Match</Button>
                    </CardHeader>
                    <CardBody>
                      <div className='justify-between flex'>
                        <div>
                          <div className="text-md font-bold">{match.origin.province}</div>
                          {match.origin.subprovince && (
                            <div className="text-md font-medium">{match.origin.subprovince}</div>
                          )}
                          {match.origin.educationArea && (
                            <div className="text-center text-md font-medium">Area {match.origin.educationArea}</div>
                          )}
                        </div>
                        <div>
                          <div className="text-base font-semibold">{match.schoolName}</div>
                          <div className="text-base font-semibold">{match.origin.major}</div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </>
          )}
        </section>
      </div>

    </div>
  )
}
