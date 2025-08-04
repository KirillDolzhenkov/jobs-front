import {Providers} from './providers';
import './globals.css';

export const metadata = {
    title: 'Company App',
    description: 'A Next.js app for managing companies',
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}