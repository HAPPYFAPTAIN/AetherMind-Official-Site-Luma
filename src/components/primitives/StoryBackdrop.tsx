import {assetUrl} from "@/lib/asset-url";

const BACKDROPS: Record<string, {image: string; motion: string}> = {
  platform: {image: "g01/g01-09-multiscale-science", motion: "approach"},
  engine: {image: "g01/g01-08-computational-engine", motion: "right"},
  simulation: {image: "g01/g01-03-lammps-millions-atoms", motion: "left"},
  "ai-science": {image: "g01/g01-06-ai-science-transformation", motion: "approach"},
  workflow: {image: "g03/g03-05-computational-data-atmosphere", motion: "right"},
  research: {image: "g01/g01-04-materials-science", motion: "left"},
  results: {image: "g01/g01-07-energy-landscape", motion: "approach"},
  infrastructure: {image: "g03/g03-09-dark-scientific-material", motion: "right"},
  console: {image: "g01/g01-10-discovery-final", motion: "approach"},
};

/** Full-section artwork sits outside the text's max-width container. */
export function StoryBackdrop({id}: {id?: string}) {
  const backdrop = id ? BACKDROPS[id] : undefined;
  if (!backdrop) return null;
  return (
    <div className={`story-backdrop story-backdrop--${id}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-story-backdrop={backdrop.motion}
        src={assetUrl(`/images/${backdrop.image}.md.webp`)}
        srcSet={`${assetUrl(`/images/${backdrop.image}.sm.webp`)} 640w, ${assetUrl(`/images/${backdrop.image}.md.webp`)} 960w, ${assetUrl(`/images/${backdrop.image}.full.webp`)} 1600w`}
        sizes="(max-aspect-ratio: 16/9) 178vh, 100vw"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <div className="story-backdrop__shade" />
    </div>
  );
}
