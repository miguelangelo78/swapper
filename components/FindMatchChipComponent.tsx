import { SwapperUser } from '@/lib/models/SwapperUser.types';
import { Avatar, Button, Card, CardHeader } from '@nextui-org/react';

export default function FindMatchChip({ match }: { match: SwapperUser }) {
  return (
    <Card key={match.id} className='bg-secondary text-primary my-3 shadow-md border border-primary shadow-primary'>
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
              <div className="text-lg font-black">{match.firstName} {match.lastName}</div>
            )}
            <div className="text-base font-light">{match.schoolName}</div>
          </div>
        </div>
        <Button className='bg-tertiary text-primary rounded-lg border border-primary font-semibold mr-3'>Match</Button>
      </CardHeader>
    </Card>
  );
}
