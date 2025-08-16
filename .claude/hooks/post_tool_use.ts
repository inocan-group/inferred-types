import { createHook, SUCCESS } from "@yankeeinlondon/claudine";

import pino from "pino";

const logger = pino();


createHook("PostToolUse")
    .handler(async (evt) => {
        logger.info(evt, `used "${evt.hook_event_name}" tool`)
        return SUCCESS;
    })
