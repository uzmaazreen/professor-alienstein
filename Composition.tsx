import React from "react";
import * as R from "remotion";
import {
  AbsoluteFill,
  Composition,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Remotion has renamed <Audio> in newer versions, so pick whichever exists.
const AudioPlayer: React.FC<{ src: string; volume?: number }> = (props) => {
  const A: any = (R as any).Html5Audio ?? (R as any).Audio;
  return <A {...props} />;
};

// Sound effects made by make_sfx.py (files in my-video/public/sfx/, e.g. pop.wav)
const AVAILABLE_SFX: string[] = ["pop", "whoosh", "ding", "tick", "typing", "coin", "boing", "sparkle"];
// which effect plays when each kind of visual appears on screen
const BEAT_SFX: Record<string, string> = { icon: "pop", count: "tick", bars: "whoosh", flow: "pop", compare: "pop", word: "whoosh" };

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const PURPLE = "#2b1560";
const ORANGE = "#F28C28";

type Mood = "happy" | "shock" | "think" | "laugh";
type Word = { w: string; t: number };
type Cue = { word: number; type: string; arg: string; t?: number };
type SceneData = {
  id: number;
  mood: Mood;
  big: string;
  sfx: string;
  text: string;
  audio: string;
  duration: number;
  words: Word[];
  mouth?: number[];
  cues?: Cue[];
};
type EpisodeProps = { fps: number; scenes: SceneData[]; palette?: string };

/* ---------------- Professor (girl alien) with moods ---------------- */

// mouth shapes for lip-sync: 0 closed, 1 small, 2 medium, 3 round (oo), 4 wide (aa/ee)
const shapeMouth = (shape: number, dark: string) => {
  switch (shape) {
    case 0:
      return <path d="M168 217 Q190 224 212 217" fill="none" stroke={dark} strokeWidth="4" strokeLinecap="round" />;
    case 1:
      return <ellipse cx="190" cy="219" rx="10" ry="5" fill="#7a1f2e" stroke={dark} strokeWidth="3.5" />;
    case 2:
      return <ellipse cx="190" cy="221" rx="13" ry="10" fill="#7a1f2e" stroke={dark} strokeWidth="4" />;
    case 3:
      return <ellipse cx="190" cy="223" rx="9" ry="14" fill="#7a1f2e" stroke={dark} strokeWidth="4" />;
    default:
      return (
        <>
          <path d="M160 210 Q190 252 220 210 Z" fill="#7a1f2e" stroke={dark} strokeWidth="4" strokeLinejoin="round" />
          <ellipse cx="190" cy="231" rx="13" ry="6" fill="#E0556B" />
        </>
      );
  }
};

const Character: React.FC<{ mood: Mood; mouthShape?: number; blink?: boolean }> = ({ mood, mouthShape, blink }) => {
  const dark = "#1b1b1b";
  const brows = (
    <>
      <g transform={mood === "shock" ? "translate(0,-9)" : mood === "laugh" ? "translate(0,-4)" : ""}>
        <path d="M138 128 Q158 118 178 128" fill="none" stroke={dark} strokeWidth="4" strokeLinecap="round" />
      </g>
      <g transform={mood === "shock" ? "translate(0,-9)" : mood === "think" ? "translate(0,-10) rotate(-8 222 123)" : mood === "laugh" ? "translate(0,-4)" : ""}>
        <path d="M202 128 Q222 118 242 128" fill="none" stroke={dark} strokeWidth="4" strokeLinecap="round" />
      </g>
    </>
  );
  const eyes =
    mood === "laugh" || blink ? (
      <>
        <path d="M142 168 Q156 150 170 168" fill="none" stroke={dark} strokeWidth="5" strokeLinecap="round" />
        <path d="M212 168 Q226 150 240 168" fill="none" stroke={dark} strokeWidth="5" strokeLinecap="round" />
      </>
    ) : mood === "shock" ? (
      <>
        <circle cx="153" cy="160" r="4.5" fill={dark} />
        <circle cx="227" cy="160" r="4.5" fill={dark} />
      </>
    ) : mood === "think" ? (
      <>
        <circle cx="161" cy="155" r="7" fill={dark} />
        <circle cx="231" cy="155" r="7" fill={dark} />
        <circle cx="163" cy="152.5" r="2.2" fill="#FFFFFF" />
        <circle cx="233" cy="152.5" r="2.2" fill="#FFFFFF" />
      </>
    ) : (
      <>
        <circle cx="156" cy="161" r="7" fill={dark} />
        <circle cx="226" cy="161" r="7" fill={dark} />
        <circle cx="158" cy="158.5" r="2.2" fill="#FFFFFF" />
        <circle cx="228" cy="158.5" r="2.2" fill="#FFFFFF" />
      </>
    );
  const mouth =
    mouthShape !== undefined ? (
      shapeMouth(mouthShape, dark)
    ) : mood === "shock" ? (
      <ellipse cx="190" cy="224" rx="13" ry="17" fill="#7a1f2e" stroke={dark} strokeWidth="4" />
    ) : mood === "think" ? (
      <path d="M172 220 Q190 212 208 222" fill="none" stroke={dark} strokeWidth="4" strokeLinecap="round" />
    ) : mood === "laugh" ? (
      <>
        <path d="M156 207 Q190 262 224 207 Z" fill="#7a1f2e" stroke={dark} strokeWidth="4" strokeLinejoin="round" />
        <ellipse cx="190" cy="233" rx="15" ry="7" fill="#E0556B" />
      </>
    ) : (
      <path d="M162 211 Q190 240 218 211 Q190 221 162 211 Z" fill="#E0556B" stroke={dark} strokeWidth="3" strokeLinejoin="round" />
    );
  return (
    <g>
        <path d="M90 400 L110 262 Q190 238 270 262 L290 400 Z" fill="#FFFFFF" stroke="#1b1b1b" strokeWidth="4" strokeLinejoin="round"/>
        <path d="M165 252 L190 292 L215 252" fill="none" stroke="#1b1b1b" strokeWidth="3" strokeLinejoin="round"/>
        <ellipse cx="190" cy="176" rx="92" ry="98" fill="#3b2314" stroke="#1b1b1b" strokeWidth="4"/><circle cx="96" cy="96" r="25" fill="#3b2314" stroke="#1b1b1b" strokeWidth="4"/><circle cx="284" cy="96" r="25" fill="#3b2314" stroke="#1b1b1b" strokeWidth="4"/><path d="M118 165 Q92 166 82 146 Q108 154 121 190 Z" fill="#E9D2AC" stroke="#1b1b1b" strokeWidth="4" strokeLinejoin="round"/>
        <path d="M262 165 Q288 166 298 146 Q272 154 259 190 Z" fill="#E9D2AC" stroke="#1b1b1b" strokeWidth="4" strokeLinejoin="round"/>
        <ellipse cx="190" cy="165" rx="78" ry="88" fill="#E9D2AC" stroke="#1b1b1b" strokeWidth="4"/>
        <path d="M112 112 Q104 160 116 198 L130 178 Q124 150 134 114 Z" fill="#3b2314" stroke="#1b1b1b" strokeWidth="3" strokeLinejoin="round"/><path d="M268 112 Q276 160 264 198 L250 178 Q256 150 246 114 Z" fill="#3b2314" stroke="#1b1b1b" strokeWidth="3" strokeLinejoin="round"/>
        <circle cx="140" cy="205" r="8" fill="#F2A98A"/><circle cx="240" cy="205" r="8" fill="#F2A98A"/>
        {brows}
        <rect x="128" y="141" width="52" height="38" rx="12" fill="#E3F4FF" stroke="#1b1b1b" strokeWidth="5"/>
        <rect x="200" y="141" width="52" height="38" rx="12" fill="#E3F4FF" stroke="#1b1b1b" strokeWidth="5"/>
        <path d="M180 154 Q190 148 200 154" fill="none" stroke="#1b1b1b" strokeWidth="5" strokeLinecap="round"/>
        <line x1="128" y1="153" x2="116" y2="156" stroke="#1b1b1b" strokeWidth="5" strokeLinecap="round"/>
        <line x1="252" y1="153" x2="264" y2="156" stroke="#1b1b1b" strokeWidth="5" strokeLinecap="round"/>
        <path d="M137 170 L148 149" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
        <path d="M209 170 L220 149" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
        <path d="M130 144 L121 137 M127 150 L117 146 M250 144 L259 137 M253 150 L263 146" fill="none" stroke="#1b1b1b" strokeWidth="4" strokeLinecap="round"/>{eyes}
        {mouth}
        <path d="M196 276 L216 330 L192 318 Z" fill="#6a3fc8" stroke="#1b1b1b" strokeWidth="3" strokeLinejoin="round"/><path d="M148 250 Q190 276 232 250 L230 270 Q190 296 150 270 Z" fill="#6a3fc8" stroke="#1b1b1b" strokeWidth="3" strokeLinejoin="round"/><circle cx="196" cy="276" r="7" fill="#8a63e0" stroke="#1b1b1b" strokeWidth="3"/>
        <path d="M152 92 L152 108 Q190 124 228 108 L228 92" fill="#2d2d2d" stroke="#1b1b1b" strokeWidth="4" strokeLinejoin="round"/>
        <polygon points="112,78 190,50 268,78 190,106" fill="#2d2d2d" stroke="#1b1b1b" strokeWidth="4" strokeLinejoin="round"/>
        <line x1="268" y1="78" x2="268" y2="112" stroke="#FFC933" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="268" cy="116" r="5" fill="#FFC933" stroke="#1b1b1b" strokeWidth="2"/>
    </g>
  );
};

/* ---------------- colour palettes (one per video) ---------------- */

type Pal = { bg: string; dark: string; light: string; accent: string };
const PALETTES: Record<string, Pal> = {
  sunrise: { bg: "#F28C28", dark: "#2b1560", light: "#FFF3D6", accent: "#FFD84D" },
  ocean: { bg: "#1FA2A6", dark: "#0b2e4f", light: "#E8FBFF", accent: "#FFD84D" },
  grape: { bg: "#6C3FC8", dark: "#1c0f45", light: "#F1E8FF", accent: "#FFC933" },
  forest: { bg: "#2E9E5B", dark: "#0f3d27", light: "#EAFFF1", accent: "#FFE066" },
};
const getPal = (name?: string): Pal => PALETTES[(name || "sunrise").toLowerCase()] || PALETTES.sunrise;

const FONT = "Arial, Helvetica, sans-serif";

/* ---------------- background ---------------- */

const Sparkle: React.FC<{ x: number; y: number; size: number; phase: number; color: string }> = ({ x, y, size, phase, color }) => {
  const frame = useCurrentFrame();
  const s = 0.7 + 0.3 * Math.sin(frame / 5 + phase);
  return (
    <svg width={size} height={size} viewBox="-12 -12 24 24" style={{ position: "absolute", left: x, top: y, transform: `scale(${s})` }}>
      <polygon points="0,-11 3,-3 11,0 3,3 0,11 -3,3 -11,0 -3,-3" fill={color} />
    </svg>
  );
};

const Background: React.FC<{ pal: Pal; doodles?: boolean }> = ({ pal, doodles }) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 40) * 10;
  return (
    <AbsoluteFill style={{ backgroundColor: pal.bg }}>
      <Sparkle x={70} y={60} size={46} phase={0} color={pal.light} />
      <Sparkle x={1150} y={90} size={38} phase={2} color={pal.light} />
      <Sparkle x={620} y={20} size={26} phase={4} color={pal.light} />
      <Sparkle x={1190} y={600} size={44} phase={1} color={pal.light} />
      <Sparkle x={60} y={640} size={34} phase={3} color={pal.light} />
      {doodles ? (
        <svg width="1280" height="720" viewBox="0 0 1280 720" style={{ position: "absolute", left: 0, top: 0 }}>
          <g transform={`translate(1190,${480 + drift}) scale(1.8)`} fill="none" stroke={pal.dark} strokeWidth="3">
            <circle r="15" />
            <ellipse rx="27" ry="7" transform="rotate(-20)" />
          </g>
          <g transform={`translate(110,${300 - drift}) scale(2.2)`} fill="none" stroke={pal.light} strokeWidth="2.5">
            <ellipse rx="24" ry="9" />
            <ellipse rx="24" ry="9" transform="rotate(60)" />
            <ellipse rx="24" ry="9" transform="rotate(120)" />
            <circle r="4" fill={pal.dark} stroke="none" />
          </g>
        </svg>
      ) : null}
    </AbsoluteFill>
  );
};

