import type { KeyValue, Narrowable, ObjectKey } from "inferred-types/types";
import {
    isObject,
    isString,
    toJSON,
    toKeyValue
} from "inferred-types/runtime";
import { Dictionary, NarrowObject } from "inferred-types";

function kv<T extends Dictionary<ObjectKey,N>, N extends Narrowable>(
    obj: T
) {
    const kv = toKeyValue(obj as unknown as NarrowObject<Narrowable>);

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
