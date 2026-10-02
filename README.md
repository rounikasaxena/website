# Portfolio v3 — Clear Glass Wheel

Next.js site built from the **v3 — Clear Glass Wheel** page in Figma.

## Run it

```bash
npm install
npm run dev      # → http://localhost:3000
```

## Where to put your stuff

**All text, links, photos and videos are edited in one file: `data/content.ts`.**
Any field left as `""` shows a dashed **ADD …** box on the site that names the exact field to fill.
Anything in `[square brackets]` is placeholder text.

| What | Where the file goes | What to write in `data/content.ts` |
|---|---|---|
| Project thumbnails (wheel cards) | `public/images/projects/` | `thumbnail: "/images/projects/qhacks.jpg"` |
| Project videos | YouTube, or `public/videos/` | `video: "https://www.youtube.com/embed/ID"` or `"/videos/qhacks.mp4"` |
| Process images (case study strip) | `public/images/projects/` | `process: [{ label, image: "/images/projects/qhacks-v1.jpg" }]` |
| About photos (you, violin, band…) | `public/images/about/` | `ABOUT.photos[n].image` |
| Paintings | `public/images/art/` | `PAINTINGS[n].image` + title / medium / size / year / note |
| Journal photos | `public/images/journal/` | `TRIPS[n].spreads[m].left/right.photos` (3 per page) |
| Journal trip covers | `public/images/journal/` | `TRIPS[n].cover` |
| Resume | `public/resume.pdf` | already linked |
| Link preview image | `public/og.png` (1200×630) | already linked |

Add more journal pages by adding objects to a trip's `spreads` array. Add more trips by copying a trip object.

## How it works

- **One line of pages.** The wheel holds every page in order: About me → 6 projects → Contact → 6 paintings → Journal. Each scroll gesture moves exactly one page. Momentum from a trackpad doesn't skip pages. Arrow keys and Page Up/Down also work. The order lives in `app/lib/pages.ts`.
- **Icons in the circle** (with labels) jump straight to a section.
- **Smoothness:** the timings are CSS variables at the top of `app/globals.css` (`--slow`, `--mid`, `--fast`, `--ease`), plus `FADE_OUT` and `STEP_LOCK` at the top of `app/page.tsx`. Make the numbers bigger for a calmer feel.
- **Projects:** a large preview first, then the full case study (Overview / Discovery / Design / Final). YouTube videos show a thumbnail first and only load when clicked.
- **Journal:** "Open journal" opens the flip book. Click the right page to go forward and the left page to go back.
- **Fonts:** Apple's SF Pro on Mac and iPhone, Inter on Windows and Android. SF Pro can't legally be bundled on a website.
- **Deep links:** `/#about`, `/#projects/qhacks`, `/#art/2`, `/#journal`.
- **Start page:** change `START` at the top of `app/page.tsx`.

## Before you send it to recruiters

- Replace every `[bracket]` and every ADD box.
- Check it on your phone.
- Fill in `lessons` for each project; they show up on the Final tab.
