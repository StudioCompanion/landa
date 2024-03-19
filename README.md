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
- [ ] Can we make the space between ‘Work’ and ‘Info’ equal to the margin width?
- [ ] Could we add colons after the project titles on the homepage?
- [ ] Carousels with a mixture of single images and grids have varying image heights (e.g. Hermès Shanghai event design gallery: https://landa-web.vercel.app/work/hermes-shanghai)
- [ ] Can we have the option to have 3 hero images for the homepage, then just 1 for the 'Work' page? (e.g. currently I've comped 3 frieze covers for the project image, but ideally on the 'Work' page it would just show the first cover)
- [ ] Can we add toggles so we have the option for autoplay and looping on full videos?
- [ ] Videos in carousels keep playing when you click through to the next image. They should stop and start from the beginning when you click back to it if possible.
- [ ] Image count is currently formatted as ‘1 of 10’, could we have it as ‘1/10’.
- [ ] Video controls are different for videos in carousels, is this WIP?
- [ ] Should we be able to move modules around once content is uploaded? It doesn’t currently work when I try to drag them.
