import groq from 'groq';
export const media = groq`{
    media_type,
    caption,
    "isInline": isInline,
    "isBlackControls": isBlackControls,
    (media_type == "image") => {
      image {..., asset->},
    },
    (media_type == "video") => {
      video {
        "aspect_ratio": asset->data.aspect_ratio,
        "playback_id": asset->playbackId,
        "upload_id": asset->uploadId,
        "asset_id": asset->assetId,
        "everything": asset->,
      },
      video_thumbnail {
        "aspect_ratio": asset->.metadata.dimensions.aspectRatio,
        asset
      },
    }
  }`;  

export const homepageQuery = groq`*[_type == "homepage"][0] {
    bio
}`;

export const splashscreen = groq`*[_type == "splashscreen"][0] {
    images
}`;

export const projectsQuery = groq`*[_type == 'project']|order(orderRank) {
    _id,
    title,
    "slug": slug.current,
    caption,
    featured_image{..., asset->},
    "image_stack": image_stack[]{..., asset->},
    homepage_image{..., asset->},
    "homepage_video": homepage_video.asset->{
        url,
        "metadata": {
          ...,
          "playbackId": playbackId,
          "aspectRatio": metadata.dimensions.aspectRatio,
          "duration": metadata.duration
        }
      },
      "video_thumbnail": video_thumbnail.asset->{
        url,
        "aspectRatio": metadata.dimensions.aspectRatio
      }
  }`;
  
  export const projectsHomepageQuery = groq`*[_type == 'project' && show_homepage == true]|order(orderRank) {
    _id,
    title,
    "slug": slug.current,
    caption,
    featured_image{..., asset->},
    "image_stack": image_stack[]{..., asset->},
    homepage_image{..., asset->},
    "homepage_video": homepage_video.asset->{
      "metadata": {
        ...,
        "playbackId": playbackId,
        "aspectRatio": metadata.dimensions.aspectRatio,
        "duration": metadata.duration
      }
    },
    "video_thumbnail": video_thumbnail.asset->{
      url,
      "aspectRatio": metadata.dimensions.aspectRatio
    }
  }`;

export const projectQuery = groq`*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    featured_image{..., asset->},
    description,
    credits,
    seo_title,
    seo_title,
    seo_description,
    seo_image,
    tags[]-> {
        _id,
        name,
        "slug": slug.current
    },
    modules[] {
        _type,

        (_type == "carousel_module") => {
            caption,
            slides[] {
                _type,
                // Handle 'media' type slides
                (_type == "media") => ${media},
                // Handle 'grid_module' type slides
                _type == "grid_module" || _type == "grid_carousel_module" => {
                    columns,
                    caption,
                    sizePreset,
                    items[] ${media}
                }
            },
        },
        (_type == "media_module") => {
            "caption": media.caption,
            media ${media}
        },
        (_type == "grid_module") => {
            columns,
            caption,
            sizePreset,
            items[] ${media}
        },
        (_type == 'content_module') => {
            content
        },
    }
}`;

export const tagQuery = groq`*[_type == "tag" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    "projects": *[_type == "project" && references(^._id)] {
      title,
      _id,
      featured_image{..., asset->},
      "slug": slug.current,
    }
}`;

export const settingsQuery = groq`*[_type == "settings"][0] {
    seo_title,
    seo_description,
    seo_image,
    canonical_url
}`;


export const aboutQuery = groq`*[_type == "about"][0] {
    description,
    services[],
    addresses[],
    contact[],
    clients,
    biography,
    collaborators

}`


