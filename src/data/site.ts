// Care center facts. Source: old website (painmanagespecialists.com). VERIFY before launch.
export const site = {
  name: 'Pain Management Specialists',
  tagline: 'Interventional pain care, part of Privia Medical Group',
  description:
    'Board certified interventional pain management in Rockville and Frederick, Maryland. Modern, non-opioid focused care.',
  // Main contact shown prominently on the homepage (Privia rule)
  phone: { display: '240-453-9182', tel: '+12404539182' },
  locations: [
    {
      slug: 'rockville',
      name: 'Rockville',
      street: '3202 Tower Oaks Blvd, Suite 100',
      city: 'Rockville',
      state: 'MD',
      zip: '20852',
      // NOTE: area code differs from the address. Confirm this is the correct line.
      phone: { display: '717-616-2523', tel: '+17176162523' },
    },
    {
      slug: 'frederick',
      name: 'Frederick',
      street: '198 Thomas Johnson Drive, Suite 16',
      city: 'Frederick',
      state: 'MD',
      zip: '21702',
      // NOTE: area code differs from the address. Confirm this is the correct line.
      phone: { display: '419-452-4691', tel: '+14194524691' },
    },
  ],
  hours: [] as { day: string; time: string }[], // TODO: not on old site homepage
} as const;

export const mapsUrl = (l: (typeof site.locations)[number]) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${l.street}, ${l.city}, ${l.state} ${l.zip}`,
  )}`;

// Hero strip: towns near each office (shown on service pages). VERIFY the town lists with the practice.
export const nearbyAreasHtml =
  'Patients are welcome from across <strong class="font-semibold text-gold-300">Rockville</strong>, Bethesda, Gaithersburg, Potomac and Montgomery County, and from <strong class="font-semibold text-gold-300">Frederick</strong>, Urbana, Walkersville, Thurmont and the greater Frederick County area.';
