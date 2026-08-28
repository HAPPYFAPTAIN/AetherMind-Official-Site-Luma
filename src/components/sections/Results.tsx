"use client";

import { useLayoutEffect, useRef } from "react";
import { Section } from "@/components/primitives/Section";
import { Reveal, prefersReducedMotion } from "@/components/primitives/Reveal";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/i18n";

type Pt = [number, number];

function gauss(x: number, mu: number, sigma: number, h: number) {
  return h * Math.exp(-((x - mu) ** 2) / (2 * sigma * sigma));
}

/* ------- data generators (deterministic, scientific-looking) ------- */

function rdf(): Pt[] {
  const pts: Pt[] = [];
  for (let r = 0.6; r <= 10; r += 0.06) {
    let g =
      1 +
      gauss(r, 2.6, 0.24, 2.5) +
      gauss(r, 5.0, 0.42, 1.25) +
      gauss(r, 7.4, 0.58, 0.8) +
      gauss(r, 9.6, 0.72, 0.55);
    g += Math.sin(r * 7) * 0.03 * Math.exp(-r / 6);
    pts.push([r, Math.max(0, g)]);
  }
  return pts;
}

function potential(): Pt[] {
  const pts: Pt[] = [];
  for (let t = 0; t <= 100; t += 1) {
    const u =
      -4.2 +
      2.6 * Math.exp(-t / 22) +
      0.7 * Math.sin(t / 1.9) * Math.exp(-t / 34) +
      0.25 * Math.sin(t / 0.7) * Math.exp(-t / 12);
    pts.push([t, u]);
  }
  return pts;
}

function dos(): Pt[] {
  const pts: Pt[] = [];
  for (let e = -6; e <= 6; e += 0.05) {
    const d =
      gauss(e, -3.4, 0.5, 2.1) +
      gauss(e, -1.2, 0.7, 1.5) +
      gauss(e, 1.6, 0.45, 1.8) +
      gauss(e, 4.0, 0.8, 1.1);
    pts.push([e, d]);
  }
  return pts;
}

function stressStrain(): Pt[] {
  const pts: Pt[] = [];
  for (let e = 0; e <= 20; e += 0.2) {
    let s: number;
    if (e < 4) s = e * 1.4;
    else if (e < 9) s = 5.6 + (e - 4) * 0.45 + Math.sin(e * 2) * 0.12;
    else s = 7.8 + (e - 9) * 0.12;
    pts.push([e, s]);
  }
  return pts;
}

function toPath(pts: Pt[], x0: number, y0: number, w: number, h: number, xr: [number, number], yr: [number, number]) {
  const sx = (x: number) => x0 + ((x - xr[0]) / (xr[1] - xr[0])) * w;
  const sy = (y: number) => y0 + h - ((y - yr[0]) / (yr[1] - yr[0])) * h;
  return pts.map(([x, y]) => `${sx(x).toFixed(2)},${sy(y).toFixed(2)}`).join(" L ");
}

