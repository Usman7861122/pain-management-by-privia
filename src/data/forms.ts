// Required Privia patient forms. Shown under Resources and Become a Patient.
// Put the PDFs in public/forms/ and fill in the paths. Care-center forms may not duplicate or contradict these.
export interface PatientForm { id: string; title: string; description: string; en?: string; es?: string; href?: string }

export const patientForms: PatientForm[] = [
  { id: 'release', title: 'Authorization for Release of Medical Information', description: 'Allows patients to authorize the disclosure of their health information to a designated individual, company, agency, or facility.', en: '/forms/authorization-release-medical-information-en.pdf' },
  { id: 'consent', title: 'Authorization and Consent for Treatment', description: 'All patients must provide their consent for treatment, communications (calls, emails, and text messaging), and agreement of financial responsibility.', en: '/forms/authorization-consent-treatment-en.pdf', es: '/forms/autorizacion-consentimiento-tratamiento-es.pdf' },
  { id: 'contacts', title: 'Preferred Contacts', description: 'Patients are encouraged to complete and return the Preferred Contacts Form but it is not required.', en: '/forms/preferred-contacts-en.pdf', es: '/forms/contactos-preferidos-es.pdf' },
  { id: 'financial', title: 'Financial Policy', description: 'This form advises patients of their complete financial responsibility for all medical services received without regard to insurance eligibility or coverage determinations.', en: '/forms/financial-policy-en.pdf' },
  { id: 'npp', title: 'Notice of Privacy Practices', description: 'Describes how health information about you (as a patient of this Care Center) may be used and disclosed, and how you can get access to your individually identifiable health information. Please review this notice carefully.', en: '/forms/notice-of-privacy-practices-en.pdf' },
  { id: 'hipaa', title: 'HIPAA Privacy Notice', description: 'Privia HIPAA Privacy Notice.', href: 'http://www.priviahealth.com/hipaa-privacy-notice/' },
  { id: 'language', title: 'Language Services', description: 'Language assistance services.', href: '#' /* TODO: Privia language services link */ },
];
