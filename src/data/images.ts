// All photography lives here so it is easy to swap. Files go in public/images/.
// Source: Shutterstock (licensed to the account) or the old website. Keep credits in docs/image-credits.md
export const img = {
  hero: ['/images/hero/hero-1.jpg', '/images/hero/hero-2.jpg', '/images/hero/hero-3.jpg', '/images/hero/hero-4.jpg'],
  about: '/images/sections/about.jpg',
  mission: '/images/sections/mission.jpg',
  virtual: '/images/sections/virtual-visit.jpg',
  parallax: '/images/sections/parallax.jpg',
  locations: { rockville: '/images/locations/rockville.jpg', frederick: '/images/locations/frederick.jpg' },
} as const;
