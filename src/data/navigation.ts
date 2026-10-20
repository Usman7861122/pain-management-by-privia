import { links, FIND_A_DOCTOR_URL } from './privia';

// Main menu with dropdowns. Mirrors the old website's menu (painmanagespecialists.com).
// "columns" tells the desktop dropdown how many columns to use.
export interface NavChild { label: string; href?: string; external?: boolean; children?: NavChild[] }
export interface NavItem { label: string; href?: string; columns?: 1 | 2 | 3; children?: NavChild[] }

export const mainNav: NavItem[] = [
  {
    label: 'About Us', href: '/about', columns: 1,
    children: [
      { label: 'What We Do', href: '/about/what-we-do' },
      { label: 'Treatment Without Opioids', href: '/about/treatment-without-opioids' },
      { label: 'Providers', href: '/doctors', children: [
        { label: 'Team', href: '/doctors' },
        { label: 'Stuart Hough, MD', href: '/doctors/stuart-hough-md' },
        { label: 'Ramani Peruvemba, MD', href: '/doctors/ramani-peruvemba-md' },
      ] },
      { label: 'About Privia', href: '/about/about-privia' },
    ],
  },
  {
    label: 'Services', href: '/services', columns: 2,
    children: [
      { label: 'Neuromodulation', href: '/services/neuromodulation' },
      { label: 'Pain Medicine', href: '/services/pain-medicine' },
      { label: 'Spinal Cord Stimulation', href: '/services/spinal-cord-stimulation' },
      { label: 'Interventional Pain Management', href: '/interventional-pain-management' },
      { label: 'Epidural Steroid Injections', href: '/services/epidural-steroid-injections' },
      { label: 'Radiofrequency Ablation', href: '/services/radiofrequency-ablation' },
      { label: 'Pain Management', href: '/services/pain-management' },
      { label: 'Cortisone Injections', href: '/services/cortisone-injections' },
      { label: 'Nerve Blocks', href: '/services/nerve-blocks' },
      { label: 'Intracept Procedure', href: '/services/intracept-procedure' },
      { label: 'Reactiv8', href: '/services/reactiv8' },
      { label: 'Kyphoplasty', href: '/services/kyphoplasty' },
      { label: 'mild Procedure', href: '/services/mild-procedure' },
      { label: 'iovera Treatment', href: '/services/iovera-treatment' },
    ],
  },
  {
    label: 'Conditions', href: '/conditions', columns: 2,
    children: [
      { label: 'Vertebral Compression Fracture', href: '/conditions/vertebral-compression-fracture' },
      { label: 'Back Pain', href: '/conditions/back-pain' },
      { label: 'Sciatica', href: '/conditions/sciatica' },
      { label: 'Personal Injury', href: '/conditions/personal-injury' },
      { label: 'Neuropathy', href: '/conditions/neuropathy' },
      { label: 'Neck Pain', href: '/conditions/neck-pain' },
      { label: 'Pinched Nerves', href: '/conditions/pinched-nerves' },
      { label: 'Complex Regional Pain Syndrome', href: '/conditions/complex-regional-pain-syndrome' },
      { label: 'Arthritis', href: '/conditions/arthritis' },
      { label: 'Nerve Injuries', href: '/conditions/nerve-injuries' },
      { label: 'Cancer Pain', href: '/conditions/cancer-pain' },
      { label: 'Herniated Discs', href: '/conditions/herniated-discs' },
      { label: 'Spinal Stenosis', href: '/conditions/spinal-stenosis' },
      { label: 'Sacroiliitis', href: '/conditions/sacroiliitis' },
    ],
  },
  {
    label: 'Patient Resources', href: '/resources', columns: 1,
    children: [
      { label: 'Patient Information', children: [
        { label: 'Become a Patient', href: '/become-a-patient' },
        { label: 'Returning Patients', href: '/patient-resources/returning-patients' },
        { label: 'Virtual Visits', href: '/virtual-visits' },
        { label: 'Insurance & Fees', href: '/insurance' },
        { label: 'Frequently Asked Questions', href: '/patient-resources/faq' },
      ] },
      { label: 'Patient Forms', href: '/resources' },
      { label: 'HIPAA Privacy Notice', href: links.hipaa, external: true },
      { label: 'Language Services', href: links.nondiscrimination, external: true },
      { label: 'COVID-19', href: '/patient-resources/covid-19' },
      { label: 'Request Appointment', href: FIND_A_DOCTOR_URL, external: true },
    ],
  },
  { label: 'Locations', href: '/locations' },
  { label: 'Contact', href: '/contact' },
];

