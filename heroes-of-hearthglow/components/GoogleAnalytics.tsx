'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import CookieConsent, { getCookieConsentValue, resetCookieConsentValue } from 'react-cookie-consent';

const GoogleAnalytics = () => {
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
    <>
      {isAnalyticsEnabled && (
        <>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}
      <CookieConsent
          onAccept={handleAccept}
          onDecline={handleDecline}
          cookieName="analytics"
          expires={365}
          enableDeclineButton
          buttonText="Accept"
          declineButtonText="Decline"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            fontSize: '12px',
            boxShadow: 'inset 0px -25px 5px 0px rgba(0, 0, 0, 0.75)',
          }}
          buttonStyle={{
            background: 'white',
            color: 'black',
            fontSize: '12px',
            borderRadius: '5px',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
          declineButtonStyle={{
            background: 'none',
            color: 'white',
            fontSize: '12px',
            borderRadius: '5px',
            border: '2px solid white',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
      >
        This website uses cookies to enhance the user experience and only gathers non-personal traffic statistics
      </CookieConsent>
    </>
  );
};

export default GoogleAnalytics;