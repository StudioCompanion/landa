import {SchemaTypeDefinition} from 'sanity'

const content: SchemaTypeDefinition = {
  title: 'Content',
  name: 'content',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        {title: 'Quote', value: 'blockquote'},
        {title: 'Caption', value: 'caption'},
      ],
    },
  ],
}

export default content
