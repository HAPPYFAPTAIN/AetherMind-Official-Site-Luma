const COMMAND_KEYS = ["command", "cmd", "input"];
const DELETE_COMMAND = /(^|[;&|]\s*)(?:rm|rmdir|unlink|shred|truncate|wipe|srm)\b|(^|\s)find\b[^\n]*\s-delete\b|\bgit\s+(?:clean|reset\s+--hard)\b|\b(?:kill|pkill|killall)\b/i;

export const name = "mdagent-safety";
export const inject = ["tools"];

function commandOf(args) {
  for (const key of COMMAND_KEYS) {
    if (typeof args?.[key] === "string") return args[key];
  }
  return "";
}

export function apply(ctx) {
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
