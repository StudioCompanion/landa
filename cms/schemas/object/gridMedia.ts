// gridMedia.ts
import {SchemaTypeDefinition} from 'sanity'

const gridMedia: SchemaTypeDefinition = {
  title: 'Grid Media',
  name: 'grid_media',
  type: 'object',
  fields: [
    {
      title: 'Media Type',
      name: 'media_type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
      },
      initialValue: 'image',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      hidden: ({parent}) => parent?.media_type !== 'image',
    },
    {
      title: 'Video',
      name: 'video',
      type: 'mux.video',
      hidden: ({parent}) => parent?.media_type !== 'video',
    },
    {
      title: 'Video thumbnail',
      name: 'video_thumbnail',
      type: 'image',
      hidden: ({parent}) => parent?.media_type !== 'video',
    },
    {
      title: 'Autoplay',
      name: 'autoplay',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.media_type !== 'video',
    },
    {
      title: 'Muted',
      name: 'muted',
      type: 'boolean',
      initialValue: true,
      hidden: ({parent}) => parent?.media_type !== 'video',
    },
    {
      title: 'Video controls',
      name: 'video_controls',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.media_type !== 'video',
    },
  ],
}

export default gridMedia
