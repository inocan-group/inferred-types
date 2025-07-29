import { createHook, SUCCESS } from "@yankeeinlondon/claudine";

import pino from "pino";

const logger = pino();


createHook("PreToolUse")
    .handler(async (evt) => {
        logger.info(evt, `going to use "${evt.tool_name}" tool`)
        return SUCCESS;
    })
