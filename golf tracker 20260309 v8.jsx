import { useState, useMemo } from “react”;

// ─────────────────────────────────────────────
// GOLF PERFORMANCE DASHBOARD — v8
// Updated: 2026-03-09
// Changes from v7:
//   • Added Tyrone Hills round (2026-03-09): 82 gross, 44% GIR, 34 putts
//   • SA recalculated from 8 rounds
//   • Season-low score (82) now reflected in all views
// ─────────────────────────────────────────────

// ─────────────────────────────────────────────
// DATA — recalculated from 8 rounds through 2026-03-09
// ─────────────────────────────────────────────
const SA = {
score:88.25, adjScore:87.75,
fir:36.56, playable:72.97,
missTeeLeft:24.16, missTeeRight:38.36, ob:1.59,
gir:34.69,
greenShort:32.67, greenLong:17.41, greenLeft:6.31, greenRight:9.80,
putts:36.12, onePutt:14.57, twoPutt:70.86, threePutt:14.59,
upDownPct:19.09, penalties:0.75,
par3:3.88, par4:4.93, par5:5.93,
birdies:0.38, pars:6.12, bogeys:7.75, doubles:3.75,
dblWorsePct:20.8,
approach:{
“>200”:8.3, “175-200”:33.3, “150-175”:29.9,
“125-150”:45.7, “100-125”:37.9, “75-100”:45.3,
“50-75”:87.5, “<50”:75.0,
},
};

// ─────────────────────────────────────────────
// HCP BENCHMARKS — 9 HCP is the GOAL
// ─────────────────────────────────────────────
const HCP_BENCHMARKS = [
{ hcp:“5”,  fir:62, playable:85, gir:58, putts:30.5, threePutt:5,  dblWorse:5,  par3:3.15, par4:4.20, par5:4.85, upDown:52, gir200p:25, gir175_200:45, gir150_175:55, gir100_125:70, girU100:80 },
{ hcp:“9”,  fir:48, playable:73, gir:36, putts:32.5, threePutt:11, dblWorse:14, par3:3.50, par4:4.60, par5:5.40, upDown:33, gir200p:12, gir175_200:22, gir150_175:32, gir100_125:48, girU100:68 },
{ hcp:“10”, fir:52, playable:72, gir:40, putts:32.0, threePutt:9,  dblWorse:14, par3:3.35, par4:4.60, par5:5.45, upDown:35, gir200p:15, gir175_200:28, gir150_175:38, gir100_125:52, girU100:70 },
{ hcp:“12”, fir:47, playable:68, gir:36, putts:32.5, threePutt:11, dblWorse:18, par3:3.50, par4:4.70, par5:5.55, upDown:30, gir200p:10, gir175_200:20, gir150_175:30, gir100_125:45, girU100:65 },
{ hcp:“15”, fir:41, playable:62, gir:30, putts:33.5, threePutt:14, dblWorse:22, par3:3.65, par4:4.85, par5:5.70, upDown:25, gir200p:8,  gir175_200:15, gir150_175:24, gir100_125:38, girU100:58 },
{ hcp:“18”, fir:34, playable:55, gir:24, putts:34.8, threePutt:18, dblWorse:28, par3:3.90, par4:5.10, par5:6.00, upDown:20, gir200p:5,  gir175_200:10, gir150_175:18, gir100_125:30, girU100:50 },
{ hcp:“20”, fir:28, playable:50, gir:18, putts:35.5, threePutt:22, dblWorse:33, par3:4.10, par4:5.30, par5:6.20, upDown:16, gir200p:3,  gir175_200:8,  gir150_175:14, gir100_125:24, girU100:42 },
{ hcp:“24”, fir:22, playable:44, gir:12, putts:36.5, threePutt:27, dblWorse:40, par3:4.30, par4:5.55, par5:6.55, upDown:12, gir200p:2,  gir175_200:5,  gir150_175:10, gir100_125:18, girU100:35 },
];
const GOAL_HCP = HCP_BENCHMARKS.find(b => b.hcp === “9”);

// ─────────────────────────────────────────────
// ROUNDS — 8 rounds through 2026-03-09
// ─────────────────────────────────────────────
const ROUNDS = [
{
id:“2026-01-09”, date:“2026-01-09”, location:“Tyrone Hills”,
rating:71.1, slope:132, yards:6386, par:72,
score:91, adjScore:91, diff:null, hcp:12.7,
fir:14.3, playable:50.0, missTeeLeft:28.6, missTeeRight:57.1, ob:0.0,
gir:27.8, greenShort:55.6, greenLong:11.1, greenLeft:5.6, greenRight:5.6,
approach:{”>200”:0,“175-200”:null,“150-175”:33.3,“125-150”:25.0,“100-125”:null,“75-100”:50.0,“50-75”:50.0,”<50”:null},
putts:36, onePutt:5.6, twoPutt:88.9, threePutt:5.6,
upDowns:“0/0”, upDownPct:0.0, penalties:0,
par3:3.50, par4:5.20, par5:6.25,
birdies:0, pars:5, bogeys:10, doubles:3,
notes:“Season opener. Heavy right miss (57%). Short game hurt — 55.6% of greens missed short.”,
},
{
id:“2026-02-20”, date:“2026-02-20”, location:“Tyrone Hills”,
rating:71.1, slope:132, yards:6386, par:72,
score:90, adjScore:90, diff:null, hcp:12.7,
fir:28.6, playable:55.6, missTeeLeft:7.1, missTeeRight:64.3, ob:0.0,
gir:22.2, greenShort:27.8, greenLong:27.8, greenLeft:5.6, greenRight:16.7,
approach:{”>200”:0,“175-200”:null,“150-175”:33.3,“125-150”:20.0,“100-125”:25.0,“75-100”:0,“50-75”:null,”<50”:null},
putts:36, onePutt:11.1, twoPutt:77.8, threePutt:11.1,
upDowns:“1/6”, upDownPct:16.7, penalties:1,
par3:4.25, par4:4.90, par5:6.00,
birdies:0, pars:4, bogeys:10, doubles:4,
notes:“Strong right miss tendency (64%). Lowest GIR of season at 22.2%.”,
},
{
id:“2026-02-27”, date:“2026-02-27”, location:“Legacy GC”,
rating:70.0, slope:123, yards:6340, par:72,
score:88, adjScore:88, diff:null, hcp:12.7,
fir:21.4, playable:85.7, missTeeLeft:21.4, missTeeRight:50.0, ob:5.6,
gir:27.8, greenShort:27.8, greenLong:27.8, greenLeft:0.0, greenRight:16.7,
approach:{”>200”:null,“175-200”:null,“150-175”:33.0,“125-150”:29.0,“100-125”:33.0,“75-100”:0,“50-75”:100,”<50”:100},
putts:36, onePutt:16.7, twoPutt:66.7, threePutt:16.7,
upDowns:“1/5”, upDownPct:20.0, penalties:1,
par3:3.75, par4:5.00, par5:5.75,
birdies:0, pars:8, bogeys:6, doubles:4,
notes:“Best par count (8). High playable tee %. 1 OB. Short game saved strokes.”,
},
{
id:“2026-02-28”, date:“2026-02-28”, location:“Tyrone Hills”,
rating:71.1, slope:132, yards:6386, par:72,
score:87, adjScore:87, diff:null, hcp:12.7,
fir:42.9, playable:78.6, missTeeLeft:35.7, missTeeRight:21.4, ob:0.0,
gir:27.8, greenShort:22.2, greenLong:16.7, greenLeft:16.7, greenRight:16.7,
approach:{”>200”:null,“175-200”:0,“150-175”:16.7,“125-150”:75.0,“100-125”:20.0,“75-100”:null,“50-75”:null,”<50”:0},
putts:34, onePutt:22.2, twoPutt:66.7, threePutt:11.1,
upDowns:“3/13”, upDownPct:23.1, penalties:0,
par3:4.00, par4:4.50, par5:6.50,
birdies:0, pars:6, bogeys:9, doubles:3,
notes:“Best score at time (+15). Lowest putts (34). 125-150 approach 75%. Zero penalties.”,
},
{
id:“2026-03-04”, date:“2026-03-04”, location:“TPC Scottsdale”,
rating:68.9, slope:123, yards:6110, par:71,
score:90, adjScore:90, diff:17.5, hcp:12.7,
fir:57.1, playable:78.6, missTeeLeft:7.1, missTeeRight:35.7, ob:0.0,
gir:38.9, greenShort:33.3, greenLong:16.7, greenLeft:5.6, greenRight:5.6,
approach:{”>200”:0,“175-200”:50.0,“150-175”:33.3,“125-150”:33.3,“100-125”:20.0,“75-100”:100,“50-75”:100,”<50”:100},
putts:41, onePutt:16.7, twoPutt:44.4, threePutt:38.9,
upDowns:“2/9”, upDownPct:22.2, penalties:0,
par3:4.25, par4:5.08, par5:5.67,
birdies:1, pars:2, bogeys:10, doubles:5,
notes:“Best FIR (57%) & GIR (38.9%). Putting badly hurt — 41 putts, 38.9% three-putt rate.”,
},
{
id:“2026-03-05”, date:“2026-03-05”, location:“Whirlwind DC”,
rating:69.3, slope:122, yards:6268, par:72,
score:93, adjScore:89, diff:18.2, hcp:12.9,
fir:57.1, playable:85.7, missTeeLeft:21.4, missTeeRight:21.4, ob:0.0,
gir:50.0, greenShort:16.7, greenLong:22.2, greenLeft:0.0, greenRight:11.1,
approach:{”>200”:0,“175-200”:null,“150-175”:40.0,“125-150”:33.3,“100-125”:50.0,“75-100”:100,“50-75”:null,”<50”:100},
putts:40, onePutt:11.1, twoPutt:55.6, threePutt:33.3,
upDowns:“2/11”, upDownPct:18.2, penalties:1,
par3:4.25, par4:4.80, par5:6.00,
birdies:0, pars:9, bogeys:3, doubles:6,
notes:“Best GIR (50%). Adj 89 (4-stroke adj). High double+ count (6) despite good ball-striking.”,
},
{
id:“2026-03-08”, date:“2026-03-08”, location:“Whispering Pines”,
rating:69.9, slope:134, yards:5844, par:72,
score:85, adjScore:85, diff:null, hcp:12.9,
fir:57.1, playable:78.6, missTeeLeft:29.0, missTeeRight:14.0, ob:7.1,
gir:39.0, greenShort:56.0, greenLong:0.0, greenLeft:6.0, greenRight:0.0,
approach:{”>200”:0.0,“175-200”:33.3,“150-175”:50.0,“125-150”:100.0,“100-125”:50.0,“75-100”:0.0,“50-75”:null,”<50”:null},
putts:32, onePutt:22.2, twoPutt:77.8, threePutt:0.0,
upDowns:“2/5”, upDownPct:40.0, penalties:3,
par3:3.25, par4:5.45, par5:6.00,
birdies:1, pars:8, bogeys:5, doubles:4,
notes:“Season-low 85 (until today). Best putting round (32 putts, 0 three-putts). GIR 39% at 9 HCP goal. Short game 40% up & down.”,
},
{
id:“2026-03-09”, date:“2026-03-09”, location:“Tyrone Hills”,
rating:71.1, slope:132, yards:6386, par:72,
score:82, adjScore:82, diff:null, hcp:12.9,
fir:14.0, playable:71.0, missTeeLeft:43.0, missTeeRight:43.0, ob:0.0,
gir:44.0, greenShort:22.0, greenLong:17.0, greenLeft:11.0, greenRight:6.0,
approach:{”>200”:50.0,“175-200”:50.0,“150-175”:0.0,“125-150”:50.0,“100-125”:67.0,“75-100”:67.0,“50-75”:100.0,”<50”:null},
putts:34, onePutt:11.0, twoPutt:89.0, threePutt:0.0,
upDowns:“1/8”, upDownPct:12.5, penalties:0,
par3:3.75, par4:4.50, par5:5.25,
birdies:1, pars:7, bogeys:9, doubles:1,
notes:“NEW SEASON LOW — 82 (+10). 0 three-putts. 44% GIR exceeds 9 HCP goal. Best doubles count (1). Strong 200+ approach.”,
},
];