/* ---------------- doodle icon library (hand-drawn style, draw-on) ---------------- */

const seg = (p: number, i: number) => ({
  pathLength: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1 - Math.min(1, Math.max(0, (p - i * 0.06) / 0.55)),
});

const ICONS: Record<string, (p: number) => React.ReactNode> = {
  sun: (p) => (
    <>
      <circle cx="50" cy="50" r="16" {...seg(p, 0)} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const r = (a * Math.PI) / 180;
        return <line key={a} x1={50 + 26 * Math.cos(r)} y1={50 + 26 * Math.sin(r)} x2={50 + 40 * Math.cos(r)} y2={50 + 40 * Math.sin(r)} {...seg(p, i + 1)} />;
      })}
    </>
  ),
  cloud: (p) => <path d="M28 68 Q12 68 14 52 Q16 38 32 40 Q36 22 56 24 Q72 26 72 42 Q88 42 86 58 Q85 68 72 68 Z" {...seg(p, 0)} />,
  eye: (p) => (
    <>
      <path d="M8 50 Q50 12 92 50 Q50 88 8 50 Z" {...seg(p, 0)} />
      <circle cx="50" cy="50" r="14" {...seg(p, 2)} />
      <circle cx="50" cy="50" r="5" {...seg(p, 3)} />
    </>
  ),
  rainbow: (p) => (
    <>
      <path d="M8 72 A42 42 0 0 1 92 72" {...seg(p, 0)} />
      <path d="M19 72 A31 31 0 0 1 81 72" {...seg(p, 1)} />
      <path d="M30 72 A20 20 0 0 1 70 72" {...seg(p, 2)} />
    </>
  ),
  bulb: (p) => (
    <>
      <path d="M50 12 Q74 12 74 38 Q74 52 62 62 L62 72 L38 72 L38 62 Q26 52 26 38 Q26 12 50 12 Z" {...seg(p, 0)} />
      <path d="M40 81 L60 81" {...seg(p, 2)} />
      <path d="M44 90 L56 90" {...seg(p, 3)} />
    </>
  ),
  clock: (p) => (
    <>
      <circle cx="50" cy="50" r="38" {...seg(p, 0)} />
      <path d="M50 50 L50 24" {...seg(p, 2)} />
      <path d="M50 50 L68 58" {...seg(p, 3)} />
    </>
  ),
  magnifier: (p) => (
    <>
      <circle cx="42" cy="42" r="26" {...seg(p, 0)} />
      <path d="M62 62 L90 90" {...seg(p, 2)} />
    </>
  ),
  globe: (p) => (
    <>
      <circle cx="50" cy="50" r="38" {...seg(p, 0)} />
      <ellipse cx="50" cy="50" rx="16" ry="38" {...seg(p, 1)} />
      <path d="M12 50 L88 50" {...seg(p, 2)} />
      <path d="M18 28 Q50 38 82 28" {...seg(p, 3)} />
      <path d="M18 72 Q50 62 82 72" {...seg(p, 4)} />
    </>
  ),
  heart: (p) => <path d="M50 86 Q8 54 20 30 Q32 12 50 34 Q68 12 80 30 Q92 54 50 86 Z" {...seg(p, 0)} />,
  flask: (p) => (
    <>
      <path d="M40 12 L40 40 L16 82 Q12 90 22 90 L78 90 Q88 90 84 82 L60 40 L60 12" {...seg(p, 0)} />
      <path d="M34 12 L66 12" {...seg(p, 2)} />
      <path d="M26 70 L74 70" {...seg(p, 3)} />
    </>
  ),
  book: (p) => (
    <>
      <path d="M50 24 Q30 14 10 22 L10 76 Q30 68 50 78 Q70 68 90 76 L90 22 Q70 14 50 24 Z" {...seg(p, 0)} />
      <path d="M50 24 L50 78" {...seg(p, 2)} />
    </>
  ),
  gear: (p) => (
    <>
      <circle cx="50" cy="50" r="14" {...seg(p, 0)} />
      <circle cx="50" cy="50" r="30" {...seg(p, 1)} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const r = (a * Math.PI) / 180;
        return <line key={a} x1={50 + 30 * Math.cos(r)} y1={50 + 30 * Math.sin(r)} x2={50 + 42 * Math.cos(r)} y2={50 + 42 * Math.sin(r)} {...seg(p, i + 2)} />;
      })}
    </>
  ),
  rocket: (p) => (
    <>
      <path d="M50 8 Q72 28 68 64 L32 64 Q28 28 50 8 Z" {...seg(p, 0)} />
      <circle cx="50" cy="38" r="8" {...seg(p, 2)} />
      <path d="M32 56 L16 74 L32 70" {...seg(p, 3)} />
      <path d="M68 56 L84 74 L68 70" {...seg(p, 3)} />
      <path d="M42 74 L50 92 L58 74" {...seg(p, 4)} />
    </>
  ),
  drop: (p) => <path d="M50 10 Q80 48 76 62 Q72 86 50 88 Q28 86 24 62 Q20 48 50 10 Z" {...seg(p, 0)} />,
  question: (p) => (
    <>
      <path d="M30 34 Q30 12 52 12 Q74 12 74 34 Q74 48 52 56 L52 68" {...seg(p, 0)} />
      <circle cx="52" cy="85" r="3" {...seg(p, 3)} />
    </>
  ),
  star: (p) => <polygon points="50,10 61,38 92,38 67,57 77,88 50,69 23,88 33,57 8,38 39,38" {...seg(p, 0)} />,
  sunset: (p) => (
    <>
      <path d="M22 62 A28 28 0 0 1 78 62" {...seg(p, 0)} />
      <path d="M8 62 L92 62" {...seg(p, 1)} />
      <path d="M20 76 L80 76" {...seg(p, 2)} />
      <path d="M32 90 L68 90" {...seg(p, 3)} />
      <path d="M50 20 L50 8" {...seg(p, 4)} />
      <path d="M20 32 L12 24" {...seg(p, 4)} />
      <path d="M80 32 L88 24" {...seg(p, 4)} />
    </>
  ),
};

