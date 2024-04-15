import {SchemaTypeDefinition} from 'sanity'

const content: SchemaTypeDefinition = {
  title: 'Content',
  name: 'content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Indented', value: 'blockquote' }
      ],
    },
  ],
}

export default content
