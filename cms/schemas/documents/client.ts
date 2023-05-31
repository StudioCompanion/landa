import {SchemaTypeDefinition} from 'sanity'
import {orderRankField} from '@sanity/orderable-document-list'
const client: SchemaTypeDefinition = {
  title: 'Client',
  name: 'client',
  type: 'document',
  fields: [
    {
      title: 'Client name',
      name: 'title',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      title: 'Website',
      name: 'website',
      type: 'url',
      validation: (R) => R.optional(),
    },
    {
      title: 'Logo',
      name: 'logo',
      type: 'image',
      description: 'Please upload a transparent background PNG',
      options: {
        accept: '.png',
      },
    },
    orderRankField({type: 'string'}),
  ],
}

export default client
