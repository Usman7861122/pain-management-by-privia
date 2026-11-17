// Every service has its own city pages: /services/<id>/rockville and /services/<id>/frederick.
export const hasCityPages = (_id: string) => true;
export const CITY_SLUGS = ['rockville', 'frederick'] as const;
