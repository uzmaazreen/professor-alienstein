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

// Root.tsx renders <MyComposition />, which registers our videos with Remotion
export const MyComposition: React.FC = () => {
  return (
    <>
      <Composition id="Episode" component={Episode} durationInFrames={90} fps={30} width={1920} height={1080} defaultProps={{ fps: 30, scenes: [] as SceneData[], palette: "sunrise" }} calculateMetadata={calculateEpisodeMetadata} />
      <Composition id="MyComp" component={Intro} durationInFrames={90} fps={30} width={1280} height={720} />
    </>
  );
};
