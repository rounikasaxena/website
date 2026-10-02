"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { SONGS } from "@/data/content";
import { Next, Pause, Play } from "./Icons";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

/** Glass mini player (bottom right). Songs come from SONGS in data/content.ts. */
export default function MiniPlayer() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false); // YouTube only loads after the first press
  const song = SONGS[i];
  const next = () => setI((n) => (n + 1) % SONGS.length);
  const toggle = () => { setStarted(true); setPlaying((p) => !p); };

  return (
    <div className={`mini glass ${playing ? "playing" : ""}`}>
      {started && (
        <div style={{ position: "fixed", left: -9999, top: -9999, width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
          <ReactPlayer src={song.url} playing={playing} volume={0.6} width="0" height="0" onEnded={next} />
        </div>
      )}
      <div className="cd" aria-hidden="true" />
      <div className="mini-text">
        <b key={song.title}>{song.title}</b>
        <span>{song.artist}</span>
      </div>
      <button aria-label={playing ? "Pause music" : "Play music"} onClick={toggle}>{playing ? <Pause /> : <Play />}</button>
      <button aria-label="Next song" onClick={next}><Next /></button>
    </div>
  );
}
