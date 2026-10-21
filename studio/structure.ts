import type { StructureResolver } from 'sanity/structure';
import { COLLECTIONS, SINGLETONS } from './schemaTypes';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Pages')
        .child(
          S.list()
            .title('Pages')
            .items(
              SINGLETONS.map((s) =>
                S.listItem().title(s.title).id(s.type).child(S.document().schemaType(s.type).documentId(s.type))
              )
            )
        ),
      S.divider(),
      ...COLLECTIONS.map((c) =>
        S.listItem()
          .title(c.title)
          .id(c.type)
          .child(
            S.documentTypeList(c.type)
              .title(c.title)
              .defaultOrdering(
                c.ordering === 'order'
                  ? [{ field: 'order', direction: 'asc' }]
                  : [{ field: 'publishedAt', direction: 'desc' }]
              )
          )
      ),
    ]);
