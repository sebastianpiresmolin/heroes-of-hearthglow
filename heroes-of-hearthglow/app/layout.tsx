import './globals.css';
import { roboto } from '@/app/ui/fonts';
import { AuthProvider } from '@/app/contexts/authContext';
import Head from 'next/head';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-2BVGJLB2SC"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-2BVGJLB2SC');
              `,
            }}
          />
        </Head>
        <body className={`${roboto.className} antialiased`}>{children}</body>
      </html>
    </AuthProvider>
  );
}
