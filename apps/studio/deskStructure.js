// deskStructure.js
import S from '@sanity/desk-tool/structure-builder'
import { CgBolt, CgCollage, CgHome, CgUser } from 'react-icons/cg'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

const deskStructure = () =>
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

      orderableDocumentListDeskItem({
        type: 'caseStudy',
        title: 'Case Studies',
        icon: CgBolt,
      }),

      orderableDocumentListDeskItem({
        type: 'smallProject',
        title: 'Small Projects',
        icon: CgBolt,
      }),

      orderableDocumentListDeskItem({
        type: 'experience',
        title: 'Experiences',
        icon: CgBolt,
      }),
      orderableDocumentListDeskItem({
        type: 'collection',
        title: 'Collections',
        icon: CgCollage,
      }),

      S.divider(),
      // List out the rest of the document types, but filter out the config type
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'homepage',
            'about',
            'experience',
            'smallProject',
            'caseStudy',
            'collection',
          ].includes(listItem.getId())
      ),
    ])

export default deskStructure
