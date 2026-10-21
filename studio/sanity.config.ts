import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes, SINGLETON_TYPES } from './schemaTypes';
import { structure } from './structure';

const singletons = new Set(SINGLETON_TYPES);
const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore']);

export default defineConfig({
  name: 'default',
  title: '340 Consultancy',
  // The project id is public (it appears in every image URL); env overrides it.
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ikd4k9wt',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes as any,
    // Pages exist exactly once: no "create new" entry for them.
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.has(schemaType)),
  },
  document: {
    // Pages cannot be duplicated or deleted, only edited and published.
    actions: (input, context) =>
      singletons.has(context.schemaType)
        ? input.filter(({ action }) => action && SINGLETON_ACTIONS.has(action))
        : input,
  },
});
