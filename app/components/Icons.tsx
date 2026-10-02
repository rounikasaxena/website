import { useId } from "react";
import type { SectionId } from "@/data/content";

/* ------------------------------------------------------------------
   Frutiger Aero app icons: glossy squircle, bright gradient, white
   glyph, shine on top. Used in the wheel and the mobile tab bar.
------------------------------------------------------------------- */
const AERO: Record<SectionId, [string, string, string]> = {
  //        top        bottom     glyph shadow
  about: ["#8FDCFF", "#1579D9", "#0A4E9A"],
  projects: ["#8CF0E4", "#0E9C9A", "#076866"],
  contact: ["#B9F27A", "#2F9E3C", "#1C6A25"],
  art: ["#FFD27A", "#F2563A", "#A8341F"],
  journal: ["#D9B8FF", "#6B4FD0", "#43308C"],
};

export function AeroIcon({ id, size = 40 }: { id: SectionId; size?: number }) {
  const uid = useId().replace(/:/g, "");
  const [top, bottom, shade] = AERO[id];
  const g = { fill: "#fff" };
  const s = { fill: "none", stroke: "#fff", strokeWidth: 2.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id={`bg${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} />
          <stop offset="1" stopColor={bottom} />
        </linearGradient>
        <linearGradient id={`sh${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.05" />
        </linearGradient>
        <filter id={`ds${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1" floodColor={shade} floodOpacity="0.7" />
        </filter>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="12" fill={`url(#bg${uid})`} />
      <rect x="2.5" y="2.5" width="43" height="43" rx="11.5" fill="none" stroke="#fff" strokeOpacity="0.55" />
      <g filter={`url(#ds${uid})`}>
        {id === "about" && (<><circle cx="24" cy="18.5" r="6" {...g} /><path d="M12 37c1.5-7 6.5-10 12-10s10.5 3 12 10z" {...g} /></>)}
        {id === "projects" && (<><path d="M11 16a2.5 2.5 0 0 1 2.5-2.5h7l3 3.5h11a2.5 2.5 0 0 1 2.5 2.5v13a2.5 2.5 0 0 1-2.5 2.5h-21A2.5 2.5 0 0 1 11 32.5z" {...g} /><path d="M11 21.5h26" stroke={bottom} strokeWidth="1.6" /></>)}
        {id === "contact" && (<><rect x="10.5" y="14.5" width="27" height="19" rx="3" {...g} /><path d="M12 17l12 9 12-9" fill="none" stroke={bottom} strokeWidth="2" strokeLinejoin="round" /></>)}
        {id === "art" && (<><path d="M24 11c-7.5 0-13 5.6-13 12.5S16.5 37 23.5 37c2 0 2.8-1.2 2.8-2.6 0-1.5-1.4-2.2-1.4-3.6 0-1.4 1.2-2.3 2.6-2.3h3.2c4.2 0 6.3-2.8 6.3-6C37 15.6 31.5 11 24 11z" {...g} /><circle cx="17.5" cy="23" r="2.1" fill="#F2563A" /><circle cx="21" cy="17" r="2.1" fill="#2BA3E8" /><circle cx="28" cy="16.5" r="2.1" fill="#3FA34D" /><circle cx="31.5" cy="22" r="2.1" fill="#FFC23D" /></>)}
        {id === "journal" && (<><rect x="13" y="10.5" width="21" height="27" rx="2.5" {...g} /><rect x="13" y="10.5" width="4.5" height="27" rx="1.5" fill={top} /><path d="M29 10.5v9l-2.5-2-2.5 2v-9" fill="#FF8A8A" /><path d="M21 28.5l9-4.5-3 8-2-3z" fill={bottom} /><path d="M25 29l5-5" {...s} strokeWidth="1" stroke={bottom} /></>)}
      </g>
      <path d="M5 16c0-6 4-10.5 11-10.5h16c7 0 11 4.5 11 10.5-6 4-32 4-38 0z" fill={`url(#sh${uid})`} />
    </svg>
  );
}

const P = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function SectionIcon({ id, size = 24 }: { id: SectionId; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {id === "about" && (<><circle cx="12" cy="8" r="4" {...P} /><path d="M4 21c1-4 4-6 8-6s7 2 8 6" {...P} /></>)}
      {id === "projects" && (<><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" {...P} /><path d="M3 10h18" {...P} /></>)}
      {id === "contact" && (<><rect x="3" y="5" width="18" height="14" rx="2" {...P} /><path d="M4 7l8 6 8-6" {...P} /></>)}
      {id === "art" && (<><path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5 1-1.5 2-1.5h2a4 4 0 0 0 4-4c0-4.5-4-8-9-8z" {...P} /><circle cx="7.5" cy="11" r="1.3" fill="currentColor" /><circle cx="11" cy="7" r="1.3" fill="currentColor" /><circle cx="16" cy="8" r="1.3" fill="currentColor" /></>)}
      {id === "journal" && (<><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z" {...P} /><path d="M5 17a3 3 0 0 1 3-3h11" {...P} /></>)}
    </svg>
  );
}

export const Play = () => (<svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 3l12 7-12 7z" fill="currentColor" /></svg>);
export const Pause = () => (<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><rect x="2" y="1" width="3.5" height="12" rx="1" fill="currentColor" /><rect x="8.5" y="1" width="3.5" height="12" rx="1" fill="currentColor" /></svg>);
export const Next = () => (<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l10 7-10 7zM18 5v14" {...P} fill="none" /></svg>);
export const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} {...P} strokeWidth={2.2} /></svg>
);
export const Grid = () => (<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1" {...P} /><rect x="14" y="4" width="6" height="6" rx="1" {...P} /><rect x="4" y="14" width="6" height="6" rx="1" {...P} /><rect x="14" y="14" width="6" height="6" rx="1" {...P} /></svg>);
export const Book = () => (<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1z" {...P} /><path d="M12 6v14" {...P} /></svg>);
export const Close = () => (<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" {...P} /></svg>);
