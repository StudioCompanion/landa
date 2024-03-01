// import { tagQuery, settingsQuery } from '$lib/queries.js';
// import sanity from '$lib/sanity.js';

// export const load = async ({ params }) => {
//   const slug = params.slug as string;

//   const tag = await sanity.fetch(tagQuery, { slug });
//   const settings = await sanity.fetch(settingsQuery);
//   return {
//     tag,
//     settings,
//     slug
//   };
// };


// export const config = {
//   isr: {
//     expiration: 0,
//     group: 1
//   }
// }
