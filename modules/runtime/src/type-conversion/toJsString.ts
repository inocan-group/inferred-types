import { KeyValue, Narrowable, ObjectKey } from "inferred-types/types";
import { map, toKeyValue, isObject, isString, toJSON, increment, add } from "inferred-types/runtime";

function kv<T extends Record<ObjectKey,N>, N extends Narrowable>(obj: T) {
    const kv = toKeyValue(obj);

    return map(kv, (v: KeyValue) => {
        return isString(v.key)
            ? `${v.key}: ${toJSON(v.value)}`
            : `[key: unique symbol]: ${toJSON(v.value)}`
    })
}

export function toJsString<T extends Narrowable>(val: T) {

    return isObject(val)
        ? `{ ${kv(val)} }`
        : false

}

const a = toJsString({ foo: 1 });
const b = map(increment);
const c = [1,2,3].map(b);

