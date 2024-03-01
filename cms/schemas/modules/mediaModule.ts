import {SchemaTypeDefinition} from 'sanity'
import { PiImageFill } from "react-icons/pi";

const mediaModule: SchemaTypeDefinition = {
  title: 'Media Module',
  name: 'media_module',
  type: 'object',
  icon: PiImageFill,
  fields: [
    {
      title: 'Media',
      name: 'media',
      type: 'media',
    },
  ],
  preview: {
    select: {
      title: 'media.caption'
    }
  }
}

export default mediaModule
