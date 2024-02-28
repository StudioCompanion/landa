import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export type BaseMedia = {
	isInline?: boolean; 
  };
  
  export type Image = BaseMedia & {
	media_type: 'image';
	image: SanityImageSource & {
	  aspect_ratio: number;
	};
	caption: string | null;
	alt: string | null;
  };
  
  export type Video = BaseMedia & {
	media_type: 'video';
	video: {
	  aspect_ratio: string;
	  playback_id: string;
	  upload_id: string;
	  asset_id: string;
	};
	video_thumbnail: SanityImageSource & {
	  aspect_ratio: number;
	};
  };
  
  export type Media = Video | Image;
  