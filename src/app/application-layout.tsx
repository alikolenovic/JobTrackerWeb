'use client';

import { ReactNode, use, useEffect, useState } from 'react';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown';
import Loader from '@/components/Loader';
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from '@/components/navbar';
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/components/sidebar';
import { SidebarLayout } from '@/components/sidebar-layout';
import { useAuth } from '@/context/AuthContext/AuthContext';
import { getEvents } from '@/data';
import { useMsal } from '@azure/msal-react';
import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  LightBulbIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from '@heroicons/react/16/solid';
import {
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
  TicketIcon,
} from '@heroicons/react/20/solid';
import { JwtPayload } from 'jwt-decode';
import { usePathname } from 'next/navigation';
import InitialsAvatar from 'react-initials-avatar';

// Default values shown

// Default values shown

function AccountDropdownMenu({
  anchor,
  logout,
}: {
  anchor: 'top start' | 'bottom end';
  logout: () => void;
}) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>
      <DropdownItem href="#">
        <UserCircleIcon />
        <DropdownLabel>My account</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ShieldCheckIcon />
        <DropdownLabel>Privacy policy</DropdownLabel>
      </DropdownItem>
      <DropdownItem href="#">
        <LightBulbIcon />
        <DropdownLabel>Share feedback</DropdownLabel>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem href="#">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel onClick={logout}>Sign out</DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  );
}

export interface CustomJwtPayload extends JwtPayload {
  given_name?: string;
  family_name?: string;
  emails?: string[];
  name?: string;
  // Add other claims as needed
}

export function ApplicationLayout({
  events,
  children,
}: {
  events: Awaited<ReturnType<typeof getEvents>>;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { instance, accounts } = useMsal();
  const [ready, setReady] = useState(false);
  const { userInfo, isAuthenticated, logout, login } = useAuth();
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(''); // Initialize with null to avoid hydration issues

  useEffect(() => {
    if (userInfo !== null) {
      setTimeout(() => setLoading(false)); // Set ready to true once data is available
    }
  }, [userInfo, isAuthenticated]);

  const accountInfo = (): ReactNode => {
    if (userInfo) {
      return (
        <Dropdown>
          <DropdownButton as={SidebarItem}>
            <span className="flex min-w-0 items-center gap-5">
              <InitialsAvatar
                name={`${userInfo?.given_name} ${userInfo?.family_name}`}
              />
              {/* <Avatar src="/users/erica.jpg" className='size-10'  square  /> */}
              <span className="min-w-0">
                <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                  {userInfo?.given_name ?? ''}
                </span>
                <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                  {userInfo?.emails?.[0] ?? ''}
                </span>
              </span>
            </span>
            <ChevronUpIcon />
          </DropdownButton>
          <AccountDropdownMenu anchor="top start" logout={logout} />
        </Dropdown>
      );
    } else {
      return <Button onClick={login}>Log in</Button>;
    }
  };

  // const accountInfo = (): ReactNode => {
  //   console.log(user);
  //   return user ? (
  //     <Dropdown>
  //       <DropdownButton as={SidebarItem}>
  //         <span className="flex min-w-0 items-center gap-5">
  //           <InitialsAvatar
  //             name={`${user.given_name ?? ''} ${user.family_name ?? ''}`}
  //           />
  //           <span className="min-w-0">
  //             <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
  //               {user.given_name ?? ''}
  //             </span>
  //             <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
  //               {user.emails?.[0] ?? ''}
  //             </span>
  //           </span>
  //         </span>
  //         <ChevronUpIcon />
  //       </DropdownButton>
  //       <AccountDropdownMenu anchor="top start" logout={logout} />
  //     </Dropdown>
  //   ) : (
  //     <Button onClick={login}>Log in</Button>
  //   );
  // };

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/users/erica.jpg" square />
              </DropdownButton>
              <AccountDropdownMenu logout={logout} anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Avatar src="/teams/catalyst.svg" />
                <SidebarLabel>Catalyst</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu
                className="min-w-80 lg:min-w-64"
                anchor="bottom start"
              >
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">
                  <Avatar slot="icon" src="/teams/catalyst.svg" />
                  <DropdownLabel>Catalyst</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="#">
                  <Avatar
                    slot="icon"
                    initials="BE"
                    className="bg-purple-500 text-white"
                  />
                  <DropdownLabel>Big Events</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">
                  <PlusIcon />
                  <DropdownLabel>New team&hellip;</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/" current={pathname === '/'}>
                <HomeIcon />
                <SidebarLabel>Home</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/events"
                current={pathname.startsWith('/events')}
              >
                <Square2StackIcon />
                <SidebarLabel>Events</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/orders"
                current={pathname.startsWith('/orders')}
              >
                <TicketIcon />
                <SidebarLabel>Orders</SidebarLabel>
              </SidebarItem>
              <SidebarItem
                href="/settings"
                current={pathname.startsWith('/settings')}
              >
                <Cog6ToothIcon />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection className="max-lg:hidden">
              <SidebarHeading>Upcoming Events</SidebarHeading>
              {events.map((event) => (
                <SidebarItem key={event.id} href={event.url}>
                  {event.name}
                </SidebarItem>
              ))}
            </SidebarSection>

            <SidebarSpacer />

            <SidebarSection>
              <SidebarItem href="#">
                <QuestionMarkCircleIcon />
                <SidebarLabel>Support</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="#">
                <SparklesIcon />
                <SidebarLabel>Changelog</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            {accountInfo()}
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  );
}
