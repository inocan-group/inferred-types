import { isString } from "src/type-guards/isString";

export function isOutputToken(val: unknown) {
    // TODO: finish the checking for this type
    return isString(val) && val.startsWith("<<") && val.endsWith(">>");
}