/* ---------------- visual beats (what appears on screen while Professor talks) ---------------- */

type BeatProps = { arg: string; f: number; pal: Pal; fps: number };

const pop = (f: number, fps: number, delay = 0) => spring({ frame: f - delay, fps, config: { damping: 11, stiffness: 130 } });

const IconBeat: React.FC<BeatProps> = ({ arg, f, pal, fps }) => {
  const [name, label] = arg.split("|");
  const draw = ICONS[(name || "").trim().toLowerCase()] || ICONS.star;
  const p = interpolate(f, [2, 28], [0, 1], clamp);
  const lab = pop(f, fps, 18);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <div style={{ width: 330, height: 330, borderRadius: 165, backgroundColor: pal.light, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${pop(f, fps)})` }}>
        <svg viewBox="0 0 100 100" width="250" height="250" style={{ opacity: p > 0.01 ? 1 : 0 }}>
          <g fill="none" stroke={pal.dark} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
            {draw(p)}
          </g>
        </svg>
      </div>
      {label ? (
        <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 44, color: pal.dark, backgroundColor: pal.accent, padding: "6px 26px", borderRadius: 16, transform: `scale(${lab})` }}>{label.trim()}</div>
      ) : null}
    </div>
  );
};

const CountBeat: React.FC<BeatProps> = ({ arg, f, pal, fps }) => {
  const [v, suffix, label] = arg.split("|");
  const n = parseFloat(v);
  const k = interpolate(f, [0, 30], [0, 1], clamp);
  const eased = 1 - Math.pow(1 - k, 3);
  const shown = Number.isInteger(n) ? String(Math.round(n * eased)) : (n * eased).toFixed(1);
  return (
    <div style={{ textAlign: "center", fontFamily: FONT, transform: `scale(${0.8 + 0.2 * pop(f, fps)})` }}>
      <div style={{ fontWeight: 900, color: pal.dark, lineHeight: 1 }}>
        <span style={{ fontSize: 230 }}>{shown}</span>
        <span style={{ fontSize: 110, color: pal.light }}>{(suffix || "").trim()}</span>
      </div>
      {label ? <div style={{ marginTop: 14, fontSize: 46, fontWeight: 800, color: pal.light, textShadow: `0 3px 0 ${pal.dark}` }}>{label.trim()}</div> : null}
    </div>
  );
};

const BarsBeat: React.FC<BeatProps> = ({ arg, f, pal, fps }) => {
  const [list, title] = arg.split("|");
  const rows = (list || "").split(";").map((r) => {
    const [name, val] = r.split("=");
    return { name: (name || "").trim(), val: parseFloat(val) || 0 };
  });
  const max = Math.max(...rows.map((r) => r.val), 1);
  const colors = [pal.light, pal.accent, pal.dark, "#FFFFFF"];
  return (
    <div style={{ width: 760, fontFamily: FONT }}>
      {title ? <div style={{ fontSize: 40, fontWeight: 900, color: pal.dark, marginBottom: 22, textAlign: "center" }}>{title.trim()}</div> : null}
      {rows.map((r, i) => {
        const g = interpolate(f, [6 + i * 7, 26 + i * 7], [0, 1], clamp);
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 18 }}>
            <div style={{ width: 190, fontSize: 38, fontWeight: 900, color: pal.dark, textAlign: "right", paddingRight: 18 }}>{r.name}</div>
            <div style={{ height: 62, width: Math.max(8, (r.val / max) * 460 * g), backgroundColor: colors[i % colors.length], borderRadius: 14, border: `5px solid ${pal.dark}` }} />
            <div style={{ marginLeft: 14, fontSize: 38, fontWeight: 900, color: pal.dark, opacity: g }}>{Number.isInteger(r.val) ? Math.round(r.val * g) : (r.val * g).toFixed(1)}</div>
          </div>
        );
      })}
    </div>
  );
};

const FlowBeat: React.FC<BeatProps> = ({ arg, f, pal, fps }) => {
  const items = arg.split(">").map((s) => s.trim()).filter(Boolean);
  const vertical = items.length >= 4;
  const size = vertical ? 36 : 42;
  return (
    <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", alignItems: "center", justifyContent: "center", gap: vertical ? 6 : 14, fontFamily: FONT }}>
      {items.map((it, i) => {
        const p = pop(f, fps, i * 12);
        const a = interpolate(f, [i * 12 + 6, i * 12 + 16], [0, 1], clamp);
        return (
          <React.Fragment key={i}>
            {i > 0 ? (
              vertical ? (
                <svg width="40" height="44" viewBox="0 0 40 44" style={{ opacity: a }}>
                  <g fill="none" stroke={pal.dark} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 4 L20 38" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - a} />
                    <path d="M6 26 L20 40 L34 26" />
                  </g>
                </svg>
              ) : (
                <svg width="64" height="40" viewBox="0 0 64 40" style={{ opacity: a }}>
                  <g fill="none" stroke={pal.dark} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 20 L54 20" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - a} />
                    <path d="M40 6 L56 20 L40 34" />
                  </g>
                </svg>
              )
            ) : null}
            <div style={{ transform: `scale(${p})`, backgroundColor: pal.light, color: pal.dark, border: `6px solid ${pal.dark}`, borderRadius: 24, padding: vertical ? "10px 30px" : "18px 24px", fontSize: size, fontWeight: 900, textAlign: "center", whiteSpace: "nowrap" }}>{it}</div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

const WordBeat: React.FC<BeatProps> = ({ arg, f, pal, fps }) => {
  const text = arg.trim();
  const size = text.length > 22 ? 70 : text.length > 14 ? 88 : 120;
  const p = pop(f, fps);
  const u = interpolate(f, [10, 26], [0, 1], clamp);
  return (
    <div style={{ textAlign: "center", fontFamily: FONT, maxWidth: 860 }}>
      <div style={{ fontSize: size, fontWeight: 900, color: pal.light, textShadow: `0 6px 0 ${pal.dark}`, lineHeight: 1.05, transform: `scale(${0.5 + 0.5 * p}) rotate(${interpolate(p, [0, 1], [-6, 0])}deg)` }}>{text}</div>
      <svg width="520" height="30" viewBox="0 0 520 30" style={{ marginTop: 6 }}>
        <path d="M10 18 Q130 2 260 16 T510 12" fill="none" stroke={pal.accent} strokeWidth="9" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - u} />
      </svg>
    </div>
  );
};

const CompareBeat: React.FC<BeatProps> = ({ arg, f, pal, fps }) => {
  const sides = arg.split("|").map((s) => {
    const [t, ...rest] = s.split("=");
    return { title: (t || "").trim(), text: rest.join("=").trim() };
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, fontFamily: FONT }}>
      {sides.slice(0, 2).map((s, i) => (
        <React.Fragment key={i}>
          {i === 1 ? <div style={{ fontSize: 54, fontWeight: 900, color: pal.dark }}>VS</div> : null}
          <div style={{ width: 380, backgroundColor: i === 0 ? pal.light : pal.accent, border: `6px solid ${pal.dark}`, borderRadius: 26, padding: "22px 20px", textAlign: "center", transform: `scale(${pop(f, fps, i * 10)})` }}>
            <div style={{ fontSize: 42, fontWeight: 900, color: pal.dark }}>{s.title}</div>
            <div style={{ fontSize: 34, fontWeight: 800, color: pal.dark, marginTop: 8 }}>{s.text}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

const Beat: React.FC<{ type: string; arg: string; f: number; dur: number; pal: Pal; fps: number }> = ({ type, arg, f, dur, pal, fps }) => {
  const fadeIn = interpolate(f, [0, 6], [0, 1], clamp);
  const fadeOut = interpolate(f, [dur - 7, dur - 1], [1, 0], clamp);
  const props = { arg, f, pal, fps };
  let body: React.ReactNode;
  switch (type) {
    case "icon": body = <IconBeat {...props} />; break;
    case "count": body = <CountBeat {...props} />; break;
    case "bars": body = <BarsBeat {...props} />; break;
    case "flow": body = <FlowBeat {...props} />; break;
    case "compare": body = <CompareBeat {...props} />; break;
    default: body = <WordBeat {...props} />;
  }
  return <div style={{ opacity: Math.min(fadeIn, fadeOut), display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>{body}</div>;
};

/* ---------------- one scene ---------------- */

const SceneView: React.FC<{ scene: SceneData; index: number; durationInFrames: number; pal: Pal }> = ({ scene, index, durationInFrames, pal }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const charOnLeft = index % 2 === 0;

  // lip-sync + blink
  const shape = scene.mouth && scene.mouth.length ? scene.mouth[Math.min(frame, scene.mouth.length - 1)] : undefined;
  const blink = (frame + index * 23) % 96 >= 92;

  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.04], clamp);

  // Professor (small, in a corner) with mood motion
  const enter = spring({ frame: frame - 2, fps, config: { damping: 11, stiffness: 120 } });
  const rise = interpolate(enter, [0, 1], [200, 0]);
  let dx = 0, dy = 0, rot = 0;
  if (scene.mood === "shock") {
    const k = interpolate(frame, [4, 30], [1, 0], clamp);
    dx = Math.sin(frame * 2.3) * 8 * k;
    dy = Math.cos(frame * 2.9) * 5 * k;
  } else if (scene.mood === "laugh") {
    dy = -Math.abs(Math.sin(frame / 3.5)) * 16;
    rot = Math.sin(frame / 3.5) * 3;
  } else if (scene.mood === "think") {
    rot = Math.sin(frame / 12) * 3;
  } else {
    dy = Math.sin(frame / 8) * 5;
  }
  const accent = scene.mood === "shock" ? "!" : scene.mood === "think" ? "?" : scene.mood === "laugh" ? "HA!" : "★";
  const accentPop = spring({ frame: frame - 10, fps, config: { damping: 7 } });

  // which visual beat is on screen now
  const cues = (scene.cues || []).filter((c) => typeof c.t === "number").sort((a, b) => (a.t as number) - (b.t as number));
  let active = -1;
  cues.forEach((c, i) => {
    if ((c.t as number) <= t) active = i;
  });
  const startF = active >= 0 ? Math.round((cues[active].t as number) * fps) : 0;
  const endF = active >= 0 && active < cues.length - 1 ? Math.round((cues[active + 1].t as number) * fps) : durationInFrames;
  const stageLeft = charOnLeft ? 310 : 40;
  const charLeft = charOnLeft ? 30 : 1010;

  // captions (7 words at a time)
  let idx = 0;
  scene.words.forEach((w, i) => {
    if (w.t <= t) idx = i;
  });
  const CH = 7;
  const chunkStart = Math.floor(idx / CH) * CH;
  const chunk = scene.words.slice(chunkStart, chunkStart + CH);

  const titleSlide = spring({ frame: frame - 3, fps, config: { damping: 13 } });
  const wipeX = interpolate(frame, [0, 9], [0, 1600], clamp);

  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1280, height: 720, transform: `scale(1.5) scale(${zoom})`, transformOrigin: "0 0" }}>
        <Background pal={pal} />

        {/* chapter title */}
        {scene.big ? (
          <div style={{ position: "absolute", left: 40, top: 26, fontFamily: FONT, fontWeight: 900, fontSize: 36, color: pal.light, backgroundColor: pal.dark, padding: "8px 24px", borderRadius: 14, transform: `translateX(${interpolate(titleSlide, [0, 1], [-400, 0])}px)` }}>
            {scene.big}
          </div>
        ) : null}

        {/* stage: the documentary visuals */}
        <div style={{ position: "absolute", left: stageLeft, top: 105, width: 930, height: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {active >= 0 ? (
            <Beat key={active} type={cues[active].type} arg={cues[active].arg} f={frame - startF} dur={Math.max(endF - startF, 12)} pal={pal} fps={fps} />
          ) : (
            <Beat type="word" arg={scene.big || ""} f={frame} dur={Math.max(endF, 12)} pal={pal} fps={fps} />
          )}
        </div>

        {/* Professor in the corner */}
        <div style={{ position: "absolute", left: charLeft, top: 335 + rise + dy, width: 240, height: 300, transform: `translateX(${dx}px) rotate(${rot}deg)`, transformOrigin: "50% 100%" }}>
          <svg width="240" height="300" viewBox="70 40 240 300">
            <Character mood={scene.mood} mouthShape={shape} blink={blink} />
          </svg>
          <div style={{ position: "absolute", left: charOnLeft ? 205 : -60, top: 15, fontSize: scene.mood === "laugh" ? 36 : 60, fontWeight: 900, color: pal.dark, fontFamily: FONT, transform: `scale(${accentPop}) rotate(${charOnLeft ? 12 : -12}deg)` }}>{accent}</div>
        </div>

        {/* captions */}
        <div style={{ position: "absolute", left: 90, width: 1100, bottom: 24, padding: "10px 20px", borderRadius: 20, backgroundColor: "rgba(0,0,0,0.55)", textAlign: "center", fontFamily: FONT, fontWeight: 800, fontSize: 38, color: "#FFFFFF", minHeight: 54 }}>
          {chunk.map((w, i) => (
            <span key={i} style={{ color: chunkStart + i === idx ? pal.accent : "#FFFFFF", marginRight: 10 }}>{w.w}</span>
          ))}
        </div>

        {/* wipe at scene start */}
        <div style={{ position: "absolute", left: -160, top: 0, width: 1500, height: 720, backgroundColor: pal.dark, transform: `translateX(${wipeX}px)` }} />
      </div>

      {/* sound effects: scene whoosh, scene sound, and one sound for every visual */}
      <Sequence from={0} durationInFrames={30}>
        <AudioPlayer src={staticFile("sfx/whoosh.wav")} volume={0.25} />
      </Sequence>
      {AVAILABLE_SFX.includes(scene.sfx) ? (
        <Sequence from={8} durationInFrames={60}>
          <AudioPlayer src={staticFile(`sfx/${scene.sfx}.wav`)} volume={0.35} />
        </Sequence>
      ) : null}
      {cues.map((c, i) => {
        const name = BEAT_SFX[c.type] || "pop";
        const at = Math.round((c.t as number) * fps);
        return (
          <React.Fragment key={`sfx${i}`}>
            <Sequence from={at} durationInFrames={50}>
              <AudioPlayer src={staticFile(`sfx/${name}.wav`)} volume={0.4} />
            </Sequence>
            {c.type === "count" ? (
              <Sequence from={at + 28} durationInFrames={50}>
                <AudioPlayer src={staticFile("sfx/ding.wav")} volume={0.35} />
              </Sequence>
            ) : null}
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};

/* ---------------- the whole episode ---------------- */

const Episode: React.FC<EpisodeProps> = ({ fps, scenes, palette }) => {
  const pal = getPal(palette);
  if (!scenes || scenes.length === 0) {
    return (
      <AbsoluteFill style={{ backgroundColor: pal.bg, alignItems: "center", justifyContent: "center", fontSize: 50, fontFamily: "Arial" }}>
        scenes.json not found. Run speak_scenes.py first.
      </AbsoluteFill>
    );
  }
  let start = 0;
  return (
    <AbsoluteFill style={{ backgroundColor: pal.bg }}>
      {scenes.map((s, i) => {
        const frames = Math.ceil(s.duration * fps);
        const from = start;
        start += frames;
        return (
          <Sequence key={s.id} from={from} durationInFrames={frames}>
            <SceneView scene={s} index={i} durationInFrames={frames} pal={pal} />
            <AudioPlayer src={staticFile(s.audio)} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

const calculateEpisodeMetadata = async () => {
  try {
    const res = await fetch(staticFile("scenes.json"));
    const data = await res.json();
    const fps = data.fps || 30;
    const total = data.scenes.reduce((sum: number, s: SceneData) => sum + Math.ceil(s.duration * fps), 0);
    return { durationInFrames: Math.max(total, 30), props: { fps, scenes: data.scenes as SceneData[], palette: (data.palette as string) || "sunrise" } };
  } catch (e) {
    return { durationInFrames: 90, props: { fps: 30, scenes: [] as SceneData[], palette: "sunrise" } };
  }
};

/* ---------------- 3-second intro ---------------- */

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pal = getPal("sunrise");
  const p = spring({ frame: frame - 4, fps, config: { damping: 9, stiffness: 110 } });
  const scale = interpolate(p, [0, 1], [0.1, 1]);
  const rotate = interpolate(p, [0, 1], [-30, 0]);
  const bob = frame > 30 ? Math.sin((frame - 30) / 5) * 5 : 0;
  const titleSpring = spring({ frame: frame - 18, fps, config: { damping: 12 } });
  const titleX = interpolate(titleSpring, [0, 1], [120, 0]);
  const titleOpacity = interpolate(frame, [18, 30], [0, 1], clamp);
  const line2Spring = spring({ frame: frame - 26, fps, config: { damping: 12 } });
  const line2X = interpolate(line2Spring, [0, 1], [120, 0]);
  const line2Opacity = interpolate(frame, [26, 38], [0, 1], clamp);
  const tagOpacity = interpolate(frame, [38, 50], [0, 1], clamp);
  const tagY = interpolate(frame, [38, 50], [20, 0], clamp);
  return (
    <AbsoluteFill>
      <Background pal={pal} doodles />
      <div style={{ position: "absolute", left: 130, top: 90 + bob, width: 420, height: 525, transform: `scale(${scale}) rotate(${rotate}deg)`, transformOrigin: "50% 100%" }}>
        <svg width="420" height="525" viewBox="70 40 240 300">
          <Character mood="happy" />
        </svg>
      </div>
      <div style={{ position: "absolute", left: 620, top: 215, fontFamily: FONT }}>
        <div style={{ fontSize: 112, fontWeight: 800, color: pal.dark, opacity: titleOpacity, transform: `translateX(${titleX}px)`, lineHeight: 1.05 }}>Professor</div>
        <div style={{ fontSize: 112, fontWeight: 800, color: "#FFFFFF", opacity: line2Opacity, transform: `translateX(${line2X}px)`, lineHeight: 1.05 }}>Alienstein</div>
        <div style={{ marginTop: 18, fontSize: 36, fontWeight: 700, color: pal.dark, opacity: tagOpacity, transform: `translateY(${tagY}px)` }}>How things work, explained simply.</div>
      </div>
    </AbsoluteFill>
  );
};

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const prog = (f: number, a: number, b: number) => ease(clamp01((f - a) / (b - a)));
const rnd = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

/* =====================================================================
   FILM MODE (paper-desk world): torn paper, polaroids, red string, marker,
   sticky notes. One continuous camera glides from item to item.
   ===================================================================== */

const WOOD = { sky: "#1B3566", sky2: "#2D4F8E", earth: "#3E6CA8", earth2: "#6D97C9", ink: "#14284B", light: "#F4ECD6", accent: "#D8412F" };

const SatelliteArt: React.FC<{ spin?: number }> = ({ spin = 0 }) => (
  <g strokeLinejoin="round" strokeLinecap="round" transform={`rotate(${spin})`}>
    <rect x="-86" y="-12" width="62" height="24" fill={WOOD.earth} stroke={WOOD.ink} strokeWidth="3.5" />
    <rect x="24" y="-12" width="62" height="24" fill={WOOD.earth} stroke={WOOD.ink} strokeWidth="3.5" />
    {[-70, -54, -38, 38, 54, 70].map((x) => (
      <line key={x} x1={x} y1="-12" x2={x} y2="12" stroke={WOOD.light} strokeWidth="1.6" opacity="0.8" />
    ))}
    <rect x="-24" y="-18" width="48" height="36" rx="5" fill={WOOD.light} stroke={WOOD.ink} strokeWidth="3.5" />
    <circle cx="0" cy="0" r="9" fill={WOOD.accent} stroke={WOOD.ink} strokeWidth="2.5" />
    <line x1="0" y1="-18" x2="0" y2="-34" stroke={WOOD.ink} strokeWidth="3" />
    <circle cx="0" cy="-36" r="4" fill={WOOD.accent} />
  </g>
);

const tornPts = (x: number, y: number, w: number, h: number, seed: number, amp = 9) => {
  const pts: string[] = [];
  const step = 22;
  const jit = (i: number) => (rnd(seed + i * 3.7) - 0.5) * 2 * amp;
  let k = 0;
  for (let px = 0; px <= w; px += step) pts.push(`${x + px},${y + jit(k++)}`);
  for (let py = 0; py <= h; py += step) pts.push(`${x + w + jit(k++)},${y + py}`);
  for (let px = w; px >= 0; px -= step) pts.push(`${x + px},${y + h + jit(k++)}`);
  for (let py = h; py >= 0; py -= step) pts.push(`${x + jit(k++)},${y + py}`);
  return pts.join(" ");
};

const SERIF2 = "Georgia, 'Times New Roman', serif";
const SANS2 = "Impact, 'Arial Black', 'DejaVu Sans', sans-serif";
const HAND2 = "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', cursive";

const slotPos = (i: number) => {
  const col = i % 5;
  const row = Math.floor(i / 5);
  const c = row % 2 ? 4 - col : col;
  return { x: 560 + c * 800, y: 520 + row * 860 + (c % 2 ? 130 : -130), rot: (((i * 37) % 11) - 5) * 1.0 };
};

const SIZE: Record<string, { w: number; h: number; card: boolean }> = {
  icon: { w: 500, h: 580, card: true },
  strip: { w: 400, h: 560, card: true },
  date: { w: 600, h: 340, card: false },
  count: { w: 580, h: 360, card: true },
  bars: { w: 620, h: 470, card: true },
  flow: { w: 500, h: 500, card: true },
  compare: { w: 660, h: 340, card: true },
  word: { w: 760, h: 220, card: false },
  note: { w: 200, h: 180, card: false },
};

type FCue = { j: number; gf: number; type: string; arg: string; scene: number; x: number; y: number; rot: number; circleGf?: number };
type CamKey = { f: number; x: number; y: number; s: number; r: number };

const buildFilm = (scenes: SceneData[], fps: number) => {
  let start = 0;
  const sceneStart: number[] = [];
  const sceneFrames: number[] = [];
  const cues: FCue[] = [];
  scenes.forEach((s, si) => {
    const frames = Math.ceil(s.duration * fps);
    sceneStart.push(start);
    sceneFrames.push(frames);
    (s.cues || []).forEach((c) => {
      if (typeof c.t !== "number") return;
      const gf = start + Math.round(c.t * fps);
      if (c.type === "circle") {
        if (cues.length) cues[cues.length - 1].circleGf = gf;
        return;
      }
      const j = cues.length;
      const p = slotPos(j);
      cues.push({ j, gf, type: SIZE[c.type] ? c.type : "word", arg: c.arg, scene: si, x: p.x, y: p.y, rot: p.rot });
    });
    start += frames;
  });
  const total = start;
  const camScale = (t: string) => {
    const z = SIZE[t] || SIZE.word;
    return Math.max(0.8, Math.min(1.45, Math.min(1000 / z.w, 560 / z.h)));
  };
  const keys: CamKey[] = [{ f: 0, x: cues.length ? cues[0].x - 420 : 500, y: cues.length ? cues[0].y + 80 : 500, s: 0.6, r: -2 }];
  cues.forEach((c) => keys.push({ f: c.gf + 10, x: c.x, y: c.y, s: camScale(c.type), r: -c.rot * 0.5 }));
  if (cues.length) keys.push({ f: total, x: cues[cues.length - 1].x + 320, y: cues[cues.length - 1].y + 50, s: 0.7, r: 0 });
  return { sceneStart, sceneFrames, cues, total, keys };
};

const camAtFilm = (keys: CamKey[], f: number) => {
  if (keys.length < 2) return { x: 500, y: 500, s: 1, r: 0 };
  let i = 0;
  while (i < keys.length - 2 && f >= keys[i + 1].f) i++;
  const a = keys[i], b = keys[i + 1];
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const dur = Math.max(20, Math.min(44, Math.round(dist / 20)));
  const ms = Math.max(a.f, b.f - dur);
  if (f < ms) {
    const k = clamp01((f - a.f) / Math.max(1, ms - a.f));
    return { x: a.x, y: a.y, s: a.s * (1 + 0.035 * k), r: a.r };
  }
  const t = ease(clamp01((f - ms) / Math.max(1, b.f - ms)));
  const sa = a.s * 1.035;
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, s: sa + (b.s - sa) * t, r: a.r + (b.r - a.r) * t };
};

/* ---- the things lying on the desk (all drawn around their own centre 0,0) ---- */

const Tape: React.FC<{ y: number; rot?: number }> = ({ y, rot = -3 }) => (
  <rect x="-60" y={y} width="120" height="34" fill="#C9C2A8" opacity="0.88" transform={`rotate(${rot})`} />
);

const PolaroidIcon: React.FC<{ arg: string; a: number; pal: Pal; id: string }> = ({ arg, a, pal, id }) => {
  const [name, label] = arg.split("|");
  const draw = ICONS[(name || "").trim().toLowerCase()] || ICONS.star;
  const p = interpolate(a, [10, 40], [0, 1], clamp);
  return (
    <g>
      <rect x="-250" y="-290" width="500" height="580" fill="#F7F4EC" />
      <rect x="-224" y="-264" width="448" height="430" fill={pal.dark} />
      {Array.from({ length: 16 }).map((_, i) => (
        <circle key={i} cx={-215 + rnd(i + 2 + id.length) * 430} cy={-255 + rnd(i + 8) * 410} r={1 + rnd(i) * 2} fill={pal.light} opacity="0.55" />
      ))}
      <circle cx="0" cy="-50" r="168" fill={pal.bg} stroke={pal.dark} strokeWidth="5" />
      <g transform="translate(-150 -200) scale(3)" style={{ opacity: p > 0.01 ? 1 : 0 }}>
        <g fill="none" stroke={pal.light} strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round">{draw(p)}</g>
      </g>
      {label ? (
        <g transform="rotate(-3)">
          <rect x="-160" y="184" width="320" height="62" fill="#111" />
          <text x="0" y="230" textAnchor="middle" fontFamily={SANS2} fontSize={label.trim().length > 16 ? 28 : 36} fill="#FFF" letterSpacing="3">{label.trim().toUpperCase()}</text>
        </g>
      ) : null}
      <Tape y={-306} />
    </g>
  );
};

const StripSpace: React.FC<{ a: number; f: number; pal: Pal }> = ({ a, f, pal }) => {
  const reveal = prog(a, 8, 46);
  const H = Math.max(6, 560 * reveal);
  const cid = `stripc-${Math.round(f / 1000)}`;
  return (
    <g>
      <polygon points={tornPts(-200, -280, 400, H, 5, 10)} fill="#FFFFFF" />
      <clipPath id="stripClipF"><polygon points={tornPts(-186, -270, 372, Math.max(4, H - 20), 11, 3)} /></clipPath>
      <g clipPath="url(#stripClipF)">
        <rect x="-186" y="-270" width="372" height="540" fill={WOOD.sky} />
        {Array.from({ length: 36 }).map((_, i) => (
          <circle key={i} cx={-176 + rnd(i + 1) * 352} cy={-260 + rnd(i + 9) * 520} r={1 + rnd(i + 5) * 2.2} fill="#F4ECD6" opacity={0.5 + 0.5 * Math.abs(Math.sin(f / 12 + i))} />
        ))}
        <circle cx="130" cy="-180" r="40" fill={WOOD.accent} stroke={WOOD.ink} strokeWidth="4" />
        <circle cx="0" cy="600" r="420" fill={WOOD.earth} stroke={WOOD.ink} strokeWidth="6" />
        {[0, 1, 2, 3].map((k) => (
          <circle key={k} cx="0" cy="600" r={398 - k * 34} fill="none" stroke={k % 2 ? WOOD.earth2 : WOOD.light} strokeWidth="5" strokeDasharray="34 26" strokeDashoffset={-f * (1.2 + k * 0.4)} opacity="0.5" />
        ))}
        <g transform={`translate(${Math.sin(f / 34) * 70} ${-20 + Math.cos(f / 34) * 40}) scale(1.25)`}>
          <SatelliteArt spin={Math.sin(f / 40) * 8} />
        </g>
      </g>
    </g>
  );
};

const DateLabel: React.FC<{ arg: string; a: number }> = ({ arg, a }) => {
  const [main, sub] = arg.split("|");
  const hi = prog(a, 12, 34);
  return (
    <g>
      <rect x={-290} y={30 - 70 * hi} width={560 * hi} height="66" fill="#D8C21B" transform="rotate(-3)" opacity="0.95" />
      <text x="-290" y="0" fontFamily={SERIF2} fontWeight="900" fontSize={(main || "").length > 6 ? 150 : 200} fill="#1E1E1E" letterSpacing="-5">{(main || "").trim()}</text>
      {sub ? <text x="-60" y="125" fontFamily={SANS2} fontSize="80" fill="#1E1E1E" letterSpacing="8" transform="rotate(-3)">{sub.trim()}</text> : null}
    </g>
  );
};

const WordLabel: React.FC<{ arg: string; a: number }> = ({ arg, a }) => {
  const hi = prog(a, 10, 30);
  const text = arg.trim();
  const size = text.length > 20 ? 62 : text.length > 12 ? 82 : 110;
  return (
    <g>
      <rect x={-340} y={size * 0.1 - 4} width={680 * hi} height={size * 0.32} fill="#D8C21B" transform="rotate(-2)" opacity="0.95" />
      <text x="0" y={size * 0.34} textAnchor="middle" fontFamily={SERIF2} fontWeight="900" fontSize={size} fill="#1E1E1E">{text}</text>
    </g>
  );
};

const CountCard: React.FC<{ arg: string; a: number; pal: Pal }> = ({ arg, a, pal }) => {
  const [v, suffix, label] = arg.split("|");
  const n = parseFloat(v);
  const k = interpolate(a, [10, 40], [0, 1], clamp);
  const e = 1 - Math.pow(1 - k, 3);
  const shown = Number.isInteger(n) ? String(Math.round(n * e)) : (n * e).toFixed(1);
  return (
    <g>
      <polygon points={tornPts(-290, -180, 580, 360, 21, 10)} fill="#FFFFFF" />
      <rect x={-250} y={26} width={Math.min(500, 120 + (shown.length * 70))} height="54" fill="#D8C21B" transform="rotate(-2)" opacity="0.95" />
      <text x="-250" y="40" fontFamily={SERIF2} fontWeight="900" fontSize="230" fill="#1E1E1E" letterSpacing="-6">{shown}</text>
      <text x={-250 + shown.length * 118 + 20} y="40" fontFamily={SANS2} fontSize="76" fill={WOOD.accent} letterSpacing="4">{(suffix || "").trim().toUpperCase()}</text>
      {label ? <text x="-250" y="142" fontFamily={HAND2} fontWeight="700" fontSize="38" fill="#2B2B2B">{label.trim()}</text> : null}
    </g>
  );
};

const BarsCard: React.FC<{ arg: string; a: number; pal: Pal }> = ({ arg, a, pal }) => {
  const [list, title] = arg.split("|");
  const rows = (list || "").split(";").map((r) => {
    const [name, val] = r.split("=");
    return { name: (name || "").trim(), val: parseFloat(val) || 0 };
  });
  const max = Math.max(...rows.map((r) => r.val), 1);
  const cols = [pal.bg, WOOD.accent, pal.dark, "#3E6CA8"];
  const rowH = Math.min(96, 330 / Math.max(rows.length, 1));
  return (
    <g>
      <polygon points={tornPts(-310, -235, 620, 470, 33, 10)} fill="#FBFAF4" />
      {Array.from({ length: 9 }).map((_, i) => (<line key={i} x1="-296" y1={-170 + i * 46} x2="296" y2={-170 + i * 46} stroke="#9DB8DD" strokeWidth="2" opacity="0.7" />))}
      {title ? <text x="0" y="-188" textAnchor="middle" fontFamily={HAND2} fontWeight="700" fontSize="31" fill="#1E1E1E">{title.trim()}</text> : null}
      {rows.map((r, i) => {
        const g = prog(a, 14 + i * 7, 38 + i * 7);
        const y = -130 + i * rowH;
        return (
          <g key={i}>
            <text x="-286" y={y + rowH * 0.5} fontFamily={SANS2} fontSize="34" fill="#1E1E1E">{r.name.toUpperCase()}</text>
            <polygon points={tornPts(-130, y + 6, Math.max(10, (r.val / max) * 340 * g), rowH - 22, 40 + i, 5)} fill={cols[i % cols.length]} stroke="#1E1E1E" strokeWidth="3" />
            <text x={-130 + (r.val / max) * 340 * g + 14} y={y + rowH * 0.55} fontFamily={SANS2} fontSize="34" fill="#1E1E1E" opacity={g}>{Number.isInteger(r.val) ? Math.round(r.val * g) : (r.val * g).toFixed(1)}</text>
          </g>
        );
      })}
    </g>
  );
};

const FlowCard: React.FC<{ arg: string; a: number; pal: Pal }> = ({ arg, a, pal }) => {
  const items = arg.split(">").map((s) => s.trim()).filter(Boolean);
  const n = items.length;
  const bh = n >= 5 ? 62 : 74;
  const gap = n >= 5 ? 38 : 50;
  const total = n * bh + (n - 1) * gap;
  return (
    <g>
      {items.map((it, i) => {
        const y = -total / 2 + i * (bh + gap);
        const t = prog(a, 10 + i * 12, 24 + i * 12);
        const ar = prog(a, 16 + i * 12, 30 + i * 12);
        return (
          <g key={i}>
            {i > 0 ? (
              <g transform={`translate(0 ${y - gap})`} opacity={ar}>
                <path d={`M0 6 L0 ${gap - 8}`} fill="none" stroke="#D3121A" strokeWidth="9" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - ar} />
                <path d={`M-14 ${gap - 24} L0 ${gap - 6} L14 ${gap - 24}`} fill="none" stroke="#D3121A" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ) : null}
            <g transform={`translate(0 ${y + bh / 2}) scale(${t}) rotate(${(i % 2 ? 1.5 : -1.5)})`} opacity={Math.min(1, t * 2)}>
              <polygon points={tornPts(-230, -bh / 2, 460, bh, 50 + i, 6)} fill="#FFFFFF" stroke="#1E1E1E" strokeWidth="3" />
              <text x="0" y={bh * 0.18} textAnchor="middle" fontFamily={SANS2} fontSize={it.length > 20 ? 30 : 38} fill="#1E1E1E" letterSpacing="1.5">{it.toUpperCase()}</text>
            </g>
          </g>
        );
      })}
    </g>
  );
};

const CompareCard: React.FC<{ arg: string; a: number; pal: Pal }> = ({ arg, a, pal }) => {
  const sides = arg.split("|").map((s) => {
    const [t, ...rest] = s.split("=");
    return { title: (t || "").trim(), text: rest.join("=").trim() };
  });
  const wrap = (t: string) => {
    const words = t.split(" ");
    const lines: string[] = [];
    let cur = "";
    words.forEach((w) => {
      if ((cur + " " + w).trim().length > 14) {
        lines.push(cur.trim());
        cur = w;
      } else cur = (cur + " " + w).trim();
    });
    if (cur) lines.push(cur);
    return lines;
  };
  return (
    <g>
      {sides.slice(0, 2).map((s, i) => {
        const t = prog(a, 10 + i * 12, 28 + i * 12);
        const x = i === 0 ? -170 : 170;
        return (
          <g key={i} transform={`translate(${x} 0) rotate(${i === 0 ? -3 : 3}) scale(${t})`} opacity={Math.min(1, t * 2)}>
            <rect x="-135" y="-150" width="270" height="300" fill="#F7F4EC" />
            <rect x="-118" y="-134" width="236" height="82" fill={i === 0 ? pal.dark : WOOD.accent} />
            <text x="0" y="-80" textAnchor="middle" fontFamily={SANS2} fontSize={s.title.length > 9 ? 32 : 40} fill="#FFF" letterSpacing="3">{s.title.toUpperCase()}</text>
            {wrap(s.text).slice(0, 4).map((ln, k) => (<text key={k} x="0" y={-8 + k * 46} textAnchor="middle" fontFamily={HAND2} fontWeight="700" fontSize="34" fill="#1E1E1E">{ln}</text>))}
            <Tape y={-166} rot={i ? 3 : -4} />
          </g>
        );
      })}
      <text x="0" y="14" textAnchor="middle" fontFamily={SANS2} fontSize="62" fill="#D3121A" transform="rotate(-6)">VS</text>
    </g>
  );
};

const NoteCard: React.FC<{ arg: string }> = ({ arg }) => {
  const [big, small] = arg.split("|");
  return (
    <g transform="rotate(6)">
      <rect x="-95" y="-85" width="190" height="170" fill="#F6E35B" />
      <text x="0" y="-8" textAnchor="middle" fontFamily={HAND2} fontWeight="700" fontSize={(big || "").length > 4 ? 44 : 66} fill="#2B2B2B">{(big || "").trim()}</text>
      <text x="0" y="52" textAnchor="middle" fontFamily={HAND2} fontWeight="700" fontSize="40" fill="#2B2B2B">{(small || "").trim()}</text>
    </g>
  );
};

const MarkerCircle: React.FC<{ w: number; h: number; p: number }> = ({ w, h, p }) => (
  <g transform={`scale(${(w / 2 + 40) / 230} ${(h / 2 + 40) / 215})`}>
    <path d="M-210 -10 C-205 -150 -60 -215 90 -190 C220 -170 235 -40 205 60 C175 160 20 220 -110 175 C-210 140 -225 40 -190 -60" fill="none" stroke="#D3121A" strokeWidth={15 / (((w / 2 + 40) / 230 + (h / 2 + 40) / 215) / 2)} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} opacity="0.95" />
  </g>
);

const FilmWorld: React.FC<{ film: ReturnType<typeof buildFilm>; f: number; pal: Pal; active: number }> = ({ film, f, pal, active }) => {
  const cam = camAtFilm(film.keys, f);
  const visible = film.cues.filter((c, i) => i >= active - 3 && i <= active + 1 && f >= c.gf - 12);
  const lastCard = (idx: number) => {
    for (let k = idx - 1; k >= 0; k--) if (SIZE[film.cues[k].type].card) return film.cues[k];
    return null;
  };
  return (
    <g>
      <rect x="-1200" y="-1200" width="9000" height="9000" fill="url(#deskPat)" />
      {/* red strings between neighbouring cards */}
      {visible.map((c) => {
        if (!SIZE[c.type].card) return null;
        const p = lastCard(c.j);
        if (!p) return null;
        const sp = prog(f, c.gf - 4, c.gf + 22);
        const x1 = p.x, y1 = p.y - SIZE[p.type].h / 2 + 16;
        const x2 = c.x, y2 = c.y - SIZE[c.type].h / 2 + 16;
        return (
          <path key={`st${c.j}`} d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.max(y1, y2) + 140} ${x2} ${y2}`} fill="none" stroke="#8C1B1B" strokeWidth="7" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - sp} />
        );
      })}
      {visible.map((c) => {
        const a = f - (c.gf - 10);
        const t = prog(a, 0, 16);
        const lift = 1 - t;
        const dist = Math.hypot(c.x - cam.x, c.y - cam.y) * cam.s;
        const blur = clamp01((dist - 560) / 520) * 4.2 + lift * 3;
        const sh = 7 + 40 * lift;
        const z = SIZE[c.type];
        const rot = c.rot + (rnd(c.j + 3) - 0.5) * 16 * lift;
        const id = `fx${c.j}`;
        let body: React.ReactNode;
        switch (c.type) {
          case "icon": body = <PolaroidIcon arg={c.arg} a={a} pal={pal} id={id} />; break;
          case "strip": body = <StripSpace a={a} f={f} pal={pal} />; break;
          case "date": body = <DateLabel arg={c.arg} a={a} />; break;
          case "count": body = <CountCard arg={c.arg} a={a} pal={pal} />; break;
          case "bars": body = <BarsCard arg={c.arg} a={a} pal={pal} />; break;
          case "flow": body = <FlowCard arg={c.arg} a={a} pal={pal} />; break;
          case "compare": body = <CompareCard arg={c.arg} a={a} pal={pal} />; break;
          case "note": body = <NoteCard arg={c.arg} />; break;
          default: body = <WordLabel arg={c.arg} a={a} />;
        }
        const cp = c.circleGf !== undefined ? prog(f, c.circleGf, c.circleGf + 24) : 0;
        return (
          <g key={c.j} opacity={t > 0.01 ? Math.min(1, t * 3) : 0} transform={`translate(${c.x} ${c.y}) translate(0 ${-110 * lift}) rotate(${rot}) scale(${1 + 0.16 * lift})`} filter={`url(#${id})`}>
            <filter id={id} x="-25%" y="-25%" width="150%" height="160%">
              <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="bl" />
              <feDropShadow in="bl" dx={sh * 0.7} dy={sh} stdDeviation={6 + sh * 0.55} floodColor="#241d12" floodOpacity={SIZE[c.type].card || c.type === "note" ? 0.3 + 0.12 * lift : 0} />
            </filter>
            {body}
            {z.card ? <circle cx="0" cy={-z.h / 2 + 16} r="13" fill="#D8412F" stroke="#5A1010" strokeWidth="3" /> : null}
            {cp > 0.01 ? <MarkerCircle w={z.w} h={z.h} p={cp} /> : null}
          </g>
        );
      })}
    </g>
  );
};