// Mega menu content (desktop). Groups pick items from the lists above by label.
export interface MegaGroup { label: string; desc: string; icon: string; items: string[] }
export interface MegaMenu { heading: string; viewAll: { label: string; href: string }; groups: MegaGroup[]; featured: { image: string; eyebrow: string; title: string; text: string } }
export const megaMenus: Record<string, MegaMenu> = {
  Services: {
    heading: 'Treatments',
    viewAll: { label: 'View all services', href: '/services' },
    groups: [
      { label: 'Interventional procedures', desc: 'Targeted, image-guided treatments for lasting relief.', icon: '<circle cx="12" cy="12" r="7"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
        items: ['Interventional Pain Management', 'Epidural Steroid Injections', 'Radiofrequency Ablation', 'Nerve Blocks', 'Cortisone Injections', 'Kyphoplasty', 'Intracept Procedure', 'mild Procedure'] },
      { label: 'Neuromodulation & devices', desc: 'Advanced implants and nerve therapies.', icon: '<path d="M13 2L5 14h6l-1 8 8-12h-6z"/>',
        items: ['Neuromodulation', 'Spinal Cord Stimulation', 'Reactiv8', 'iovera Treatment'] },
      { label: 'Medicine & care', desc: 'Whole-person care plans, with and without medication.', icon: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
        items: ['Pain Management', 'Pain Medicine'] },
    ],
    featured: { image: '/images/services/interventional-pain-management.jpg', eyebrow: 'Not sure where to start?', title: 'Find the right treatment', text: 'Our physicians will build a plan around you.' },
  },
  Conditions: {
    heading: 'Conditions we treat',
    viewAll: { label: 'View all conditions', href: '/conditions' },
    groups: [
      { label: 'Spine & back', desc: 'Pain from the neck down to the lower back.', icon: '<rect x="8" y="2" width="8" height="5" rx="2"/><rect x="8" y="9.5" width="8" height="5" rx="2"/><rect x="8" y="17" width="8" height="5" rx="2"/>',
        items: ['Back Pain', 'Neck Pain', 'Sciatica', 'Herniated Discs', 'Spinal Stenosis', 'Sacroiliitis', 'Vertebral Compression Fracture'] },
      { label: 'Nerve pain', desc: 'Burning, tingling or shooting pain.', icon: '<path d="M3 12h4l2-6 4 12 2-6h6"/>',
        items: ['Neuropathy', 'Pinched Nerves', 'Complex Regional Pain Syndrome', 'Nerve Injuries'] },
      { label: 'Joints & injury', desc: 'Long-term and injury-related pain.', icon: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/>',
        items: ['Arthritis', 'Personal Injury', 'Cancer Pain'] },
    ],
    featured: { image: '/images/conditions/back-pain.jpg', eyebrow: 'Living with pain?', title: 'You do not have to manage it alone', text: 'Book a visit and start feeling better.' },
  },
};

// Header items required by Privia.
export const headerUtility = [
  { label: 'Mobile App', href: links.mobileApp },
  { label: 'Patient Login', href: links.patientLogin },
];

export const getCareNow = [
  { label: 'See My Provider', href: links.seeMyProvider, note: 'Find your provider and schedule' },
  { label: 'Immediate Care', href: links.immediateCare, note: 'Same-day urgent care' },
];

export const footerNav = [
  { label: 'Services', href: '/services' },
  { label: 'Conditions', href: '/conditions' },
  { label: 'Providers', href: '/doctors' },
  { label: 'Patient Resources', href: '/resources' },
  { label: 'Become a Patient', href: '/become-a-patient' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];
