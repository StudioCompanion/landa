import { SchemaTypeDefinition } from 'sanity'

const splashscreen: SchemaTypeDefinition = {
  title: 'Homepage',
  name: 'homepage',
  type: 'document',
  fields: [
    {

      title: 'Bio',
      name: 'bio',
      type: 'content',

    },
  ],
}

export default splashscreen
