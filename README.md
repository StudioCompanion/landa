# Lane & Associates


This is a monorepo containing the Sanity CMS details and the frontend Sveltekit app for Lane & Associates.

To run, download this repo and run 
```yarn install```

To then run in development, run:
```yarn dev```

This can be easily deployed to vercel from the monorepo as it should recognise a sveltekit app. For those not familiar with Svelte, [this page](https://kit.svelte.dev/docs/routing) is the most useful for understanding the repo.

No `.env` file is currently required as all sanity configurates are hardcoded currently (as there is no seperate production/staging environment)



#TO DO History

- [x] Bug: remove the border on the right hand side in /work
- [x] CMS Remove: Hero Theme
- [x] CMS Remove: Hero Image/Video
- [x] FE Hide: Tags
- [x] CMS Remove: Quote Module
- [x] CMS Remove: Background Color from Content Module, Carousel Module, Grid Module
- [x] Replace Alt Name for Images
- [x] Can we have the ability to use italics on the homepage captions and project titles?
- [x] Can we make the space between ‘Work’ and ‘Info’ equal to the margin width?
- [x] Could we add colons after the project titles on the homepage?
- [ ] Carousels with a mixture of single images and grids have varying image heights (e.g. Hermès Shanghai event design gallery: https://landa-web.vercel.app/work/hermes-shanghai)
- [x] Can we have the option to have 3 hero images for the homepage, then just 1 for the 'Work' page? (e.g. currently I've comped 3 frieze covers for the project image, but ideally on the 'Work' page it would just show the first cover)
- [x] Can we add toggles so we have the option for autoplay and looping on full videos?
- [x] Videos in carousels keep playing when you click through to the next image. They should stop and start from the beginning when you click back to it if possible.
- [x] Image count is currently formatted as ‘1 of 10’, could we have it as ‘1/10’.
- [x] Video controls are different for videos in carousels, is this WIP?
- [x] Should we be able to move modules around once content is uploaded? It doesn’t currently work when I try to drag them.
- [x] Nav 999 z-index
- [x] full videos within carousels so play when coming into active slide, and puase on going out
- [x] Hermes Fit bottom carousel is bugged
- [x] Video gradient background in controls
- [x] 4 col 2 row look at height capping, del core lookbooks as example
- [x] separate the div container of the global + asset caption into one, flex the two together, then absolute the overall container to prevent caption hopping
- [x] ~What's the yellow highlight in sanity~ — it's what happens when the document is 'syncing', and in that view specifically it's if the 'ordering' hasn't properly updated (can happen sometimes)
- [x] Remove nav from splashscreen bug
- [x] Image to come from white when loading
- [x] enable swiping on mobile carousels
- [x] for portrait stacks on homepage feed just show first grid item
- [x] gelato image grid 2 col not in carousel is too tall, should hit max height
- [x] Image cropping and not containing on Chrome + Safari iOS
- [x] Sanity alt text AI plugin generator, is there one?
- [x] L&A to do aspect ratios and grids
- [x] Update global type sizes
- [x] homepage flicker on hover pass 1
- [x] make all grid layouts
- [x] what viewport transitions could we do, such as fade in when coming into viewport and graceful fades back in on /work
- [x] fix FOUC on first visit
- [x] fix layout shift when gallery lookup height
- [x] final homepage flicker speed and loading logic
- [x] black lines on social cut downs in grid view [16:9, 3 portait]
- [x] inline vids in carousel check 

#New To Do Storage
- [x] Always show the second post on homepage so you know something is there (to scroll)
- [ ] When 2 images are used for image stack e.g. Gourmand Books, can we use the regular max image height/width? Currently the height is capping.
- [x] When projects use image stacks for homepage, the image is appearing small on mobile. Ideally these would be the same size as regular homepage portrait images (Image 00)
- [x] Some galleries are cropping (Image 01)
- [x] Some galleries aren’t showing at all (Image 02)
- [x] On the work page, portrait images are showing as cropped landscape (image 03)
- [ ] Some images within galleries aren’t aligned e.g. Shanghai Show gallery (image 04)
- [ ] Some films aren’t showing on mobile
- [ ] Del Core Season 2 gallery films have black bars on mobile but not desktop (image 05)
– [x] Email addresses/links in footer are appearing in a different font instead of Jjannon italic (image 06)
– [ ] Can we use a tap instead of swipe to click through galleries?
- [ ] black bars on videos and aspect ratio in safari/firefox
- [ ] Cross-browser test (Safari Desktop, Safari iOS, Chrome Desktop, Chrome iOS, Firefox)
- [ ] Performance + SEO Check
- [ ] Cleanup code (remove unused CSS, JS and comments)
- [ ] Add README file so people know how to run it in the future
