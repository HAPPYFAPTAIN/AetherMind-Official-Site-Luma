import type { ReactNode } from "react";

type Props = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ id, className = "", children }: Props) {
  return (
    <section id={id} className={`relative ${className}`}>
      <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        {children}
      </div>
    </section>
  );
}
