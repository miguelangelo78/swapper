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

  const subLocation = !user.destination.subprovince && !user.destination.educationArea ? 'All areas and subprovinces' 
    : user.destination.subprovince ? user.destination.subprovince : user.destination.educationArea;

  useEffect(() => {
    findMatchesForUser().then(setMatches);
  }, []);

  return (
    <div className="flex flex-col items-center mt-5">
      <div className='justify-center'>
        <div className="text-2xl font-bold text-center">Your matches for:</div>
        <div className="text-3xl font-black text-primary text-center drop-shadow underline">{user.destination.province}</div>
        <div className="text-xl font-medium text-primary text-center drop-shadow">{subLocation}</div>
        <div className="text-xl font-medium text-primary text-center drop-shadow">{user.origin.major}</div>
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
                  <Card key={match.id} className='bg-secondary w-96 text-primary my-3 shadow-md border border-primary shadow-primary'>
                    <CardHeader className='justify-between'>
                      <div className='flex gap-3 items-center'>
                        <Avatar
                          size='lg'
                          as="button"
                          className="transition-transform border-1 border-primary hover:scale-110"
                          src={match.picture}
                        />
                        <div className='flex flex-col h-full'>
                          {match.nickname ? (
                            <>
                              <div className="text-lg font-black">{match.nickname}</div>
                              <div className="text-base font-semibold">{match.firstName} {match.lastName}</div>
                            </>
                          ) : (
                            <>
                              <div className="text-lg font-black">{match.firstName} {match.lastName}</div>
                            </>
                          )}
                          <div className="text-base font-light">{match.schoolName}</div>
                        </div>
                      </div>
                      <Button className='bg-tertiary text-primary rounded-lg border border-primary font-semibold mr-3'>Match</Button>
                    </CardHeader>
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
