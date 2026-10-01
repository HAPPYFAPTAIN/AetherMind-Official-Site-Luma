"use client";

import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { useLanguage } from "@/components/LanguageProvider";
import { tr } from "@/lib/i18n";
import { assetUrl } from "@/lib/asset-url";

const MODES = [
  {
    name: { en: "Private cloud", zh: "私有云" },
    desc: { en: "Isolated VPC, your keys, your data residency.", zh: "隔离 VPC，密钥自管，数据留在指定区域。" },
    flag: { en: "Most adopted", zh: "应用最广" },
  },
  {
    name: { en: "On-premise HPC", zh: "本地 HPC" },
    desc: { en: "Runs inside your existing clusters and schedulers.", zh: "直接运行在现有集群和调度器内。" },
    flag: null,
  },
  {
    name: { en: "Hybrid", zh: "混合部署" },
    desc: { en: "Burst to cloud when the queue is long.", zh: "队列拥堵时，可弹性扩展至云端。" },
    flag: null,
  },
  {
    name: { en: "Public cloud", zh: "公有云" },
    desc: { en: "Start immediately, scale with the science.", zh: "即开即用，计算规模随科研任务扩展。" },
    flag: null,
  },
];

function ClusterDiagram() {
  const nodes = [
    { x: 50, y: 26, r: 3 },
    { x: 26, y: 46, r: 2.2 },
    { x: 74, y: 46, r: 2.2 },
    { x: 38, y: 72, r: 2.6 },
    { x: 62, y: 72, r: 2.6 },
    { x: 50, y: 50, r: 3.4 },
  ];
  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 5], [1, 5], [2, 5], [0, 5],
  ];
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--line-strong)"
          strokeWidth="0.4"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={i === 5 ? "var(--accent)" : "var(--bg-3)"}
          stroke={i === 5 ? "var(--accent)" : "var(--text-tertiary)"}
          strokeWidth="0.5"
          className={i === 5 ? "animate-pulse" : ""}
        />
      ))}
    </svg>
  );
}

export function Infrastructure() {
  const { language } = useLanguage();

  return (
    <Section id="infrastructure" className="py-32 md:py-44">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <div className="mono-label mb-8 flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-accent/60" />
              {tr(language, "Infrastructure & Private Deployment", "基础设施与私有化部署")}
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="font-display zh-heading text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
              {language === "zh" ? (
                <>
                  <span className="block">科研数据在哪里</span>
                  <span className="block">计算就部署在哪里</span>
                </>
              ) : (
                <>
                  Deploy where your
                  <br />
                  research lives
                </>
              )}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="zh-copy mt-8 max-w-md text-base leading-relaxed text-text-tertiary sm:text-lg">
              {tr(
                language,
                "Data sovereignty and compliance for universities and labs — run on your CPU, GPU and HPC infrastructure, with the option to isolate everything behind your own firewall.",
                "面向高校和实验室的数据主权与合规需求，可直接运行在自有 CPU、GPU 和 HPC\u00a0基础设施上，也能把全部系统隔离在内部防火墙之后。",
              )}
            </p>
          </Reveal>

          <div className="mt-10 space-y-0">
            {MODES.map((m, i) => (
              <Reveal key={m.name.en} delay={0.16 + i * 0.05} y={20}>
                <div className="flex items-center justify-between border-b border-line py-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-display text-lg font-semibold text-white">
                          {tr(language, m.name.en, m.name.zh)}
                        </span>
                        {m.flag && (
                          <span className="rounded-full border border-accent/30 bg-accent-faint px-2.5 py-0.5 font-mono text-[10px] tracking-[0.1em] text-accent">
                            {tr(language, m.flag.en, m.flag.zh)}
                          </span>
                        )}
                      </div>
                      <p className="zh-copy mt-1 text-[13.5px] text-text-tertiary">
                        {tr(language, m.desc.en, m.desc.zh)}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} y={40}>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-line bg-bg-1">
            <img
              src={assetUrl("/images/g03/g03-09-dark-scientific-material.md.webp")}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 grid-overlay opacity-25" />
            <div className="absolute inset-0 flex items-center justify-center p-10">
              <div className="h-full w-full opacity-90">
                <ClusterDiagram />
              </div>
            </div>
            <div className="absolute left-5 top-5 mono-label whitespace-nowrap text-text-faint">
              {tr(language, "compute topology", "计算拓扑")}
            </div>
            <div className="absolute bottom-5 right-5 font-mono text-[11px] tracking-[0.12em] text-accent">
              {tr(language, "128 GPU · 512 core · 8 TB/s", "128 GPU · 512 核 · 8 TB/s")}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
