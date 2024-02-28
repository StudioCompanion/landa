import {SchemaTypeDefinition} from 'sanity'
import { PiTextAUnderlineFill } from "react-icons/pi";


const contentModule: SchemaTypeDefinition = {
  title: 'Content Module',
  name: 'content_module',
  type: 'object',
  icon: PiTextAUnderlineFill,
  fields: [
    {title: 'Content', name: 'content', type: 'content'},
  ],
  preview: {
    select: {
      title: 'content'
    }
  }
}

export default contentModule
