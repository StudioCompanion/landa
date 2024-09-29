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
      type: 'content',
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
          ],
        },
      ],
    },
    {
      title: 'Services',
      name: 'services',
      type: 'content',
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
