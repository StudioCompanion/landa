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
  preview: {
    select: {
      title: 'fieldName', // Replace 'fieldName' with the field name you want as the title
    },
    prepare(selection) {
      const {title} = selection;
      return {
        title: title || 'Splashscreen Images', // Fallback title if the field is empty
      };
    },
  },
}

export default splashscreen