const BUCKETS = [”>200”,“175-200”,“150-175”,“125-150”,“100-125”,“75-100”,“50-75”,”<50”];

// ─────────────────────────────────────────────
// STROKES GAINED ESTIMATES vs 9 HCP GOAL baseline
// ─────────────────────────────────────────────
const SG_BASELINE = {
playablePct: 0.73,
girPct: 0.36,
putts: 32.5,
scoreVsPar: 9.0,
};

function calcSG(r) {
const sgOTT  = ((r.playable/100) - SG_BASELINE.playablePct) * 14 * 0.38;
const sgApp  = ((r.gir/100) - SG_BASELINE.girPct) * 18 * 0.52;
const sgPutt = (SG_BASELINE.putts - r.putts) * 0.48;
const sgATG  = -((r.score - r.par) - SG_BASELINE.scoreVsPar + sgOTT + sgApp + sgPutt);
return {
ott:  +sgOTT.toFixed(2),
app:  +sgApp.toFixed(2),
putt: +sgPutt.toFixed(2),
atg:  +Math.max(-5, Math.min(5, sgATG)).toFixed(2),
total:+(sgOTT + sgApp + sgPutt + Math.max(-5,Math.min(5,sgATG))).toFixed(2),
};
}

function calcSeasonSG() {
const all = ROUNDS.map(calcSG);
const avg = k => +(all.reduce((s,g)=>s+g[k],0)/all.length).toFixed(2);
return { ott:avg(“ott”), app:avg(“app”), putt:avg(“putt”), atg:avg(“atg”), total:avg(“total”) };
}

// ─────────────────────────────────────────────
// DESIGN — Premium Augusta-era scorecard aesthetic
// ─────────────────────────────────────────────
const C = {
bg:”#f5f0e8”, surface:”#ffffff”, surface2:”#faf7f2”,
border:”#ddd5c4”, border2:”#c8bfa8”,
ink:”#1a1a14”, inkSoft:”#4a4640”, dim:”#8a8070”,
green:”#1d4a2a”, greenLight:”#2d6b3e”, greenPale:”#e8f0ea”,
gold:”#b8860b”, goldLight:”#d4a017”, goldPale:”#fdf4dc”,
red:”#8b1a1a”, redPale:”#fdeaea”,
blue:”#1a3a5c”, bluePale:”#e8eef5”,
pos:”#1d4a2a”, neg:”#8b1a1a”, neu:”#1a3a5c”, warn:”#b8860b”,
birdie:”#1a3a5c”, par:”#1d4a2a”, bogey:”#b8860b”, double:”#8b1a1a”, worse:”#5a0a0a”,
};

function goalColor(value, goal, lowerBetter=false, tightPct=0.12) {
if (value == null || goal == null) return C.dim;
const gap = lowerBetter ? value - goal : goal - value;
const threshold = Math.abs(goal) * tightPct || 0.5;
if (gap <= 0) return C.pos;
if (gap <= threshold) return C.warn;
return C.neg;
}

const APPROACH_GOALS = {
“>200”:   GOAL_HCP.gir200p,
“175-200”:GOAL_HCP.gir175_200,
“150-175”:GOAL_HCP.gir150_175,
“125-150”:GOAL_HCP.gir100_125,
“100-125”:GOAL_HCP.gir100_125,
“75-100”: GOAL_HCP.girU100,
“50-75”:  GOAL_HCP.girU100,
“<50”:    GOAL_HCP.girU100,
};

const Card = ({children,style={}}) => (

  <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:16,boxShadow:"0 1px 4px rgba(0,0,0,0.06)",...style}}>
    {children}
  </div>
);

const SectionLabel = ({children,accent}) => (

  <div style={{fontSize:9,fontWeight:800,letterSpacing:"0.16em",textTransform:"uppercase",fontFamily:"'Georgia',serif",color:accent||C.green,marginBottom:10,paddingBottom:6,borderBottom:`2px solid ${accent||C.green}`}}>{children}</div>
);

const Stat = ({label,value,sub,color,size=22,style={}}) => (

  <div style={{...style}}>
    <div style={{fontSize:8,color:C.dim,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:2,fontFamily:"Georgia,serif"}}>{label}</div>
    <div style={{fontSize:size,fontWeight:700,color:color||C.ink,fontFamily:"Georgia,serif",lineHeight:1.1,letterSpacing:"-0.02em"}}>{value}</div>
    {sub && <div style={{fontSize:10,color:C.dim,marginTop:1}}>{sub}</div>}
  </div>
);

const KpiBox = ({label,value,sub,color,border,style={}}) => (

  <div style={{background:C.surface2,border:`1.5px solid ${border||C.border}`,borderRadius:8,padding:"11px 13px",flex:"1 1 90px",minWidth:82,borderTop:`3px solid ${color||C.green}`,...style}}>
    <div style={{fontSize:8,color:C.dim,letterSpacing:"0.11em",textTransform:"uppercase",marginBottom:3,fontFamily:"Georgia,serif"}}>{label}</div>
    <div style={{fontSize:21,fontWeight:700,color:color||C.ink,fontFamily:"Georgia,serif",letterSpacing:"-0.02em",lineHeight:1.1}}>{value}</div>
    {sub && <div style={{fontSize:9,color:C.dim,marginTop:2}}>{sub}</div>}
  </div>
);

const TabBtn = ({active,onClick,children}) => (
<button onClick={onClick} style={{padding:“6px 13px”,borderRadius:4,cursor:“pointer”,fontSize:11,fontWeight:active?700:500,background:active?C.green:“transparent”,color:active?”#fff”:C.inkSoft,border:`1px solid ${active?C.green:C.border2}`,fontFamily:“Georgia,serif”,letterSpacing:“0.03em”}}>{children}</button>
);

const TabRow = ({tabs,active,onChange}) => (

  <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:14,paddingBottom:12,borderBottom:`1px solid ${C.border}`}}>
    {tabs.map(([k,l]) => <TabBtn key={k} active={active===k} onClick={()=>onChange(k)}>{l}</TabBtn>)}
  </div>
);

const FillBar = ({pct,color,h=7,max=100,bg}) => (

  <div style={{height:h,background:bg||"#ece8e0",borderRadius:4,overflow:"hidden"}}>
    <div style={{width:`${Math.min(100,(pct/max)*100)}%`,height:"100%",background:color||C.green,borderRadius:4}}/>
  </div>
);

const StatRow = ({label,val,pct,color,note}) => (

  <div style={{marginBottom:10}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3,alignItems:"baseline"}}>
      <span style={{fontSize:11,color:C.inkSoft}}>{label}</span>
      <span style={{fontSize:12,fontWeight:700,color:color||C.ink}}>{val ?? `${pct}%`}{note&&<span style={{fontSize:9,color:C.dim,marginLeft:4}}>{note}</span>}</span>
    </div>
    {pct!==undefined && <FillBar pct={pct} color={color||C.green}/>}
  </div>
);

function ApproachChart({approach, compact}) {
const active = BUCKETS.filter(k => approach[k] != null);
if (!active.length) return <div style={{color:C.dim,fontSize:11}}>No data</div>;
return (
<div>
<div style={{display:“flex”,gap:compact?4:6,alignItems:“flex-end”,overflowX:“auto”,paddingBottom:2}}>
{active.map(key => {
const pct = approach[key];
const goal = APPROACH_GOALS[key];
const col = goalColor(pct, goal, false, 0.15);
const h = Math.max(6,(pct/100)*(compact?44:56));
const goalH= Math.max(6,(goal/100)*(compact?44:56));
return (
<div key={key} style={{flex:“1 0 44px”,minWidth:compact?38:52,textAlign:“center”,position:“relative”}}>
<div style={{fontSize:compact?9:10,fontWeight:700,color:col,marginBottom:2}}>{pct}%</div>
<div style={{position:“relative”,width:“100%”,height:compact?44:56,display:“flex”,alignItems:“flex-end”}}>
<div style={{width:“100%”,height:h,background:col,opacity:0.8,borderRadius:“3px 3px 0 0”}}/>
<div style={{position:“absolute”,left:0,right:0,bottom:goalH,height:2,background:C.gold,opacity:0.9,borderRadius:1}}/>
</div>
<div style={{fontSize:8,color:C.dim,lineHeight:1.2,marginTop:2}}>{key}</div>
<div style={{fontSize:7,color:C.gold,lineHeight:1}}>goal {goal}%</div>
</div>
);
})}
</div>
<div style={{display:“flex”,gap:12,marginTop:8,flexWrap:“wrap”}}>
{[[C.pos,“At/above goal”],[C.warn,“Within 15%”],[C.neg,“Needs work”],[C.gold,”— Goal line”]].map(([c,l])=>(
<div key={l} style={{display:“flex”,alignItems:“center”,gap:4,fontSize:9,color:C.dim}}>
<div style={{width:10,height:10,borderRadius:2,background:c,opacity:0.85}}/>
{l}
</div>
))}
</div>
</div>
);
}

