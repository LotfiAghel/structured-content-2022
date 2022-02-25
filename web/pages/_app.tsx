import { useEffect } from 'react';
import { getCookieConsentValue } from 'react-cookie-consent';
import TagManager from 'react-gtm-module';
import CookieConsent from '../components/CookieConsent';
import '../styles/globals.css';
import styles from './app.module.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const hasConsent = getCookieConsentValue();
    if (
      hasConsent !== 'false' &&
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ) {
      TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID });
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <div className={styles.cookieConsent}>
        <CookieConsent />
      </div>
    </>
  );
}

export default MyApp;
