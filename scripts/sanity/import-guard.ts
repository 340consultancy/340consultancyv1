// The import replaces every document it writes (createOrReplace). Once the
// client edits production in the Studio, a careless re-run would wipe those
// edits, so production imports are restricted.
export function checkImportTarget(dataset: string, source: 'bundled' | 'strapi', overwrite: boolean): void {
  if (dataset !== 'production') return;
  if (source === 'bundled') {
    throw new Error('Refusé : le contenu embarqué (ancien) ne doit jamais être importé dans « production ».');
  }
  if (!overwrite) {
    throw new Error('Import dans « production » : ajoutez --overwrite pour confirmer que les documents existants seront remplacés.');
  }
}
