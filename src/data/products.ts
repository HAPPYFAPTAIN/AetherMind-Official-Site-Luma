import { productAssets } from "./productAssets";

export type Product = {
  id: string;
  image: string;
  category: string;
  title: { zh: string; en: string };
  body: { zh: string; en: string };
  tags: { zh: string; en: string }[];
  state: { zh: string; en: string };
};

export const PRODUCTS: Product[] = [
  { id: "platform", image: productAssets.platform, category: "platform", title: { zh: "以太智元平台", en: "AetherMind Platform" }, body: { zh: "从任务准备到结果理解，一套面向科学研究的计算工作区。", en: "A research workspace for preparing jobs, running compute and understanding results." }, tags: [{ zh: "科研工作区", en: "Research workspace" }, { zh: "HPC", en: "HPC" }], state: { zh: "样板可用", en: "Preview ready" } },
  { id: "lammps", image: productAssets.lammps, category: "simulation", title: { zh: "LAMMPS 计算引擎", en: "LAMMPS Compute Engine" }, body: { zh: "面向分子动力学的 GPU 与 HPC 任务编排、监测和轨迹分析。", en: "GPU and HPC orchestration, monitoring and trajectory analysis for molecular dynamics." }, tags: [{ zh: "分子动力学", en: "Molecular dynamics" }, { zh: "GPU", en: "GPU" }], state: { zh: "持续建设", en: "In development" } },
  { id: "md-exp", image: productAssets.mdExp, category: "simulation", title: { zh: "MD EXP", en: "MD EXP" }, body: { zh: "分子模拟智能体、模型对话与 dsh 科研工作流。", en: "Molecular simulation agent, model conversations and the dsh research workflow." }, tags: [{ zh: "LAMMPS / ReaxFF", en: "LAMMPS / ReaxFF" }, { zh: "dsh", en: "dsh" }], state: { zh: "已接入入口", en: "Entry connected" } },
  { id: "agent", image: productAssets.aiAgent, category: "agent", title: { zh: "科学智能体", en: "Science Agents" }, body: { zh: "让研究问题转化为可执行的计算步骤，保留参数、证据和结果上下文。", en: "Turn research questions into executable steps while keeping parameters, evidence and context together." }, tags: [{ zh: "AI for Science", en: "AI for Science" }, { zh: "工作流", en: "Workflow" }], state: { zh: "样板可用", en: "Preview ready" } },
  { id: "learn-everything", image: productAssets.learning, category: "agent", title: { zh: "Learn Everything 学习 Agent", en: "Learn Everything Agent" }, body: { zh: "从选题、学习路线到复习、测验和学习看板的一体化学习工作台。", en: "An integrated learning workspace from topic discovery and routes to review, quizzes and progress." }, tags: [{ zh: "学习路线", en: "Learning routes" }, { zh: "FSRS 复习", en: "FSRS review" }, { zh: "知识库问答", en: "RAG Q&A" }], state: { zh: "邀请码激活", en: "Invite activation" } },
  { id: "materials", image: productAssets.materials, category: "research", title: { zh: "材料计算", en: "Materials Computing" }, body: { zh: "围绕结构、缺陷、界面与能量景观组织材料研究过程。", en: "Organize materials research around structures, defects, interfaces and energy landscapes." }, tags: [{ zh: "材料模拟", en: "Materials simulation" }, { zh: "结构计算", en: "Structure compute" }], state: { zh: "即将开放", en: "Coming soon" } },
  { id: "chemistry", image: productAssets.chemistry, category: "research", title: { zh: "化学与分子计算", en: "Chemistry & Molecular Computing" }, body: { zh: "从分子结构到反应路径，用统一环境记录计算与判断。", en: "Track molecular structures, reaction paths and decisions in one environment." }, tags: [{ zh: "量子化学", en: "Quantum chemistry" }, { zh: "分子计算", en: "Molecular compute" }], state: { zh: "即将开放", en: "Coming soon" } },
  { id: "biology", image: productAssets.biology, category: "research", title: { zh: "生物计算", en: "Biological Computing" }, body: { zh: "面向生物分子建模、结构分析与可复现实验流程。", en: "A focused workspace for biomolecular modeling, structure analysis and reproducible experiments." }, tags: [{ zh: "分子建模", en: "Molecular modeling" }, { zh: "生物计算", en: "Biocomputing" }], state: { zh: "即将开放", en: "Coming soon" } },
];


export function productHref(id: string) { return `/products/${id}/`; }
