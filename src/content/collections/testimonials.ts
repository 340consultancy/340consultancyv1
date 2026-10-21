// Testimonials collection (CMS collection type) + the section's CTA.

import { generated } from '@/content/generated';
import type { TestimonialsCta } from '@/content/types';

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials = generated.testimonials as Testimonial[];

export const testimonialsCta = generated.testimonialsCta as TestimonialsCta;
