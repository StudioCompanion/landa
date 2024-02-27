import {SchemaTypeDefinition} from 'sanity'

const content: SchemaTypeDefinition = {
  title: 'Content',
  name: 'content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [],
    },
  ],
}

export default content
