// Original scientific editorial concepts. Prompts and provenance live beside the assets.
const restored = "/images/products/original-restyled-v1";
const journal = "/images/products/journal-v1";
export const productAssets = {
  hero: `${journal}/platform`,
  platform: `${restored}/platform`,
  mdExp: `${restored}/md-exp`,
  lammps: `${journal}/simulation`,
  aiAgent: `${journal}/intelligence`,
  learning: `${journal}/learning`,
  materials: `${restored}/materials`,
  chemistry: `${journal}/chemistry`,
  biology: `${journal}/biology`,
} as const;
