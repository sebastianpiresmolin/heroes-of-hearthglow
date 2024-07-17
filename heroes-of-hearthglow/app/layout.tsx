'use client';

import './globals.css';
import { roboto } from '@/app/ui/fonts';
import { AuthProvider } from '@/app/contexts/authContext';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import CookieConsent, {
  getCookieConsentValue,
  resetCookieConsentValue,
} from 'react-cookie-consent';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAnalyticsEnabled, setIsAnalyticsEnabled] = useState(false);

  useEffect(() => {
    if (getCookieConsentValue('analytics') === 'true') {
      setIsAnalyticsEnabled(true);
    }
  }, []);

  const handleAccept = () => {
    setIsAnalyticsEnabled(true);
  };

  const handleDecline = () => {
    setIsAnalyticsEnabled(false);
    resetCookieConsentValue('analytics');
  };

  return (
    <AuthProvider>
      <html lang="en">
        <Head>
          {isAnalyticsEnabled && (
            <>
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
                    gtag('config', 'G-2BVGJLB2SC', {
                      'anonymize_ip': true
                    });
                  `,
                }}
              />
            </>
          )}
        </Head>
        <body className={`${roboto.className} antialiased`}>
          {children}
          <CookieConsent
            onAccept={handleAccept}
            onDecline={handleDecline}
            cookieName="analytics"
            expires={365}
            enableDeclineButton
            buttonText="Accept"
            declineButtonText="Decline"
          >
            This website uses cookies to enhance the user experience.
          </CookieConsent>
        </body>
      </html>
    </AuthProvider>
  );
}
