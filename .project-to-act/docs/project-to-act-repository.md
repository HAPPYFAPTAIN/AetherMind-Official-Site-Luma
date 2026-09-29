# project-to-act 仓库说明

来源仓库：[redmaplewww/project-to-act](https://github.com/redmaplewww/project-to-act)

总官网仓库采用 `project-to-act` 的 **managed** 模式。当前目录下的
`.project-to-act/` 是项目状态、版本、功能和验收的唯一治理入口。

生产官网运行在乌兰察布 `https://8.130.144.193/official/`，本仓库保存源码；
生产 Nginx、IP 证书、发布包和服务器恢复材料不复制进 Git 仓库。

## 命令

```sh
python ~/.codex/skills/project-to-act/scripts/init_project_management.py \
  --project-root "$PWD" --check
python ~/.codex/skills/project-to-act/scripts/init_project_management.py \
  --project-root "$PWD" --validate
python ~/.codex/skills/project-to-act/scripts/init_project_management.py \
  --project-root "$PWD" --audit
```

不要把私钥、证书私钥、服务器密码、完整浏览器日志或其他敏感数据写入治理文档。
