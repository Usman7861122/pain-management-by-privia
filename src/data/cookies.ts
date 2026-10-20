// Cookie and storage catalog. Keep this list in sync with what the site really sets.
// The banner, the preferences window and the Cookie Policy page all read from here.
export type ConsentCategory = 'necessary' | 'functional' | 'analytics' | 'marketing';

export interface CookieCategory {
  id: ConsentCategory;
  title: string;
  text: string;
  /** locked categories are always on */
  locked?: boolean;
  /** false = the site does not use anything in this group yet */
  inUse: boolean;
}

export const cookieCategories: CookieCategory[] = [
  { id: 'necessary', title: 'Strictly necessary', text: 'Needed to remember your cookie choices and keep the site working. These cannot be turned off.', locked: true, inUse: true },
  { id: 'functional', title: 'Embedded content', text: 'Lets us show third-party content such as Google Maps on our contact and location pages. Google may set its own cookies when a map loads.', inUse: true },
  { id: 'analytics', title: 'Analytics', text: 'Helps us understand how people use the site so we can improve it. We do not use analytics tools right now. Your choice is saved in case we add them.', inUse: false },
  { id: 'marketing', title: 'Marketing', text: 'Would be used to measure ads or show you tailored content. We do not use marketing tools right now. Your choice is saved in case we add them.', inUse: false },
];

export interface CookieItem { name: string; category: ConsentCategory; provider: string; purpose: string; duration: string; type: string }

export const cookieItems: CookieItem[] = [
  { name: 'pms-consent-v1', category: 'necessary', provider: 'This site', purpose: 'Stores your cookie choices in your browser.', duration: '180 days', type: 'Local storage' },
  { name: 'pms_consent', category: 'necessary', provider: 'This site', purpose: 'A small first-party cookie that also remembers your choices.', duration: '180 days', type: 'Cookie' },
  { name: 'Google Maps (various)', category: 'functional', provider: 'Google', purpose: 'Set by Google only after you allow embedded content and a map loads. See Google’s privacy policy.', duration: 'Set by Google', type: 'Third-party cookies' },
];

export const CONSENT_KEY = 'pms-consent-v1';
export const CONSENT_COOKIE = 'pms_consent';
export const LEGAL_UPDATED = 'October 20, 2026';
