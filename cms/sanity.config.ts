import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { muxInput } from 'sanity-plugin-mux-input'
import { colorInput } from '@sanity/color-input'
import { CaseIcon, DocumentIcon, JoystickIcon, UserIcon, CogIcon, ImagesIcon, HomeIcon } from '@sanity/icons'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
export default defineConfig({
  name: 'default',
  title: 'Lanes and Associates',

  projectId: 'lr8k1ek3',
  dataset: 'prod',

  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            orderableDocumentListDeskItem({
              type: 'client',
              title: 'Clients',
              icon: UserIcon,
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'project',
              title: 'Projects',
              icon: CaseIcon,
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: 'tag',
              title: 'Tags',
              icon: CaseIcon,
              S,
              context,
            }),

            S.divider(),
            S.documentListItem()
              .schemaType('splashscreen')
              .title('Splashscreen')
              .id('splashscreen')
              .icon(ImagesIcon),
            S.documentListItem()
              .schemaType('homepage')
              .title('Homepage')
              .id('homepage')
              .icon(HomeIcon),
            S.documentListItem()
              .schemaType('settings')
              .title('Settings')
              .id('settings')
              .icon(CogIcon),
            S.documentListItem({
              title: 'About',
              schemaType: 'about',
              id: 'about',
              icon: DocumentIcon,
            }),
          ])
      },
    }),
    visionTool(),
    muxInput(mp4_support: 'standard'),
    colorInput(),
    media(),
  ],

  form: {
    image: {
       assetSources: () => [mediaAssetSource]
    }
  },

  schema: {
    types: schemaTypes,
  },
})
