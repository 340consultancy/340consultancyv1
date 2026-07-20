// Testimonials collection (CMS collection type) + the section's CTA.

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "340 transformed our Instagram from a ghost town into our #1 lead channel. Within 3 months we doubled our inquiries.",
    name: "Sophie Hendriks",
    role: "Founder, Studio Displays · NL",
  },
  {
    quote: "Professional, strategic, and genuinely invested in our growth. They don't just post — they build a brand.",
    name: "Carlos Medina",
    role: "CEO, Galería Eldorado · ES",
  },
  {
    quote: "Working with Linda and Nancy felt like having an in-house team. Always on brand, always on time.",
    name: "Marie Dubois",
    role: "Marketing Director, AlbaNova · DE",
  },
  {
    quote: "Our reach grew 340% in the first quarter. I'm not even joking — the number fits perfectly.",
    name: "Lena Baumann",
    role: "Owner, Maison Verde · DE",
  },
  {
    quote: "They understood our multilingual audience immediately. Content in three languages, one consistent voice.",
    name: "Tim van den Berg",
    role: "Co-Founder, Bloom Collective · NL",
  },
];

export const testimonialsCta = { label: 'MEER KLANTENERVARINGEN', to: '/work' };
