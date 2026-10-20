// Alert banners (Privia rule: ability to alert visitors — phone issues, closures, medication recalls...).
// Add an item, set active: true, optionally set start/end (ISO dates). Delete or set active:false to remove.
export interface SiteAlert {
  id: string;
  message: string;
  level: 'info' | 'warning' | 'urgent';
  active: boolean;
  start?: string;
  end?: string;
  link?: { label: string; href: string };
}

export const alerts: SiteAlert[] = [
  // { id: 'phones-2026-10', message: 'Our Frederick phone line is temporarily down. Please call 240-453-9182.', level: 'warning', active: true },
];
