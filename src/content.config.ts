import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const md = (dir: string) => glob({ pattern: '**/*.{md,mdx}', base: `./src/content/${dir}` });

// PRIVIA RULE: any service/product NOT billed under Privia's tax ID is a "carve-out".
// Set carveOut: true and it automatically gets an asterisk + the required disclaimer.
const services = defineCollection({
  loader: md('services'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(0),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    carveOut: z.boolean().default(false),
  }),
});

const conditions = defineCollection({
  loader: md('conditions'),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(0),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const doctors = defineCollection({
  loader: md('doctors'),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    specialties: z.array(z.string()).default([]),
    photo: z.string().optional(),
    order: z.number().default(0),
    intro: z.string().default(''),
    certifications: z.array(z.string()).default([]),
    expertise: z.array(z.string()).default([]),
    education: z.array(z.object({ year: z.string(), text: z.string() })).default([]),
    affiliations: z.array(z.string()).default([]),
    memberships: z.array(z.string()).default([]),
    leadership: z.array(z.string()).default([]),
    awards: z.array(z.string()).default([]),
    languages: z.array(z.string()).default([]),
  }),
});

const blog = defineCollection({
  loader: md('blog'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { services, conditions, doctors, blog };
