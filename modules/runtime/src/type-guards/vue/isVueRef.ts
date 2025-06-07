import type { VueRef } from "inferred-types/types";
import { isObject } from "inferred-types";

export function isVueRef(val: unknown): val is VueRef {
    if (typeof val === "object") {
        const props = Object.getOwnPropertyNames(val);
        const isVueRef = !![
            "dep",
            "__v_isRef"
        ].every(i => props.includes(i));
        console.log({props, isVueRef})


        return isVueRef
    }

    return false;
}
