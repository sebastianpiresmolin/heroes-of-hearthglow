import './globals.css';
import { roboto } from '@/app/ui/fonts';
import { AuthProvider } from '@/app/contexts/authContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={`${roboto.className} antialiased`}>{children}</body>
      </html>
    </AuthProvider>
  );
}
