import { isString } from "inferred-types/runtime";

export function isOutputToken(val: unknown) {
    return isString(val) && val.startsWith("<<") && val.endsWith(">>");
}
