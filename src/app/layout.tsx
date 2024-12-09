/* eslint-disable @next/next/no-async-client-component */
import { AuthProvider } from '@/context/AuthContext/AuthContext';
import { getEvents } from '@/data';
import ApolloWrapper from './ApolloWrapper';
import { ApplicationLayout } from './application-layout';
import '@/styles/tailwind.css';

// export const metadata: Metadata = {
//   title: {
//     template: '%s - Catalyst',
//     default: 'Catalyst',
//   },
//   description: '',
// }

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const events = await getEvents();

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
                <AuthProvider>
                    <ApolloWrapper>
                        <ApplicationLayout events={events}>{children}</ApplicationLayout>
                    </ApolloWrapper>
                </AuthProvider>
            </body>
        </html>
    );
}
