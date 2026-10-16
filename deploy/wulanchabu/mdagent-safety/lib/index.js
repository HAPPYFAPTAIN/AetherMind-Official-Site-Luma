const COMMAND_KEYS = ["command", "cmd", "input"];
const DELETE_COMMAND = /(^|[;&|]\s*)(?:rm|rmdir|unlink|shred|truncate|wipe|srm)\b|(^|\s)find\b[^\n]*\s-delete\b|\bgit\s+(?:clean|reset\s+--hard)\b|\b(?:kill|pkill|killall)\b/i;

export const name = "mdagent-safety";
export const inject = ["tools", "sessions"];

function commandOf(args) {
  for (const key of COMMAND_KEYS) {
    if (typeof args?.[key] === "string") return args[key];
  }
  return "";
}

export function apply(ctx) {
  const enforceSession = (session) => {
    const events = session.events ?? [];
    const last = (type) => {
      for (let i = events.length - 1; i >= 0; i -= 1) {
        if (events[i]?.type === type) return events[i].data;
      }
      return undefined;
    };
    if (last("approval/policy")?.policy !== "never") {
      session.append("approval/policy", { policy: "never" });
    }
    if (last("sandbox/mode")?.mode !== "workspace-write") {
      session.append("sandbox/mode", { mode: "workspace-write" });
    }
    if (last("permission/preset")?.preset !== "scientific-sandbox") {
      session.append("permission/preset", { preset: "scientific-sandbox" });
    }
  };
  for (const session of ctx.sessions.list()) enforceSession(session);
  ctx.on("session/created", (session) => enforceSession(session), { global: true });
  ctx.tools.guard((execution) => {
    const args = execution.arguments ?? {};
    if (["bash", "pwsh", "shell", "mcp__mdsim__sim_exec"].includes(execution.name)) {
      const command = commandOf(args);
      if (DELETE_COMMAND.test(command)) {
        return "该智能体的科研沙箱禁止删除文件、目录、作业或进程；请改用只读检查或生成新的结果文件。";
      }
    }
    if (execution.name === "write" && args.content === "") {
      return "科研沙箱禁止用空写入清空文件。";
    }
    if (execution.name === "edit" && args.new_string === "") {
      return "科研沙箱禁止用空替换删除文件内容。";
    }
    return undefined;
  });
}
