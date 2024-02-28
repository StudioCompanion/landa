import {SchemaTypeDefinition} from 'sanity'
import { PiSlideshowFill } from "react-icons/pi";


const carouselModule: SchemaTypeDefinition = {
  title: 'Carousel Module',
  name: 'carousel_module',
  type: 'object',
  icon: PiSlideshowFill,
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
  ],
}

export default carouselModule