function Plot({
  pts,
  xr,
  yr,
  xlabel,
  ylabel,
  stroke = "var(--accent)",
  fill = "none",
  area = false,
}: {
  pts: Pt[];
  xr: [number, number];
  yr: [number, number];
  xlabel: string;
  ylabel: string;
  stroke?: string;
  fill?: string;
  area?: boolean;
}) {
  const W = 420;
  const H = 260;
  const pad = { l: 46, r: 16, t: 18, b: 36 };
  const pw = W - pad.l - pad.r;
  const ph = H - pad.t - pad.b;

  const path = toPath(pts, pad.l, pad.t, pw, ph, xr, yr);
  const lineId = useRef<SVGPathElement>(null);
  const areaId = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const el = lineId.current;
    if (!el) return;

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      return;
    }

    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len}`;
    if (areaId.current) areaId.current.style.opacity = "0";

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transition = "stroke-dashoffset 1.8s ease-out";
          el.style.strokeDashoffset = "0";
          if (areaId.current) {
            areaId.current.style.transition = "opacity 0.7s ease-out 1s";
            areaId.current.style.opacity = "1";
          }
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const areaPath = `M ${path} L ${pad.l + pw},${pad.t + ph} L ${pad.l},${pad.t + ph} Z`;

  // grid lines
  const yTicks = Array.from({ length: 5 }, (_, i) => yr[0] + ((yr[1] - yr[0]) / 4) * i);
  const xTicks = Array.from({ length: 5 }, (_, i) => xr[0] + ((xr[1] - xr[0]) / 4) * i);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full">
      {yTicks.map((t, i) => (
        <line
          key={`y${i}`}
          x1={pad.l}
          y1={pad.t + (ph / 4) * i}
          x2={W - pad.r}
          y2={pad.t + (ph / 4) * i}
          stroke="var(--line)"
          strokeWidth="1"
        />
      ))}
      {xTicks.map((t, i) => (
        <line
          key={`x${i}`}
          x1={pad.l + (pw / 4) * i}
          y1={pad.t}
          x2={pad.l + (pw / 4) * i}
          y2={pad.t + ph}
          stroke="var(--line)"
          strokeWidth="1"
        />
      ))}
      {/* axes */}
      <line x1={pad.l} y1={pad.t} x2={pad.l} y2={pad.t + ph} stroke="var(--line-strong)" />
      <line x1={pad.l} y1={pad.t + ph} x2={W - pad.r} y2={pad.t + ph} stroke="var(--line-strong)" />

      {area && (
        <path ref={areaId} d={areaPath} fill="url(#areaGrad)" opacity="0" />
      )}

      <path
        ref={lineId}
        d={`M ${path}`}
        fill={fill}
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />

      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* labels */}
      {yTicks.map((t, i) => (
        <text
          key={`yl${i}`}
          x={pad.l - 8}
          y={pad.t + (ph / 4) * i + 3}
          textAnchor="end"
          fontSize="9"
          fill="var(--text-faint)"
          fontFamily="var(--font-geist-mono)"
        >
          {t.toFixed(1)}
        </text>
      ))}
      {xTicks.map((t, i) => (
        <text
          key={`xl${i}`}
          x={pad.l + (pw / 4) * i}
          y={pad.t + ph + 16}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-faint)"
          fontFamily="var(--font-geist-mono)"
        >
          {t.toFixed(1)}
        </text>
      ))}
      <text
        x={pad.l + pw / 2}
        y={H - 4}
        textAnchor="middle"
        fontSize="10"
        fill="var(--text-tertiary)"
        fontFamily="var(--font-geist-mono)"
      >
        {xlabel}
      </text>
      <text
        x={12}
        y={pad.t + ph / 2}
        textAnchor="middle"
        fontSize="10"
        fill="var(--text-tertiary)"
        fontFamily="var(--font-geist-mono)"
        transform={`rotate(-90 12 ${pad.t + ph / 2})`}
      >
        {ylabel}
      </text>
    </svg>
  );
}

function Figure({
  n,
  title,
  caption,
  children,
}: {
  n: string;
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  const { language } = useLanguage();

  return (
    <div className="rounded-2xl border border-line bg-bg-1/60 p-5 backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
          {tr(language, "Fig.", "图")} {n} — {title}
        </span>
      </div>
      {children}
      <p className="mt-4 border-t border-line pt-4 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-text-faint">
        {caption}
      </p>
    </div>
  );
}

export function Results() {
  const { language } = useLanguage();
  const tags = [
    { en: "RDF", zh: "RDF" },
    { en: "DOS", zh: "DOS" },
    { en: "Energy", zh: "能量" },
    { en: "Stress", zh: "应力" },
    { en: "Strain", zh: "应变" },
    { en: "Density", zh: "密度" },
    { en: "Trajectory", zh: "轨迹" },
  ];

  return (
    <Section id="results" className="py-32 md:py-44">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-32">
          <Reveal>
            <div className="mono-label mb-8 flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-accent/60" />
              {tr(language, "Results & Visualization", "结果与可视化")}
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display zh-heading text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
              {language === "zh" ? (
                <>
                  <span className="block">用科学图表</span>
                  <span className="block">呈现科学结果</span>
                </>
              ) : (
                <>
                  Science rendered
                  <br />
                  like science
                </>
              )}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="zh-copy mt-8 max-w-md text-base leading-relaxed text-text-tertiary sm:text-lg">
              {tr(
                language,
                "Publication-grade figures straight from your trajectories — radial distributions, densities of states, energy profiles and stress–strain response. Not dashboards. Evidence.",
                "从模拟轨迹直接生成可用于论文的径向分布、态密度、能量曲线和应力–应变响应。不是装饰性的仪表盘，而是支撑结论的证据。",
              )}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.en}
                  className="whitespace-nowrap rounded-full border border-line-strong px-3 py-1.5 font-mono text-[11px] tracking-[0.08em] text-text-secondary"
                >
                  {tr(language, tag.en, tag.zh)}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal delay={0.05} y={32} className="sm:col-span-1">
            <Figure
              n="1"
              title={tr(language, "Radial distribution g(r)", "径向分布 g(r)")}
              caption={tr(language, "Structural ordering — first-shell and long-range correlation.", "结构有序性，包括第一配位壳层和长程相关性。")}
            >
              <Plot pts={rdf()} xr={[0, 10]} yr={[0, 3]} xlabel="r (Å)" ylabel="g(r)" area />
            </Figure>
          </Reveal>
          <Reveal delay={0.1} y={32}>
            <Figure
              n="2"
              title={tr(language, "Density of states", "态密度")}
              caption={tr(language, "Electronic structure across the energy window.", "能量窗口内的电子结构分布。")}
            >
              <Plot pts={dos()} xr={[-6, 6]} yr={[0, 2.4]} xlabel="E (eV)" ylabel="DOS" area />
            </Figure>
          </Reveal>
          <Reveal delay={0.15} y={32}>
            <Figure
              n="3"
              title={tr(language, "Potential energy", "势能")}
              caption={tr(language, "Equilibration and relaxation toward a stable state.", "体系逐步平衡并弛豫至稳定状态。")}
            >
              <Plot pts={potential()} xr={[0, 100]} yr={[-4.5, 0.5]} xlabel="t (ps)" ylabel="U (eV)" />
            </Figure>
          </Reveal>
          <Reveal delay={0.2} y={32}>
            <Figure
              n="4"
              title={tr(language, "Stress–strain", "应力–应变")}
              caption={tr(language, "Elastic response, yield, and plastic flow.", "展示弹性响应、屈服与塑性流动。")}
            >
              <Plot pts={stressStrain()} xr={[0, 20]} yr={[0, 9]} xlabel="ε (%)" ylabel="σ (GPa)" />
            </Figure>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
