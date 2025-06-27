import { isString } from "inferred-types/runtime";

export function isOutputToken(val: unknown) {
    // TODO: finish the checking for this type
    return isString(val) && val.startsWith("<<") && val.endsWith(">>");
}
