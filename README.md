# Golf Performance Dashboard

## mattbdennis-afk.github.io/golf-tracker

Single-file HTML dashboard tracking Matt’s golf performance. Built and maintained with Claude (Anthropic). All data, logic, and styling live in one file: `index.html`.

-----

## START HERE — For Claude

When Matt starts a new session, he will share this README and his current `index.html`. Read both before doing anything. The most important sections for you are:

1. **Data Sources & Authority** — which source wins for each stat
1. **Safari/iPad Technical Rules** — non-negotiable coding constraints
1. **How to Deliver Files** — never use copy/paste

-----

## Data Sources & Authority

This is the most important section. Every stat has one authoritative source. Never override a higher-authority source with a lower one.

### Hierarchy (highest to lowest)

|Stat                                        |Authority                |Notes                                                                                                                                                                          |
|--------------------------------------------|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|GIR %                                       |**Spreadsheet**          |Garmin JSON cannot compute true GIR — it has no GIR field and shot proximity data is unreliable. Dashboard GIR values must come from the spreadsheet or manual Log Round entry.|
|FIR %                                       |**Spreadsheet**          |Same reason — use spreadsheet values, not JSON-derived calculations.                                                                                                           |
|Green miss direction (short/long/left/right)|**Spreadsheet**          |Manually recorded, accurate.                                                                                                                                                   |
|Putts, penalties, sand saves, up/downs      |**Spreadsheet**          |Garmin scorecard has putts and penalties per hole — usable. Sand saves and up/downs are manual only.                                                                           |
|Score, date, course, tees, rating, slope    |**Garmin scorecard JSON**|Reliable. Also in spreadsheet. Either source fine.                                                                                                                             |
|Club distances (avg, median, max)           |**Garmin SHOT JSON**     |Only source. Full-swing shots, filtered by club type and distance bounds.                                                                                                      |
|Approach % by distance band                 |**Garmin SHOT JSON**     |Only source. Computed from APPROACH shot type by distance in yards.                                                                                                            |
|Strokes Gained estimates                    |**Calculated**           |Estimated from playable%, GIR%, and putts vs 9 HCP benchmarks. Not official SG.                                                                                                |

### What Garmin JSON CAN and CANNOT do

**CAN:**

- Provide score, date, course ID, tees, rating, slope, handicap per round
- Provide putts and penalties per hole (from SCORECARD)
- Provide fairway outcome per hole: HIT / LEFT / RIGHT (from SCORECARD)
- Provide shot-by-shot distance, lie, club, shot type (from SHOT)
- Compute club distances (median, avg, P90, P10) from SHOT data
- Compute FIR% from fairwayShotOutcome fields

**CANNOT:**

- Compute true GIR — no GIR field exists in the JSON. Shot endpoint “lie=Green” is GPS proximity to pin, not actual green surface. This inflates GIR by 10-20 percentage points.
- Compute per-hole par — not in the export. Cannot derive par 3/4/5 averages or score distribution without it.
- Compute sand saves or up/downs — not tracked in scorecard export.
- Compute approach % by distance bands reliably for all rounds — only available in rounds with full sensor data (mid-2025 onwards).

### The Spreadsheet

Matt maintains an Excel spreadsheet (`Glf_Stats_YYYY_MM_DD.xlsx`) with these sheets:

- **2025** — 18-hole rounds, all stats as decimals (0.33 = 33%), includes approach % by distance
- **2025 raw** — 18-hole rounds, slightly different column layout
- **2025 9 hole** — 9-hole rounds
- **2026** — current year 18-hole rounds

GIR and FIR are stored as decimals (multiply by 100 for %). The AVERAGES row is always row 0 — skip it when processing.

When Matt shares the spreadsheet, use it to update/replace GIR, FIR, green miss %, and approach % for all matching rounds. Match on date. The spreadsheet wins over any previously stored values.

-----

## ROUNDS Array — Data Format

Every round in the dashboard is a JavaScript object in the `ROUNDS` array. Key fields:

