import type { VueRef } from "inferred-types/types";

export function isVueRef(val: unknown): val is VueRef {
    if (typeof val === "object") {
        const props = Object.getOwnPropertyNames(val);
        const isVueRef = !![
            "dep",
            "__v_isRef"
        ].every(i => props.includes(i));

        return isVueRef;
    }

    return false;
}
