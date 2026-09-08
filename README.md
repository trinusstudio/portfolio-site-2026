# Portfolio site — deploy to Netlify

## Fastest way (no account setup beyond signing in)
1. Go to https://app.netlify.com/drop
2. Drag the whole `portfolio-site` folder onto the page
3. Netlify gives you a live URL immediately — you can add a custom domain after in Site settings

## Better long-term way (via GitHub, gets you auto-deploys on every edit)
1. Create a new GitHub repo and push this folder to it
2. In Netlify: **Add new site → Import an existing project → GitHub** → pick the repo
3. Build command: leave blank. Publish directory: `/` (root)
4. Deploy — future pushes to the repo auto-update the live site

## How to add your videos to the Work section
Each of the 5 cards in the Work section is a **project folder**. Clicking one opens a
gallery of 5 vertical (9:16) clip slots — click any clip slot to play it.

In `index.html`, scroll to the `<template id="group-1">` blocks (one per project, `group-1`
through `group-5`). Each contains 5 `.folder-slot` divs like this:

```html
<div class="folder-slot" data-embed-type="" data-embed-src="">
  <div class="folder-slot-empty">Clip 1<br>▶</div>
</div>
```

Fill in `data-embed-type` and `data-embed-src` depending on where that clip lives:

**YouTube (unlisted is fine)**
```html
data-embed-type="youtube" data-embed-src="dQw4w9WgXcQ"
```
(the ID is the part after `watch?v=` in the YouTube URL)

**Vimeo**
```html
data-embed-type="vimeo" data-embed-src="123456789"
```
(the ID is the number in the Vimeo URL)

**A video file you host yourself**
```html
data-embed-type="file" data-embed-src="videos/crossian-clip1.mp4"
```
Put the actual `.mp4` file in a `videos/` folder next to `index.html`. Export/crop these as
vertical 9:16 (e.g. 1080×1920) so they match the slot shape.

A slot with no type/src set just shows "no video set yet" when clicked — it won't break.

To rename a project, change the `data-label` and visible text on its `.work-card` button,
and the `folder-header` text inside its matching `<template>`. Leave `data-group="group-1"`
matching `id="group-1"` on the template — that's what links the card to its folder.

## Other things to swap in before going live
- Review the Process / About / FAQ copy — it's drafted from your positioning notes, not final copy
- Add a favicon and social preview image (Open Graph tags) once you have brand assets

## Uploading to GitHub — don't forget the assets folder
This version includes an `assets/` folder with your portrait photo (`marcel-portrait.jpg`),
used in the About section. When you upload files to GitHub, make sure to create that
`assets` folder in the repo too and put the image inside it — GitHub's upload box lets you
drag a whole folder in, or you can create the folder first by naming a file `assets/marcel-portrait.jpg`
during upload (GitHub will create the folder automatically).
