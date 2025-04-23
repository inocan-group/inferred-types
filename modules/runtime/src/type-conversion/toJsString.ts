import type { KeyValue, Narrowable, ObjectKey } from "inferred-types/types";
import {
    isObject,
    isString,
    toJSON,
    toKeyValue
} from "inferred-types/runtime";

function kv<T extends Record<ObjectKey, N>, N extends Narrowable>(obj: T) {
    const kv = toKeyValue(obj);

    return map(kv, (v: KeyValue) => {
        return isString(v.key)
            ? `${v.key}: ${toJSON(v.value)}`
            : `[key: unique symbol]: ${toJSON(v.value)}`;
    });
}

export function toJsString<T extends Narrowable>(val: T) {
    return isObject(val)
        ? `{ ${kv(val)} }`
        : false;
}
