import {SchemaTypeDefinition} from 'sanity'

const about: SchemaTypeDefinition = {
  title: 'About',
  name: 'about',
  type: 'document',
  fields: [
    {
      title: 'Description',
      name: 'description',
      type: 'content',
    },
    {
      title: 'Contact',
      name: 'contact',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Label',
              name: 'label',
              type: 'string',
            },
            {
              title: 'Link Text',
              name: 'link_label',
              type: 'string',
            },
            {
              title: 'URL',
              name: 'url',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            },
          ],
        },
      ],
    },
  ],
}

export default about
