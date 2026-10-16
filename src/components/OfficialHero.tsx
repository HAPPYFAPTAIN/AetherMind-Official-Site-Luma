import type { CSSProperties, ReactNode } from "react";
import { ThemedProductArt } from "./ThemedProductArt";
import styles from "./OfficialHero.module.css";

type OfficialHeroProps = {
  id: string;
  image: string;
  imageAlt?: string;
  imagePosition?: string;
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  actions: ReactNode;
  note?: ReactNode;
};

/** Shared composition for the six public landing pages. Content and art stay page-specific. */
export function OfficialHero({ id, image, imageAlt = "", imagePosition, eyebrow, title, description, actions, note }: OfficialHeroProps) {
  return <section className={styles.hero} aria-labelledby={id} data-official-hero>
    <div className={styles.art} style={imagePosition ? { "--hero-position": imagePosition } as CSSProperties : undefined}><ThemedProductArt base={image} alt={imageAlt} sizes="100vw" priority /></div>
    <div className={styles.inner}>
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title} id={id}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>{actions}</div>
        {note && <p className={styles.note}>{note}</p>}
      </div>
    </div>
  </section>;
}
