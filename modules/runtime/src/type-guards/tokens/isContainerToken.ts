import type {
    TT_Container,
    AsOutputToken,
} from "inferred-types/types";
import { isTypeToken } from "inferred-types/runtime";

export function isObjectToken(val: unknown): val is AsOutputToken<"obj"> {
    return isTypeToken(val, "obj");
}

export function isRecordToken(val: unknown): val is AsOutputToken<"rec"> {
    return isTypeToken(val, "rec");
}

export function isTupleToken(val: unknown): val is AsOutputToken<"tuple"> {
    return isTypeToken(val, "tuple");
}

export function isArrayToken(val: unknown): val is AsOutputToken<"arr"> {
    return isTypeToken(val, "arr");
}

export function isMapToken(val: unknown): val is AsOutputToken<"map"> {
    return isTypeToken(val, "map");
}

export function isSetToken(val: unknown): val is AsOutputToken<"set"> {
    return isTypeToken(val, "set");
}

/**
 * **isContainerToken**`(val)`: **val** is `ContainerToken`
 */
export function isContainerToken(val: unknown): val is TT_Container {
    return isObjectToken(val)
        || isRecordToken(val)
        || isTupleToken(val)
        || isArrayToken(val)
        || isMapToken(val)
        || isSetToken(val);
    // || isWeakMapToken(val)
}
