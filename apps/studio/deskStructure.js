import { CgFilm, CgFormatJustify, CgHome } from 'react-icons/cg'

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
      S.listItem()
        .title('Footer')
        .icon(CgFormatJustify)
        .child(
          S.document().title('Footer').schemaType('footer').documentId('footer')
        ),

      S.divider(),
      // List out the rest of the document types, but filter out the config type
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['homepage', 'about', 'imprint', 'projects', 'footer'].includes(
            listItem.getId()
          )
      ),
    ])

export default deskStructure
