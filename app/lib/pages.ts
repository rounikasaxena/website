import { ABOUT, PROJECTS, type SectionId } from "@/data/content";
// Art + Journal are hidden for now. To bring them back, un-comment the lines marked "HIDDEN" below
// and add PAINTINGS, TRIPS back to this import.

/** One stop on the wheel. Scrolling moves through these in order. */
export type Page = {
  key: string;
  section: SectionId;
  label: string; // text on the wheel card
  image: string;
  colors: [string, string];
  sub: number; // position inside its section (0-based)
};

export const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "about", label: "About me" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
  // HIDDEN: { id: "art", label: "Art" },
  // HIDDEN: { id: "journal", label: "Journal" },
];

export const PAGES: Page[] = [
  // About — one page
  { key: "about", section: "about", label: "About me", image: ABOUT.gallery[0]?.src ?? "", colors: ["#2BA3E8", "#9BE7FF"], sub: 0 },
  // Projects — one page per project
  ...PROJECTS.map((p, i) => ({ key: `p-${p.id}`, section: "projects" as const, label: p.name, image: p.thumbnail, colors: p.colors, sub: i })),
  // Contact — one page
  { key: "contact", section: "contact", label: "Contact", image: "/images/contact.jpg", colors: ["#9BE86B", "#2E9E3E"], sub: 0 },
  // HIDDEN — Art, one page per painting
  // ...PAINTINGS.map((p, i) => ({ key: `art-${i}`, section: "art" as const, label: p.title.startsWith("[") ? `Painting ${i + 1}` : p.title, image: p.image, colors: p.colors, sub: i })),
  // HIDDEN — Journal, one page (opens the flip book)
  // { key: "journal", section: "journal", label: "Journal", image: TRIPS[0]?.cover ?? "", colors: ["#C9A6F2", "#6B4FD0"], sub: 0 },
];

export const firstIndexOf = (s: SectionId) => PAGES.findIndex((p) => p.section === s);
export const countOf = (s: SectionId) => PAGES.filter((p) => p.section === s).length;
