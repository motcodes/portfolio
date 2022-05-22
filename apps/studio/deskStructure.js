// deskStructure.js
import S from '@sanity/desk-tool/structure-builder';
import { CgHome, CgUser } from 'react-icons/cg';

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .icon(CgHome)
        .child(
          S.document()
            .title('Homepage')
            .schemaType('homepage')
            .documentId('homepage')
        ),

      S.listItem()
        .title('About')
        .icon(CgUser)
        .child(
          S.document().title('About').schemaType('about').documentId('about')
        ),
      // Add a visual divider (optional)
      // S.divider(),
      // List out the rest of the document types, but filter out the config type
      ...S.documentTypeListItems().filter(
        (listItem) => !['homepage', 'about'].includes(listItem.getId())
      ),
    ]);
