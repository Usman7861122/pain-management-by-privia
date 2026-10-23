// Services that have their own city pages (/services/<id>/rockville and /services/<id>/frederick).
// Rolled out one service at a time; add ids here to publish more.
export const CITY_SERVICE_IDS: string[] = ['radiofrequency-ablation'];
export const hasCityPages = (id: string) => CITY_SERVICE_IDS.includes(id);
export const CITY_SLUGS = ['rockville', 'frederick'] as const;