```javascript
{
  id: "YYYY-MM-DD_CourseName",    // auto-generated
  date: "YYYY-MM-DD",
  location: "Course Name",
  tees: "White",
  rating: 70.2, slope: 125, yards: 6400, par: 72,
  roundType: "18hole",            // "18hole" | "9hole" | "exec" — omit = 18hole
  score: 85, adjScore: 85, diff: 14.6, hcp: 12.0,

  // DRIVING — from spreadsheet or manual entry (percentages, not decimals)
  fir: 57.1,          // % fairways in regulation
  playable: 71.4,     // % playable (hit + manageable misses) — manual judgment
  missTeeLeft: 14.3,  // % of total fairways
  missTeeRight: 14.3,
  ob: 0.0,

  // GREENS — from spreadsheet or manual entry (percentages)
  gir: 33.3,          // % greens in regulation — SPREADSHEET IS AUTHORITY
  greenShort: 25.0,   // % of MISSED greens that were short
  greenLong: 12.5,    // % of MISSED greens that were long
  greenLeft: 25.0,    // % of MISSED greens that were left
  greenRight: 37.5,   // % of MISSED greens that were right

  // APPROACH % BY DISTANCE — from spreadsheet (% of shots from that band reaching green)
  approach: {">200":null,"175-200":50,"150-175":40,"125-150":35,
             "100-125":45,"75-100":60,"50-75":70,"<50":75},

  // PUTTING — from spreadsheet or Garmin scorecard
  putts: 34,
  onePutt: 16.7, twoPutt: 72.2, threePutt: 11.1,  // % of holes
  girsHit: 6,     // raw count of greens hit (use this for weighted avg calculation)
  girPutts: null, // putts on GIR holes only

  // SHORT GAME — manual entry only
  sandSaves: "1/2", sandSavePct: 50.0,
  upDowns: "3/6",   upDownPct: 50.0,

  penalties: 1,

  // SCORING DETAIL — manual entry or spreadsheet
  par3: 3.50, par4: 4.40, par5: 5.20,
  birdies: 0, pars: 7, bogeys: 8, doubles: 3,
  notes: ""
}
```

### Fields NOT in Garmin JSON (must come from spreadsheet or manual entry)

`yards`, `adjScore`, `diff`, `playable`, `ob`, `gir`, `greenShort`, `greenLong`, `greenLeft`, `greenRight`, `approach` (all buckets), `sandSaves`, `sandSavePct`, `upDowns`, `upDownPct`, `par3`, `par4`, `par5`, `birdies`, `pars`, `bogeys`, `doubles`, `notes`

-----

## GIR Calculation in the Dashboard

The `calcSA()` function computes season averages. GIR uses **weighted averaging** (total greens hit / total greens attempted), not a simple average of round percentages. This matches how GHIN and the spreadsheet calculate it.

```javascript
// Correct: weighted by holes played
const girWeighted = totalGreensHit / totalGreensAttempted * 100;

// Wrong (old method — inflated by 9-hole rounds):
const girWrong = average of each round's GIR%;
```

Use `girsHit` (raw count) when available. When only `gir` % is stored, back-calculate hits as `gir/100 * par` (where par approximates holes played).

-----

## Dashboard Tabs

|Tab      |Function                                                                      |
|---------|------------------------------------------------------------------------------|
|Season   |KPIs, score trend, SG estimates, benchmark vs 9 HCP, round table, par averages|
|Rounds   |Individual round detail                                                       |
|Courses  |Performance by course                                                         |
|Clubs    |Club distances, GIR%, FIR%, distance gapping — from Garmin SHOT JSON          |
|Insights |Sep 2025 deep-dive, monthly scoring, course breakdown, strengths/focus        |
|Add Data |Instructions for adding rounds and Garmin exports                             |
|Log Round|Mobile-friendly form to generate a round object after each round              |

-----

## Safari/iPad Technical Rules — NON-NEGOTIABLE

These caused days of debugging. Never violate them.

### Rule 1: No template literals with closing HTML tags before the backtick

```javascript
// BREAKS Safari — the </div>` pattern causes "Unterminated regex" error
h += `<div>content</div>`;

