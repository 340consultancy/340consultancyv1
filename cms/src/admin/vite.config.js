const { mergeConfig } = require('vite');

// Fix for the admin dev-server crash on JSON fields:
//   "Unrecognized extension value in extension set ([object Object])"
//
// Vite pre-bundles @strapi/design-system as one optimized dep; its JSON-field
// editor (CodeMirror) got a private inlined copy of @codemirror/state while a
// second copy ended up in another dep chunk — two instances break CodeMirror's
// instanceof checks. Listing the CodeMirror packages in optimizeDeps.include
// turns them into shared optimized deps (the same trick Strapi core uses for
// react / react-redux / design-system itself), so every chunk imports the one
// shared instance. resolve.dedupe covers non-optimized source imports.
const CODEMIRROR_PACKAGES = [
  '@codemirror/state',
  '@codemirror/view',
  '@codemirror/language',
  '@codemirror/autocomplete',
  '@codemirror/commands',
  '@codemirror/lint',
  '@codemirror/search',
  '@codemirror/lang-json',
  '@codemirror/theme-one-dark',
  '@uiw/react-codemirror',
  '@uiw/codemirror-extensions-basic-setup',
];

module.exports = (config) =>
  mergeConfig(config, {
    optimizeDeps: {
      include: CODEMIRROR_PACKAGES,
    },
    resolve: {
      dedupe: CODEMIRROR_PACKAGES,
    },
  });
