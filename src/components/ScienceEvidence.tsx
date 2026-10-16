"use client";

import { useState } from "react";
import { SceneImage } from "./primitives/SceneImage";
import { useLanguage } from "./LanguageProvider";
import { SiteLink } from "./primitives/SiteLink";
import "./science-evidence.css";

const charts = [
  {name:["Radial distribution", "径向分布"], axis:"r →", symbol:"g(r)", caption:["Spatial correlations between atoms.","观察原子间的空间关联。"], value:(x:number)=>.22+ .67*Math.exp(-Math.pow((x-.2)/.035,2))+.35*Math.exp(-Math.pow((x-.43)/.06,2))+.15*Math.exp(-Math.pow((x-.68)/.08,2))},
  {name:["Density of states", "态密度"], axis:"E →", symbol:"DOS", caption:["Electronic states across an energy range.","理解能量区间内的电子态分布。"], value:(x:number)=>.04+.65*Math.exp(-Math.pow((x-.23)/.055,2))+.4*Math.exp(-Math.pow((x-.43)/.08,2))+.57*Math.exp(-Math.pow((x-.68)/.05,2))+.3*Math.exp(-Math.pow((x-.86)/.07,2))},
  {name:["Potential energy", "势能变化"], axis:"t →", symbol:"U", caption:["Follow relaxation and equilibration.","跟踪体系弛豫与平衡过程。"], value:(x:number)=>.18+.62*Math.exp(-x*5)+.13*Math.sin(x*50)*Math.exp(-x*4)},
  {name:["Stress–strain", "应力–应变"], axis:"ε →", symbol:"σ", caption:["Read the mechanical response of a material.","分析材料的力学响应。"], value:(x:number)=>x<.25?x*2:.5+(x-.25)*.35},
];

const plotPoints = charts.map(chart => Array.from({ length: 180 }, (_, j) => {
  const x = j / 179;
  return [40 + x * 260, 157 - chart.value(x) * 130];
}));
const plotPaths = plotPoints.map(points => points.map(([x, y], j) => `${j ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`).join(" "));

export function ScienceEvidence() {
  const [active, setActive] = useState(0);
  const {language}=useLanguage();
  const t=(en:string,zh:string)=>language==="zh"?zh:en;
  return <section className="science-evidence" id="results" aria-labelledby="evidence-title">
    <div className="evidence-intro">
      <span className="luma-section-name">{t("Results & interpretation","结果与可视化")}</span>
      <h2 id="evidence-title">{t("See the result.","看见结果，")}<br/>{t("Understand the evidence.","理解证据。")}</h2>
      <p>{t("Read structural, energetic and mechanical changes through scientific figures. Keep the method and calculation conditions alongside the result.","通过科学图表理解结构、能量与力学响应的变化，让计算方法、条件与结果相互对应。")}</p>
      <p className="evidence-note">{t("Illustrative curves, not measured data. RDF and energy derive from simulation analysis; electronic DOS requires an electronic-structure calculation.","以下为曲线示意，非实测数据。径向分布与能量来自模拟分析；电子态密度需结合电子结构计算。")}</p>
      <SiteLink href="/products/chemistry/" className="luma-text-link">{t("Explore analysis tools","了解计算与分析工具")} <span aria-hidden="true">↗</span></SiteLink>
    </div>
    <div className="evidence-studio">
      <div className="studio-heading"><span>{t("Illustrative data","示意数据")}</span></div>
      <div className="evidence-tabs" role="tablist" aria-label={t("Analysis view","分析视图")}>{charts.map((chart,i)=><button key={chart.symbol} role="tab" id={`evidence-tab-${i}`} aria-controls={`evidence-plot-${i}`} aria-selected={active===i} tabIndex={active===i?0:-1} onClick={()=>setActive(i)} onKeyDown={e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%4;else if(e.key==='ArrowLeft')next=(i+3)%4;else if(e.key==='Home')next=0;else if(e.key==='End')next=3;else return;e.preventDefault();setActive(next);document.getElementById(`evidence-tab-${next}`)?.focus();}}>{t(chart.name[0],chart.name[1])}</button>)}</div>
      <div className="evidence-plots">{charts.map((chart,i)=><figure key={chart.symbol} role="tabpanel" id={`evidence-plot-${i}`} aria-labelledby={`evidence-tab-${i}`} hidden={active!==i} tabIndex={0}>
      <figcaption className="sr-only">{t(chart.name[0],chart.name[1])}</figcaption>
      <svg viewBox="0 0 320 190" role="img" aria-label={t(chart.name[0]+" illustrative curve",chart.name[1]+"示意曲线")}>
        {[40,80,120,160].map(y=><line className="evidence-grid" key={y} x1="38" x2="302" y1={y} y2={y}/>)}
        <path className="evidence-axis" d="M38 24 V160 H302" fill="none"/>
        <text x="8" y="18">{chart.symbol}</text><text x="266" y="183">{chart.axis}</text>
        <path className="evidence-curve" d={plotPaths[i]} fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <p><span className="plot-legend" aria-hidden="true"/>{t(chart.caption[0],chart.caption[1])}</p>
    </figure>)}</div>
    </div>
  </section>;
}

