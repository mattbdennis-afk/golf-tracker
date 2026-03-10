// ============================================================
//  GOLF ROUNDS DATA FILE
//  This is the ONLY file you need to edit when adding a round.
//
//  HOW TO ADD A NEW ROUND:
//  1. Copy the template at the bottom of this file
//  2. Paste it AFTER the last round (before the closing ]; )
//  3. Fill in your numbers
//  4. Save the file — the dashboard updates automatically!
// ============================================================

export const ROUNDS = [
{
// ── ROUND 1 ──────────────────────────────────────────────
id:       “2026-01-09”,
date:     “2026-01-09”,
location: “Tyrone Hills”,
tees:     “White”,
yards:    6386,
par:      72,
rating:   71.1,
slope:    132,
score:    91,
adjScore: 91,       // Same as score unless you had an ESC adjustment
diff:     null,     // Leave null for casual rounds; fill in if GHIN official
hcp:      12.7,
// — Tee Shots —
fir:          14.3, // Fairways hit %  (fairways made / 14 holes * 100)
playable:     50.0, // Playable tee shots % (fair + usable miss / 14 * 100)
missTeeLeft:  28.6, // % of tee MISSES that went left
missTeeRight: 57.1, // % of tee MISSES that went right
ob:            0.0, // OB % (OB holes / 18 * 100)
// — Greens —
gir:        27.8,   // Greens in regulation % (greens hit / 18 * 100)
greenShort: 55.6,   // % of MISSED greens that were short
greenLong:  11.1,
greenLeft:   5.6,
greenRight:  5.6,
// — Approach GIR by Distance — (use null if you had no shots from that range)
approach: {
“>200”:   0,      // % of greens hit from 200+ yards
“175-200”:null,
“150-175”:33.3,
“125-150”:25.0,
“100-125”:null,
“75-100”: 50.0,
“50-75”:  50.0,
“<50”:    null,
},
// — Putting —
putts:      36,
onePutt:     5.6,   // % of holes where you 1-putted
twoPutt:    88.9,
threePutt:   5.6,
// — Short Game —
upDowns:    “0/0”,  // “made/attempts” e.g. “3/7”
upDownPct:   0.0,   // made / attempts * 100
penalties:   0,     // total penalty strokes
// — Scoring —
par3:   3.50,       // average score on par 3s
par4:   5.20,
par5:   6.25,
birdies: 0,
pars:    5,
bogeys: 10,
doubles: 3,
notes: “Season opener. Heavy right miss (57%). Short game hurt — 55.6% of greens missed short.”,
},
{
// ── ROUND 2 ──────────────────────────────────────────────
id:       “2026-02-20”,
date:     “2026-02-20”,
location: “Tyrone Hills”,
tees:     “White”,
yards:    6386,
par:      72,
rating:   71.1,
slope:    132,
score:    90,
adjScore: 90,
diff:     null,
hcp:      12.7,
fir:          28.6,
playable:     55.6,
missTeeLeft:   7.1,
missTeeRight: 64.3,
ob:            0.0,
gir:        22.2,
greenShort: 27.8,
greenLong:  27.8,
greenLeft:   5.6,
greenRight: 16.7,
approach: {
“>200”:   0,
“175-200”:null,
“150-175”:33.3,
“125-150”:20.0,
“100-125”:25.0,
“75-100”: 0,
“50-75”:  null,
“<50”:    null,
},
putts:      36,
onePutt:    11.1,
twoPutt:    77.8,
threePutt:  11.1,
upDowns:    “1/6”,
upDownPct:  16.7,
penalties:   1,
par3:   4.25,
par4:   4.90,
par5:   6.00,
birdies: 0,
pars:    4,
bogeys: 10,
doubles: 4,
notes: “Strong right miss tendency (64%). Lowest GIR of season at 22.2%.”,
},
{
// ── ROUND 3 ──────────────────────────────────────────────
id:       “2026-02-27”,
date:     “2026-02-27”,
location: “Legacy GC”,
tees:     “White”,
yards:    6340,
par:      72,
rating:   70.0,
slope:    123,
score:    88,
adjScore: 88,
diff:     null,
hcp:      12.7,
fir:          21.4,
playable:     85.7,
missTeeLeft:  21.4,
missTeeRight: 50.0,
ob:            5.6,
gir:        27.8,
greenShort: 27.8,
greenLong:  27.8,
greenLeft:   0.0,
greenRight: 16.7,
approach: {
“>200”:   null,
“175-200”:null,
“150-175”:33.0,
“125-150”:29.0,
“100-125”:33.0,
“75-100”: 0,
“50-75”:  100,
“<50”:    100,
},
putts:      36,
onePutt:    16.7,
twoPutt:    66.7,
threePutt:  16.7,
upDowns:    “1/5”,
upDownPct:  20.0,
penalties:   1,
par3:   3.75,
par4:   5.00,
par5:   5.75,
birdies: 0,
pars:    8,
bogeys:  6,
doubles: 4,
notes: “Best par count (8). High playable tee %. 1 OB. Short game saved strokes.”,
},
{
// ── ROUND 4 ──────────────────────────────────────────────
id:       “2026-02-28”,
date:     “2026-02-28”,
location: “Tyrone Hills”,
tees:     “White”,
yards:    6386,
par:      72,
rating:   71.1,
slope:    132,
score:    87,
adjScore: 87,
diff:     null,
hcp:      12.7,
fir:          42.9,
playable:     78.6,
missTeeLeft:  35.7,
missTeeRight: 21.4,
ob:            0.0,
gir:        27.8,
greenShort: 22.2,
greenLong:  16.7,
greenLeft:  16.7,
greenRight: 16.7,
approach: {
“>200”:   null,
“175-200”:0,
“150-175”:16.7,
“125-150”:75.0,
“100-125”:20.0,
“75-100”: null,
“50-75”:  null,
“<50”:    0,
},
putts:      34,
onePutt:    22.2,
twoPutt:    66.7,
threePutt:  11.1,
upDowns:    “3/13”,
upDownPct:  23.1,
penalties:   0,
par3:   4.00,
par4:   4.50,
par5:   6.50,
birdies: 0,
pars:    6,
bogeys:  9,
doubles: 3,
notes: “Best score at time (+15). Lowest putts (34). 125-150 approach 75%. Zero penalties.”,
},
{
// ── ROUND 5 ──────────────────────────────────────────────
id:       “2026-03-04”,
date:     “2026-03-04”,
location: “TPC Scottsdale”,
tees:     “White”,
yards:    6110,
par:      71,
rating:   68.9,
slope:    123,
score:    90,
adjScore: 90,
diff:     17.5,
hcp:      12.7,
fir:          57.1,
playable:     78.6,
missTeeLeft:   7.1,
missTeeRight: 35.7,
ob:            0.0,
gir:        38.9,
greenShort: 33.3,
greenLong:  16.7,
greenLeft:   5.6,
greenRight:  5.6,
approach: {
“>200”:   0,
“175-200”:50.0,
“150-175”:33.3,
“125-150”:33.3,
“100-125”:20.0,
“75-100”: 100,
“50-75”:  100,
“<50”:    100,
},
putts:      41,
onePutt:    16.7,
twoPutt:    44.4,
threePutt:  38.9,
upDowns:    “2/9”,
upDownPct:  22.2,
penalties:   0,
par3:   4.25,
par4:   5.08,
par5:   5.67,
birdies: 1,
pars:    2,
bogeys: 10,
doubles: 5,
notes: “Best FIR (57%) & GIR (38.9%). Putting badly hurt — 41 putts, 38.9% three-putt rate.”,
},
{
// ── ROUND 6 ──────────────────────────────────────────────
id:       “2026-03-05”,
date:     “2026-03-05”,
location: “Whirlwind DC”,
tees:     “White”,
yards:    6268,
par:      72,
rating:   69.3,
slope:    122,
score:    93,
adjScore: 89,   // 4-stroke ESC adjustment
diff:     18.2,
hcp:      12.9,
fir:          57.1,
playable:     85.7,
missTeeLeft:  21.4,
missTeeRight: 21.4,
ob:            0.0,
gir:        50.0,
greenShort: 16.7,
greenLong:  22.2,
greenLeft:   0.0,
greenRight: 11.1,
approach: {
“>200”:   0,
“175-200”:null,
“150-175”:40.0,
“125-150”:33.3,
“100-125”:50.0,
“75-100”: 100,
“50-75”:  null,
“<50”:    100,
},
putts:      40,
onePutt:    11.1,
twoPutt:    55.6,
threePutt:  33.3,
upDowns:    “2/11”,
upDownPct:  18.2,
penalties:   1,
par3:   4.25,
par4:   4.80,
par5:   6.00,
birdies: 0,
pars:    9,
bogeys:  3,
doubles: 6,
notes: “Best GIR (50%). Adj 89 (4-stroke adj). High double+ count (6) despite good ball-striking.”,
},
{
// ── ROUND 7 ──────────────────────────────────────────────
id:       “2026-03-08”,
date:     “2026-03-08”,
location: “Whispering Pines”,
tees:     “White”,
yards:    5844,
par:      72,
rating:   69.9,
slope:    134,
score:    85,
adjScore: 85,
diff:     null,
hcp:      12.9,
fir:          57.1,
playable:     78.6,
missTeeLeft:  29.0,
missTeeRight: 14.0,
ob:            7.1,
gir:        39.0,
greenShort: 56.0,
greenLong:   0.0,
greenLeft:   6.0,
greenRight:  0.0,
approach: {
“>200”:   0.0,
“175-200”:33.3,
“150-175”:50.0,
“125-150”:100.0,
“100-125”:50.0,
“75-100”: 0.0,
“50-75”:  null,
“<50”:    null,
},
putts:      32,
onePutt:    22.2,
twoPutt:    77.8,
threePutt:   0.0,
upDowns:    “2/5”,
upDownPct:  40.0,
penalties:   3,
par3:   3.25,
par4:   5.45,
par5:   6.00,
birdies: 1,
pars:    8,
bogeys:  5,
doubles: 4,
notes: “Season-low 85 (until Mar 9). Best putting round (32 putts, 0 three-putts). Short game 40%.”,
},
{
// ── ROUND 8 ──────────────────────────────────────────────
id:       “2026-03-09”,
date:     “2026-03-09”,
location: “Tyrone Hills”,
tees:     “White”,
yards:    6386,
par:      72,
rating:   71.1,
slope:    132,
score:    82,
adjScore: 82,
diff:     null,
hcp:      12.9,
fir:          14.0,
playable:     71.0,
missTeeLeft:  43.0,
missTeeRight: 43.0,
ob:            0.0,
gir:        44.0,
greenShort: 22.0,
greenLong:  17.0,
greenLeft:  11.0,
greenRight:  6.0,
approach: {
“>200”:   50.0,
“175-200”:50.0,
“150-175”: 0.0,
“125-150”:50.0,
“100-125”:67.0,
“75-100”: 67.0,
“50-75”:  100.0,
“<50”:    null,
},
putts:      34,
onePutt:    11.0,
twoPutt:    89.0,
threePutt:   0.0,
upDowns:    “1/8”,
upDownPct:  12.5,
penalties:   0,
par3:   3.75,
par4:   4.50,
par5:   5.25,
birdies: 1,
pars:    7,
bogeys:  9,
doubles: 1,
notes: “NEW SEASON LOW — 82 (+10). 0 three-putts. 44% GIR exceeds 9 HCP goal. Only 1 double.”,
},

// ============================================================
//  ADD NEW ROUNDS BELOW THIS LINE
//  Copy the template below, paste it here, fill in numbers
// ============================================================

// ── NEW ROUND TEMPLATE — copy from here ─────────────────────
// {
//   id:       “YYYY-MM-DD”,      // e.g. “2026-04-15”  ← must be unique
//   date:     “YYYY-MM-DD”,
//   location: “Course Name”,
//   tees:     “White”,           // White / Blue / Gold etc.
//   yards:    0000,
//   par:      72,
//   rating:   00.0,              // e.g. 71.4  (from scorecard)
//   slope:    000,               // e.g. 132   (from scorecard)
//   score:    00,                // gross score
//   adjScore: 00,                // same as score unless ESC adjusted
//   diff:     null,              // leave null for casual; add differential for GHIN rounds
//   hcp:      00.0,              // your handicap index on the day
//   // — Tee Shots —
//   fir:          00.0,          // fairways hit / 14 * 100
//   playable:     00.0,          // (fairways + usable misses) / 14 * 100
//   missTeeLeft:  00.0,          // % of MISSES that went left
//   missTeeRight: 00.0,          // % of MISSES that went right
//   ob:            0.0,          // OB holes / 18 * 100
//   // — Greens —
//   gir:        00.0,            // greens hit / 18 * 100
//   greenShort: 00.0,            // % of MISSED greens short
//   greenLong:  00.0,
//   greenLeft:  00.0,
//   greenRight: 00.0,
//   // — Approach GIR by Distance — (null = no shots from that range this round)
//   approach: {
//     “>200”:   null,
//     “175-200”:null,
//     “150-175”:null,
//     “125-150”:null,
//     “100-125”:null,
//     “75-100”: null,
//     “50-75”:  null,
//     “<50”:    null,
//   },
//   // — Putting —
//   putts:      00,
//   onePutt:    00.0,            // % of holes 1-putted
//   twoPutt:    00.0,
//   threePutt:  00.0,
//   // — Short Game —
//   upDowns:    “0/0”,           // “made/attempts”
//   upDownPct:   0.0,            // made / attempts * 100
//   penalties:   0,              // total penalty strokes
//   // — Scoring —
//   par3:   0.00,                // avg score on par 3s
//   par4:   0.00,
//   par5:   0.00,
//   birdies: 0,
//   pars:    0,
//   bogeys:  0,
//   doubles: 0,
//   notes: “Your notes here.”,
// },
// ── end template ─────────────────────────────────────────────

];
