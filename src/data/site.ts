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
      phone: { display: '240-453-9182', tel: '+12404539182' },
    },
    {
      slug: 'frederick',
      name: 'Frederick',
      street: '198 Thomas Johnson Drive, Suite 17',
      city: 'Frederick',
      state: 'MD',
      zip: '21702',
      phone: { display: '240-453-9182', tel: '+12404539182' },
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
  'Patients are welcome from across the Washington, DC metro area, including <strong class="font-semibold text-gold-300">Rockville</strong>, Bethesda, Gaithersburg, Potomac and Silver Spring, and from central and western Maryland and the West Virginia panhandle, including <strong class="font-semibold text-gold-300">Frederick</strong>, Urbana, Walkersville, Thurmont, Hagerstown and Martinsburg.';
