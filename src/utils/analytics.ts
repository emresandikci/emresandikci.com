import { GA_ID } from './site';

export const CONSENT_KEY = 'analytics-consent';
export const CONSENT_ACCEPTED = 'accepted';
export const CONSENT_DECLINED = 'declined';
export const CONSENT_EVENT = 'analytics-consent-accepted';

const GA_CONFIG = JSON.stringify({
  allow_google_signals: false,
  allow_ad_personalization_signals: false,
});

// Google Analytics loads only after the visitor accepts: from storage on later visits, or on the banner's event.
export const analyticsScript = `(function(){var done=false;function load(){if(done)return;done=true;window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${GA_ID}',${GA_CONFIG});var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA_ID}';document.head.appendChild(s)}try{if(localStorage.getItem('${CONSENT_KEY}')==='${CONSENT_ACCEPTED}')load()}catch(e){}window.addEventListener('${CONSENT_EVENT}',load)})()`;
