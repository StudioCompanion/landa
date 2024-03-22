# Lane & Associates


This is a monorepo containing the Sanity CMS details and the frontend Sveltekit app for Lane & Associates.

To run, download this repo and run 
```yarn install```

To then run in development, run:
```yarn dev```

This can be easily deployed to vercel from the monorepo as it should recognise a sveltekit app. For those not familiar with Svelte, [this page](https://kit.svelte.dev/docs/routing) is the most useful for understanding the repo.

No `.env` file is currently required as all sanity configurates are hardcoded currently (as there is no seperate production/staging environment)



#Temporary TO DO Storage

- [x] Bug: remove the border on the right hand side in /work
- [x] CMS Remove: Hero Theme
- [x] CMS Remove: Hero Image/Video
- [x] FE Hide: Tags
- [x] CMS Remove: Quote Module
- [x] CMS Remove: Background Color from Content Module, Carousel Module, Grid Module
- [x] Replace Alt Name for Images
- [ ] Can we have the ability to use italics on the homepage captions and project titles?
- [x] Can we make the space between ‘Work’ and ‘Info’ equal to the margin width?
- [x] Could we add colons after the project titles on the homepage?
- [ ] Carousels with a mixture of single images and grids have varying image heights (e.g. Hermès Shanghai event design gallery: https://landa-web.vercel.app/work/hermes-shanghai)
- [x] Can we have the option to have 3 hero images for the homepage, then just 1 for the 'Work' page? (e.g. currently I've comped 3 frieze covers for the project image, but ideally on the 'Work' page it would just show the first cover)
- [ ] Can we add toggles so we have the option for autoplay and looping on full videos?
- [x] Videos in carousels keep playing when you click through to the next image. They should stop and start from the beginning when you click back to it if possible.
- [x] Image count is currently formatted as ‘1 of 10’, could we have it as ‘1/10’.
- [x] Video controls are different for videos in carousels, is this WIP?
- [x] Should we be able to move modules around once content is uploaded? It doesn’t currently work when I try to drag them.
- [x] Nav 999 z-index


- [ ] full videos within carousels so play when coming into active slide, and puase on going out
- [ ] L&A to do aspect ratios and grids
- [ ] Hermes Fit bottom carousel is bugged
- [ ] Vvideo gradient background in controls
- [ ] black lines oon social cut downs in grid view [16:9, 3 portait]
- [ ] gelato image grid 2 col not in carousel is too tall, should hit max height
- [ ] 4 col 2 row look at height capping, del core lookbooks as example
- [x] separate the div container of the global + asset caption into one, flex the two together, then absolute the overall container to prevent caption hopping
- [x] ~What's the yellow highlight in sanity~ — it's what happens when the document is 'syncing', and in that view specifically it's if the 'ordering' hasn't properly updated (can happen sometimes)
- [ ] Sanity alt text AI plugin generator, is there one?
- [x] Remove nav from splashscreen bug
- [ ] Image cropping and not containing on Chrome + Safari iOS
- [x] Image to come from white when loading
- [ ] what viewport transitions could we do, such as fade in when coming into viewport and graceful fades back in on /work
- [x] enable swiping on mobile carousels
- [x] for portrait stacks on homepage feed just show first grid item
- [ ] fix FOUC on first visit
- [ ] fix layout shift when gallery lookup height