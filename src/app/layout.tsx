/* eslint-disable @next/next/no-async-client-component */
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ApplicationLayout } from './application-layout';
import '@/styles/tailwind.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <UserProvider>
          <ApplicationLayout>{children}</ApplicationLayout>
        </UserProvider>
      </body>
    </html>
  );
}
