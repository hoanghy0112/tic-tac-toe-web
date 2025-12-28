import type { Metadata } from 'next';
import StoreProvider from '@/lib/store/StoreProvider';
import './globals.scss';

export const metadata: Metadata = {
    title: 'Tic Tac Toe',
    description: 'A fun tic-tac-toe game with multiple board sizes',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
