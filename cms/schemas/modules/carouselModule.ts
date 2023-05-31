import {SchemaTypeDefinition} from 'sanity'

const carouselModule: SchemaTypeDefinition = {
  title: 'Carousel Module',
  name: 'carousel_module',
  type: 'object',
  fields: [
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
      description: 'Use this if you wish for a global caption for the carousel',
    },
    {
      title: 'Slides',
      name: 'slides',
      type: 'array',
      of: [
        {type: 'media'},
        {
          title: 'Block Slide',
          description: 'A slide with multiple images/videos',
          name: 'block_slide',
          type: 'object',
          fields: [
            {
              title: 'Items',
              name: 'items',
              type: 'array',
              of: [{type: 'media'}],
            },
          ],
        },
      ],
    },
    {
      title: 'Autoplay',
      name: 'autoplay',
      description: 'Should the carousel automatically play',
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Full width',
      name: 'full_width',
      description: 'Should the carousel be full bleed',
      type: 'boolean',
      initialValue: false,
    },
    {
      title: 'Background Color',
      name: 'background_color',
      description: 'Background color behind the carousel',
      type: 'color',
    },
  ],
}

export default carouselModule
