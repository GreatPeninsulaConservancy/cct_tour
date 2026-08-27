// ============================================================
//  CLEAR CREEK TRAIL TOUR — Trail Amenities (Points of Interest)
// ============================================================
//
//  This file holds practical trail amenities — parking/trailheads,
//  restrooms, and interpretive kiosks — as small circular pins on the
//  map. This is separate from js/tour-data.js on purpose: TOUR_STOPS
//  are narrative "read about this place" stops with photos and a full
//  write-up, while POINTS_OF_INTEREST are quick reference points that
//  just show a name (and optional short info) in a simple popup when
//  tapped. Keeping them separate keeps each file focused and makes it
//  obvious which one to edit for which kind of change.
//
//  Like tour-data.js, this is a plain JS file (not JSON) so it can
//  hold comments. Be careful with commas/quotes when editing — always
//  test in a browser after a change.
//
// ------------------------------------------------------------
//  TEMPLATE — copy this into POINTS_OF_INTEREST below to add a new
//  amenity point. Delete this comment copy before saving (reference
//  only).
//
//  {
//    name: 'Point Name Shown to Visitors',
//    type: 'trailhead',              // trailhead | restroom | kiosk (see POI_TYPES below)
//    lat: 47.65800000,               // from Google Maps (right-click a spot)
//    lng: -122.68350000,
//    info: 'Optional short note shown in the popup. Use \'\' for none.'
//  },
// ------------------------------------------------------------

// ---------- POI Types ----------
// Each type has a label (shown in the legend), a marker color, and an
// inline SVG icon. To add a new amenity type (e.g. a bike rack or a
// water fountain), add an entry here with a new key, then use that key
// as the `type` on any point below — no other code changes needed.
const POI_TYPES = {
  trailhead: {
    label: 'Parking / Trailhead',
    color: '#006596', // Bay Blue
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>`
  },
  restroom: {
    label: 'Restroom',
    color: '#5c6670', // neutral slate — deliberately distinct from the trail-stop category colors
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/></svg>`
  },
  kiosk: {
    label: 'Interpretive Kiosk',
    color: '#eaab10', // Banana Slug
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`
  }
};

// ---------- Points ----------
// Imported from points.csv (Name, Info, Icon, Lat, Lng). "Icon" from the
// CSV maps to `type` here: Trailhead → trailhead, Restroom → restroom,
// Kiosk → kiosk.
const POINTS_OF_INTEREST = [
  { name: 'Silverdale Waterfront Park', type: 'trailhead', lat: 47.64408708, lng: -122.6952508, info: 'Access to the southern terminus of the Clear Creek Trail can be found at the Silverdale Waterfront Park. Park along Washington Ave NW.' },
  { name: 'Old Mill Park', type: 'trailhead', lat: 47.65019562, lng: -122.6887169, info: 'Old Mill Park is located on Bucklin Hill Road between Silverdale Way and Tracyton Boulevard. Parking is available near the restroom.' },
  { name: 'Clear Creek Sa\'qad Interpretive Center', type: 'trailhead', lat: 47.65109096, lng: -122.6847769, info: 'Located in the red barn at Creekside Office Park. Access via Bucklin Hill Road to Levin Road. Weekend parking available in office lot; weekdays use Old Mill Park.' },
  { name: 'Ridgetop Pavillion', type: 'trailhead', lat: 47.65832717, lng: -122.6837432, info: 'The Ridgetop Pavillion is located adjacent to 9228 Ridgetop Blvd. This lot is only open on weekends.' },
  { name: 'All Star Lanes Trailhead', type: 'trailhead', lat: 47.66104342, lng: -122.6832401, info: 'Trailhead is located at the northeast corner of the bowling alley parking lot. Access multiple trail loops leading to Silverdale Way, Myhre Road, and Hospital Hill.' },
  { name: 'Silverdale Rotary Gateway Park', type: 'trailhead', lat: 47.66785189, lng: -122.6816423, info: 'Also known as the Silverdale Rotary Gateway Park, this public parking area is for the dog park, skateboard park, and north wetlands trails. Expect overflow parking on Silverdale Way during peak times.' },
  { name: 'Schold Road Trailhead', type: 'trailhead', lat: 47.67133259, lng: -122.68222, info: 'Access via Silverdale Way to Schold Place then left onto a quiet neighborhood Schold Road. Park on gravel shoulders. Turnaround available at dead end.' },
  { name: 'Trigger Ave', type: 'trailhead', lat: 47.67865006, lng: -122.6899183, info: 'Access to the northern terminus of the Clear Creek Trail can be found near Petersen Farm. Park on the road right-of-way.' },
  { name: 'Restroom', type: 'restroom', lat: 47.64388315, lng: -122.6948087, info: '' },
  { name: 'Restroom', type: 'restroom', lat: 47.65000918, lng: -122.6889214, info: '' },
  { name: 'Restroom', type: 'restroom', lat: 47.66769459, lng: -122.6820354, info: '' },
  { name: 'Red Barn Kiosk', type: 'kiosk', lat: 47.651119, lng: -122.685028, info: '' },
  { name: 'Bucklin Hill Kiosk', type: 'kiosk', lat: 47.650697, lng: -122.686961, info: '' },
  { name: 'South Ridgetop Kiosk', type: 'kiosk', lat: 47.654173, lng: -122.685742, info: '' },
  { name: 'Bowling Alley Kiosk', type: 'kiosk', lat: 47.661222, lng: -122.682689, info: '' },
  { name: 'Marsh Kiosk', type: 'kiosk', lat: 47.662134, lng: -122.682139, info: '' },
  { name: 'Schold Road Kiosk', type: 'kiosk', lat: 47.671348, lng: -122.682267, info: '' },
  { name: 'Wetlands Kiosk', type: 'kiosk', lat: 47.671502, lng: -122.685675, info: '' },
  { name: 'Boardwalk Kiosk', type: 'kiosk', lat: 47.673829, lng: -122.685235, info: '' },
  { name: 'Highway Kiosk', type: 'kiosk', lat: 47.678472, lng: -122.689379, info: '' },
  { name: 'Hospital Kiosk', type: 'kiosk', lat: 47.655727, lng: -122.672171, info: '' },
];
