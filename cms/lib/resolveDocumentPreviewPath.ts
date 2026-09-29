import type {SanityDocumentLike} from 'sanity'

/** Map a Studio document to its frontend path (or null if not previewable). */
export function resolveDocumentPreviewPath(document: SanityDocumentLike): string | null {
  switch (document._type) {
    case 'project': {
      const slug = (document as {slug?: {current?: string}}).slug?.current
      return slug ? `/work/${slug}` : null
    }
    case 'about':
      return '/info'
    case 'homepage':
    case 'splashscreen':
    case 'settings':
      return '/'
    default:
      return null
  }
}