export function ComputeWorkflow() {
  const {language}=useLanguage();const t=(en:string,zh:string)=>language==="zh"?zh:en;
  return <section className="compute-workflow" aria-labelledby="compute-title">
    <div><span className="luma-section-name">{t("Computational engine","计算引擎")}</span><h2 id="compute-title">{t("From a model","从模型准备，")}<br/>{t("to a traceable calculation.","到可追溯的计算。")}</h2><p>{t("Connect LAMMPS job preparation, execution and analysis. Discuss GPU and HPC integration in the context of your existing resources.","连接 LAMMPS 任务准备、计算执行与结果分析，结合现有资源，规划 GPU 与 HPC 算力接入。")}</p><SiteLink href="/products/lammps/" className="luma-text-link">{t("LAMMPS compute engine","了解 LAMMPS 计算引擎")} <span aria-hidden="true">↗</span></SiteLink></div>
    <div className="compute-flow-panel">
      <div className="compute-specimen"><SceneImage id="g02-02-crystal-lattice-block" alt={t("Illustrative crystal structure","晶体结构示意")} sizes="(max-width: 1000px) 84vw, 45vw" /></div>
      <div className="specimen-caption"><span>{t("Conceptual model","概念模型")}</span></div>
      <ol>{[
        ["Prepare","准备任务","Structure · Force field · Parameters","结构 · 力场 · 参数"],
        ["Execute","执行计算","Resources · Job submission · Logs","算力配置 · 任务提交 · 运行日志"],
        ["Review","分析与复核","Trajectory · Energy · Calculation records","轨迹 · 能量 · 计算记录"],
      ].map((step,i)=><li key={step[0]}><span className="compute-step-number">0{i+1}</span><div><h3>{t(step[0],step[1])}</h3><p>{t(step[2],step[3])}</p></div></li>)}</ol>
    </div>
  </section>;
}

export function DeploymentOptions() {
  const {language}=useLanguage();const t=(en:string,zh:string)=>language==="zh"?zh:en;
  return <section className="deployment-options" aria-labelledby="deployment-title">
    <div className="deployment-heading"><div><span className="luma-section-name">{t("Infrastructure & deployment","基础设施与部署")}</span><h2 id="deployment-title">{t("Start where your data lives.","从数据所在的环境出发。")}</h2></div><p>{t("Choose an approach around data boundaries, existing clusters and workload needs. Integration details are assessed for each environment.","围绕数据边界、现有集群与任务规模讨论部署方案，具体接入方式根据实际环境评估。")}</p></div>
    <div className="deployment-grid">{[
      ["Private cloud","私有云","Plan access boundaries, key management and data residency.","规划访问边界、密钥管理与数据存放区域。"],
      ["On-premise HPC","本地 HPC","Assess compatibility with existing clusters and schedulers.","评估与现有集群、调度器及存储的接入方式。"],
      ["Hybrid deployment","混合部署","Coordinate local and cloud resources around task and data requirements.","根据任务与数据要求，协调本地与云端资源。"],
      ["Public cloud","公有云","Discuss cloud resources, operating costs and task scale.","结合任务规模，讨论云端资源配置与使用成本。"],
    ].map((mode,i)=><article key={mode[0]}><span className="deployment-number">0{i+1}</span><h3>{t(mode[0],mode[1])}</h3><p>{t(mode[2],mode[3])}</p></article>)}</div>
    <SiteLink href="/enterprise/#contact" className="luma-text-link">{t("Discuss deployment","沟通部署需求")} <span aria-hidden="true">↗</span></SiteLink>
  </section>;
}
