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
    // Rich page fields (optional). When `lead` is set, the full service layout is used.
    lead: z.string().optional(),
    heroImage: z.string().optional(),
    heroAlt: z.string().default(''),
    basicsImage: z.string().optional(),
    conditionsImage: z.string().optional(),
    stepsImage: z.string().optional(),
    reliefImage: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    facts: z.array(z.object({ k: z.string(), v: z.string() })).default([]),
    conditionsTitle: z.string().default('What it can help with'),
    conditions: z.array(z.string()).default([]),
    stepsTitle: z.string().default('What happens during the procedure'),
    steps: z.array(z.object({ t: z.string(), d: z.string() })).default([]),
    cardsEyebrow: z.string().default('Options'),
    cardsTitle: z.string().optional(),
    cards: z.array(z.object({ t: z.string(), d: z.string() })).default([]),
    fitTitle: z.string().default('Is it right for me?'),
    goodFit: z.array(z.string()).default([]),
    notFit: z.array(z.string()).default([]),
    notFitTitle: z.string().default('May not be a good fit if'),
    reliefTitle: z.string().default('When will I feel relief?'),
    relief: z.string().optional(),
    risks: z.array(z.string()).default([]),
    risksTitle: z.string().default('Risks to know about'),
    risksIntro: z.string().optional(),
    alternatives: z.array(z.string()).default([]),
    notice: z.string().optional(),
    related: z.array(z.string()).default([]),
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
