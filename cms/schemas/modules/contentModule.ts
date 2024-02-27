import {SchemaTypeDefinition} from 'sanity'

const contentModule: SchemaTypeDefinition = {
  title: 'Content Module',
  name: 'content_module',
  type: 'object',
  fields: [
    {title: 'Content', name: 'content', type: 'content'},
  ],
  preview: {
    select: {
      title: 'content'
    }
  }
}

export default contentModule
