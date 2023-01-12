import {
  CgBolt,
  CgCollage,
  CgFilm,
  CgFormatJustify,
  CgHome,
  CgUser,
} from 'react-icons/cg'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

const deskStructure = (S, context) =>
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
        .title('Projects')
        .icon(CgFilm)
        .child(
          S.document()
            .title('Projects')
            .schemaType('projects')
            .documentId('projects')
        ),

      S.listItem()
        .title('Imprint')
        .icon(CgFormatJustify)
        .child(
          S.document()
            .title('Imprint')
            .schemaType('imprint')
            .documentId('imprint')
        ),

      orderableDocumentListDeskItem({
        type: 'caseStudy',
        title: 'Case Studies',
        icon: CgBolt,
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: 'smallProject',
        title: 'Small Projects',
        icon: CgBolt,
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: 'experience',
        title: 'Experiences',
        icon: CgBolt,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: 'collection',
        title: 'Collections',
        icon: CgCollage,
        S,
        context,
      }),

      S.divider(),
      // List out the rest of the document types, but filter out the config type
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'homepage',
            'about',
            'imprint',
            'projects',
            'experience',
            'smallProject',
            'caseStudy',
            'collection',
          ].includes(listItem.getId())
      ),
    ])

export default deskStructure