function Sparkline({values, lowerBetter, format, label}) {
const clean = values.filter(v=>v!=null);
if (clean.length < 2) return null;
const mn=Math.min(…clean), mx=Math.max(…clean), rng=mx-mn||1;
return (
<div style={{marginBottom:8}}>
<div style={{fontSize:8,color:C.dim,letterSpacing:“0.1em”,textTransform:“uppercase”,marginBottom:4,fontFamily:“Georgia,serif”}}>{label}</div>
<div style={{display:“flex”,gap:3,alignItems:“flex-end”,height:38}}>
{values.map((v,i)=>{
if(v==null)return <div key={i} style={{flex:1}}/>;
const norm=(v-mn)/rng;
const h=lowerBetter?Math.max(3,(1-norm)*30):Math.max(3,norm*30);
const prev=i>0?values[i-1]:null;
const better=prev!=null&&(lowerBetter?v<prev:v>prev);
const worse=prev!=null&&(lowerBetter?v>prev:v<prev);
return (
<div key={i} style={{flex:1,display:“flex”,flexDirection:“column”,alignItems:“center”,gap:1}}>
<div style={{fontSize:8,fontWeight:700,color:better?C.pos:worse?C.neg:C.dim}}>{format(v)}</div>
<div style={{width:“80%”,maxWidth:20,height:h,borderRadius:“2px 2px 0 0”,background:better?C.pos:worse?C.neg:”#c8bfa8”}}/>
</div>
);
})}
</div>
</div>
);
}

function SGCard({sg, title=“Strokes Gained Estimates”}) {
const areas = [
{key:“ott”, label:“Off the Tee”, desc:`vs ${(SG_BASELINE.playablePct*100).toFixed(0)}% playable baseline`},
{key:“app”, label:“Approach”,    desc:`vs ${(SG_BASELINE.girPct*100).toFixed(0)}% GIR baseline`},
{key:“putt”,label:“Putting”,     desc:`vs ${SG_BASELINE.putts} putts baseline`},
{key:“atg”, label:“Around Green”,desc:“Residual short game”},
];
return (
<Card>
<SectionLabel accent={C.blue}>{title}</SectionLabel>
<div style={{display:“grid”,gridTemplateColumns:“repeat(auto-fit,minmax(160px,1fr))”,gap:8,marginBottom:12}}>
{areas.map(a => {
const v = sg[a.key];
const pos = v >= 0;
return (
<div key={a.key} style={{padding:“10px 12px”,borderRadius:6,background:pos?C.greenPale:C.redPale,border:`1px solid ${pos?C.green:C.red}33`}}>
<div style={{fontSize:8,color:C.dim,letterSpacing:“0.1em”,textTransform:“uppercase”,marginBottom:4,fontFamily:“Georgia,serif”}}>{a.label}</div>
<div style={{fontSize:24,fontWeight:700,fontFamily:“Georgia,serif”,color:pos?C.pos:C.neg,lineHeight:1}}>{v>0?”+”:””}{v}</div>
<div style={{fontSize:9,color:C.dim,marginTop:3}}>{a.desc}</div>
</div>
);
})}
</div>
<div style={{display:“flex”,justifyContent:“space-between”,alignItems:“center”,padding:“8px 12px”,background:C.greenPale,borderRadius:6,border:`1px solid ${C.green}33`}}>
<span style={{fontSize:11,fontWeight:700,color:C.green,fontFamily:“Georgia,serif”}}>Total Estimated SG</span>
<span style={{fontSize:20,fontWeight:700,fontFamily:“Georgia,serif”,color:sg.total>=0?C.pos:C.neg}}>{sg.total>0?”+”:””}{sg.total}</span>
</div>
<div style={{fontSize:9,color:C.dim,marginTop:8,lineHeight:1.5}}>
Estimated strokes vs <strong>9 HCP goal</strong> ({(SG_BASELINE.playablePct*100).toFixed(0)}% playable, {(SG_BASELINE.girPct*100).toFixed(0)}% GIR, {SG_BASELINE.putts} putts baseline).
</div>
</Card>
);
}

function HcpBenchmarkTable({roundData}) {
const avgBucket = (key) => {
const vals = ROUNDS.map(r => r.approach[key]).filter(v => v != null);
return vals.length ? +(vals.reduce((a,b)=>a+b,0)/vals.length).toFixed(1) : null;
};
let you, title, subtitle;
if (roundData) {
const rBucketAvg = (key) => roundData.approach[key] != null ? roundData.approach[key] : null;
const girU100r = (() => { const v75=rBucketAvg(“75-100”), v50=rBucketAvg(”<50”); return v75!=null&&v50!=null?(v75+v50)/2:v75??v50; })();
you = {
fir: roundData.fir, playable: roundData.playable,
gir: roundData.gir, putts: roundData.putts,
threePutt: roundData.threePutt,
dblWorse: +(roundData.doubles/18*100).toFixed(1),
upDown: roundData.upDownPct,
par3: roundData.par3, par4: roundData.par4, par5: roundData.par5,
gir200p: rBucketAvg(”>200”), gir175_200:rBucketAvg(“175-200”),
gir150_175:rBucketAvg(“150-175”), gir100_125:rBucketAvg(“100-125”),
girU100: girU100r,
};
title = “This Round vs 9 HCP Goal”;
subtitle = “How this round compares to what a 9 handicap typically posts.”;
} else {
const saGirU100 = avgBucket(“75-100”) != null ? ((avgBucket(“75-100”) + (avgBucket(”<50”)??avgBucket(“75-100”))) / 2) : null;
const saRoundAvgDblWorse = ROUNDS.length ? +(ROUNDS.map(r => r.doubles/18*100).reduce((a,b)=>a+b,0)/ROUNDS.length).toFixed(1) : 0;
you = {
fir: SA.fir, playable: SA.playable, gir: SA.gir, putts: SA.putts,
threePutt: SA.threePutt, dblWorse: saRoundAvgDblWorse,
upDown: SA.upDownPct, par3: SA.par3, par4: SA.par4, par5: SA.par5,
gir200p: +avgBucket(”>200”), gir175_200:+avgBucket(“175-200”),
gir150_175:+avgBucket(“150-175”), gir100_125:+avgBucket(“100-125”),
girU100: saGirU100 != null ? +saGirU100 : null,
};
title = “Stats vs 9 HCP Goal Benchmark”;
subtitle = “Gap between your season averages and what a 9 handicap player typically posts.”;
}
const match = GOAL_HCP;
const sections = [
{ label:“SCORING”, rows:[
{label:“Double Bogey+ %”, player:you.dblWorse, bench:match.dblWorse, unit:”%”, lowerBetter:true},
{label:“Par 3 Avg”, player:you.par3, bench:match.par3, unit:””, lowerBetter:true},
{label:“Par 4 Avg”, player:you.par4, bench:match.par4, unit:””, lowerBetter:true},
{label:“Par 5 Avg”, player:you.par5, bench:match.par5, unit:””, lowerBetter:true},
]},
{ label:“DRIVING”, rows:[
{label:“FIR %”, player:you.fir, bench:match.fir, unit:”%”, lowerBetter:false},
{label:“Driving Playability %”, player:you.playable, bench:match.playable, unit:”%”, lowerBetter:false},
]},
{ label:“APPROACH”, rows:[
{label:“GIR % Overall”, player:you.gir, bench:match.gir, unit:”%”, lowerBetter:false},
…(you.gir200p != null ? [{label:“GIR — 200+ yds”,   player:+you.gir200p,    bench:match.gir200p,    unit:”%”, lowerBetter:false}] : []),
…(you.gir175_200!= null ? [{label:“GIR — 175–200 yds”,player:+you.gir175_200,bench:match.gir175_200,unit:”%”, lowerBetter:false}] : []),
…(you.gir150_175!= null ? [{label:“GIR — 150–175 yds”,player:+you.gir150_175,bench:match.gir150_175,unit:”%”, lowerBetter:false}] : []),
…(you.gir100_125!= null ? [{label:“GIR — 100–125 yds”,player:+you.gir100_125,bench:match.gir100_125,unit:”%”, lowerBetter:false}] : []),
…(you.girU100 != null ? [{label:“GIR — Inside 100”, player:+you.girU100,    bench:match.girU100,    unit:”%”, lowerBetter:false}] : []),
]},
{ label:“SHORT GAME”, rows:[
{label:“Up & Down %”, player:you.upDown, bench:match.upDown, unit:”%”, lowerBetter:false},
]},
{ label:“PUTTING”, rows:[
{label:“Putts/Round”, player:you.putts,     bench:match.putts,     unit:””, lowerBetter:true},
{label:“3-Putt %”,   player:you.threePutt,  bench:match.threePutt, unit:”%”, lowerBetter:true},
]},
];
return (
<Card>
<SectionLabel accent={C.gold}>{title}</SectionLabel>
<div style={{marginBottom:10,fontSize:11,color:C.inkSoft,lineHeight:1.5}}>
{subtitle} Negative gap = improvement needed. <strong style={{color:C.gold}}>9 HCP</strong> is the goal.
</div>
<table style={{width:“100%”,borderCollapse:“collapse”,fontSize:11}}>
<thead>
<tr style={{borderBottom:`2px solid ${C.border}`}}>
<th style={{textAlign:“left”,padding:“4px 6px”,fontSize:8,letterSpacing:“0.1em”,textTransform:“uppercase”,color:C.dim,fontFamily:“Georgia,serif”}}>Stat</th>
<th style={{textAlign:“center”,padding:“4px 6px”,fontSize:8,letterSpacing:“0.1em”,textTransform:“uppercase”,color:C.dim,fontFamily:“Georgia,serif”}}>You</th>
<th style={{textAlign:“center”,padding:“4px 6px”,fontSize:8,letterSpacing:“0.1em”,textTransform:“uppercase”,color:C.dim,fontFamily:“Georgia,serif”}}>9 HCP</th>
<th style={{textAlign:“center”,padding:“4px 6px”,fontSize:8,letterSpacing:“0.1em”,textTransform:“uppercase”,color:C.dim,fontFamily:“Georgia,serif”}}>Gap</th>
</tr>
</thead>
<tbody>
{sections.map(({label,rows}) => (
<>
<tr key={`div-${label}`}>
<td colSpan={4} style={{padding:“8px 6px 3px”,fontSize:8,fontWeight:800,letterSpacing:“0.14em”,textTransform:“uppercase”,color:C.green,fontFamily:“Georgia,serif”}}>{label}</td>
</tr>
{rows.map(({label:rl,player,bench,unit,lowerBetter}) => {
if (player == null) return null;
const diff = lowerBetter ? bench - player : player - bench;
const better = diff >= 0;
const close = !better && Math.abs(diff) <= Math.abs(bench) * 0.12;
const gapStr = diff === 0 ? “—” : `${diff>0?"+":""}${Math.abs(diff).toFixed(1)}${unit}`;
const gapColor = better ? C.pos : close ? C.warn : C.neg;
const gapBg   = better ? C.greenPale : close ? C.goldPale : C.redPale;
return (
<tr key={rl} style={{borderBottom:`1px solid ${C.border}`}}>
<td style={{padding:“6px 6px 6px 14px”,color:C.inkSoft}}>{rl}</td>
<td style={{padding:“6px”,textAlign:“center”,fontWeight:700,color:C.ink,fontFamily:“Georgia,serif”}}>{typeof player===“number”?player.toFixed(1)+unit:player}</td>
<td style={{padding:“6px”,textAlign:“center”,color:C.dim}}>{bench.toFixed(1)}{unit}</td>
<td style={{padding:“6px”,textAlign:“center”}}>
<span style={{fontWeight:700,fontSize:11,color:gapColor,background:gapBg,padding:“2px 7px”,borderRadius:4,border:`1px solid ${gapColor}33`}}>{gapStr}</span>
</td>
</tr>
);
})}
</>
))}
</tbody>
</table>
</Card>
);
}

function coachNotes(r) {
const notes = [];
if (r.overPar <= 10) notes.push({type:“pos”,area:“Scoring”,msg:`+${r.overPar} — NEW SEASON LOW. Exceptional scoring. Track what clicked.`});
else if (r.overPar <= 14) notes.push({type:“pos”,area:“Scoring”,msg:`+${r.overPar} — season low. Goal-pace scoring. Build on this.`});
else if (r.overPar >= 20) notes.push({type:“neg”,area:“Scoring”,msg:`+${r.overPar} is above range. Focus on bogey avoidance and damage control.`});
else notes.push({type:“neu”,area:“Scoring”,msg:`+${r.overPar} — within your typical range. Incremental improvement possible.`});
if (r.playable >= 80) notes.push({type:“pos”,area:“Off the Tee”,msg:`${r.playable}% playable — excellent tee management this round.`});
else if (r.playable < 57) notes.push({type:“neg”,area:“Off the Tee”,msg:`Only ${r.playable}% playable is costing 1-2 strokes per round.`});
if (r.gir >= 42) notes.push({type:“pos”,area:“Ball Striking”,msg:`${r.gir}% GIR exceeds the 9 HCP target. This is the level to sustain.`});
else if (r.gir < 25) notes.push({type:“neg”,area:“Ball Striking”,msg:`${r.gir}% GIR is very low. Distance control on approach is the priority.`});
if (r.threePutt >= 30) notes.push({type:“neg”,area:“Putting”,msg:`${r.threePutt}% three-putt rate is costing 2+ strokes alone. Lag putting focus needed.`});
else if (r.threePutt === 0) notes.push({type:“pos”,area:“Putting”,msg:`0% three-putts — exceptional lag putting. No strokes lost on the green.`});
else if (r.putts <= 32) notes.push({type:“pos”,area:“Putting”,msg:`${r.putts} putts — most efficient putting round. Excellent green reading.`});
if (r.greenShort >= 50) notes.push({type:“neg”,area:“Approach”,msg:`${r.greenShort}% of missed greens are short — take one more club consistently.`});
if (r.ob > 0) notes.push({type:“neg”,area:“Penalty”,msg:`OB on ${r.ob}% of holes. Tee course management cost real strokes.`});
if (r.upDownPct >= 36) notes.push({type:“pos”,area:“Short Game”,msg:`${r.upDownPct}% up & down conversion is at/near 9 HCP standard.`});
if (r.doubles <= 1) notes.push({type:“pos”,area:“Damage Control”,msg:`Only ${r.doubles} double bogey — best damage control of the season.`});
return notes;
}

function seasonCoachNotes() {
const sg = calcSeasonSG();
return [
{type:“pos”, area:“NEW SEASON LOW”, msg:`82 at Tyrone Hills (Mar 9) — a new benchmark. +10 with 44% GIR, 0 three-putts, only 1 double.`},
{type:“neu”, area:“HCP Profile”,    msg:`Goal is 9 HCP. Current running HCP is 12.7–12.9. The benchmark table shows exact gaps per category.`},
{type:SA.greenShort>=28?“neg”:“neu”,area:”#1 Priority”,msg:`${SA.greenShort}% of missed greens are short all season — club selection is the single biggest scoring lever.`},
{type:SA.threePutt>=15?“neg”:“neu”, area:”#2 Priority”,msg:`${SA.threePutt.toFixed(1)}% three-putt rate (avg ${SA.putts.toFixed(1)} putts/round) vs 11% goal. Lag putting practice returns 1-2 strokes/round.`},
{type:“pos”, area:“Strength”,       msg:`Tee management has improved. Playable % has averaged 74% over last 3 rounds vs 52% in first two rounds.`},
{type:sg.app<0?“neg”:“pos”,area:“Ball Striking”,msg:`Approach SG est: ${sg.app>0?"+":""}${sg.app}. GIR avg (${SA.gir.toFixed(1)}%) is close to 36% goal — trending up.`},
{type:“focus”,area:“SG Summary”,    msg:`Best area: Off the Tee (${sg.ott>0?"+":""}${sg.ott}). Biggest opportunity: Putting (${sg.putt>0?"+":""}${sg.putt} SG).`},
];
}

function DataAnalysis({items}) {
const icon  = {pos:“▲”,neg:“▼”,neu:“→”,focus:“★”};
const colors= {pos:C.pos,neg:C.neg,neu:C.neu,focus:C.gold};
return (
<div style={{background:“linear-gradient(135deg,#f0ede4,#e8e0d0)”,border:`1px solid ${C.border2}`,borderRadius:8,padding:16}}>
<div style={{fontSize:9,color:C.green,letterSpacing:“0.16em”,textTransform:“uppercase”,fontWeight:800,fontFamily:“Georgia,serif”,marginBottom:12}}>Coach Notes & Data Analysis</div>
<div style={{display:“flex”,flexDirection:“column”,gap:8}}>
{items.map((n,i) => (
<div key={i} style={{display:“flex”,gap:10,alignItems:“flex-start”}}>
<div style={{fontSize:9,fontWeight:800,color:colors[n.type],background:`${colors[n.type]}18`,border:`1px solid ${colors[n.type]}33`,borderRadius:3,padding:“2px 5px”,flexShrink:0,marginTop:1}}>{icon[n.type]} {n.area}</div>
<span style={{fontSize:11,color:C.inkSoft,lineHeight:1.55,flex:1}}>{n.msg}</span>
</div>
))}
</div>
</div>
);
}

function RoundDetail({round}) {
const [tab, setTab] = useState(“scoring”);
const sg = useMemo(() => calcSG(round), [round.id]);
const tabs = [[“scoring”,“Scoring & Overview”],[“tee”,“Tee & Fairway”],[“app”,“Approach”],[“putt”,“Putting”]];
const dateStr = new Date(round.date).toLocaleDateString(“en-US”,{month:“long”,day:“numeric”,year:“numeric”});
const overPar = round.score - round.par;
const roundWithOverPar = {…round, overPar};
const isSeasonLow = round.score === Math.min(…ROUNDS.map(r=>r.score));
return (
<div>
<div style={{marginBottom:16,paddingBottom:14,borderBottom:`2px solid ${C.green}`}}>
<div style={{display:“flex”,alignItems:“center”,gap:10,flexWrap:“wrap”}}>
<div style={{fontSize:22,fontWeight:700,fontFamily:“Georgia,serif”,color:C.green}}>{dateStr}</div>
{isSeasonLow && <span style={{fontSize:9,fontWeight:800,background:C.gold,color:”#fff”,padding:“2px 8px”,borderRadius:3,letterSpacing:“0.08em”}}>★ SEASON LOW</span>}
</div>
<div style={{fontSize:15,color:C.inkSoft,marginTop:2,fontFamily:“Georgia,serif”}}>
{round.location} · {round.yards} yds · Rating {round.rating} / Slope {round.slope} · Par {round.par}
{round.diff ? ` · Diff ${round.diff}` : “”} · HCP {round.hcp}
</div>
</div>
<div style={{display:“flex”,flexWrap:“wrap”,gap:6,marginBottom:14}}>
<KpiBox label=“Score”     value={round.score} sub={`+${overPar} over par${round.adjScore!==round.score?` (adj ${round.adjScore})`:""}`} color={overPar<=10?C.pos:overPar<=14?C.warn:overPar<=18?C.gold:C.neg}/>
<KpiBox label=“FIR”       value={`${round.fir}%`}        color={goalColor(round.fir,GOAL_HCP.fir)}/>
<KpiBox label=“Playable”  value={`${round.playable}%`}   color={goalColor(round.playable,GOAL_HCP.playable)}/>
<KpiBox label=“GIR”       value={`${round.gir}%`}        color={goalColor(round.gir,GOAL_HCP.gir)}/>
<KpiBox label="Putts"     value={round.putts}             color={goalColor(round.putts,GOAL_HCP.putts,true)}/>
<KpiBox label=“3-Putt %”  value={`${round.threePutt}%`}  color={goalColor(round.threePutt,GOAL_HCP.threePutt,true)}/>
<KpiBox label="Penalties" value={round.penalties}         color={round.penalties>0?C.neg:C.pos}/>
<KpiBox label=“Up & Downs” value={round.upDowns} sub={`${round.upDownPct}%`} color={goalColor(round.upDownPct,GOAL_HCP.upDown)}/>
</div>
<TabRow tabs={tabs} active={tab} onChange={setTab}/>
{tab===“scoring” && (
<div style={{display:“grid”,gridTemplateColumns:“repeat(auto-fit,minmax(240px,1fr))”,gap:12}}>
<Card>
<SectionLabel>Score Distribution</SectionLabel>
{[
[”\u26F3 Birdie or Better”,round.birdies,round.birdies/18*100,C.birdie],
[”\u25CE Par”,   round.pars,   round.pars/18*100,  C.par],
[”\u25CB Bogey”, round.bogeys, round.bogeys/18*100,C.bogey],
[”\u25CF Double or Worse”,round.doubles,round.doubles/18*100,C.double],
].map(([l,n,pct,col])=>(
<div key={l} style={{marginBottom:10}}>
<div style={{display:“flex”,justifyContent:“space-between”,marginBottom:3}}>
<span style={{fontSize:11,color:C.inkSoft}}>{l}</span>
<span style={{fontSize:11,fontWeight:700,color:col}}>{n} holes · {pct.toFixed(0)}%</span>
</div>
<FillBar pct={pct} color={col}/>
</div>
))}
</Card>
<Card>
<SectionLabel>Avg Score by Par Type</SectionLabel>
{[[“Par 3”,round.par3,3,GOAL_HCP.par3],[“Par 4”,round.par4,4,GOAL_HCP.par4],[“Par 5”,round.par5,5,GOAL_HCP.par5]].map(([l,avg,p,goal])=>(
<div key={l} style={{display:“flex”,justifyContent:“space-between”,alignItems:“center”,marginBottom:12,padding:“8px 10px”,background:C.surface2,borderRadius:6,border:`1px solid ${C.border}`}}>
<div>
<div style={{fontSize:12,color:C.inkSoft,fontFamily:“Georgia,serif”}}>{l}</div>
<div style={{fontSize:9,color:C.dim}}>{(avg-p)>=0?”+”:””}{(avg-p).toFixed(2)} vs par · goal {goal}</div>
</div>
<div style={{fontSize:24,fontWeight:700,fontFamily:“Georgia,serif”,color:goalColor(avg,goal,true)}}>{avg.toFixed(2)}</div>
</div>
))}
</Card>
<Card style={{background:C.goldPale,border:`1px solid ${C.gold}44`}}>
<SectionLabel accent={C.gold}>Putting Breakdown</SectionLabel>
<div style={{display:“flex”,justifyContent:“space-between”,marginBottom:12}}>
<Stat label="Total Putts" value={round.putts} color={goalColor(round.putts,GOAL_HCP.putts,true)} size={28}/>
<Stat label=“3-Putt %” value={`${round.threePutt}%`} color={goalColor(round.threePutt,GOAL_HCP.threePutt,true)} size={28}/>
</div>
{[[“1-Putt”,round.onePutt,C.pos],[“2-Putt”,round.twoPutt,C.warn],[“3-Putt+”,round.threePutt,C.neg]].map(([l,v,c])=>(
<div key={l} style={{marginBottom:7}}>
<div style={{display:“flex”,justifyContent:“space-between”,marginBottom:2}}>
<span style={{fontSize:10,color:C.inkSoft}}>{l}</span>
<span style={{fontSize:10,fontWeight:700,color:c}}>{v}%</span>
</div>
<FillBar pct={v} color={c} bg="#ece8d0"/>
</div>
))}
<div style={{marginTop:8,paddingTop:8,borderTop:`1px solid ${C.gold}33`,fontSize:10,color:C.dim}}>
Up & Downs: <strong style={{color:C.ink}}>{round.upDowns}</strong>
<span style={{marginLeft:6,color:goalColor(round.upDownPct,GOAL_HCP.upDown),fontWeight:700}}>{round.upDownPct}%</span>
<span style={{marginLeft:4,color:C.dim}}>(goal {GOAL_HCP.upDown}%)</span>
</div>
</Card>
<Card style={{gridColumn:“1/-1”,background:C.bluePale,border:`1px solid ${C.blue}33`}}>
<SectionLabel accent={C.blue}>Approach GIR % by Distance</SectionLabel>
<div style={{display:“grid”,gridTemplateColumns:“1fr auto”,gap:16,alignItems:“start”}}>
<ApproachChart approach={round.approach} compact={false}/>
<div style={{minWidth:160}}>
<div style={{fontSize:8,color:C.dim,letterSpacing:“0.1em”,textTransform:“uppercase”,marginBottom:8,fontFamily:“Georgia,serif”}}>Green Miss Direction</div>
{[[“▼ Short”,round.greenShort,C.neg],[“▲ Long”,round.greenLong,”#6a2abf”],[“◀ Left”,round.greenLeft,”#8b4500”],[“▶ Right”,round.greenRight,C.blue]].map(([l,v,c])=>(
<div key={l} style={{display:“flex”,justifyContent:“space-between”,alignItems:“center”,marginBottom:7}}>
<span style={{fontSize:11,color:C.inkSoft}}>{l}</span>
<span style={{fontWeight:700,color:v>5?c:C.dim,fontSize:13,fontFamily:“Georgia,serif”}}>{v}%</span>
</div>
))}
<div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.blue}22`}}>
<div style={{fontSize:8,color:C.dim,letterSpacing:“0.1em”,textTransform:“uppercase”,marginBottom:4,fontFamily:“Georgia,serif”}}>GIR Overall</div>
<div style={{fontSize:28,fontWeight:700,fontFamily:“Georgia,serif”,color:goalColor(round.gir,GOAL_HCP.gir)}}>{round.gir}%</div>
<div style={{fontSize:9,color:C.dim}}>Goal: {GOAL_HCP.gir}% · Season avg: {SA.gir.toFixed(1)}%</div>
</div>
</div>
</div>
</Card>
<div style={{gridColumn:“1/-1”}}><SGCard sg={sg} title="Strokes Gained Estimate vs 9 HCP Goal"/></div>
<div style={{gridColumn:“1/-1”}}><HcpBenchmarkTable roundData={round}/></div>
{round.notes && (<div style={{gridColumn:“1/-1”}}><DataAnalysis items={coachNotes(roundWithOverPar)}/></div>)}
</div>
)}
{tab===“tee” && (
<div style={{display:“grid”,gridTemplateColumns:“repeat(auto-fit,minmax(240px,1fr))”,gap:12}}>
<Card>
<SectionLabel>Tee Shot Breakdown</SectionLabel>
<StatRow label="Fairways Hit (FIR)" pct={round.fir} color={goalColor(round.fir,GOAL_HCP.fir)}/>
<StatRow label="Playable Tee Shots"  pct={round.playable} color={goalColor(round.playable,GOAL_HCP.playable)}/>
<div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
<div style={{fontSize:9,color:C.dim,marginBottom:8,textTransform:“uppercase”,letterSpacing:“0.1em”,fontFamily:“Georgia,serif”}}>Miss Direction</div>
<div style={{display:“flex”,justifyContent:“space-around”,alignItems:“center”,padding:“14px 0”}}>
<div style={{textAlign:“center”}}>
<div style={{fontSize:36,fontWeight:700,fontFamily:“Georgia,serif”,color:”#8b4500”}}>{round.missTeeLeft}%</div>
<div style={{fontSize:10,color:C.dim}}>◀ Left</div>
</div>
<div style={{textAlign:“center”}}>
<div style={{fontSize:18,fontWeight:700,color:C.neg}}>{round.ob}%</div>
<div style={{fontSize:9,color:C.dim}}>OB</div>
</div>
<div style={{textAlign:“center”}}>
<div style={{fontSize:36,fontWeight:700,fontFamily:“Georgia,serif”,color:C.blue}}>{round.missTeeRight}%</div>
<div style={{fontSize:10,color:C.dim}}>Right ▶</div>
</div>
</div>
</div>
</Card>
<Card>
<SectionLabel>vs Season Average</SectionLabel>
{[
{label:“FIR %”,      you:round.fir,         avg:SA.fir,          lb:false},
{label:“Playable %”, you:round.playable,    avg:SA.playable,     lb:false},
{label:“Miss Left”,  you:round.missTeeLeft, avg:SA.missTeeLeft,  lb:true},
{label:“Miss Right”, you:round.missTeeRight,avg:SA.missTeeRight, lb:true},
].map(({label,you,avg,lb})=>{
const diff = lb ? avg - you : you - avg;
return (
<div key={label} style={{display:“flex”,justifyContent:“space-between”,alignItems:“center”,marginBottom:10,padding:“6px 8px”,background:C.surface2,borderRadius:5}}>
<span style={{fontSize:11,color:C.inkSoft}}>{label}</span>
<div style={{display:“flex”,gap:10,alignItems:“center”}}>
<span style={{fontSize:11,color:C.dim}}>Avg:{avg.toFixed(1)}%</span>
<span style={{fontWeight:700,color:C.ink}}>{you}%</span>
<span style={{fontSize:10,fontWeight:700,color:diff>=0?C.pos:C.neg,background:diff>=0?C.greenPale:C.redPale,padding:“1px 5px”,borderRadius:3}}>{diff>=0?”+”:””}{diff.toFixed(1)}%</span>
</div>
</div>
);
})}
</Card>
</div>
)}
{tab===“app” && (
<div style={{display:“grid”,gridTemplateColumns:“repeat(auto-fit,minmax(240px,1fr))”,gap:12}}>
<Card style={{gridColumn:“1/-1”}}>
<SectionLabel>Approach GIR% by Distance</SectionLabel>
<ApproachChart approach={round.approach}/>
</Card>
<Card>
<SectionLabel>Green Miss Direction</SectionLabel>
<div style={{display:“grid”,gridTemplateColumns:“1fr 1fr”,gap:8,marginBottom:8}}>
{[[“▼ Short”,round.greenShort,C.neg],[“▲ Long”,round.greenLong,”#6a2abf”],[“◀ Left”,round.greenLeft,”#8b4500”],[“▶ Right”,round.greenRight,C.blue]].map(([l,v,c])=>(
<div key={l} style={{textAlign:“center”,padding:“10px”,background:`${c}12`,borderRadius:6,border:`1px solid ${c}33`}}>
<div style={{fontSize:24,fontWeight:700,fontFamily:“Georgia,serif”,color:v>5?c:C.dim}}>{v}%</div>
<div style={{fontSize:9,color:C.dim,marginTop:2}}>{l}</div>
</div>
))}
</div>
</Card>
<Card>
<SectionLabel>GIR Overall</SectionLabel>
<div style={{textAlign:“center”,padding:“20px 0”}}>
<div style={{fontSize:52,fontWeight:700,fontFamily:“Georgia,serif”,color:goalColor(round.gir,GOAL_HCP.gir)}}>{round.gir}%</div>
<div style={{fontSize:12,color:C.dim}}>Greens in Regulation</div>
<FillBar pct={round.gir} color={goalColor(round.gir,GOAL_HCP.gir)} h={10}/>
<div style={{fontSize:11,color:C.dim,marginTop:8}}>Goal: {GOAL_HCP.gir}% · Season avg: {SA.gir.toFixed(1)}%</div>
</div>
</Card>
</div>
)}
{tab===“putt” && (
<div style={{display:“grid”,gridTemplateColumns:“repeat(auto-fit,minmax(220px,1fr))”,gap:12}}>
<Card>
<SectionLabel>Putting Breakdown</SectionLabel>
{[[“1-Putt”,round.onePutt,C.pos],[“2-Putt”,round.twoPutt,C.warn],[“3-Putt or Worse”,round.threePutt,C.neg]].map(([l,v,c])=>(
<div key={l} style={{marginBottom:12}}>
<div style={{display:“flex”,justifyContent:“space-between”,marginBottom:3}}>
<span style={{fontSize:11,color:C.inkSoft}}>{l}</span>
<span style={{fontSize:12,fontWeight:700,color:c}}>{v}%</span>
</div>
<FillBar pct={v} color={c}/>
</div>
))}
<div style={{display:“grid”,gridTemplateColumns:“1fr 1fr”,gap:6,marginTop:12}}>
{[[“Total Putts”,round.putts],[“Per Hole”,(round.putts/18).toFixed(2)],[“1-Putt %”,`${round.onePutt}%`],[“3-Putt %”,`${round.threePutt}%`]].map(([l,v])=>(
<div key={l} style={{textAlign:“center”,padding:8,background:C.surface2,borderRadius:6,border:`1px solid ${C.border}`}}>
<div style={{fontSize:16,fontWeight:700,color:C.ink,fontFamily:“Georgia,serif”}}>{v}</div>
<div style={{fontSize:9,color:C.dim}}>{l}</div>
</div>
))}
</div>
</Card>
<Card>
<SectionLabel>vs Season Average</SectionLabel>
{[
{label:“Total Putts”,   you:round.putts,      avg:SA.putts,      lb:true},
{label:“1-Putt %”,      you:round.onePutt,    avg:SA.onePutt,    lb:false},
{label:“3-Putt %”,      you:round.threePutt,  avg:SA.threePutt,  lb:true},
{label:“Up & Down %”,   you:round.upDownPct,  avg:SA.upDownPct,  lb:false},
].map(({label,you,avg,lb})=>{
const diff = lb ? avg-you : you-avg;
return (
<div key={label} style={{display:“flex”,justifyContent:“space-between”,alignItems:“center”,marginBottom:10,padding:“6px 8px”,background:C.surface2,borderRadius:5}}>
<span style={{fontSize:11,color:C.inkSoft}}>{label}</span>
<div style={{display:“flex”,gap:10,alignItems:“center”}}>
<span style={{fontSize:11,color:C.dim}}>Avg:{avg.toFixed(1)}</span>
<span style={{fontWeight:700,color:C.ink}}>{you}</span>
<span style={{fontSize:10,fontWeight:700,color:diff>=0?C.pos:C.neg,background:diff>=0?C.greenPale:C.redPale,padding:“1px 5px”,borderRadius:3}}>{diff>=0?”+”:””}{diff.toFixed(1)}</span>
</div>
</div>
);
})}
</Card>
</div>
)}
</div>
);
}

function SeasonView() {
const [tab, setTab] = useState(“overview”);
const sg = useMemo(() => calcSeasonSG(), []);
const commentary = useMemo(() => seasonCoachNotes(), []);
const tabs = [[“overview”,“Overview”],[“scoring”,“Scoring”],[“tee”,“Tee & Fairway”],[“app”,“Approach”],[“putt”,“Putting”]];
const roundCount = ROUNDS.length;
const dateRange = roundCount > 0
? `${new Date(ROUNDS[0].date).toLocaleDateString("en-US",{month:"short",day:"numeric"})} – ${new Date(ROUNDS[roundCount-1].date).toLocaleDateString("en-US",{month:"short",day:"numeric"})}`
: “No rounds yet”;
const LAST5 = ROUNDS.slice(-5);
return (
<div>
<div style={{marginBottom:16,paddingBottom:14,borderBottom:`2px solid ${C.green}`}}>
<div style={{fontSize:9,color:C.green,letterSpacing:“0.18em”,textTransform:“uppercase”,fontFamily:“Georgia,serif”,fontWeight:800}}>2026 Season</div>
<div style={{fontSize:26,fontWeight:700,fontFamily:“Georgia,serif”,color:C.ink,letterSpacing:”-0.02em”,marginTop:2}}>Season Overview</div>
<div style={{fontSize:11,color:C.dim,marginTop:3}}>{roundCount} Rounds · {dateRange} · Running HCP: 12.7–12.9 · Goal: 9 HCP</div>
</div>
<div style={{display:“flex”,flexWrap:“wrap”,gap:6,marginBottom:16}}>
<KpiBox label=“Avg Score”    value={SA.score.toFixed(1)}          sub={`Adj ${SA.adjScore.toFixed(1)}`} color={C.ink}/>
<KpiBox label="Season Low"   value="82"                           sub="Mar 9 · Tyrone Hills"           color={C.gold}/>
<KpiBox label=“Avg FIR”      value={`${SA.fir.toFixed(1)}%`}      color={goalColor(SA.fir,GOAL_HCP.fir)}/>
<KpiBox label=“Avg Playable” value={`${SA.playable.toFixed(1)}%`} color={goalColor(SA.playable,GOAL_HCP.playable)}/>
<KpiBox label=“Avg GIR”      value={`${SA.gir.toFixed(1)}%`}      color={goalColor(SA.gir,GOAL_HCP.gir)}/>
<KpiBox label="Avg Putts"    value={SA.putts.toFixed(1)}           color={goalColor(SA.putts,GOAL_HCP.putts,true)}/>
<KpiBox label=“Avg 3-Putt”   value={`${SA.threePutt.toFixed(1)}%`} color={goalColor(SA.threePutt,GOAL_HCP.threePutt,true)}/>
<KpiBox label="Avg Penalties" value={SA.penalties.toFixed(1)}      color={SA.penalties>=1?C.neg:C.warn}/>
</div>
<TabRow tabs={tabs} active={tab} onChange={setTab}/>
{tab===“overview” && (
<>
<Card style={{marginBottom:12,overflowX:“auto”}}>
<SectionLabel>Round-by-Round Summary</SectionLabel>
<table style={{width:“100%”,borderCollapse:“collapse”,fontSize:11}}>
<thead>
<tr style={{borderBottom:`2px solid ${C.green}`}}>
{[“Date”,“Course”,“Score”,”+/−”,“FIR%”,“Play%”,“GIR%”,“Putts”,“3-Putt%”,“Pen”,“Par3”,“Par4”,“Par5”].map(h=>(
<th key={h} style={{padding:“5px 7px”,textAlign:“center”,fontWeight:800,fontSize:8,textTransform:“uppercase”,letterSpacing:“0.08em”,color:C.dim,fontFamily:“Georgia,serif”}}>{h}</th>
))}
</tr>
</thead>
<tbody>
{ROUNDS.map((r,i)=>{
const op = r.score-r.par;
const pv = i>0?ROUNDS[i-1]:null;
const arr=(v,p,lb)=>{if(!p)return null;const ok=lb?v<p:v>p;return <span style={{color:ok?C.pos:C.neg,fontSize:8,marginLeft:2}}>{ok?“▲”:“▼”}</span>;};
const isLow = r.score === Math.min(…ROUNDS.map(x=>x.score));
return (
<tr key={r.id} style={{borderBottom:`1px solid ${C.border}`,background:isLow?C.goldPale:i%2===0?“transparent”:C.surface2}}>
<td style={{padding:“7px”,color:C.gold,fontWeight:700,whiteSpace:“nowrap”,fontSize:10,fontFamily:“Georgia,serif”}}>
{new Date(r.date).toLocaleDateString(“en-US”,{month:“short”,day:“numeric”})}
{isLow&&<span style={{fontSize:8,marginLeft:4,color:C.gold}}>★</span>}
</td>
<td style={{padding:“7px”,color:C.inkSoft,fontSize:10,whiteSpace:“nowrap”}}>{r.location}</td>
<td style={{padding:“7px”,textAlign:“center”,fontWeight:700,fontFamily:“Georgia,serif”}}>
{r.score}{r.adjScore!==r.score?<span style={{fontSize:9,color:C.dim}}> ({r.adjScore})</span>:””}
{arr(r.score,pv?.score,true)}
</td>
<td style={{padding:“7px”,textAlign:“center”,fontWeight:700,color:op<=10?C.pos:op<=14?C.warn:op<=18?C.gold:C.neg}}>+{op}</td>
<td style={{padding:“7px”,textAlign:“center”,color:goalColor(r.fir,GOAL_HCP.fir),fontWeight:600}}>{r.fir}%</td>
<td style={{padding:“7px”,textAlign:“center”,color:goalColor(r.playable,GOAL_HCP.playable),fontWeight:600}}>{r.playable}%</td>
<td style={{padding:“7px”,textAlign:“center”,color:goalColor(r.gir,GOAL_HCP.gir),fontWeight:600}}>{r.gir}%</td>
<td style={{padding:“7px”,textAlign:“center”,color:goalColor(r.putts,GOAL_HCP.putts,true)}}>{r.putts}</td>
<td style={{padding:“7px”,textAlign:“center”,color:goalColor(r.threePutt,GOAL_HCP.threePutt,true)}}>{r.threePutt}%</td>
<td style={{padding:“7px”,textAlign:“center”,color:r.penalties>0?C.neg:C.dim}}>{r.penalties||”—”}</td>
<td style={{padding:“7px”,textAlign:“center”,fontSize:10,color:goalColor(r.par3,GOAL_HCP.par3,true)}}>{r.par3.toFixed(2)}</td>
<td style={{padding:“7px”,textAlign:“center”,fontSize:10,color:goalColor(r.par4,GOAL_HCP.par4,true)}}>{r.par4.toFixed(2)}</td>
<td style={{padding:“7px”,textAlign:“center”,fontSize:10,color:goalColor(r.par5,GOAL_HCP.par5,true)}}>{r.par5.toFixed(2)}</td>
</tr>
);
})}
<tr style={{borderTop:`2px solid ${C.green}`,background:C.greenPale}}>
<td style={{padding:“7px”,color:C.green,fontWeight:800,fontFamily:“Georgia,serif”,fontSize:10}} colSpan={2}>Season Avg</td>
<td style={{padding:“7px”,textAlign:“center”,fontWeight:700,fontFamily:“Georgia,serif”}}>{SA.score.toFixed(1)}</td>
<td style={{padding:“7px”,textAlign:“center”,fontWeight:700,color:C.warn,fontFamily:“Georgia,serif”}}>+{(SA.score-72).toFixed(1)}</td>
<td style={{padding:“7px”,textAlign:“center”,fontWeight:700,color:goalColor(SA.fir,GOAL_HCP.fir)}}>{SA.fir.toFixed(1)}%</td>
<td style={{padding:“7px”,textAlign:“center”,fontWeight:700,color:goalColor(SA.playable,GOAL_HCP.playable)}}>{SA.playable.toFixed(1)}%</td>
<td style={{padding:“7px”,textAlign:“center”,fontWeight:700,color:goalColor(SA.gir,GOAL_HCP.gir)}}>{SA.gir.toFixed(1)}%</td>
<td style={{padding:“7px”,textAlign:“center”,fontWeight:700,color:goalColor(SA.putts,GOAL_HCP.putts,true)}}>{SA.putts.toFixed(1)}</td>
<td style={{padding:“7px”,textAlign:“center”,fontWeight:700,color:goalColor(SA.threePutt,GOAL_HCP.threePutt,true)}}>{SA.threePutt.toFixed(1)}%</td>
<td style={{padding:“7px”,textAlign:“center”}}>{SA.penalties.toFixed(1)}</td>
<td style={{padding:“7px”,textAlign:“center”,color:goalColor(SA.par3,GOAL_HCP.par3,true)}}>{SA.par3.toFixed(2)}</td>
<td style={{padding:“7px”,textAlign:“center”,color:goalColor(SA.par4,GOAL_HCP.par4,true)}}>{SA.par4.toFixed(2)}</td>
<td style={{padding:“7px”,textAlign:“center”,color:goalColor(SA.par5,GOAL_HCP.par5,true)}}>{SA.par5.toFixed(2)}</td>
</tr>
</tbody>
</table>
</Card>
<div style={{display:“grid”,gridTemplateColumns:“repeat(auto-fit,minmax(280px,1fr))”,gap:12,marginBottom:12}}>
<SGCard sg={sg} title="Season Strokes Gained vs 9 HCP Goal"/>
<HcpBenchmarkTable roundData={null}/>
</div>
<div style={{marginBottom:12}}><DataAnalysis items={commentary}/></div>
<Card style={{marginBottom:12}}>
<SectionLabel>Performance Trends — Last {Math.min(5, ROUNDS.length)} Rounds</SectionLabel>
<div style={{display:“grid”,gridTemplateColumns:“repeat(auto-fit,minmax(130px,1fr))”,gap:16}}>
<Sparkline label=“Score”       values={LAST5.map(r=>r.score)}    format={v=>`${v}`}   lowerBetter/>
<Sparkline label=“Playable Tee%” values={LAST5.map(r=>r.playable)} format={v=>`${v}%`}/>
<Sparkline label=“GIR%”        values={LAST5.map(r=>r.gir)}      format={v=>`${v}%`}/>
<Sparkline label=“Putts”       values={LAST5.map(r=>r.putts)}    format={v=>`${v}`}   lowerBetter/>
<Sparkline label=“3-Putt%”     values={LAST5.map(r=>r.threePutt)} format={v=>`${v}%`} lowerBetter/>
</div>
</Card>
</>
)}
{tab===“scoring” && (
<div style={{display:“grid”,gridTemplateColumns:“repeat(auto-fit,minmax(230px,1fr))”,gap:12}}>
<Card>
<SectionLabel>Season Score Distribution — Avg/Round</SectionLabel>
{[
[“Birdie or Better”,SA.birdies,SA.birdies/18*100,C.birdie],
[“Par”,  SA.pars,   SA.pars/18*100,  C.par],
[“Bogey”,SA.bogeys, SA.bogeys/18*100, C.bogey],
[“Double or Worse”,SA.doubles,SA.doubles/18*100,C.double],
].map(([l,n,pct,col])=>(
<div key={l} style={{marginBottom:10}}>
<div style={{display:“flex”,justifyContent:“space-between”,marginBottom:3}}>
<span style={{fontSize:11,color:C.inkSoft}}>{l}</span>
<span style={{fontSize:11,fontWeight:700,color:col}}>{n.toFixed(2)}/rnd · {pct.toFixed(1)}%</span>
</div>
<FillBar pct={pct} color={col}/>
</div>
))}
</Card>
<Card>
<SectionLabel>Par Type Averages</SectionLabel>
{[[“Par 3”,SA.par3,3,GOAL_HCP.par3],[“Par 4”,SA.par4,4,GOAL_HCP.par4],[“Par 5”,SA.par5,5,GOAL_HCP.par5]].map(([l,avg,p,goal])=>(
<div key={l} style={{display:“flex”,justifyContent:“space-between”,alignItems:“center”,marginBottom:12,padding:“8px 10px”,background:C.surface2,borderRadius:6,border:`1px solid ${C.border}`}}>
<div>
<div style={{fontSize:12,color:C.inkSoft,fontFamily:“Georgia,serif”}}>{l}</div>
<div style={{fontSize:9,color:C.dim}}>{(avg-p).toFixed(2) > 0 ? “+” : “”}{(avg-p).toFixed(2)} over par · goal {goal}</div>
</div>
<div style={{fontSize:26,fontWeight:700,fontFamily:“Georgia,serif”,color:goalColor(avg,goal,true)}}>{avg.toFixed(2)}</div>
</div>
))}
</Card>
<Card style={{gridColumn:“1/-1”}}>
<SectionLabel>Scoring Trends — Last {Math.min(5, ROUNDS.length)} Rounds</SectionLabel>
<div style={{display:“grid”,gridTemplateColumns:“repeat(auto-fit,minmax(130px,1fr))”,gap:16}}>
<Sparkline label=“Par 3 Avg”  values={LAST5.map(r=>r.par3)}   format={v=>v.toFixed(2)} lowerBetter/>
<Sparkline label=“Par 4 Avg”  values={LAST5.map(r=>r.par4)}   format={v=>v.toFixed(2)} lowerBetter/>
<Sparkline label=“Par 5 Avg”  values={LAST5.map(r=>r.par5)}   format={v=>v.toFixed(2)} lowerBetter/>
<Sparkline label=“Bogeys/Rnd” values={LAST5.map(r=>r.bogeys)} format={v=>`${v}`}        lowerBetter/>
<Sparkline label=“Doubles/Rnd” values={LAST5.map(r=>r.doubles)} format={v=>`${v}`}      lowerBetter/>
</div>
</Card>
</div>
)}
{tab===“tee” && (
<div style={{display:“grid”,gridTemplateColumns:“repeat(auto-fit,minmax(240px,1fr))”,gap:12}}>
<Card>
<SectionLabel>Season Tee Stats</SectionLabel>
<StatRow label="FIR %"         pct={SA.fir}      color={goalColor(SA.fir,GOAL_HCP.fir)}/>
<StatRow label="Playable Tee %" pct={SA.playable} color={goalColor(SA.playable,GOAL_HCP.playable)}/>
<StatRow label="OB / Penalty %" pct={SA.ob} max={10} color={C.neg}/>
<div style={{marginTop:12,paddingTop:12,borderTop:`1px solid ${C.border}`}}>
<div style={{display:“flex”,justifyContent:“space-around”}}>
<div style={{textAlign:“center”}}>
<div style={{fontSize:28,fontWeight:700,fontFamily:“Georgia,serif”,color:”#8b4500”}}>{SA.missTeeLeft.toFixed(1)}%</div>
<div style={{fontSize:9,color:C.dim}}>◀ Miss Left (season)</div>
</div>
<div style={{textAlign:“center”}}>
<div style={{fontSize:28,fontWeight:700,fontFamily:“Georgia,serif”,color:C.blue}}>{SA.missTeeRight.toFixed(1)}%</div>
<div style={{fontSize:9,color:C.dim}}>Miss Right ▶ (season)</div>
</div>
</div>
</div>
</Card>
<Card>
<SectionLabel>FIR & Playable Trend — Last {Math.min(5, ROUNDS.length)} Rounds</SectionLabel>
<Sparkline label=“FIR%”      values={LAST5.map(r=>r.fir)}      format={v=>`${v}%`}/>
<div style={{marginBottom:12}}/>
<Sparkline label=“Playable%”  values={LAST5.map(r=>r.playable)} format={v=>`${v}%`}/>
</Card>
<Card>
<SectionLabel>Miss Direction per Round</SectionLabel>
{ROUNDS.map(r=>(
<div key={r.id} style={{marginBottom:8,display:“flex”,alignItems:“center”,gap:8}}>
<div style={{fontSize:9,color:C.dim,width:44,flexShrink:0}}>{new Date(r.date).toLocaleDateString(“en-US”,{month:“short”,day:“numeric”})}</div>
<div style={{flex:1,height:14,display:“flex”,borderRadius:4,overflow:“hidden”}}>
<div style={{width:`${r.missTeeLeft}%`,background:”#c87020”,opacity:0.8}}/>
<div style={{flex:1,background:”#e8e0d0”}}/>
<div style={{width:`${r.missTeeRight}%`,background:C.blue,opacity:0.7}}/>
</div>
<div style={{fontSize:9,color:”#8b4500”,width:30,textAlign:“right”}}>{r.missTeeLeft}%L</div>
<div style={{fontSize:9,color:C.blue,width:30,textAlign:“right”}}>{r.missTeeRight}%R</div>
</div>
))}
</Card>
</div>
)}
{tab===“app” && (
<div style={{display:“grid”,gridTemplateColumns:“repeat(auto-fit,minmax(240px,1fr))”,gap:12}}>
<Card style={{gridColumn:“1/-1”}}>
<SectionLabel>Season Approach GIR% by Distance</SectionLabel>
<ApproachChart approach={SA.approach}/>
</Card>
<Card>
<SectionLabel>Season Green Miss Pattern</SectionLabel>
{[[“▼ Short”,SA.greenShort,C.neg],[“▲ Long”,SA.greenLong,”#6a2abf”],[“◀ Left”,SA.greenLeft,”#8b4500”],[“▶ Right”,SA.greenRight,C.blue]].map(([l,v,c])=>(
<div key={l} style={{marginBottom:10}}>
<div style={{display:“flex”,justifyContent:“space-between”,marginBottom:3}}>
<span style={{fontSize:11,color:C.inkSoft}}>{l}</span>
<span style={{fontSize:12,fontWeight:700,color:c}}>{v.toFixed(1)}%</span>
</div>
<FillBar pct={v} color={c}/>
</div>
))}
<div style={{marginTop:10,padding:“8px 10px”,background:C.redPale,borderRadius:6,border:`1px solid ${C.neg}44`,fontSize:10,color:C.neg}}>
⚠ Short ({SA.greenShort.toFixed(1)}%) is the dominant miss. Take one more club.
</div>
</Card>
<Card>
<SectionLabel>GIR % Trend — Last {Math.min(5, ROUNDS.length)} Rounds</SectionLabel>
<Sparkline label=“GIR%”           values={LAST5.map(r=>r.gir)}        format={v=>`${v}%`}/>
<div style={{marginTop:12}}>
<Sparkline label=“Green Miss Short %” values={LAST5.map(r=>r.greenShort)} format={v=>`${v}%`} lowerBetter/>
</div>
</Card>
<Card>
<SectionLabel>Approach GIR per Round</SectionLabel>
{ROUNDS.map(r=>(
<div key={r.id} style={{display:“flex”,alignItems:“center”,gap:8,marginBottom:8}}>
<div style={{fontSize:9,color:C.dim,width:44,flexShrink:0}}>{new Date(r.date).toLocaleDateString(“en-US”,{month:“short”,day:“numeric”})}</div>
<div style={{flex:1,height:14,background:”#ece8e0”,borderRadius:4,overflow:“hidden”}}>
<div style={{width:`${r.gir}%`,height:“100%”,background:goalColor(r.gir,GOAL_HCP.gir)}}/>
</div>
<div style={{fontSize:10,fontWeight:700,color:goalColor(r.gir,GOAL_HCP.gir),width:36,textAlign:“right”}}>{r.gir}%</div>
</div>
))}
</Card>
</div>
)}
{tab===“putt” && (
<div style={{display:“grid”,gridTemplateColumns:“repeat(auto-fit,minmax(220px,1fr))”,gap:12}}>
<Card>
<SectionLabel>Season Putting Stats</SectionLabel>
{[
[“Avg Putts/Round”, SA.putts.toFixed(1),     goalColor(SA.putts,GOAL_HCP.putts,true)],
[“1-Putt %”,        `${SA.onePutt.toFixed(1)}%`,  C.pos],
[“2-Putt %”,        `${SA.twoPutt.toFixed(1)}%`,  C.warn],
[“3-Putt+ %”,       `${SA.threePutt.toFixed(1)}%`,goalColor(SA.threePutt,GOAL_HCP.threePutt,true)],
[“Up & Down %”,     `${SA.upDownPct.toFixed(1)}%`,goalColor(SA.upDownPct,GOAL_HCP.upDown)],
].map(([l,v,col])=>(
<div key={l} style={{display:“flex”,justifyContent:“space-between”,alignItems:“center”,marginBottom:10,padding:“6px 8px”,background:C.surface2,borderRadius:5}}>
<span style={{fontSize:11,color:C.inkSoft}}>{l}</span>
<span style={{fontWeight:700,color:col,fontSize:14,fontFamily:“Georgia,serif”}}>{v}</span>
</div>
))}
</Card>
<Card>
<SectionLabel>Putting Distribution</SectionLabel>
<StatRow label="1-Putt"         pct={SA.onePutt}   color={C.pos}/>
<StatRow label="2-Putt"         pct={SA.twoPutt}   color={C.warn}/>
<StatRow label="3-Putt or Worse" pct={SA.threePutt} color={C.neg}/>
</Card>
<Card>
<SectionLabel>Putting Trends — Last {Math.min(5, ROUNDS.length)} Rounds</SectionLabel>
<Sparkline label=“Putts/Round” values={LAST5.map(r=>r.putts)}     format={v=>`${v}`}   lowerBetter/>
<div style={{marginBottom:12}}/>
<Sparkline label=“1-Putt %”   values={LAST5.map(r=>r.onePutt)}   format={v=>`${v}%`}/>
<div style={{marginBottom:12}}/>
<Sparkline label=“3-Putt %”   values={LAST5.map(r=>r.threePutt)} format={v=>`${v}%`}  lowerBetter/>
</Card>
<Card>
<SectionLabel>Up & Downs by Round</SectionLabel>
{ROUNDS.map(r=>(
<div key={r.id} style={{display:“flex”,justifyContent:“space-between”,alignItems:“center”,marginBottom:9,padding:“5px 8px”,background:C.surface2,borderRadius:5}}>
<span style={{fontSize:10,color:C.dim}}>{new Date(r.date).toLocaleDateString(“en-US”,{month:“short”,day:“numeric”})} · {r.location.split(” “)[0]}</span>
<div>
<span style={{fontWeight:700,color:goalColor(r.upDownPct,GOAL_HCP.upDown),fontFamily:“Georgia,serif”}}>{r.upDowns}</span>
<span style={{fontSize:10,color:goalColor(r.upDownPct,GOAL_HCP.upDown),marginLeft:6}}>{r.upDownPct}%</span>
</div>
</div>
))}
<div style={{fontSize:10,color:C.dim,marginTop:4}}>Season avg: {SA.upDownPct.toFixed(1)}% · Goal: {GOAL_HCP.upDown}%</div>
</Card>
</div>
)}
</div>
);
}

export default function GolfTracker() {
const [view, setView] = useState(“season”);
const [selectedId, setSelectedId] = useState(ROUNDS[ROUNDS.length-1].id);
const current = ROUNDS.find(r=>r.id===selectedId);
const navBtn = (active) => ({
padding:“8px 20px”, borderRadius:4, cursor:“pointer”, fontSize:12, fontWeight:active?700:500,
background:active?C.green:“transparent”,
color:active?”#fff”:C.inkSoft,
border:`1px solid ${active?C.green:C.border2}`,
fontFamily:“Georgia,serif”, letterSpacing:“0.04em”,
});
const recentRounds = ROUNDS.slice(-5).reverse();
return (
<div style={{minHeight:“100vh”,background:C.bg,color:C.ink,fontFamily:”‘Palatino Linotype’,‘Book Antiqua’,Palatino,serif”}}>
<style>{`* { box-sizing:border-box; } ::-webkit-scrollbar { width:5px; height:5px; } ::-webkit-scrollbar-track { background:#ece8e0; } ::-webkit-scrollbar-thumb { background:#c8bfa8; border-radius:3px; }`}</style>
<div style={{background:`linear-gradient(135deg, ${C.green} 0%, ${C.greenLight} 100%)`,padding:“14px 24px”,display:“flex”,alignItems:“center”,flexWrap:“wrap”,gap:10,boxShadow:“0 2px 8px rgba(0,0,0,0.2)”,position:“sticky”,top:0,zIndex:100}}>
<div>
<div style={{fontSize:9,color:“rgba(255,255,255,0.6)”,letterSpacing:“0.2em”,textTransform:“uppercase”,fontFamily:“Georgia,serif”}}>2026 Season</div>
<div style={{fontSize:20,fontWeight:700,fontFamily:“Georgia,serif”,color:”#fff”,letterSpacing:”-0.01em”,lineHeight:1.2}}>Golf Performance Dashboard</div>
</div>
<div style={{marginLeft:“auto”,display:“flex”,gap:6}}>
<button style={navBtn(view===“season”)} onClick={()=>setView(“season”)}>Season</button>
<button style={navBtn(view===“round”)}  onClick={()=>setView(“round”)}>Rounds</button>
</div>
</div>
<div style={{padding:“20px 24px”,maxWidth:1120,margin:“0 auto”}}>
{view===“season” && <SeasonView/>}
{view===“round” && (
<>
<div style={{display:“flex”,flexWrap:“wrap”,gap:10,alignItems:“center”,marginBottom:16,padding:“12px 14px”,background:C.surface,border:`1px solid ${C.border}`,borderRadius:8}}>
<div style={{display:“flex”,alignItems:“center”,gap:8,flex:“0 0 auto”}}>
<label style={{fontSize:9,color:C.dim,letterSpacing:“0.1em”,textTransform:“uppercase”,fontFamily:“Georgia,serif”}}>Round</label>
<select value={selectedId} onChange={e=>setSelectedId(e.target.value)} style={{padding:“5px 10px”,borderRadius:4,border:`1px solid ${C.border2}`,background:C.surface2,color:C.ink,fontFamily:“Georgia,serif”,fontSize:11}}>
{[…ROUNDS].reverse().map(r=>(
<option key={r.id} value={r.id}>
{new Date(r.date).toLocaleDateString(“en-US”,{month:“short”,day:“numeric”,year:“2-digit”})} · {r.location} · {r.score}
</option>
))}
</select>
</div>
<div style={{width:1,height:28,background:C.border,flexShrink:0}}/>
<div style={{display:“flex”,alignItems:“center”,gap:6,flexWrap:“wrap”}}>
<span style={{fontSize:9,color:C.dim,letterSpacing:“0.1em”,textTransform:“uppercase”,fontFamily:“Georgia,serif”}}>Recent:</span>
{recentRounds.map(r=>{
const active = selectedId===r.id;
return (
<button key={r.id} onClick={()=>setSelectedId(r.id)} style={{padding:“4px 10px”,borderRadius:4,cursor:“pointer”,fontSize:10,fontWeight:active?700:400,fontFamily:“Georgia,serif”,background:active?C.green:“transparent”,color:active?”#fff”:C.inkSoft,border:`1px solid ${active?C.green:C.border}`}}>
{new Date(r.date).toLocaleDateString(“en-US”,{month:“short”,day:“numeric”})}
<span style={{marginLeft:4,opacity:0.7,fontSize:9}}>{r.location.split(” “)[0]}</span>
</button>
);
})}
</div>
<div style={{marginLeft:“auto”,fontSize:9,color:C.dim,fontFamily:“Georgia,serif”}}>
{ROUNDS.length} round{ROUNDS.length!==1?“s”:””} · Season Low: 82
</div>
</div>
{current && <RoundDetail round={current}/>}
</>
)}
</div>
<div style={{padding:“10px 24px”,borderTop:`1px solid ${C.border}`,fontSize:9,color:C.dim,textAlign:“center”,letterSpacing:“0.1em”,textTransform:“uppercase”,fontFamily:“Georgia,serif”}}>
v8 · 8 ROUNDS · THROUGH 2026-03-09 · SEASON LOW: 82 · GOAL: 9 HCP · ADD ROUNDS TO ROUNDS ARRAY TO UPDATE ALL VIEWS
</div>
</div>
);
}