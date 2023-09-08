import { SchemaTypeDefinition } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'
const tag: SchemaTypeDefinition = {
  title: 'Tag',
  name: 'tag',
  type: 'document',
  fields: [
    {
      title: 'Tag name',
      name: 'name',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      title: 'Tag description',
      name: 'description',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      description: 'This is used in the URL',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (R) => R.required(),
    },
    orderRankField({ type: 'string' }),
  ],
}

export default tag
