/**
 * PRIVIA REQUIRED CONTENT — single source of truth.
 * Source: "Privia Care Center Website Detailed Requirements" (PDF).
 * Privia may send updates; change them HERE (7 business day rule).
 * These values override any design preference.
 */
import { site } from './site';

// Which Privia brand this care center belongs to.
export type PriviaBrand = 'medical-group' | 'provider-network-cf' | 'womens-health';
export const brand: PriviaBrand = 'medical-group';

// TODO: Replace with the CUSTOM Find-A-Doctor link from the Privia Product Performance team.
// This is the ONLY online scheduling tool allowed on the site.
export const FIND_A_DOCTOR_URL = 'https://find-a-doctor.priviamedicalgroup.com/';

export const links = {
  mobileApp: 'http://www.myprivia.com',
  patientLogin: 'https://8042-1.portal.athenahealth.com',
  seeMyProvider: FIND_A_DOCTOR_URL,
  immediateCare: 'https://find-a-doctor.priviamedicalgroup.com/urgent-care',
  myPriviaHome: 'http://www.myprivia.com/',
  appStore: 'https://itunes.apple.com/us/app/myprivia/id1364708257',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.priviamedicalgroup.priviaapp',
  // Official badge images (URLs from the Privia document): save them locally with these file names.
  appStoreIcon: '/images/logos/app-store.png',
  googlePlayIcon: '/images/logos/google-play.png',
  aboutPrivia: 'http://www.myprivia.com/',
  nondiscrimination: 'http://www.priviahealth.com/notice-nondiscrimination/',
  hipaa: 'http://www.priviahealth.com/hipaa-privacy-notice/',
  careers: 'http://www.priviamedicalgroup.com/for-doctors/careers/',
  pressRoom: 'http://www.priviahealth.com/our-company/newsroom/',
  prospectiveDoctors: 'http://www.priviahealth.com/privia-for/doctors/',
  // The doc says "visit our website" without a URL. Taken from the old site. Confirm with Privia.
  priviaMedicalGroupSite: 'https://www.priviamedicalgroup.com/',
} as const;

// Logo sizes required by Privia: 190 x 44 px, top left of header.
export const LOGO = { width: 260, height: 60 } as const;
export const logos = {
  // Supplied lockup: Privia Medical Group + Pain Management Specialists (white version, transparent PNG).
  // It is white, so the header is always dark. Render at 190 x 44 (Privia rule).
  main: '/images/Logo.png',
  myPrivia: '/images/logos/myprivia.svg',
} as const;

// Patient portal text — must stay word for word.
export const portal = {
  title: 'Patient Portal',
  intro:
    'Access your personal health information and test results, securely message your care team, and manage payments, all from one spot and at your convenience, 24/7.',
  bullets: [
    "See your provider's openings and schedule appointments.",
    'Review prescription medications and request renewals.',
    'View payment history and pay current invoices.',
  ],
  signIn: { label: 'Sign In', href: links.patientLogin },
  // TODO: confirm the "Create an Account" URL with Privia. Using the portal for now.
  createAccount: { label: 'Create an Account', href: links.patientLogin },
};

// "Proud to be part of Privia" text — must stay word for word.
const name = site.name;
export const priviaBlock = {
  'medical-group': {
    heading: 'Proud to be part of Privia Medical Group',
    paragraphs: [
      `${name} is a proud member of Privia Medical Group. The best doctors in our community have joined together to form Privia Medical Group (PMG), a multi-specialty, high-performance medical group that puts patients first. Our physicians are united by the mission of providing better, more coordinated care for their patients.`,
    ],
    learnMore: 'To learn more about Privia Medical Group and find other Privia doctors, please visit our',
  },
  'provider-network-cf': {
    heading: 'Proud to be part of Privia Provider Network - Central Florida',
    paragraphs: [
      `${name} is a proud member of Privia Provider Network - Central Florida . The best doctors in our community have joined together to form a multi-specialty, high-performance network that puts patients first. Our physicians are united by the mission of providing better, more coordinated care for their patients.`,
    ],
    learnMore:
      'To learn more about Privia Provider Network - Central Florida and find other Privia doctors, please visit our',
  },
  'womens-health': {
    heading: 'About Privia Women’s Health',
    paragraphs: [
      'We’re proud members of Privia Women’s Health where we give caring for women the prominence it deserves.',
      'We take a thoroughly modern and holistic approach to women’s health. We know what women, and their bodies, have to go through and we make sure every woman gets the individual care she needs.',
      'Privia Women’s Health makes it easy for you to make your health a priority. We provide some of the latest advances in medicine, including innovative technologies, personalized care and a patient-centered approach to make sure every woman receives the individual care she needs.',
      'Your health is your journey and no matter where you are, we’re here to help.',
    ],
    learnMore: '',
  },
} as const;

// Carve-out disclaimer — appears at the bottom of the services page and wherever carve-out services appear.
export const carveOutDisclaimer = {
  title: 'Products & Services Disclaimer',
  // TODO: set what the care center "promote(s), sell(s), or provide(s)" if any carve-out exists.
  text: (verb: string, items: string) =>
    `*${site.name} is an independently owned and operated care center that may ${verb} ${items}. Privia Medical Group is not responsible for these products or services. Privia’s Authorization & Consent to Treat, Financial Policy and HIPAA Notice of Privacy Practices are not applicable to these services or products.`,
  verb: 'promote, sell, or provide',
  items: 'services/products',
};

export const legalFooter = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Notice of Nondiscrimination', href: links.nondiscrimination },
  { label: 'HIPAA Privacy Notice', href: links.hipaa },
];

export const footerPriviaLinks = [
  { label: 'About Privia', href: links.aboutPrivia },
  { label: 'Careers', href: links.careers },
  { label: 'Press Room', href: links.pressRoom },
  { label: 'Prospective Doctors', href: links.prospectiveDoctors },
];
