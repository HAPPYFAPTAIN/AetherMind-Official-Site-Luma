import type { ReactNode } from "react";
import {StoryBackdrop} from "@/components/primitives/StoryBackdrop";

type Props = {
  id?: string;
  className?: string;
  children: ReactNode;
  background?: ReactNode;
};

export function Section({ id, className = "", children, background }: Props) {
  return (
    <section id={id} data-story-section className={`story-section relative ${className}`}>
      <StoryBackdrop id={id} />
      {background}
      <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        {children}
      </div>
    </section>
  );
}
