"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { PAINTINGS, PROJECTS, SITE, CONTACT, type SectionId } from "@/data/content";
import { PAGES, SECTIONS, countOf, firstIndexOf } from "./lib/pages";
import Wheel from "./components/Wheel";
import { AboutPanel, ArtPanel, CaseStudy, ContactPanel, JournalPreview, ProjectPreview } from "./components/Panels";
import Journal from "./components/Journal";
import MiniPlayer from "./components/MiniPlayer";
import { AeroIcon } from "./components/Icons";

/** Which page the site opens on. firstIndexOf("projects") = first project. Use 0 for About. */
const START = firstIndexOf("about");

/** How long things take (ms). Raise these for a slower, calmer feel. */
const FADE_OUT = 260;
const STEP_LOCK = 750; // minimum time between two wheel steps

/** Keeps showing the old value while it fades out, then swaps and fades in. */
function useCrossfade<T>(value: T, key: string) {
  const [shown, setShown] = useState({ value, key });
  const [phase, setPhase] = useState<"in" | "out">("in");
  useEffect(() => {
    if (key === shown.key) { setShown({ value, key }); return; }
    setPhase("out");
    const t = setTimeout(() => { setShown({ value, key }); setPhase("in"); }, FADE_OUT);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return [shown.value, phase] as const;
}

export default function Home() {
  const [index, setIndexRaw] = useState(START);
  const [caseOpen, setCaseOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);
  const [journalClosing, setJournalClosing] = useState(false);
  const closeJournal = () => { setJournalClosing(true); setTimeout(() => { setJournalOpen(false); setJournalClosing(false); }, 450); };
  const page = PAGES[index];

  const setIndex = useCallback((i: number) => {
    const n = Math.max(0, Math.min(PAGES.length - 1, i));
    setIndexRaw(n);
    if (PAGES[n].section !== "projects") setCaseOpen(false);
  }, []);
  const goSection = (s: SectionId) => setIndex(firstIndexOf(s));

  /* ---------- deep links: #about  #projects/qhacks  #art/2  #journal ---------- */
  useEffect(() => {
    const read = () => {
      const [s, id] = window.location.hash.replace("#", "").split("/");
      if (!SECTIONS.some((x) => x.id === s)) return;
      let i = firstIndexOf(s as SectionId);
      if (s === "projects" && id) { const k = PROJECTS.findIndex((p) => p.id === id); if (k >= 0) { i += k; setCaseOpen(true); } }
      if (s === "art" && id) i += Math.max(0, Math.min(PAINTINGS.length - 1, Number(id) - 1 || 0));
      setIndexRaw(i);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);
  useEffect(() => {
    let h = `#${page.section}`;
    if (page.section === "projects" && caseOpen) h += `/${PROJECTS[page.sub].id}`;
    if (page.section === "art") h += `/${page.sub + 1}`;
    if (window.location.hash !== h) history.replaceState(null, "", h);
  }, [page, caseOpen]);

  /* ---------- scrolling: exactly one page per scroll gesture ---------- */
  const lockUntil = useRef(0);
  const lastEvent = useRef(0);
  const acc = useRef(0);
  const indexRef = useRef(index);
  indexRef.current = index;

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth <= 1024 || journalOpen) return; // phones scroll the page normally
      if (document.body.dataset.lightbox) return; // photo viewer is open (it scrolls long images itself)
      const now = performance.now();
      const gap = now - lastEvent.current;
      lastEvent.current = now;

      // If you're scrolling inside a long panel (case study, about…), scroll that first.
      const sc = (e.target as Element | null)?.closest?.("[data-scrollable]") as HTMLElement | null;
      if (sc) {
        const canDown = sc.scrollTop + sc.clientHeight < sc.scrollHeight - 2;
        const canUp = sc.scrollTop > 2;
        if ((e.deltaY > 0 && canDown) || (e.deltaY < 0 && canUp)) { lockUntil.current = now + 300; return; }
      }
      e.preventDefault();
      // still moving from the last step, or trackpad momentum → ignore
      if (now < lockUntil.current) { if (gap < 220) lockUntil.current = Math.max(lockUntil.current, now + 220); return; }
      acc.current += Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(acc.current) < 24) return;
      const dir = Math.sign(acc.current);
      acc.current = 0;
      lockUntil.current = now + STEP_LOCK;
      setIndex(indexRef.current + dir);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [journalOpen, setIndex]);

  /* ---------- keyboard ---------- */
  useEffect(() => {
    if (journalOpen) return;
    const k = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (document.body.dataset.lightbox) return; // photo viewer handles its own keys
      if (["ArrowDown", "PageDown"].includes(e.key)) { e.preventDefault(); setIndex(indexRef.current + 1); }
      if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); setIndex(indexRef.current - 1); }
      if (e.key === "Escape") setCaseOpen(false);
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [journalOpen, setIndex]);

  const activate = () => {
    if (page.section === "projects") setCaseOpen(true);
    if (page.section === "journal") setJournalOpen(true);
    if (page.section === "contact") window.location.href = `mailto:${CONTACT.email}`;
  };

  /* ---------- what's shown (with smooth crossfades) ---------- */
  const [shownIndex, labelPhase] = useCrossfade(index, String(index));
  const [shown, panelPhase] = useCrossfade({ index, caseOpen }, `${index}-${caseOpen}`);
  const lp = PAGES[shownIndex];

  // Measure the title beside the wheel so the panel always starts the same distance
  // after it as it is from the right edge (the panel slides smoothly when titles change).
  const labelRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = labelRef.current;
    if (el) document.documentElement.style.setProperty("--label-w", `${el.offsetWidth}px`);
  }, [shownIndex]);
  const sp = PAGES[shown.index];

  const label = (() => {
    const of = countOf(lp.section) > 1 ? ` · ${lp.sub + 1} / ${countOf(lp.section)}` : "";
    switch (lp.section) {
      case "about": return { h: "About me", p: "Hi, I'm Rounika :)", s: "CS (AI) + Film & Media · Queen's" };
      case "contact": return { h: "Contact", p: "Say hi — email is fastest", s: CONTACT.email };
      case "journal": return { h: "Journal", p: "Trips, scrapbooked", s: "Click to open the book" };
      case "art": { const a = PAINTINGS[lp.sub]; return { h: "Art", p: a.title, s: `${a.medium} · ${a.year}${of}` }; }
      default: { const p = PROJECTS[lp.sub]; return { h: p.name, p: `${p.subtitle} · ${p.date}`, s: `${p.kind}${of}` }; }
    }
  })();

  const panel = (() => {
    switch (sp.section) {
      case "about": return <AboutPanel />;
      case "contact": return <ContactPanel />;
      case "art": return <ArtPanel index={sp.sub} onIndex={(i) => setIndex(firstIndexOf("art") + Math.max(0, Math.min(PAINTINGS.length - 1, i)))} />;
      case "journal": return <JournalPreview onOpen={() => setJournalOpen(true)} />;
      default: return shown.caseOpen
        ? <CaseStudy p={PROJECTS[sp.sub]} onClose={() => setCaseOpen(false)} />
        : <ProjectPreview p={PROJECTS[sp.sub]} onOpen={() => setCaseOpen(true)} />;
    }
  })();

  const caseView = shown.caseOpen && sp.section === "projects";

  return (
    <main className="shell">
      <div className="ambient" aria-hidden="true"><span className="a1" /><span className="a2" /><span className="a3" /></div>
      <header className="brand"><b>{SITE.name}</b><span>{SITE.tagline}</span></header>

      <Wheel index={index} onIndex={setIndex} onActivate={activate} onSection={goSection} />

      <div ref={labelRef} className={`sel-label fade ${labelPhase} ${caseView ? "hide" : ""}`} aria-live="polite">
        <h2>{label.h}</h2>
      </div>

      <div className={`content-area ${caseView ? "wide" : ""}`}>
        <div className={`fade ${panelPhase}`}>{panel}</div>
      </div>

      <MiniPlayer />

      <nav className="tabbar glass" aria-label="Sections">
        {SECTIONS.map((s) => (
          <button key={s.id} className={page.section === s.id ? "on" : ""} onClick={() => goSection(s.id)} aria-current={page.section === s.id}>
            <AeroIcon id={s.id} size={28} />
            {s.label}
          </button>
        ))}
      </nav>

      {journalOpen && <div className={`journal-wrap ${journalClosing ? "closing" : ""}`}><Journal onClose={closeJournal} /></div>}
    </main>
  );
}
