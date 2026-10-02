"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ABOUT, ART_INSTAGRAM, CONTACT, PAINTINGS, PROJECTS, SITE, TRIPS, type Project } from "@/data/content";
import { Img, Video } from "./Media";
import { Chevron, Close } from "./Icons";

/* ------------------------------------------------------------------ */
/* Projects: preview (shown while a project is selected on the wheel)  */
/* ------------------------------------------------------------------ */
export function ProjectPreview({ p, onOpen }: { p: Project; onOpen: () => void }) {
  return (
    <section className="panel preview glass" aria-label={`${p.name} preview`}>
      {/* Video first; the thumbnail is only used if there's no video */}
      {p.video ? (
        <Video src={p.video} title={`${p.name} video`} colors={p.colors} />
      ) : (
        <Img src={p.cover || p.thumbnail} alt={`${p.name} designs`} colors={p.colors} addLabel="VIDEO OR IMAGE" style={{ aspectRatio: "16/9" }} />
      )}
      <div className="preview-foot">
        <div className="grow stack-sm">
          <p className="body" style={{ fontSize: 16, color: "var(--text)" }}>{p.hook}</p>
          <div className="chips">{p.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
        </div>
        <button className="btn" onClick={onOpen}>Open case study →</button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Projects: full case study                                           */
/* ------------------------------------------------------------------ */
const TABS = ["overview", "discovery", "design", "final"] as const;

export function CaseStudy({ p, onClose }: { p: Project; onClose: () => void }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("overview");
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { setTab("overview"); ref.current?.scrollTo({ top: 0, behavior: "smooth" }); }, [p.id]);
  const n = PROJECTS.findIndex((x) => x.id === p.id) + 1;
  const t = TABS.indexOf(tab);
  const shots = p.process.filter((s) => s.image);
  const [zoom, setZoom] = useState<number | null>(null);
  useEffect(() => setZoom(null), [p.id]);

  return (<>
    <section ref={ref} className="panel wide glass" aria-label={`${p.name} case study`} data-scrollable>
      <div className="cs-grid">
        <div className="stack">
          <div className="row" style={{ alignItems: "center" }}>
            <button className="btn ghost sm" onClick={onClose}>‹ All projects</button>
            <span className="grow" />
            <span className="muted" style={{ fontSize: 12 }}>{String(n).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</span>
            <button className="btn ghost icon" aria-label="Close case study" onClick={onClose}><Close /></button>
          </div>
          <div className="cs-title">
            <div>
              <h1 className="h1" style={{ fontSize: 28 }}>{p.name} — {p.subtitle}</h1>
              <p className="muted" style={{ margin: "4px 0 0", fontSize: 13 }}>{p.role} · {p.status} {p.date}{p.tools ? ` · ${p.tools}` : ""}</p>
            </div>
          </div>
          {p.video || !p.cover ? (
            <Video src={p.video} title={`${p.name} video`} colors={p.colors} />
          ) : (
            <Img src={p.cover} alt={`${p.name} designs`} colors={p.colors} style={{ aspectRatio: "16/9" }} />
          )}
          <div className="tiles">
            {[["ROLE", p.role], ["TEAM", p.team], ["TIMELINE", p.timeline], ["STATUS", p.status]].map(([k, v]) => (
              <div key={k} className="tile glass-flat"><b>{k}</b><span>{v}</span></div>
            ))}
          </div>
          <div className="tabs glass-flat" role="tablist" aria-label="Case study sections" style={{ ["--t" as string]: t }}>
            <span className="tab-pill" aria-hidden="true" />
            {TABS.map((x) => (
              <button key={x} role="tab" aria-selected={tab === x} onClick={() => setTab(x)}>{x[0].toUpperCase() + x.slice(1)}</button>
            ))}
          </div>
          <div key={tab} className="tab-body">
            <ul className="bullets" role="tabpanel">
              {p.tabs[tab].map((line, i) => <li key={i}>{line}</li>)}
            </ul>
            {tab === "final" && (
              <div className="stack" style={{ marginTop: 16 }}>
                <div className="eyebrow">What I learned / next time</div>
                <ul className="bullets">{p.lessons.map((l, i) => <li key={i}>{l}</li>)}</ul>
              </div>
            )}
          </div>
        </div>
        <aside className="process" aria-label="Process">
          <div className="eyebrow" style={{ color: "var(--muted)" }}>Process</div>
          {p.process.map((s, i) => {
            const z = shots.indexOf(s);
            const inner = (<>
              <Img src={s.image} alt={s.label} colors={p.colors} addLabel="IMAGE" hint={`process[${i}].image`} style={{ height: 150 }} />
              <span className="cap">{s.label}</span>
            </>);
            return z >= 0
              ? <button key={i} className="proc-shot" onClick={() => setZoom(z)} aria-label={`Enlarge: ${s.label}`}>{inner}</button>
              : <div key={i} style={{ position: "relative" }}>{inner}</div>;
          })}
          <div className="chips">{p.tags.map((x) => <span key={x} className="chip">{x}</span>)}</div>
        </aside>
      </div>
    </section>
    {zoom !== null && <Lightbox shots={shots} index={zoom} onIndex={setZoom} onClose={() => setZoom(null)} />}
  </>);
}

/** Full-screen view of the process photos, with arrows (and ← → keys) to flip through them. */
function Lightbox({ shots, index, onIndex, onClose }: {
  shots: { label: string; image: string; full?: string }[]; index: number; onIndex: (i: number) => void; onClose: () => void;
}) {
  const n = shots.length;
  const go = (d: number) => onIndex((index + d + n) % n);
  useEffect(() => {
    document.body.dataset.lightbox = "1";
    const k = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", k);
    return () => { window.removeEventListener("keydown", k); delete document.body.dataset.lightbox; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);
  const s = shots[index];
  const src = s.full || s.image;
  const [tall, setTall] = useState(false);
  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Process photos" onClick={onClose}>
      <button className="lb-close btn ghost icon" aria-label="Close" onClick={onClose}><Close /></button>
      {n > 1 && <button className="lb-arrow prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); go(-1); }}><Chevron dir="left" /></button>}
      <figure className={tall ? "tall" : ""} onClick={(e) => e.stopPropagation()}>
        <div className="lb-scroll">
          <img key={src} src={src} alt={s.label}
            onLoad={(e) => { const i = e.currentTarget; setTall(i.naturalHeight / i.naturalWidth > 1.5); i.parentElement?.scrollTo({ top: 0 }); }} />
        </div>
        <figcaption>{s.label}{n > 1 && <span> · {index + 1} / {n}</span>}</figcaption>
      </figure>
      {n > 1 && <button className="lb-arrow next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); go(1); }}><Chevron dir="right" /></button>}
    </div>,
    document.body,
  );
}

/* ------------------------------------------------------------------ */
/* About — one page                                                    */
/* ------------------------------------------------------------------ */
function PhotoCarousel() {
  const imgs = ABOUT.gallery;
  const [i, setI] = useState(0);
  const go = (d: number) => setI((n) => (n + d + imgs.length) % imgs.length);
  if (!imgs.length) return <Img src="" alt="" addLabel="YOUR PHOTOS" hint="ABOUT.gallery" style={{ width: 240, height: 300, flexShrink: 0, borderRadius: 18 }} />;
  return (
    <div className="carousel" aria-roledescription="carousel" aria-label="Photos of Rounika">
      {imgs.map((im, k) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={im.src} src={im.src} alt={im.alt} className={k === i ? "on" : ""} style={{ objectPosition: im.focus }} aria-hidden={k !== i} />
      ))}
      {imgs.length > 1 && (
        <>
          <button className="car-btn left" aria-label="Previous photo" onClick={() => go(-1)}><Chevron dir="left" /></button>
          <button className="car-btn right" aria-label="Next photo" onClick={() => go(1)}><Chevron dir="right" /></button>
          <div className="car-dots">{imgs.map((_, k) => <button key={k} className={k === i ? "on" : ""} aria-label={`Photo ${k + 1}`} onClick={() => setI(k)} />)}</div>
        </>
      )}
    </div>
  );
}

export function AboutPanel() {
  return (
    <section className="panel glass stack" aria-label="About me" data-scrollable>
      <div className="row wrap-sm about-hero">
        <PhotoCarousel />
        <div className="grow about-text">
          <h1 className="h1">{ABOUT.heading}</h1>
          {ABOUT.intro.map((para, k) => <p key={k} className="body">{para}</p>)}
        </div>
      </div>
      <div className="eyebrow">Experience</div>
      <div className="xp">
        {ABOUT.experience.map((x) => (
          <div key={x.role + x.org} className="xp-item glass-flat">
            <div className="grow">
              <div className="xp-head"><b>{x.role} · {x.org}</b><span className="xp-date">{x.dates}</span></div>
              <ul className="xp-points">{x.points.map((pt, k) => <li key={k}>{pt}</li>)}</ul>
            </div>
          </div>
        ))}
      </div>
      {ABOUT.photos.length > 0 && (
        <>
          <div className="eyebrow">Off the clock</div>
          <div className="photo-strip">
            {ABOUT.photos.map((p) => (
              <figure key={p.label}>
                <Img src={p.image} alt={p.label} colors={p.colors} addLabel="PHOTO" style={{ height: 190 }} imgStyle={{ objectPosition: p.focus }} />
                <figcaption>{p.label}</figcaption>
              </figure>
            ))}
          </div>
        </>
      )}
      <div className="chips" style={{ gap: 10 }}>
        <a className="btn" href={SITE.resume} download>↓ Download resume</a>
        {ABOUT.bandVideo && <a className="btn ghost" href={ABOUT.bandVideo.replace("/embed/", "/watch?v=")} target="_blank" rel="noreferrer">▶ Watch my band play</a>}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Art — one page per painting                                         */
/* ------------------------------------------------------------------ */
export function ArtPanel({ index, onIndex }: { index: number; onIndex: (i: number) => void }) {
  const p = PAINTINGS[index];
  return (
    <section className="panel glass stack" aria-label="Paintings">
      <div className="mat">
        <Img src={p.image} alt={p.title} colors={p.colors} addLabel="PAINTING" hint={`paintings[${index}].image — high-res photo`} style={{ aspectRatio: "16 / 10", borderRadius: 8, border: 0 }} />
      </div>
      <div className="row" style={{ alignItems: "center" }}>
        <div className="grow">
          <h2 className="h2">{p.title}</h2>
          <div className="muted" style={{ fontSize: 13, marginTop: 3 }}>{p.medium} · {p.size} · {p.year}</div>
        </div>
        <button className="btn ghost icon" aria-label="Previous painting" onClick={() => onIndex(index - 1)} disabled={index === 0}><Chevron dir="left" /></button>
        <button className="btn ghost icon" aria-label="Next painting" onClick={() => onIndex(index + 1)} disabled={index === PAINTINGS.length - 1}><Chevron dir="right" /></button>
      </div>
      <p className="hand">&ldquo;{p.note}&rdquo;</p>
      <div className="thumbs">
        {PAINTINGS.map((x, i) => (
          <button key={i} className={i === index ? "on" : ""} aria-label={`Show painting ${i + 1}`} onClick={() => onIndex(i)}>
            <Img src={x.image} alt="" colors={x.colors} style={{ height: "100%", border: 0, borderRadius: 10 }} />
          </button>
        ))}
      </div>
      <div style={{ fontSize: 13 }}>
        <span className="muted">More on Instagram → </span>
        <a href={ART_INSTAGRAM.url} target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>{ART_INSTAGRAM.handle}</a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact — one page                                                  */
/* ------------------------------------------------------------------ */
export function ContactPanel() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(CONTACT.email); setCopied(true); setTimeout(() => setCopied(false), 1600); } catch { /* ignore */ }
  };
  return (
    <section className="panel glass stack" aria-label="Contact" data-scrollable>
      <h1 className="h1 contact-title" style={{ fontSize: 28 }}>
        {CONTACT.heading}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/emoji-laugh.png" alt="" width={30} height={30} />
      </h1>
      <div className="email-row glass-flat">
        <a href={`mailto:${CONTACT.email}`} style={{ flex: 1, textDecoration: "none" }}><strong>{CONTACT.email}</strong></a>
        <button className="btn ghost sm" onClick={copy}>{copied ? "Copied ✓" : "Copy"}</button>
      </div>
      <div className="link-grid">
        {CONTACT.links.filter((l) => l.label !== "Email").map((l) => (
          <a key={l.label} className="link-tile glass-flat" href={l.url} target={l.url.startsWith("/") ? undefined : "_blank"} rel="noreferrer">
            <b>{l.label.toUpperCase()}</b><span>{l.value} ↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Journal — one page that opens the flip book                         */
/* ------------------------------------------------------------------ */
export function JournalPreview({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="panel preview glass" aria-label="Journal">
      <button className="journal-cover" onClick={onOpen} aria-label="Open the travel journal">
        {TRIPS.slice(0, 5).map((t, i) => (
          <span key={i} className="cover-page" style={{ ["--i" as string]: i - 2, background: `linear-gradient(160deg, ${t.colors[0]}, ${t.colors[1]})` }}>
            {t.cover && <Img src={t.cover} alt="" style={{ height: "100%", border: 0, borderRadius: 0 }} />}
          </span>
        ))}
      </button>
      <div className="preview-foot">
        <div className="grow stack-sm">
          <h2 className="h2">Travel journal</h2>
          <p className="body">{TRIPS.length} trips, scrapbooked. Click a page to flip it.</p>
        </div>
        <button className="btn" onClick={onOpen}>Open journal →</button>
      </div>
    </section>
  );
}
