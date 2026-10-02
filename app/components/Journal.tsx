"use client";
import { useCallback, useEffect, useState } from "react";
import { TRIPS, type JournalPage, type Trip } from "@/data/content";
import { Img } from "./Media";
import { Book, Chevron, Close, Grid } from "./Icons";

function PageView({ page, trip, side, label }: { page: JournalPage; trip: Trip; side: "left" | "right"; label: string }) {
  const [a, b, c] = page.photos;
  return (
    <div className={`jpage ${side}`} aria-label={label} style={{ position: "absolute", inset: 0 }}>
      <div className="ph ph1"><Img src={a ?? ""} alt="" colors={trip.colors} addLabel="PHOTO" dashed={false} /></div>
      <div className="tape" />
      <div className="ph ph2"><Img src={b ?? ""} alt="" colors={[trip.colors[1], trip.colors[0]]} addLabel="PHOTO" dashed={false} /></div>
      <div className="ph ph3"><Img src={c ?? ""} alt="" colors={trip.colors} addLabel="PHOTO" dashed={false} /></div>
      <div className="jt">{page.title}{side === "left" && <><br /><small style={{ fontSize: "0.7em", fontWeight: 400 }}>{trip.place} · {trip.date}</small></>}</div>
      <div className="jx">{page.text}</div>
      <span className="sticker" style={{ width: "8%", aspectRatio: 1, left: "86%", top: "86%", background: "#E2572B" }} />
      <span className="sticker" style={{ width: "6%", aspectRatio: 1, left: "80%", top: "78%", background: "#FFC66B" }} />
      {side === "right" && <span className="curl" />}
    </div>
  );
}

export default function Journal({ onClose }: { onClose: () => void }) {
  const [t, setT] = useState(0);
  const [s, setS] = useState(0);
  const [flip, setFlip] = useState<null | "next" | "prev">(null);
  const [grid, setGrid] = useState(false);
  const trip = TRIPS[t];
  const spreads = trip.spreads;

  const goTrip = useCallback((n: number) => { setT(((n % TRIPS.length) + TRIPS.length) % TRIPS.length); setS(0); setFlip(null); }, []);
  const next = useCallback(() => {
    if (flip) return;
    if (s < spreads.length - 1) { setFlip("next"); setTimeout(() => { setS((v) => v + 1); setFlip(null); }, 900); }
    else goTrip(t + 1);
  }, [flip, s, spreads.length, t, goTrip]);
  const prev = useCallback(() => {
    if (flip) return;
    if (s > 0) { setFlip("prev"); setTimeout(() => { setS((v) => v - 1); setFlip(null); }, 900); }
    else goTrip(t - 1);
  }, [flip, s, t, goTrip]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [next, prev, onClose]);

  const cur = spreads[s];
  const nextSpread = spreads[s + 1];
  const prevSpread = spreads[s - 1];
  const leftUnder = flip === "prev" && prevSpread ? prevSpread.left : cur.left;
  const rightUnder = flip === "next" && nextSpread ? nextSpread.right : cur.right;

  return (
    <section className="journal" aria-label="Travel journal">
      <div className="topbar">
        <div>
          <button className={`round ${!grid ? "on" : ""}`} aria-label="Book view" onClick={() => setGrid(false)}><Book /></button>
          <button className={`round ${grid ? "on" : ""}`} aria-label="All trips" onClick={() => setGrid(true)}><Grid /></button>
        </div>
        <div><button className="round" aria-label="Close journal" onClick={onClose}><Close /></button></div>
      </div>
      <h1>Journal</h1>
      <div className="sub">✈ {TRIPS.length} trips · {trip.name} · click a page to flip</div>

      {grid ? (
        <div className="trip-grid">
          {TRIPS.map((tr, i) => (
            <button key={i} onClick={() => { goTrip(i); setGrid(false); }} aria-label={`Open ${tr.name}`}>
              <Img src={tr.cover} alt="" colors={tr.colors} addLabel="COVER" hint={`trips[${i}].cover`} style={{ height: "100%", border: 0 }} />
              <span>{tr.name} · {tr.date}</span>
            </button>
          ))}
        </div>
      ) : (
        <>
          <div className="flow" style={{ ["--half" as string]: "min(320px, 43vw)" }}>
            {TRIPS.map((tr, j) => {
              let k = j - t; // wrap so pages show on both sides
              if (k > TRIPS.length / 2) k -= TRIPS.length;
              if (k < -TRIPS.length / 2) k += TRIPS.length;
              if (k === 0 || Math.abs(k) > 6) return null;
              const h = 380 - Math.abs(k) * 18;
              const off = 30 + (Math.abs(k) - 1) * 26;
              return (
                <button key={j} className="side-page" aria-label={`Go to ${tr.name}`} onClick={() => goTrip(j)}
                  style={{
                    height: h, top: -h / 2,
                    left: k < 0 ? `calc(50% - var(--half) - ${off + 70}px)` : `calc(50% + var(--half) + ${off}px)`,
                    transform: `rotateY(${k < 0 ? 55 : -55}deg)`, zIndex: 10 - Math.abs(k),
                    background: `linear-gradient(180deg, ${tr.colors[0]}, ${tr.colors[1]})`,
                  }}>
                  {tr.cover && <Img src={tr.cover} alt="" style={{ height: "100%", border: 0, borderRadius: 0 }} />}
                </button>
              );
            })}
            <div className="spread">
              <button className="jpage left" onClick={prev} aria-label="Previous page" style={{ position: "relative" }}>
                <PageView page={leftUnder} trip={trip} side="left" label="" />
              </button>
              <button className="jpage right" onClick={next} aria-label="Next page" style={{ position: "relative" }}>
                <PageView page={rightUnder} trip={trip} side="right" label="" />
              </button>
              {flip === "next" && nextSpread && (
                <div className="flipper next">
                  <div><PageView page={cur.right} trip={trip} side="right" label="" /></div>
                  <div className="back"><PageView page={nextSpread.left} trip={trip} side="left" label="" /></div>
                </div>
              )}
              {flip === "prev" && prevSpread && (
                <div className="flipper prev">
                  <div><PageView page={cur.left} trip={trip} side="left" label="" /></div>
                  <div className="back"><PageView page={prevSpread.right} trip={trip} side="right" label="" /></div>
                </div>
              )}
            </div>
          </div>
          <div className="actions">
            <button aria-label="Previous trip" onClick={() => goTrip(t - 1)}><Chevron dir="left" /></button>
            <button aria-label="All trips" onClick={() => setGrid(true)}><Grid /></button>
            <button aria-label="Next trip" onClick={() => goTrip(t + 1)}><Chevron dir="right" /></button>
          </div>
        </>
      )}
    </section>
  );
}
