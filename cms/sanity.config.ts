import { defineConfig, type SanityDocumentLike } from 'sanity'
import { deskTool } from 'sanity/desk'
import {media, mediaAssetSource} from 'sanity-plugin-media'
import { visionTool } from '@sanity/vision'
import { presentationTool, defineDocuments, defineLocations } from 'sanity/presentation'
import { schemaTypes } from './schemas'
import { muxInput } from 'sanity-plugin-mux-input'
import { colorInput } from '@sanity/color-input'
import { CaseIcon, DocumentIcon, UserIcon, CogIcon, ImagesIcon, HomeIcon } from '@sanity/icons'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { createPreviewSecret } from '@sanity/preview-url-secret/create-secret'
import {
  urlSearchParamPreviewPathname,
  urlSearchParamPreviewPerspective,
  urlSearchParamPreviewSecret,
} from '@sanity/preview-url-secret/constants'
import { resolveDocumentPreviewPath } from './lib/resolveDocumentPreviewPath'

const projectId = 'lr8k1ek3'
const dataset = 'prod'

const previewOrigin =
  process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:5173'

const mainDocuments = defineDocuments([
  {
    route: '/work/:slug',
    filter: `_type == "project" && slug.current == $slug`,
  },
  {
    route: '/work',
    filter: `_type == "project"`,
  },
  {
    route: '/info',
    filter: `_type == "about"`,
  },
  {
    route: '/',
    filter: `_type == "homepage"`,
  },
])

const locations = {
  project: defineLocations({
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    resolve: (doc) => ({
      locations: doc?.slug
        ? [
            {
              title: doc.title || 'Untitled project',
              href: `/work/${doc.slug}`,
            },
            {
              title: 'Work',
              href: '/work',
            },
          ]
        : [{title: 'Work', href: '/work'}],
    }),
  }),
  homepage: defineLocations({
    select: {title: 'title'},
    resolve: () => ({
      locations: [{title: 'Homepage', href: '/'}],
    }),
  }),
  about: defineLocations({
    select: {title: 'title'},
    resolve: () => ({
      locations: [{title: 'Info', href: '/info'}],
    }),
  }),
  settings: defineLocations({
    message: 'Used across the site',
    tone: 'caution',
  }),
  splashscreen: defineLocations({
    select: {},
    resolve: () => ({
      locations: [{title: 'Homepage splash', href: '/'}],
    }),
  }),
}

async function buildDraftPreviewUrl(
  document: SanityDocumentLike,
  getClient: (options: {apiVersion: string}) => any,
  currentUserId?: string,
) {
  const pathname = resolveDocumentPreviewPath(document)
  if (!pathname) return undefined

  const client = getClient({apiVersion: '2023-05-03'})
  const studioUrl =
    typeof window !== 'undefined' ? window.location.origin : 'https://lanesandassociates.sanity.studio'

  const {secret} = await createPreviewSecret(client, 'sanity-studio.production-url', studioUrl, currentUserId)

  const enableUrl = new URL('/api/draft-mode/enable', previewOrigin)
  enableUrl.searchParams.set(urlSearchParamPreviewSecret, secret)
  enableUrl.searchParams.set(urlSearchParamPreviewPathname, pathname)
  enableUrl.searchParams.set(urlSearchParamPreviewPerspective, 'drafts')
  return enableUrl.toString()
}

export default defineConfig({
  name: 'default',
  title: 'Lanes and Associates',

  projectId,
  dataset,

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
    presentationTool({
      previewUrl: {
        origin: previewOrigin,
        initial: previewOrigin,
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      allowOrigins: [
        'http://localhost:*',
        'https://www.laneandassociates.co',
        'https://landa-web.vercel.app',
      ],
      resolve: {
        mainDocuments,
        locations,
      },
    }),
    visionTool(),
    muxInput({mp4_support: 'standard'}),
    colorInput(),
    media(),
  ],

  document: {
    // Desk "Open preview" — new tab with draft mode on the real site layout
    productionUrl: async (prev, context) => {
      const {document, getClient, currentUser} = context
      try {
        const url = await buildDraftPreviewUrl(document, getClient, currentUser?.id)
        return url || prev
      } catch (error) {
        console.error('Failed to build draft preview URL', error)
        return prev
      }
    },
  },

  form: {
    image: {
       assetSources: () => [mediaAssetSource]
    }
  },

  schema: {
    types: schemaTypes,
  },
})
