import { createHook, SUCCESS } from "@yankeeinlondon/claudine";
import { spawn } from 'child_process';
import packageJson from '../../package.json' with { type: 'json' };
// [Hooks Docs](https://docs.anthropic.com/en/docs/claude-code/hooks)
// [SubAgent Docs](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
// [Available Tools](https://docs.anthropic.com/en/docs/claude-code/settings#tools-available-to-claude)
// [Slash Commands](https://docs.anthropic.com/en/docs/claude-code/slash-commands)

createHook("PreToolUse")
    .handler(async (evt) => {
        const projectName = packageJson.name;
        const project: string = projectName.includes('/') ? projectName.split('/').pop() || projectName : projectName;
        const say = `The ${project} project is using the ${evt.tool_name} tool.`;


        spawn('say', [say]);
        return SUCCESS;
    })
