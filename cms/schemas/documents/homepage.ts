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
  preview: {
    select: {
      title: 'fieldName', // Replace 'fieldName' with the field name you want as the title
    },
    prepare(selection) {
      const {title} = selection;
      return {
        title: title || 'Homepage', // Fallback title if the field is empty
      };
    },
  },
}

export default splashscreen
