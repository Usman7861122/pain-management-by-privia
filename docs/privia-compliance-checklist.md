# Privia compliance checklist
Source: "Privia Care Center Website Detailed Requirements". The document ALWAYS wins over design notes.
Privia content lives in `src/data/privia.ts`, `forms.ts`, `alerts.ts`. Updates are due within 7 business days of notice. Audited quarterly.

## Header (every page)
- [x] Logo top left at 190x44 (public/images/Logo.png: Privia Medical Group + Pain Management Specialists lockup, white version)
- [ ] CONFIRM with Privia that the co-branded lockup is allowed in the header, and whether the lockup text is readable at 190x44
- [x] Mobile App link
- [x] Patient Login link
- [x] "Get Care Now" with "See My Provider" and "Immediate Care"
- [ ] Replace FIND_A_DOCTOR_URL with the custom link from Privia Product Performance

## Footer (every page)
- [x] myPrivia logo link (placeholder SVG: REPLACE) + App Store / Google Play icons
- [x] About Privia, Careers, Press Room, Prospective Doctors
- [x] Notice of Nondiscrimination, HIPAA Privacy Notice, Privacy Policy, Terms of Use
- [x] Privacy Policy / Terms pages written (plain-language drafts). [ ] Privia legal must review so they do not contradict Privia notices
- [x] Footer HIPAA Privacy Notice still links to Privia's official notice; /hipaa is a summary page that links to it
- [ ] CONFIRM with Privia that extra footer items (Accessibility, Cookie Preferences) are allowed beside the required legal links

## Homepage
- [x] Phone + both locations in the hero
- [x] Find-A-Doctor is the ONLY scheduling tool (no booking form anywhere)
- [x] Patient portal block with required text, Sign In, Create an Account
- [ ] Confirm the "Create an Account" URL
- [x] "Proud to be part of Privia" block (brand set in privia.ts: medical-group)

## Other required elements
- [ ] Add the 7 form PDFs (English + Spanish where available) to public/forms/
- [ ] Add the Language Services link
- [x] Alert banner (edit src/data/alerts.ts)

## Carve-out services
- [ ] Tell us which services are NOT billed under Privia. Set `carveOut: true` in the service's markdown file.
- [x] Asterisk and disclaimer appear automatically (services list, service page, homepage grid)
- [ ] Check blog posts and any other page that mentions a carve-out service

## Maintenance
- [ ] Host with a CDN / static hosting. Target 99.7% uptime.
- [ ] Quarterly audit: re-check every item above.

## Items copied from the old website. VERIFY before launch
- Phone numbers (717 and 419 area codes on Maryland offices), awards, hospital privileges, provider names.
