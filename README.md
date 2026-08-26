# Clear Creek Trail — Walking Tour

An interactive walking-tour web app for the Clear Creek Trail in Silverdale,
WA, built for Great Peninsula Conservancy in partnership with Kitsap County.
Visitors open the app on their phone, tap stops on a map, and read about the
trail's ecology, history, hydrology, and future as they walk.

Live features: an interactive Leaflet map with color-coded category markers,
a stop detail panel with photo/video slideshows, a "my location" button, a
trail weather forecast, and a live eBird bird-sightings panel for the trail's
hotspot.

This is a static site — plain HTML/CSS/JavaScript, no build step, no
server-side code, no dependencies to install. To make a change, you edit a
text file and re-upload it wherever the site is hosted.

---

## Tech stack

- **[Leaflet](https://leafletjs.com/)** — the interactive map (loaded via CDN)
- **[Open-Meteo](https://open-meteo.com/)** — weather forecast (free, no API key)
- **[eBird API](https://documenter.getpostman.com/view/664302/S1ENwy59)** — bird sighting data (requires an API key, see [Integrations](#integrations) below)
- **Google Fonts** — Red Hat Display, Red Hat Text, Protest Riot
- No frameworks, no npm, no build tools — open `index.html` in a browser and it runs

---

## File structure

```
index.html          Page structure/markup only — no tour content lives here
css/
  style.css          All visual styling
js/
  tour-data.js        ALL tour content: stops, categories, map settings
  app.js              All interactive behavior: map, panels, menu, weather, birds
assets/
  *.jpg, *.png        Photos, logos, favicon
  trail.json           GeoJSON path drawn on the map as the trail line
```

**If you're adding or editing tour content (stops, photos, videos), the only
file you need is `js/tour-data.js`.** You do not need to touch `index.html`,
`app.js`, or `style.css` for routine content updates.

---

## Running it locally

Because it's a static site, you technically can just open `index.html`
directly in a browser. However, some browsers block local file fetches (the
trail path and tour data load via `fetch`), so it's more reliable to serve it
over a local web server. From the project folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

---

## Adding a new stop

Open `js/tour-data.js`. Every stop is one `{ ... }` object inside the
`TOUR_STOPS` array near the top of the file. There's a commented template
block at the very top of the file — copy it, paste it in as a new entry
(remember the comma between entries), and fill in the fields:

```js
{
  id: 'unique-short-id',          // no spaces, must be unique across all stops
  title: 'Stop Name Shown to Visitors',
  category: 'ecology',            // must be one of: ecology, history, future, hydrology
  lat: 47.65800000,               // latitude — see "Finding coordinates" below
  lng: -122.68350000,             // longitude
  photos: [
    { src: 'assets/your-photo.jpg', caption: 'Caption shown under the photo' }
  ],
  body: `
    <p>Your written content. This is HTML, so wrap paragraphs in
    <strong>&lt;p&gt;</strong> tags. Use <strong>&lt;strong&gt;</strong> for bold text.</p>
  `,
  tip: 'Optional. Shown in a highlighted "Look & Listen" box. Leave as an empty string \'\' to hide it.'
}
```

**Required fields:** `id`, `title`, `category`, `lat`, `lng`, `body`.
**Optional:** `photos` (can be an empty array `[]`), `tip` (can be `''`).

⚠️ **Before editing:** make a backup copy of `tour-data.js` first. This is a
plain text edit with no safety net — a missing comma or quote mark can break
the entire tour. After editing, reload the site in a browser and check that
it still loads before publishing.

### Finding coordinates

Right-click the spot on Google Maps and click the coordinates that pop up at
the top of the menu — it copies `latitude, longitude` to your clipboard.
Paste those two numbers into `lat` and `lng`.

### Categories

There are exactly four, each with a fixed color used for its map marker and
menu icon:

| Category key | Label shown to visitors | Color |
|---|---|---|
| `ecology` | Ecology | Moss green |
| `history` | History | Bluff brown |
| `future` | Clear Creek Present & Future | Bay blue |
| `hydrology` | Hydrology | Teal |

A stop's `category` value must be one of those four keys exactly (lowercase,
no spaces). The side menu automatically groups stops under these headings —
you don't need to add anything elsewhere to make a new stop show up there.
To add a 5th category entirely, add an entry to the `CATEGORIES` object at
the top of `tour-data.js` (with a `label`, `color`, and `icon`) — the menu
and markers will pick it up automatically.

---

## Adding photos

1. Add the image file to the `assets/` folder. Keep filenames simple —
   lowercase, no spaces (use hyphens: `beaver-dam-2.jpg`).
2. **Resize/compress it before uploading.** This app is used outdoors on
   cell service — a phone photo straight off a camera can be 5–10MB, which is
   very slow to load on the trail. Aim for roughly 1200px wide and under
   500KB. Any free online image compressor (e.g. squoosh.app) works.
3. Add an entry to that stop's `photos` array in `tour-data.js`:
   ```js
   { src: 'assets/beaver-dam-2.jpg', caption: 'Your caption here' }
   ```
4. A stop can have multiple photos — they become a swipeable slideshow
   automatically. Order in the array = order shown.

## Adding videos

Videos use the same `photos` array, just with a `video` field instead of
`src`. Both YouTube and Vimeo links work:

```js
{ video: 'https://www.youtube.com/watch?v=XXXXXXXXXXX', caption: 'Caption here' }
```

You can mix photos and videos in the same array — the app tells them apart
automatically and shows a camera or play icon in the slideshow counter.

---

## Removing or reordering stops

To remove a stop, delete its whole `{ ... }` block from `TOUR_STOPS`
(including the trailing comma). To reorder how stops appear in the side
menu, note that the menu groups stops by category, not by their order in the
array — so reordering the array only changes map marker draw order, not menu
order.

---

## Integrations

**Weather bar** — pulls current conditions and a 5-day forecast from
Open-Meteo, a free service that requires no API key or account. Fixed to the
trail's coordinates in `app.js` (`WEATHER_LAT`/`WEATHER_LNG`). If this
breaks, it's almost certainly Open-Meteo being temporarily down — nothing to
renew or maintain.

**Bird sightings panel** — pulls from eBird, using the Clear Creek Trail
hotspot (`L733601`) and an API key embedded in `app.js`
(`EBIRD_API_KEY`). Two things worth knowing:
- The key is visible to anyone who views the page source. It's low-risk
  (read-only bird data), but if it's ever throttled or revoked by eBird, the
  Birds panel will silently show an error to visitors until it's replaced.
- If eBird ever asks you to regenerate the key, it's a one-line swap in
  `app.js`.
- If you ever want to point this at a different trail, change
  `EBIRD_HOTSPOT` to the new hotspot's eBird ID.


---

## Credits

Managed by [Great Peninsula Conservancy](https://greatpeninsula.org) in
partnership with Kitsap County. Project created by Joey Willman (GPC Community Stewardship Fellow/AmeriCorps VISTA)