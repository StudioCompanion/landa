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
      title: 'Inline Video',
      name: 'isInline',
      type: 'boolean',
      description: 'Toggle on for an inline video (autoplaying, muted, no controls). Toggle off for a full video (with controls, sound, and no autoplay).',
      initialValue: false, // Default to 'full' video type
      hidden: ({ parent }) => parent?.media_type !== 'video', // Only show this for videos
    },
    {
      title: 'Black Controls',
      name: 'isBlackControls',
      type: 'boolean',
      description: 'Toggle on for black video controls',
      initialValue: false,
      hidden: ({ parent }) => parent?.media_type !== 'video',
    },
  ],
}

export default gridMedia
