import type { ReactNode } from "react";

type Props = {
  id?: string;
  className?: string;
  children: ReactNode;
  background?: ReactNode;
};

export function Section({ id, className = "", children, background }: Props) {
  return (
    <section id={id} className={`relative ${className}`}>
      {background}
      <div className="relative mx-auto w-full max-w-[1440px] px-6 lg:px-12">
        {children}
      </div>
    </section>
  );
}
