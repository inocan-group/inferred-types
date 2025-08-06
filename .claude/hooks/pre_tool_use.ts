import { createHook, SUCCESS } from "@yankeeinlondon/claudine";




createHook("PreToolUse")
    .handler(async (evt) => {
        console.log(evt, `going to use "${evt.tool_name}" tool`)
        return SUCCESS;
    })
