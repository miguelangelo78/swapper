import { SwapperUser } from '@/lib/models/SwapperUser.types';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, User } from '@nextui-org/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Key } from 'react';

export default function NavAvatar({ user }: { user: SwapperUser }) {
  const router = useRouter();

  async function handleAction(key: Key) {
    switch (key) {
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
        await signOut({ redirect: true, callbackUrl: '/' });
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
        <Avatar
          size='lg'
          as="button"
          className="transition-transform border-2 border-secondary hover:scale-110"
          src={user.picture}
        />
      </DropdownTrigger>

      <DropdownMenu onAction={handleAction} disabledKeys={['_profile']}>
        <DropdownSection showDivider>
          <DropdownItem key="_profile" className="h-10 opacity-100" isReadOnly>
            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold text-center text-lg text-black">Hi {user.name}!</p>
            </div>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection showDivider>
          <DropdownItem key="currentMatches" className="h-14 data-[hover=true]:bg-primary data-[hover=true]:text-white">
            <p className="font-semibold text-center">0 people matched with you</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem key="matcher" color='primary' className='text-black'>Matcher</DropdownItem>
          <DropdownItem key="profile" color='primary' className='text-black'>Profile</DropdownItem>
          <DropdownItem key="restartSetup" color='warning' className='text-primary'>Restart Setup</DropdownItem>
          <DropdownItem key="logout" color='danger' className='text-danger'>Logout</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
