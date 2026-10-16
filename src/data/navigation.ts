export const navigation = [
  { id: "enterprise", href: "/enterprise/", title: ["Enterprise", "企业服务"], description: ["Connect scientific workflows with your team's infrastructure.", "让科学计算工作流，与团队现有的基础设施相连接。"], topics: [["Private deployment", "私有化部署"], ["Compute integration", "算力接入"], ["Team workflows", "团队工作流"]] },
  { id: "products", href: "/products/", title: ["Products", "产品"], description: ["Tools for preparing, running and understanding scientific computation.", "从准备、运行到理解结果，找到适合研究的计算工具。"], topics: [["Scientific platform", "科学计算平台"], ["Simulation & agents", "模拟与智能体"], ["Research workspaces", "研究工作区"]] },
  { id: "community", href: "/community/", title: ["Community", "社区"], description: ["Share questions, methods and the context behind a result.", "交流研究问题、计算方法，以及每个结果背后的思考。"], topics: [["Research discussions", "研究交流"], ["Methods & practice", "方法与实践"], ["Shared experience", "经验分享"]] },
  { id: "careers", href: "/careers/", title: ["Join us", "加入我们"], description: ["Bring scientific questions and thoughtful engineering together.", "让科学问题与工程能力相遇，一起探索新的研究方式。"], topics: [["Open role", "招聘岗位"], ["Research & engineering", "研究与工程"], ["AI experience", "AI 加分项"]] },
  { id: "about", href: "/about/", title: ["About us", "关于我们"], description: ["AetherMind brings computation closer to scientific research.", "以太智元，让计算更贴近科学研究本身。"], topics: [["Our focus", "我们关注什么"], ["Our approach", "我们如何工作"], ["Our team", "团队与方向"]] },
] as const;
export type InformationPageKey = "enterprise" | "careers" | "about";

export const productNavigation = [
  {id:"platform",title:["AetherMind Platform","以太智元平台"]},
  {id:"lammps",title:["LAMMPS Compute Engine","LAMMPS 计算引擎"]},
  {id:"md-exp",title:["MD EXP","MD EXP"]},
  {id:"agent",title:["Science Agents","科学智能体"]},
  {id:"learn-everything",title:["Learn Everything Agent","Learn Everything 学习 Agent"]},
  {id:"materials",title:["Materials Computing","材料计算"]},
  {id:"chemistry",title:["Chemistry & Molecular Computing","化学与分子计算"]},
  {id:"biology",title:["Biological Computing","生物计算"]},
] as const;
