import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ikd4k9wt',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
});
