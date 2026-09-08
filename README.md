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
Each of the 5 placeholder cards in `index.html` (search for `Project 01` etc.) looks like this:

```html
<button type="button" class="work-card" data-embed-type="" data-embed-src="" data-label="Project 01">
  <div class="work-thumb"></div>
  <div class="work-meta"><span>Project 01</span><span class="work-play">▶</span></div>
</button>
```

Fill in `data-embed-type` and `data-embed-src` depending on where the video lives:

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
data-embed-type="file" data-embed-src="videos/crossian-ad.mp4"
```
Put the actual `.mp4` file in a `videos/` folder next to `index.html`.

Also:
- Rename the card label — change `Project 01` in both `data-label` and the visible `<span>` to the real project/brand name
- Give each card a thumbnail image so it doesn't look empty before clicking: add `style="background-image:url('videos/crossian-thumb.jpg')"` to that card's `.work-thumb` div
- Clicking a card opens a pop-up player (lightbox) — clients can watch without leaving the page. Cards with no embed set yet just show a friendly placeholder message instead of breaking.

## Other things to swap in before going live
- Replace `YOUR-EMAIL-HERE` in the Contact section's `mailto:` link with your real email
- Add the actual Transformer Table case study link
- Review the Process / About / FAQ copy — it's drafted from your positioning notes, not final copy
- Add a favicon and social preview image (Open Graph tags) once you have brand assets