// SAFE — use string concatenation
h += '<div>content</div>';
```

**Any function that builds HTML strings must use `h += '...'` string concatenation only.** The existing Season, Rounds, Courses, Clubs functions use template literals safely for short inline expressions — do not rewrite those. Only new functions must use concatenation.

### Rule 2: No non-ASCII characters in JS string literals

The original code has non-ASCII in comments (em dashes, box-drawing chars) — those are fine. But never add non-ASCII inside JS string values or HTML-building code. Use HTML entities instead:

- `&mdash;` not `—`
- `&middot;` not `·`
- `&rarr;` not `→`
- `&ndash;` not `–`

### Rule 3: No copy-paste delivery

Matt is on iPad. Copying code from Claude corrupts characters (smart quotes, encoding issues). **Always deliver via the downloader page method:**

```python
import base64
with open('index_final.html', 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('ascii')

downloader = '''<!DOCTYPE html>...
<script>var d="''' + b64 + '''";
function go(){var b=atob(d),a=new Uint8Array(b.length);
for(var i=0;i<b.length;i++)a[i]=b.charCodeAt(i);
var u=URL.createObjectURL(new Blob([a],{type:"text/html"})),
l=document.createElement("a");l.href=u;l.download="index.html";
document.body.appendChild(l);l.click();}
</script>'''
```

Matt opens this page in Safari, taps “Download index.html”, then uploads from Files app to GitHub. File is never opened in a text editor.

### Rule 4: Always syntax-check before delivering

```python
import subprocess, tempfile, re
scripts = re.findall(r'<script>(.*?)</script>', content, re.DOTALL)
with tempfile.NamedTemporaryFile(mode='w', suffix='.js') as f:
    f.write(scripts[1])
result = subprocess.run(['node', '--check', f.name], capture_output=True, text=True)
assert not result.stderr, result.stderr
```

### Rule 5: Start from the current index.html, not from scratch

Always read the project file first. Make surgical changes only. Never rewrite existing working functions.

-----

## How to Add New Rounds

### After every round (Matt’s workflow)

1. Open dashboard → **Log Round** tab
1. Fill in stats (course autocompletes from recent history)
1. Tap **Generate Round Object** → **Copy**
1. Save copied text to Notes app or email to self
1. Batch these up until ready to update the dashboard

### Weekly/periodic update

**Option A — Spreadsheet only:**
Matt shares updated spreadsheet. Claude extracts new rounds, updates GIR/FIR from spreadsheet, generates new index.html.

**Option B — Garmin JSON + Spreadsheet:**
Matt exports 4 JSON files from Garmin Connect (SCORECARD, SHOT, COURSE, CLUB) plus shares spreadsheet. Claude merges new rounds from JSON, overwrites GIR/FIR/approach from spreadsheet, updates club data from SHOT data.

**Option C — Log Round objects only:**
Matt pastes accumulated round objects. Claude merges them into ROUNDS array.

### Garmin Connect Export Steps

1. Log in at connect.garmin.com
1. Golf → Activity History → select rounds → Export → JSON
1. Downloads 4 files: Golf-SCORECARD.json, Golf-SHOT.json, Golf-COURSE.json, Golf-CLUB.json
1. Share all 4 + current index.html + current spreadsheet with Claude

-----

## Handicap

Active handicap tracked April 1 – October 31 (Michigan season). Goal is 9 HCP. Displayed on Season tab. The `hcp` field in each round is the handicap index at the time of that round.

-----

## Data History

|Year|18-Hole Rounds|Notes                                                |
|----|--------------|-----------------------------------------------------|
|2020|2             |Early tracking, minimal data                         |
|2021|4             |                                                     |
|2022|4             |Ireland trip: Old Head, Tralee, Waterville, Portsalon|
|2023|4             |Streamsong trip                                      |
|2024|7             |Boyne Highlands trip                                 |
|2025|~70           |High volume, full Garmin sensor data from ~Aug 2025  |
|2026|ongoing       |                                                     |

**Primary home courses:** Rolling Meadows CC, Hudson Mills Metropark, Rush Lake Hills, Huron Meadows Metropark

**Season low:** 77 (Rush Lake Hills, Aug 22 2025)

-----

## CLUB_DATA_BY_YEAR

Club distance and performance data is stored separately from ROUNDS in `CLUB_DATA_BY_YEAR`. This is regenerated from Garmin SHOT JSON — do not edit manually. Current bag (as of 2026):

- Driver: Titleist GT2
- 3W: TaylorMade Qi35
- 5W: TaylorMade Qi35
- 4H: Callaway
- 5i–PW: Mizuno JPX 925 Hot Metal
- GW, 54°SW, 58°LW: Mizuno Pro T3
- Putter: Odyssey

Only full-swing shots (APPROACH, TEE, LAYUP types) with per-club distance filters are used. Chips, recoveries, and unknowns are excluded.

-----

## Goals

- **Handicap target:** 9 HCP
- **GIR target:** 36%
- **FIR target:** 60% (48% for playable%)
- **Putts target:** 32.5/round
- **3-putt target:** <11%
- **Up & down target:** 36%
- **Par 3 avg:** 3.20 | **Par 4 avg:** 4.10 | **Par 5 avg:** 4.80
