import {SchemaTypeDefinition} from 'sanity'

const splashscreen: SchemaTypeDefinition = {
  title: 'Splashscreen',
  name: 'splashscreen',
  type: 'document',
  fields: [
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{type: 'image'}],
    },
  ],
}

export default splashscreen
