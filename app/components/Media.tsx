/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, type CSSProperties } from "react";

const gradient = (colors?: [string, string]) =>
  colors ? `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` : "linear-gradient(135deg,#3a4150,#5a6375)";

/** Shows your image, or a labelled placeholder telling you what to add. */
export function Img({
  src, alt, colors, addLabel, hint, style, className = "", dashed = true, imgStyle,
}: {
  src: string; alt: string; colors?: [string, string]; addLabel?: string; hint?: string;
  style?: CSSProperties; className?: string; dashed?: boolean; imgStyle?: CSSProperties;
}) {
  return (
    <div className={`media ${className}`} style={{ background: gradient(colors), ...style }}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" style={imgStyle} />
      ) : addLabel ? (
        <div className={`add-box ${dashed ? "dashed" : ""}`}>
          <div>
            ADD {addLabel}
            {hint && <em>{hint}</em>}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/**
 * YouTube embed link, a local /videos/file.mp4, or a placeholder.
 * YouTube videos show a thumbnail + play button first and only load the
 * real player when clicked. That keeps the page fast and lets the mouse
 * wheel keep moving the site while you hover over a video.
 */
export function Video({
  src, title, colors, hint, style,
}: {
  src: string; title: string; colors?: [string, string]; hint?: string; style?: CSSProperties;
}) {
  const [playing, setPlaying] = useState(false);
  const yt = src.match(/(?:youtube\.com\/embed\/|youtu\.be\/|v=)([\w-]{6,})/);
  const id = yt?.[1];
  return (
    <div className="media" style={{ aspectRatio: "16 / 9", background: gradient(colors), ...style }}>
      {!src ? (
        <div className="add-box dashed">
          <div>
            ▶ ADD VIDEO
            <em>{hint ?? "YouTube embed link or /videos/name.mp4 in data/content.ts"}</em>
          </div>
        </div>
      ) : id ? (
        playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autoplay=1`}
            title={title}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          />
        ) : (
          <button className="video-facade" onClick={() => setPlaying(true)} aria-label={`Play ${title}`}>
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" onError={(e) => (e.currentTarget.style.display = "none")} />
            <span className="play-orb"><svg width="26" height="26" viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3.5l11 6.5-11 6.5z" fill="#fff" /></svg></span>
          </button>
        )
      ) : (
        <video src={src} controls playsInline preload="metadata" />
      )}
    </div>
  );
}
