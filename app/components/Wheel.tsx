"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import type { SectionId } from "@/data/content";
import { PAGES, SECTIONS, countOf } from "../lib/pages";
import { AeroIcon } from "./Icons";

type Geo = { mobile: boolean; R: number; cx: number; cy: number; base: number; step: number; edge: number };

function useGeometry(): Geo {
  const [geo, setGeo] = useState<Geo>({ mobile: false, R: 720, cx: -430, cy: 450, base: 0, step: 13, edge: 290 });
  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth, vh = window.innerHeight;
      const mobile = vw <= 1024;
      if (mobile) {
        const R = 760;
        setGeo({ mobile, R, cx: vw / 2, cy: 200 - R, base: 90, step: (128 / R) * (180 / Math.PI), edge: 0 });
      } else {
        const R = Math.min(780, Math.max(500, vh * 0.82));
        const edge = Math.min(310, Math.max(220, vw * 0.19));
        setGeo({ mobile, R, cx: edge - R, cy: vh / 2, base: 0, step: (168 / R) * (180 / Math.PI), edge });
        document.documentElement.style.setProperty("--wheel-edge", `${edge}px`);
      }
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return geo;
}

/**
 * The wheel shows every page of the site in one line:
 * About → Projects (×6) → Contact → Art (×6) → Journal.
 * Scrolling (handled in page.tsx) moves exactly one card at a time.
 */
export default function Wheel({
  index, onIndex, onActivate, onSection,
}: {
  index: number; onIndex: (i: number) => void; onActivate: () => void; onSection: (s: SectionId) => void;
}) {
  const g = useGeometry();
  const drag = useRef<{ start: number; last: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const current = PAGES[index];

  // drag: vertical on desktop, horizontal on mobile — one card per ~90px
  const pos = (e: React.PointerEvent) => (g.mobile ? -e.clientX : e.clientY);
  const onDown = (e: React.PointerEvent) => { drag.current = { start: pos(e), last: pos(e), moved: false }; };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current; if (!d) return;
    if (Math.abs(pos(e) - d.start) > 8) d.moved = true;
    const delta = d.last - pos(e);
    if (Math.abs(delta) > 90) { onIndex(index + Math.sign(delta)); d.last = pos(e); }
  };
  const onUp = () => { if (drag.current?.moved) suppressClick.current = true; drag.current = null; setTimeout(() => (suppressClick.current = false), 0); };

  const maxAngle = g.mobile ? 34 : 60;
  const guideAngles = [-44, -33, -22, -11, 0, 11, 22, 33, 44];
  // Icons follow an inner arc; on smaller screens they're kept from sliding off the left edge.
  // Icons sit on a true circle (same centre as the wheel), evenly spaced by angle.
  const iconR = g.R - 160;
  const ICON_STEP = 12; // degrees between icons
  const rad = (d: number) => (d * Math.PI) / 180;
  const sectionCount = countOf(current.section);

  return (
    <div className="wheel" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
      {!g.mobile && (
        <svg className="guides" aria-hidden="true">
          {guideAngles.map((a) => (
            <line key={a}
              x1={g.cx + (g.R + 95) * Math.cos(rad(a))} y1={g.cy + (g.R + 95) * Math.sin(rad(a))}
              x2={g.cx + (g.R + 520) * Math.cos(rad(a))} y2={g.cy + (g.R + 520) * Math.sin(rad(a))}
              stroke="rgba(255,255,255,0.07)" />
          ))}
        </svg>
      )}
      <div className="wheel-band" style={{ left: g.cx - g.R - 92, top: g.cy - g.R - 92, width: 2 * (g.R + 92), height: 2 * (g.R + 92) }} />
      <div className="wheel-hub" style={{ left: g.cx - g.R + 88, top: g.cy - g.R + 88, width: 2 * (g.R - 88), height: 2 * (g.R - 88) }} />

      {PAGES.map((it, i) => {
        const theta = (i - index) * g.step * (g.mobile ? -1 : 1);
        const active = i === index;
        const hidden = Math.abs(theta) > maxAngle;
        return (
          <button
            key={it.key}
            className={`card ${active ? "is-active" : ""}`}
            aria-label={active ? `Open ${it.label}` : `Go to ${it.label}`}
            aria-current={active}
            tabIndex={hidden ? -1 : 0}
            onClick={() => { if (suppressClick.current) return; if (active) onActivate(); else onIndex(i); }}
            style={{
              left: g.cx, top: g.cy,
              transform: `rotate(${g.base + theta}deg) translateX(${g.R}px) rotate(${-g.base}deg) scale(${active ? 1.18 : 1})`,
              opacity: hidden ? 0 : active ? 1 : 0.62,
              pointerEvents: hidden ? "none" : "auto",
              background: `linear-gradient(135deg, ${it.colors[0]}, ${it.colors[1]})`,
              zIndex: active ? 3 : 2,
            }}
          >
            {it.image ? <img src={it.image} alt="" draggable={false} /> : <span className="card-add">Add photo</span>}
            <span className="card-label">{it.label}</span>
          </button>
        );
      })}

      {!g.mobile && (
        <>
          {/* dots = pages inside the current section */}
          <div className="dots" style={{ left: g.cx + g.R + 104, top: g.cy }} aria-hidden="true">
            {Array.from({ length: sectionCount }).map((_, i) => <i key={i} className={i === current.sub ? "on" : ""} />)}
          </div>
          <nav aria-label="Sections">
            {SECTIONS.map((s, i) => {
              const a = rad((i - (SECTIONS.length - 1) / 2) * ICON_STEP); // centered on the selected card
              const on = current.section === s.id;
              return (
                <button key={s.id} className={`rail-item ${on ? "on" : ""}`} aria-current={on}
                  style={{ left: g.cx + iconR * Math.cos(a), top: g.cy + iconR * Math.sin(a) }}
                  onClick={() => onSection(s.id)}>
                  <span className="rail-icon"><AeroIcon id={s.id} size={36} /></span>
                  <span className="rail-label">{s.label}</span>
                </button>
              );
            })}
          </nav>
        </>
      )}
    </div>
  );
}
