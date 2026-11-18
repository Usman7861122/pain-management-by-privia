// Extra content for the two office pages. Facts that must come from the practice are marked VERIFY.
export interface LocationDetail {
  slug: 'rockville' | 'frederick';
  heroImage: string;
  heroAlt: string;
  galleryImage: string;
  county: string;
  lead: string;
  intro: string;
  serves: string[];
  /** HTML shown in the hero strip */
  nearby: string;
  description: string;
}

// VERIFY with the practice: nearby town lists (same lists already used on the service pages).
export const locationDetails: Record<string, LocationDetail> = {
  rockville: {
    slug: 'rockville',
    heroImage: '/images/locations/rockville.jpg',
    heroAlt: 'Rockville, Maryland',
    galleryImage: '/images/about/team-smile.jpg',
    county: 'Washington DC metro area',
    lead: 'Board-certified interventional pain care for patients across the Washington, DC metro area, including Bethesda, Gaithersburg and Potomac.',
    intro:
      'Our Rockville office is at Tower Oaks Boulevard. Our physicians treat back, neck, nerve and joint pain here, with exams, image-guided procedures and clear, step-by-step plans.',
    serves: ['Rockville', 'Bethesda', 'Gaithersburg', 'Potomac', 'Silver Spring', 'Washington, DC', 'Northern Virginia'],
    nearby:
      'Patients come to our <strong class="font-semibold text-gold-300">Rockville</strong> office from Bethesda, Gaithersburg, Potomac, Silver Spring, Washington, DC and across the Washington metro area.',
    description:
      'Pain Management Specialists in Rockville, MD. Address, phone, directions, services and conditions we treat at our Rockville office.',
  },
  frederick: {
    slug: 'frederick',
    heroImage: '/images/locations/frederick.jpg',
    heroAlt: 'Frederick, Maryland',
    galleryImage: '/images/about/team-tablet.jpg',
    county: 'Central and western Maryland',
    lead: 'Board-certified interventional pain care for patients across central and western Maryland and the West Virginia panhandle, including Urbana, Walkersville and Thurmont.',
    intro:
      'Our Frederick office is on Thomas Johnson Drive. You will see the same physicians and the same full range of treatments, so you can choose the office that is easiest to reach.',
    serves: ['Frederick', 'Urbana', 'Walkersville', 'Thurmont', 'Hagerstown', 'Martinsburg, WV', 'Charles Town, WV'],
    nearby:
      'Patients come to our <strong class="font-semibold text-gold-300">Frederick</strong> office from Urbana, Walkersville, Thurmont, Hagerstown, Martinsburg and Charles Town, and across central and western Maryland and the West Virginia panhandle.',
    description:
      'Pain Management Specialists in Frederick, MD. Address, phone, directions, services and conditions we treat at our Frederick office.',
  },
};

// The same service groups shown on the Services page, reused on the office pages.
export const serviceGroups = [
  { id: 'interventional', title: 'Interventional procedures', href: '/services/interventional-procedures', items: ['interventional-pain-management', 'epidural-steroid-injections', 'radiofrequency-ablation', 'nerve-blocks', 'cortisone-injections', 'prp-injections', 'vertebral-augmentation', 'basivertebral-nerve-ablation', 'percutaneous-interlaminar-decompression', 'iovera-treatment'] },
  { id: 'neuromodulation', title: 'Neuromodulation & devices', href: '/services/neuromodulation-and-devices', items: ['neuromodulation', 'spinal-cord-stimulation', 'reactiv8'] },
  { id: 'medicine', title: 'Medicine & care', href: '/services/medicine-and-care', items: ['pain-management', 'pain-medicine'] },
];

export const firstVisit = [
  { t: 'Book your visit', d: 'Book online as a new or returning patient, or call the office.' },
  { t: 'Bring what helps', d: 'Photo ID, your insurance card, a list of medicines, and any scans, X-rays or reports about your pain.' },
  { t: 'Talk and exam', d: 'Your physician listens to your story, examines you, and explains what may be causing the pain.' },
  { t: 'Your plan', d: 'You leave with clear next steps. We try safe, non-opioid options first and explain every choice.' },
];
