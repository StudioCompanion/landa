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
        {type: 'grid_module'},
      ],
    },
  ],
}

export default carouselModule
