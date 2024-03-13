import { SchemaTypeDefinition } from 'sanity'

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
    {
      title: 'Addresses',
      name: 'addresses',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: "Location",
              name: 'location',
              type: 'string'
            },
            {
              title: 'Address',
              name: 'address',
              type: 'text',
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
    {
      title: "Services",
      name: 'services',
      type: 'array',
      of: [{ type: 'object', name: 'service', title: "Service", fields: [{ title: "Title", name: 'title', type: 'string' }, { title: "Content", type: 'text', name: 'content' }] }]
    },
    {
      title: 'Clients',
      name: 'clients',
      type: 'content',
    },
    {
      title: 'Collaborators',
      name: 'collaborators',
      type: 'content',
    },
    {
      title: 'Biography',
      name: 'biography',
      type: 'content',
    },
  ],
  preview: {
    select: {
      title: 'fieldName', // Replace 'fieldName' with the field name you want as the title
    },
    prepare(selection) {
      const {title} = selection;
      return {
        title: title || 'Info Page', // Fallback title if the field is empty
      };
    },
  },
}

export default about