const FilmView: React.FC<{ scenes: SceneData[]; fps: number; pal: Pal }> = ({ scenes, fps, pal }) => {
  const frame = useCurrentFrame();
  const film = React.useMemo(() => buildFilm(scenes, fps), [scenes, fps]);
  const cam = camAtFilm(film.keys, frame);
  const prev = camAtFilm(film.keys, frame - 1);
  const next = camAtFilm(film.keys, frame + 1);
  const speed = Math.hypot(cam.x - prev.x, cam.y - prev.y) * cam.s;
  const whip = clamp01((speed - 16) / 44) * 6;
  const vx = (next.x - prev.x) / 2;
  const tilt = 14 - 9 * clamp01((cam.s - 0.6) / 0.7);
  const sway = Math.max(-5, Math.min(5, -vx * 0.1));
  const shake = { x: Math.sin(frame * 1.7) * 1.0, y: Math.cos(frame * 2.1) * 1.0 };

  let si = 0;
  film.sceneStart.forEach((st, i) => {
    if (frame >= st) si = i;
  });
  const scene = scenes[si];
  const local = frame - film.sceneStart[si];
  const t = local / fps;

  let active = -1;
  film.cues.forEach((c, i) => {
    if (frame >= c.gf - 12) active = i;
  });
  // glitch when the camera has to jump far
  let glitch = false;
  film.cues.forEach((c, i) => {
    if (i === 0) return;
    const p = film.cues[i - 1];
    if (Math.hypot(c.x - p.x, c.y - p.y) > 1100 && frame >= c.gf - 2 && frame <= c.gf + 7) glitch = true;
  });

  const shape = scene.mouth && scene.mouth.length ? scene.mouth[Math.min(local, scene.mouth.length - 1)] : undefined;
  const blink = (frame + 11) % 84 >= 80;
  const rise = 1 - prog(frame, 6, 30);
  const hop = scene.mood === "laugh" ? -Math.abs(Math.sin(frame / 3.2)) * 10 : scene.mood === "shock" ? Math.sin(frame * 2.2) * 3 : Math.sin(frame / 9) * 3;
  const accentPop = spring({ frame: local - 6, fps, config: { damping: 7 } });
  const accent = scene.mood === "shock" ? "!" : scene.mood === "think" ? "?" : scene.mood === "laugh" ? "HA!" : "";

  let idx = 0;
  scene.words.forEach((w, i) => {
    if (w.t <= t) idx = i;
  });
  const CH = 7;
  const chunkStart = Math.floor(idx / CH) * CH;
  const chunk = scene.words.slice(chunkStart, chunkStart + CH);
  const titleIn = spring({ frame: local - 4, fps, config: { damping: 13 } });
  const titleOut = interpolate(local, [fps * 2.6, fps * 3.1], [1, 0], clamp);

  const view = `translate(${700 + shake.x} ${330 + shake.y}) rotate(${cam.r}) scale(${cam.s}) translate(${-cam.x} ${-cam.y})`;

  return (
    <AbsoluteFill style={{ backgroundColor: "#17150f" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1280, height: 720, transform: "scale(1.5)", transformOrigin: "0 0", overflow: "hidden", perspective: "1300px" }}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(1.14) rotateX(${tilt}deg) rotateY(${sway}deg)`, transformOrigin: "50% 62%", filter: `blur(${whip}px)` }}>
          <svg viewBox="0 0 1280 720" width="1280" height="720" style={{ display: "block" }}>
            <defs>
              <pattern id="deskPat" width="700" height="700" patternUnits="userSpaceOnUse">
                <rect width="700" height="700" fill="#E3DED4" />
                <rect width="700" height="700" filter="url(#deskFib)" opacity="0.55" />
              </pattern>
              <filter id="deskFib" x="0" y="0" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.035 0.6" numOctaves="3" seed="8" stitchTiles="stitch" result="n" />
                <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.3  0 0 0 0 0.27  0 0 0 0 0.22  0 0 0 1.1 -0.45" />
              </filter>
              <g id="WF"><FilmWorld film={film} f={frame} pal={pal} active={active} /></g>
            </defs>
            <g transform={view}><use href="#WF" /></g>
            {glitch
              ? Array.from({ length: 7 }).map((_, i) => {
                  const y = rnd(frame * 3 + i) * 700;
                  const h = 20 + rnd(frame + i * 5) * 60;
                  const dx = (rnd(frame * 7 + i * 2) - 0.5) * 160;
                  return (
                    <g key={i}>
                      <clipPath id={`gsF${i}`}><rect x="0" y={y} width="1280" height={h} /></clipPath>
                      <g clipPath={`url(#gsF${i})`}>
                        <rect width="1280" height="720" fill="#222" />
                        <g transform={`translate(${dx} 0)`}><g transform={view}><use href="#WF" /></g></g>
                        <rect x="0" y={y} width="1280" height={h} fill="#00E5FF" opacity="0.16" />
                      </g>
                    </g>
                  );
                })
              : null}
          </svg>
        </div>
        {/* window light + frame shadows sliding over the desk */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", mixBlendMode: "multiply", opacity: 0.5 }}>
          <div style={{ position: "absolute", left: 380 + Math.sin(frame / 90) * 60, top: -100, width: 60, height: 950, background: "rgba(90,80,60,0.30)", transform: "rotate(18deg)" }} />
          <div style={{ position: "absolute", left: 760 + Math.sin(frame / 90) * 60, top: -100, width: 60, height: 950, background: "rgba(90,80,60,0.24)", transform: "rotate(18deg)" }} />
        </div>
        <div style={{ position: "absolute", left: 0, top: 0, width: 640, height: 720, pointerEvents: "none", background: "radial-gradient(ellipse at 0% 0%, rgba(255,179,71,0.38), rgba(255,179,71,0) 70%)", mixBlendMode: "screen" }} />
        <svg width="1280" height="720" style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}>
          <defs>
            <radialGradient id="vigF" cx="50%" cy="50%" r="75%"><stop offset="55%" stopColor="#000" stopOpacity="0" /><stop offset="100%" stopColor="#000" stopOpacity="0.5" /></radialGradient>
            <filter id="grainF" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed="2" result="n" />
              <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 -0.4" />
            </filter>
          </defs>
          <rect width="1280" height="720" fill="url(#vigF)" />
          <rect width="1280" height="720" filter="url(#grainF)" opacity="0.18" />
          {Array.from({ length: 30 }).map((_, i) => {
            const x = ((rnd(i + 1) * 1340 + frame * (0.3 + rnd(i + 4) * 0.6)) % 1340) - 30;
            const y = ((rnd(i + 20) * 800 - frame * (0.2 + rnd(i + 8) * 0.5) + 800) % 760) - 20;
            return <circle key={i} cx={x} cy={y} r={1 + rnd(i + 6) * 2.4} fill="#FFF4D0" opacity={0.15 + 0.35 * rnd(i + 12)} />;
          })}
        </svg>

        {scene.big ? (
          <div style={{ position: "absolute", left: 40, top: 28, fontFamily: FONT, fontWeight: 900, fontSize: 34, color: pal.light, backgroundColor: pal.dark, padding: "8px 24px", borderRadius: 6, opacity: titleOut, transform: `translateX(${interpolate(titleIn, [0, 1], [-500, 0])}px) rotate(-1.5deg)`, boxShadow: "6px 8px 14px rgba(0,0,0,0.35)" }}>
            {scene.big}
          </div>
        ) : null}

        {/* Professor Alienstein as a paper cut-out sticker */}
        <div style={{ position: "absolute", left: 8, bottom: -34 - rise * 340 - hop, width: 250, height: 312 }}>
          <svg viewBox="62 32 256 312" width="250" height="312" style={{ overflow: "visible" }}>
            <defs>
              <filter id="cutF" x="-25%" y="-25%" width="150%" height="150%">
                <feMorphology in="SourceAlpha" operator="dilate" radius="6" result="d" />
                <feFlood floodColor="#FFFFFF" result="w" />
                <feComposite in="w" in2="d" operator="in" result="white" />
                <feDropShadow in="white" dx="6" dy="10" stdDeviation="7" floodColor="#1d160a" floodOpacity="0.45" result="sh" />
                <feMerge><feMergeNode in="sh" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <g filter="url(#cutF)">
              <Character mood={scene.mood} mouthShape={shape} blink={blink} />
            </g>
          </svg>
          {accent ? <div style={{ position: "absolute", left: 200, top: 8, fontSize: scene.mood === "laugh" ? 38 : 62, fontWeight: 900, color: pal.dark, fontFamily: FONT, transform: `scale(${accentPop}) rotate(12deg)`, textShadow: "0 0 6px #fff, 0 0 6px #fff" }}>{accent}</div> : null}
        </div>

        <div style={{ position: "absolute", left: 280, width: 760, bottom: 24, padding: "10px 20px", borderRadius: 14, backgroundColor: "rgba(0,0,0,0.58)", textAlign: "center", fontFamily: FONT, fontWeight: 800, fontSize: 36, color: "#FFFFFF", minHeight: 52 }}>
          {chunk.map((w, i) => (
            <span key={i} style={{ color: chunkStart + i === idx ? pal.accent : "#FFFFFF", marginRight: 10 }}>{w.w}</span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const FilmEpisode: React.FC<EpisodeProps> = ({ fps, scenes, palette }) => {
  const pal = getPal(palette);
  if (!scenes || scenes.length === 0) {
    return (
      <AbsoluteFill style={{ backgroundColor: pal.bg, alignItems: "center", justifyContent: "center", fontSize: 50, fontFamily: "Arial" }}>
        scenes.json not found. Run speak_scenes.py first.
      </AbsoluteFill>
    );
  }
  const film = React.useMemo(() => buildFilm(scenes, fps), [scenes, fps]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#17150f" }}>
      <FilmView scenes={scenes} fps={fps} pal={pal} />
      {scenes.map((s, i) => (
        <Sequence key={`a${s.id}`} from={film.sceneStart[i]} durationInFrames={film.sceneFrames[i]}>
          <AudioPlayer src={staticFile(s.audio)} />
        </Sequence>
      ))}
      {film.cues.map((c) => {
        const name = c.type === "note" ? "pop" : c.type === "date" || c.type === "word" ? "whoosh" : c.type === "strip" ? "whoosh" : BEAT_SFX[c.type] || "pop";
        return (
          <React.Fragment key={`s${c.j}`}>
            <Sequence from={Math.max(0, c.gf - 10)} durationInFrames={50}>
              <AudioPlayer src={staticFile("sfx/whoosh.wav")} volume={0.22} />
            </Sequence>
            <Sequence from={Math.max(0, c.gf + 4)} durationInFrames={50}>
              <AudioPlayer src={staticFile(`sfx/${name}.wav`)} volume={0.4} />
            </Sequence>
            {c.type === "count" ? (
              <Sequence from={c.gf + 34} durationInFrames={50}>
                <AudioPlayer src={staticFile("sfx/ding.wav")} volume={0.35} />
              </Sequence>
            ) : null}
            {c.circleGf !== undefined ? (
              <Sequence from={c.circleGf} durationInFrames={40}>
                <AudioPlayer src={staticFile("sfx/typing.wav")} volume={0.3} />
              </Sequence>
            ) : null}
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};

// Root.tsx renders <MyComposition />, which registers our videos with Remotion
export const MyComposition: React.FC = () => {
  return (
    <>
      <Composition id="Episode" component={Episode} durationInFrames={90} fps={30} width={1920} height={1080} defaultProps={{ fps: 30, scenes: [] as SceneData[], palette: "sunrise" }} calculateMetadata={calculateEpisodeMetadata} />
      <Composition id="Film" component={FilmEpisode} durationInFrames={90} fps={30} width={1920} height={1080} defaultProps={{ fps: 30, scenes: [] as SceneData[], palette: "sunrise" }} calculateMetadata={calculateEpisodeMetadata} />
      <Composition id="MyComp" component={Intro} durationInFrames={90} fps={30} width={1280} height={720} />
    </>
  );
};
